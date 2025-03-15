import express from "express";
import AuditLog from "../models/audit.model.js";
import Event from "../models/events.models.js";

const router = express.Router();

// Get all audit logs (optional filtering by clubName)
router.get("/", async (req, res) => {
    try {
        const { clubName } = req.query;
        let query = {};

        if (clubName) {
            query["eventId.clubName"] = clubName; // 🔥 Filter by club name
        }

        const logs = await AuditLog.find(query).populate("eventId", "clubName");

        res.json(logs);
    } catch (error) {
        console.error("Error fetching audit logs:", error);
        res.status(500).json({ message: "Internal server error." });
    }
});


export default router;
