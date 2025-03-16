
import AuditLog from "../models/audit.models.js";

export const logAudit = async (adminEmail, action, eventId) => {
    try {
        await AuditLog.create({ adminEmail, action, eventId }); // ✅ Only storing eventId
        console.log("✅ Audit log saved successfully");
    } catch (error) {
        console.error("❌ Error saving audit log:", error);
    }
};
