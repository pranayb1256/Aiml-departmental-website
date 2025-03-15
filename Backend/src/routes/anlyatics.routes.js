import express from "express";
import Event from "../models/events.models.js";
const router = express.Router();

// Get event analytics
router.get("/stats", async (req, res) => {
    try {
        const totalEvents = await Event.countDocuments();

        const clubWiseEvents = await Event.aggregate([
            { $group: { _id: "$clubName", count: { $sum: 1 } } },
            { $sort: { count: -1 } }
        ]);

        const monthlyEvents = await Event.aggregate([
            { $project: { month: { $substr: ["$date", 5, 2] } } },
            { $group: { _id: "$month", count: { $sum: 1 } } },
            { $sort: { _id: 1 } }
        ]);

        res.json({
            totalEvents,
            clubWiseEvents,
            monthlyEvents
        });
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch analytics" });
    }
});

export default router;
