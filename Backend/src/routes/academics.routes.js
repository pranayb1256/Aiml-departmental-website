import express from "express"
import { uploadFolder } from "../middleware/uploadFolder.middleware.js"
import { uploadTimetable, getTimetable, deleteTimetable} from "../controllers/timetable.controller.js"

const router = express.Router()

router.post('/upload', uploadFolder.single('pdf'), uploadTimetable);
router.get('/get-tt/:year/:semester', getTimetable);
router.delete('/delete-tt/:year/:semester', deleteTimetable);

export  default router;