import { asyncHandler } from "../utils/asyncHandler.js"
import { ApiError } from "../utils/ApiError.js"
import { ApiResponse } from "../utils/Apiresponse.js"
import { v2 as cloudinary } from "cloudinary"
import Event from '../models/events.models.js'
import { uploadOnCloudinary } from "../utils/cloudniary.js"
export const getAllEvents = asyncHandler(async (req, res) => {
  const events = await Event.find().sort({ createdAt: -1 });

  if (!events || events.length === 0) {
      return res.status(400).json({ message: "Zero events found | use add club events button to add new events" });
  }

  res.status(200).json({ events, message: "Fetched all clubs successfully!" });
});

export const createEvent = asyncHandler(async (req, res) => {
  const { clubName, date, venue, description, guestSpeaker } = req.body;
  const imageFiles = req.files;

  if (!imageFiles || imageFiles.length === 0) {
      return res.status(400).json({ message: "Club images are required" });
  }

  if ([clubName, date, venue, description, guestSpeaker].some(field => !field || field.trim() === "")) {
      return res.status(400).json({ message: "All fields are required" });
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
      date,
      venue,
      description,
      guestSpeaker
  });

  await newEvent.save();

  res.status(201).json({ newEvent, message: "New club created successfully!" });
});

export const updateEvent = asyncHandler(async (req, res) => {
  const { clubName, date, venue, description, guestSpeaker } = req.body;
  const eventId = req.params.id;

  if (!eventId) {
      return res.status(404).json({ message: "Event ID is required" });
  }

  const event = await Event.findById(eventId);

  if (!event) {
      return res.status(404).json({ message: "Event not found" });
  }

  const updatedFields = {
      ...(clubName && { clubName }),
      ...(date && { date }),
      ...(venue && { venue }),
      ...(description && { description }),
      ...(guestSpeaker && { guestSpeaker }),
  };

  const updatedEvent = await Event.findByIdAndUpdate(eventId, updatedFields, {
      new: true,
      runValidators: true,
  });

  res.status(200).json({ updatedEvent, message: "Updated club successfully!" });
});

export const deleteEvent = asyncHandler(async (req, res) => {
  const eventId = req.params.id;

  if (!eventId) {
      return res.status(404).json({ message: "Event ID is required" });
  }

  const event = await Event.findById(eventId);

  if (!event) {
      return res.status(404).json({ message: "Event not found" });
  }

  await Promise.all(
      event.images.map(async (imageUrl) => {
          const match = imageUrl.match(/\/upload\/(?:v\d+\/)?([^/.]+)(?:\.[a-zA-Z]+)?$/);
          const publicId = match ? match[1] : null;
          if (publicId) {
              await cloudinary.uploader.destroy(publicId);
          }
      })
  );

  await Event.findByIdAndDelete(eventId);

  res.status(200).json({ message: "Event deleted successfully!" });
});
