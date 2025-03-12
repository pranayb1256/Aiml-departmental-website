import express from "express";
import {
    registerAdmin,
    loginAdmin,
    logoutAdmin,
    getAnnouncement,
    addAnnouncement,
    getNotice,
    addNotice
} from "../controllers/adminPanel.controller.js";
import { authenticateToken } from "../middleware/auth.middleware.js";
import { checkSpecialId } from "../middleware/verifyAdmin.middleware.js"

// Use { mergeParams: true } in express.Router() inside routes.js to inherit :id from app.js, ensuring req.params.id is accessible.
// const router = express.Router({ mergeParams: true }); // ✅ This will inherit :id from app.js

const router = express.Router();

//admin personals
router.post("/register", checkSpecialId, registerAdmin);
router.post("/login", checkSpecialId, loginAdmin);
router.post("/logout", authenticateToken, logoutAdmin);
// router.get("/:id/get-status", checkSpecialId, authenticateToken, getStatus); // discuss need of this

// Announcements routes (recheck this funcs in admin store)
router.get("/announcements", authenticateToken, getAnnouncement);
router.post("/announcements", authenticateToken, addAnnouncement);

// Notices routes
router.get("/notices", authenticateToken, getNotice);
router.post("/notices", authenticateToken, addNotice);


export default router;
