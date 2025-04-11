// controllers/academicCalendarController.js
import AcademicCalendar from "../models/acedmic.model.js";

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
