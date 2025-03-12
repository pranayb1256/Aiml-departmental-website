import { ApiError } from "../utils/ApiError.js";

const checkSpecialId = (req, res, next) => {
    try {
        const  specialId  = req.body.adminid;  // Extract specialId from req.body
        const ADMIN_SECRET_ID = process.env.ADMIN_SECRET_ID;  // Load from .env    
        console.log(specialId) 
        console.log(ADMIN_SECRET_ID) 

        if (!specialId || specialId !== ADMIN_SECRET_ID) {
            throw new ApiError(400, "Access denied: Invalid admin ID")
        }

        next(); // Allow access if ID matches
    } catch (err) {
        console.log("Invalid SpecialId | error: ", err)
        throw new ApiError(400, "Invalid Special ID")
    }
};
export { checkSpecialId }
