import jwt from "jsonwebtoken";
import Admin from "../models/admin.models.js";

export const authenticateToken = async (req, res, next) => {
    try {
        const headerAuth = req.headers.authorization;
        const cookieAuth = req.cookies?.JWT_TOKEN;
        
        // Prioritize explicit Bearer token from frontend over potentially stale cookies
        const token = (headerAuth && headerAuth.startsWith("Bearer ")) 
            ? headerAuth.split(" ")[1] 
            : cookieAuth;
        
        console.log("Auth Debug - Header:", headerAuth ? "Present" : "Missing");
        console.log("Auth Debug - Cookie:", cookieAuth ? "Present" : "Missing");
        console.log("Auth Debug - Token:", token ? token.substring(0, 15) + "..." : "Missing");

        if (!token) {
            console.log("Auth Debug - No token provided");
            return res.status(401).json({ success: false, message: "Unauthorized: No token provided" });
        }

        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        const { email } = decodedToken;
        
        console.log("Auth Debug - Decoded Email:", email);

        const admin = await Admin.findOne({ email }).select("-password -jwtToken");

        if (!admin) {
            console.log("Auth Debug - Admin not found for email:", email);
            return res.status(401).json({ success: false, message: "Unauthorized: User not found or invalid token" });
        }
        
        req.admin = admin;
        next();
    } catch (err) {
        console.log("Error in auth middleware | Invalid token | ERROR: ", err.name, err.message);
        return res.status(401).json({ success: false, message: "Unauthorized: Invalid Token" });
    }
};

export const requireSuperadmin = async (req, res, next) => {
    try {
        if (!req.admin) {
            return res.status(401).json({ success: false, message: "Unauthorized: No user found" });
        }
        
        if (req.admin.role !== "superadmin") {
            return res.status(403).json({ success: false, message: "Forbidden: Superadmin access required" });
        }

        next();
    } catch (err) {
        console.log("Error in requireSuperadmin middleware | ERROR: ", err.message);
        return res.status(500).json({ success: false, message: "Server Error" });
    }
};
