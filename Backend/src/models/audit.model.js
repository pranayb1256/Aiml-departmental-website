import mongoose, { Schema } from "mongoose";

const auditLogSchema = new Schema({
    adminEmail: {
        type: String,
        required: true
    },
    action: {
        type: String,
        required: true,
        enum: ["CREATE", "UPDATE", "DELETE"]
    },
    eventId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Event",
        require: true
    },
    timestamp: {
        type: Date,
        default: Date.now
    },
    changes: {
        type: Object, // Store updated fields (before & after)
        default: {}
    }
});

const AuditLog = mongoose.model("AuditLog", auditLogSchema);
export default AuditLog;
