import express from "express";
import { authenticateToken } from "../middleware/auth.middleware.js";
import { getAllEvents,
    createEvent,
    updateEvent,
    deleteEvent,}
from '../controllers/eventspage.controller.js'
import { upload } from "../middleware/multer.middleware.js";

const router = express.Router();

router.get("/", getAllEvents);
// router.post("/", upload.array('images', 1), createEvent);
router.post("/",upload.array('images', 5), createEvent);
router.put("/:id", updateEvent); // not working
router.delete("/:id", deleteEvent);

export default router;
