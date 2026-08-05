import express from "express";
import Timetable from "../models/timetable.models.js";
import { uploadAcademicCalendar, getAcademicCalendars, deleteAcademicCalendar, uploadTimetable } from "../controllers/acdemics.controller.js"
import { upload as uploadPdf } from "../middleware/uploadFolder.middleware.js";
import { upload as uploadImage } from "../middleware/multer.middleware.js";
const router = express.Router();

router.get("/timetable", async (req, res) => {
    try {
        const timetables = await Timetable.find();
        res.json({ timetables });
    } catch (error) {
        res.status(500).json({ message: "Error fetching timetables" });
    }
});
router.post("/timetable", async (req, res) => {
    try {
        const { year, semester, urlA, urlB } = req.body;

        if (!year || !semester || !urlA || !urlB) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const existing = await Timetable.findOne({ year, semester });
        if (existing) {
            return res.status(409).json({ message: "Timetable for this semester already exists" });
        }

        const newTimetable = new Timetable({ year, semester, urlA, urlB });
        await newTimetable.save();

        res.status(201).json({ message: "Timetable created successfully", timetable: newTimetable });
    } catch (error) {
        res.status(500).json({ message: "Failed to create timetable", error });
    }
});
// academic calendar (PDF) upload
router.post("/calender", uploadPdf.single("calendar"), uploadAcademicCalendar);
router.get("/calender", getAcademicCalendars);
router.delete("/calender:id", deleteAcademicCalendar);

// timetable image upload: expects multipart form with field `timetableFiles` (max 2 files)
router.post("/timetable/upload", uploadImage.array("timetableFiles", 2), uploadTimetable);

export default router;