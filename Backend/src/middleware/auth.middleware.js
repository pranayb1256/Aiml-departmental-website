import jwt from "jsonwebtoken";
import Admin from "../models/admin.models.js";
import { ApiError } from "../utils/ApiError.js";

export const authenticateToken = async (req, res, next) => {
    try {
        const token = req.cookies?.JWT_TOKEN || req.headers.authorization?.split(" ")[1];

        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        const { email } = decodedToken; // extracting admin email from  token
        const admin = await Admin.findOne({ email }).select("-password -jwtToken");

        if (!admin) throw new ApiError(400, "User not found or invalid token")
        req.admin = admin;

        next();
    } catch (err) {
        console.log("Error in auth middleware | Invalid token | ERROR: ", err);
        throw new ApiError(400, "Invalid Token")
    }

}



