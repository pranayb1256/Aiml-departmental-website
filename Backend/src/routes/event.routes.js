import express from "express";
import { authenticateToken } from "../middleware/auth.middleware.js";
import { getAllEvents, createEvent, updateEvent, deleteEvent } from "../controllers/eventspage.controller.js";
import { upload } from "../middleware/multer.middleware.js";

const router = express.Router();

router.get("/", getAllEvents);
router.post("/",authenticateToken,upload.array("images", 5), createEvent);
router.put("/:id",authenticateToken,upload.array("images", 5), updateEvent);
router.delete("/:id",authenticateToken,deleteEvent);

export default router;
