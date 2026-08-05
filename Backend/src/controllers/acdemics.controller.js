// controllers/academicCalendarController.js
import AcademicCalendar from "../models/acedmic.model.js";
import Timetable from "../models/timetable.models.js";
import { uploadOnCloudinary } from "../utils/cloudniary.js";

export const uploadAcademicCalendar = async (req, res) => {
  try {
    const { yearLevel, title } = req.body;

    const newCalendar = new AcademicCalendar({
      yearLevel,
      title,
      pdfUrl: req.file.path, // Cloudinary URL
    });

    await newCalendar.save();
    res.status(201).json({ message: "Academic Calendar uploaded", calendar: newCalendar });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getAcademicCalendars = async (req, res) => {
  try {
    const calendars = await AcademicCalendar.find().sort({ uploadedAt: -1 });
    res.json(calendars);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const deleteAcademicCalendar = async (req, res) => {
  try {
    const { id } = req.params;
    await AcademicCalendar.findByIdAndDelete(id);
    res.json({ message: "Deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const uploadTimetable = async (req, res) => {
  try {
    const { year, semester } = req.body;

    if (!year || !semester) {
      return res.status(400).json({ message: "Year and semester are required" });
    }

    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ message: "No files uploaded" });
    }

    // Prevent duplicate timetable entries
    const existing = await Timetable.findOne({ year, semester });
    if (existing) {
      return res.status(409).json({ message: "Timetable for this semester already exists" });
    }

    const uploadedUrls = [];
    for (const file of req.files) {
      const response = await uploadOnCloudinary(file.path);
      if (!response || !response.url && !response.secure_url) {
        return res.status(500).json({ message: "Cloudinary upload failed", error: response?.error || "upload failed" });
      }
      uploadedUrls.push(response.secure_url || response.url);
    }

    const urlA = uploadedUrls[0] || "";
    const urlB = uploadedUrls[1] || "";

    const newTimetable = new Timetable({ year, semester, urlA, urlB });
    await newTimetable.save();

    res.status(201).json({ message: "Timetable uploaded successfully", timetable: newTimetable });
  } catch (err) {
    console.error("uploadTimetable error:", err);
    res.status(500).json({ error: err.message });
  }
};
