import AuditLog from "../models/audit.model.js";

export const getAuditLogs = async (req, res) => {
  try {
    const logs = await AuditLog.find()
      .sort({ timestamp: -1 })
      .limit(20)
      .populate("eventId", "clubName");

    res.json(logs);
  } catch (error) {
    console.error("Error fetching audit logs:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
