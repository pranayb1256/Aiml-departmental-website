import express from "express";
import Timetable from "../models/timetable.models.js";
import { uploadAcademicCalendar, getAcademicCalendars, deleteAcademicCalendar } from "../controllers/acdemics.controller.js"
import { upload } from "../middleware/uploadFolder.middleware.js";
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
router.post("/calender", upload.single("calendar"), uploadAcademicCalendar);
router.get("/calender", getAcademicCalendars);
router.delete("/calender:id", deleteAcademicCalendar);

export default router;