import { asyncHandler } from "../utils/asyncHandler.js";
import { v2 as cloudinary } from "cloudinary";
import Event from "../models/events.models.js";
import { uploadOnCloudinary } from "../utils/cloudniary.js";
import { logAudit } from "../middleware/audit.middleware.js";

// ✅ Get All Events
export const getAllEvents = asyncHandler(async (req, res) => {
  const events = await Event.find().sort({ createdAt: -1 });

  if (!events || events.length === 0) {
    return res.status(400).json({ message: "No events found | Use 'Add Event' button to create events." });
  }

  res.status(200).json({ events, message: "Fetched all events successfully!" });
});

// ✅ Create Event (with Audit Log)
export const createEvent = asyncHandler(async (req, res) => {
  const { clubName, dateTime, venue, description, guestSpeaker } = req.body;
  const adminEmail = req.admin.email;
  const imageFiles = req.files;

  if (!imageFiles || imageFiles.length === 0) {
    return res.status(400).json({ message: "Event images are required" });
  }

  if ([clubName, dateTime, venue, description].some(field => !field || field.trim() === "")) {
    return res.status(400).json({ message: "All required fields must be filled" });
  }

  // Convert dateTime to valid Date object (assuming front-end sends it in ISO format)
  const eventDateTime = new Date(dateTime);
  if (isNaN(eventDateTime.getTime())) {
    return res.status(400).json({ message: "Invalid date-time format" });
  }

  const uploadedImages = await Promise.all(
    imageFiles.map(async (file) => {
      const response = await uploadOnCloudinary(file.path);
      return response.url;
    })
  );

  const newEvent = new Event({
    images: uploadedImages,
    clubName,
    dateTime: eventDateTime,  // ✅ Now storing full date-time properly
    venue,
    description,
    guestSpeaker
  });

  await newEvent.save();

  // ✅ Log event creation
  await logAudit(adminEmail, "CREATE", newEvent._id);

  res.status(201).json({ newEvent, message: "Event created successfully!" });
});

// ✅ Update Event (with Audit Log)
export const updateEvent = asyncHandler(async (req, res) => {
  const { clubName, dateTime, venue, description, guestSpeaker } = req.body;
  const eventId = req.params.id;
  const adminEmail = req.admin.email;
  const imageFiles = req.files;

  if (!eventId) return res.status(404).json({ message: "Event ID is required" });

  const event = await Event.findById(eventId);
  if (!event) return res.status(404).json({ message: "Event not found" });

  let updatedImages = event.images;
  if (imageFiles && imageFiles.length > 0) {
    await Promise.all(
      event.images.map(async (imageUrl) => {
        const match = imageUrl.match(/\/upload\/(?:v\d+\/)?([^/.]+)(?:\.[a-zA-Z]+)?$/);
        const publicId = match ? match[1] : null;
        if (publicId) await cloudinary.uploader.destroy(publicId);
      })
    );

    updatedImages = await Promise.all(
      imageFiles.map(async (file) => {
        const response = await uploadOnCloudinary(file.path);
        return response.url;
      })
    );
  }

  const updatedFields = {
    ...(clubName && { clubName }),
    ...(dateTime && { dateTime: new Date(dateTime) }),  // ✅ Now handles date-time updates correctly
    ...(venue && { venue }),
    ...(description && { description }),
    ...(guestSpeaker && { guestSpeaker }),
    images: updatedImages,
  };

  const updatedEvent = await Event.findByIdAndUpdate(eventId, updatedFields, {
    new: true,
    runValidators: true,
  });

  // ✅ Log update changes
  const changes = {};
  for (const key in updatedFields) {
    if (event[key] !== updatedFields[key]) {
      changes[key] = { before: event[key], after: updatedFields[key] };
    }
  }
  await logAudit(adminEmail, "UPDATE", eventId, changes);

  res.status(200).json({ updatedEvent, message: "Event updated successfully!" });
});

// ✅ Delete Event (with Audit Log)
export const deleteEvent = asyncHandler(async (req, res) => {
  const eventId = req.params.id;
  const adminEmail = req.admin.email;

  if (!eventId) return res.status(404).json({ message: "Event ID is required" });

  const event = await Event.findById(eventId);
  if (!event) return res.status(404).json({ message: "Event not found" });

  await Promise.all(
    event.images.map(async (imageUrl) => {
      const match = imageUrl.match(/\/upload\/(?:v\d+\/)?([^/.]+)(?:\.[a-zA-Z]+)?$/);
      const publicId = match ? match[1] : null;
      if (publicId) await cloudinary.uploader.destroy(publicId);
    })
  );

  await Event.findByIdAndDelete(eventId);

  // ✅ Log deletion
  await logAudit(adminEmail, "DELETE", eventId);

  res.status(200).json({ message: "Event deleted successfully!" });
});
