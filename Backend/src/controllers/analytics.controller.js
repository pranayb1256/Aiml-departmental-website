import Event from "../models/events.models.js";

export const getAnalytics = async (req, res) => {
  try {
    const analytics = await Event.aggregate([
      {
        $group: {
          _id: "$type",
          count: { $sum: 1 },
        },
      },
    ]);

    res.json({ analytics });
  } catch (error) {
    console.error("Error fetching analytics:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
