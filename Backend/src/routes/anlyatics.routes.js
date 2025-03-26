import express from "express";
import Event from "../models/events.models.js";

const router = express.Router();

// Get event analytics
router.get("/stats", async (req, res) => {
    try {
        const totalEvents = await Event.countDocuments();

        // Club-wise event distribution
        const clubWiseEvents = await Event.aggregate([
            { $group: { _id: "$clubName", count: { $sum: 1 } } },
            { $sort: { count: -1 } }
        ]);

        // Monthly event distribution
        const monthlyEvents = await Event.aggregate([
            { $project: { month: { $month: "$dateTime" } } },
            { $group: { _id: "$month", count: { $sum: 1 } } },
            { $sort: { _id: 1 } }
        ]);

        // Event type distribution
        const eventTypeDistribution = await Event.aggregate([
            { $group: { _id: "$eventType", count: { $sum: 1 } } },
            { $sort: { count: -1 } }
        ]);

        // Most popular club
        const mostPopularClub = clubWiseEvents.length > 0 ? clubWiseEvents[0] : null;

        res.json({
            totalEvents,
            clubWiseEvents,
            monthlyEvents,
            eventTypeDistribution,
            mostPopularClub
        });
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch analytics" });
    }
});

export default router;
