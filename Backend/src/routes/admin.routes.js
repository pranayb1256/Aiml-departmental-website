import express from "express";
import { authenticateToken } from "../middleware/auth.middleware.js";
import { checkSpecialId } from "../middleware/verifyAdmin.middleware.js"
import {
    registerAdmin,
    loginAdmin,
    logoutAdmin,
    getAllAnnouncements,
    addAnnouncement,
    getAllNotices,
    addNotice,
    //Events
    getAllEvents,
    createEvent,
    updateEvent,
    deleteEvent,
    deleteNotice,
    deleteAnnouncement,
    //faculty
    // getAllFaculty,
    // createFaculty,
    // updateFaculty,
    // deleteFaculty,
} from "../controllers/adminPanel.controller.js";
import { upload } from "../middleware/multer.middleware.js";


const router = express.Router();

//admin personals
router.post("/register", checkSpecialId, registerAdmin);
router.post("/login", checkSpecialId, loginAdmin);
router.post("/logout", authenticateToken, logoutAdmin);

// Announcements routes (recheck this funcs in admin store)
router.get("/announcements", getAllAnnouncements);
router.post("/announcements", authenticateToken, addAnnouncement);
router.delete("/announcements/:id", authenticateToken,deleteAnnouncement)

// Notices routes
router.get("/notices", getAllNotices);
router.post("/notices", authenticateToken, addNotice);
router.delete("/notices/:id", authenticateToken,deleteNotice)

//club events routes
router.get("/getAllEvents", getAllEvents);
router.post("/createEvent", authenticateToken, upload.array('images', 4), createEvent);
router.put("/updateEvent/:id", updateEvent); // not working
router.delete("/deleteEvent/:id", deleteEvent);

//faculty routes (on hold )
// router.get("/getAllFaculty", authenticateToken, getAllFaculty);
// router.post("/createFaculty", authenticateToken, upload.single("facultyPhoto"), createFaculty);
// router.put("/updateFaculty/:id", authenticateToken, updateFaculty);
// router.delete("/deleteFaculty/:id", authenticateToken, deleteFaculty);


export default router;
