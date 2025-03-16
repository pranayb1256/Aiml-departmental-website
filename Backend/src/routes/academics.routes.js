import express from "express"
import { uploadFolder } from "../middleware/uploadFolder.middleware.js"
import { uploadTimetable, getTimetable, deleteTimetable, getAllTimetable } from "../controllers/timetable.controller.js"

const router = express.Router()

router.get('/', getAllTimetable);
router.get('/:year/:semester', getTimetable);
router.post('/:year/:semester', uploadFolder.single('tt-pdf'), uploadTimetable);
router.delete('/:year/:semester', deleteTimetable);

export default router;