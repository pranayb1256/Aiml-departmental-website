import express from "express";
import { authenticateToken, requireSuperadmin } from "../middleware/auth.middleware.js";
import { checkSpecialId } from "../middleware/verifyAdmin.middleware.js"
import {
    registerAdmin,
    loginAdmin,
    logoutAdmin,
    getAllAnnouncements,
    addAnnouncement,
    getAllNotices,
    addNotice,
    deleteNotice,
    deleteAnnouncement,
    updateNotice,
    updateAnnouncement,
    //faculty
    // getAllFaculty,
    // createFaculty,
    // updateFaculty,
    // deleteFaculty,
} from "../controllers/adminPanel.controller.js";
import { getAnalytics } from "../controllers/analytics.controller.js";
import { getAuditLogs } from "../controllers/auditlog.controller.js";
// import {logAdminAction} from "../middleware/login.middleware.js";
// import authMiddleware from "../middlewares/authMiddleware.js"; 

import { upload } from "../middleware/multer.middleware.js";


const router = express.Router();

//admin personals
router.post("/register", checkSpecialId, registerAdmin);
router.post("/login", checkSpecialId, loginAdmin);
router.post("/logout", authenticateToken, logoutAdmin);

// Announcements routes 
router.get("/announcements", getAllAnnouncements);
router.post("/announcements", authenticateToken, addAnnouncement);
router.put("/announcements/:id", authenticateToken, requireSuperadmin, updateAnnouncement);
router.delete("/announcements/:id", authenticateToken, requireSuperadmin, deleteAnnouncement)

// Notices routes
router.get("/notices", getAllNotices);
router.post("/notices", authenticateToken, addNotice);
router.put("/notices/:id", authenticateToken, requireSuperadmin, updateNotice);
router.delete("/notices/:id", authenticateToken, requireSuperadmin, deleteNotice)


//faculty routes (on hold )
// router.get("/getAllFaculty", authenticateToken, getAllFaculty);
// router.post("/createFaculty", authenticateToken, upload.single("facultyPhoto"), createFaculty);
// router.put("/updateFaculty/:id", authenticateToken, updateFaculty);
// router.delete("/deleteFaculty/:id", authenticateToken, deleteFaculty);
//analytics and audit routes 
router.get("/analytics", authenticateToken, getAnalytics);

// Get audit logs (Superadmin only)
router.get("/audit-logs", authenticateToken, getAuditLogs);

export default router;
