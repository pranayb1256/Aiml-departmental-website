import { ApiError } from "../utils/ApiError.js";

const checkSpecialId = (req, res, next) => {
    try {
        const specialId = req.body.adminId;  
        const ADMIN_SECRET_ID = process.env.ADMIN_SECRET_ID;  
        const FACULTY_SECRET_ID = process.env.FACULTY_SECRET_ID || "FACULTY_KEY_123"; 

        if (!specialId) {
            return res.status(400).json({ success: false, message: "Access denied: Missing admin ID" });
        }

        if (specialId === ADMIN_SECRET_ID) {
            req.assignedRole = "superadmin";
        } else if (specialId === FACULTY_SECRET_ID) {
            req.assignedRole = "faculty";
        } else {
            return res.status(400).json({ success: false, message: "Access denied: Invalid admin ID" });
        }

        next(); 
    } catch (err) {
        console.log("Invalid SpecialId | error: ", err);
        return res.status(400).json({ success: false, message: "Invalid Special ID" });
    }
};
export { checkSpecialId };
