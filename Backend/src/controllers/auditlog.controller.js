import AdminAction from "../models/admin.models.js";

export const getAuditLogs = async (req, res) => {
  try {
    const logs = await AdminAction.find()
      .sort({ timestamp: -1 })
      .limit(20)
      .populate("admin", "name email"); // Populate admin details

    res.json({ logs });
  } catch (error) {
    console.error("Error fetching audit logs:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
