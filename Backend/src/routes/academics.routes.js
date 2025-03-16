import express from "express"
import { uploadFolder } from "../middleware/uploadFolder.middleware.js"
import { uploadTimetable, getTimetable, deleteTimetable, getAllTimetable } from "../controllers/timetable.controller.js"

const router = express.Router()

router.get('/getAll-tt', getAllTimetable);
router.get('/get-tt/:year/:semester', getTimetable);
router.post('/upload/:year/:semester', uploadFolder.single('tt-pdf'), uploadTimetable);
router.delete('/delete-tt/:year/:semester', deleteTimetable);

export default router;