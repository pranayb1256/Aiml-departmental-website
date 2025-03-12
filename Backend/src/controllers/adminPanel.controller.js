import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { asyncHandler } from "../utils/asyncHandler.js"
import { ApiError } from "../utils/ApiError.js"
import { ApiResponse } from "../utils/Apiresponse.js"
import { generateToken } from "../utils/tokens.js";
import Admin from "../models/admin.models.js"
import Announcement from '../models/announcement.models.js'
import Notice from '../models/notice.models.js'



//admin personals
export const registerAdmin = asyncHandler(async (req, res) => {
    try {
        const { fullname, email, password,adminid } = req.body
        if (
            [fullname, email, password,adminid].some(field => field?.trim() === "")
        ) {
            throw new ApiError(400, "All fields are required");
        }

        const newAdmin = new Admin({
            fullname,
            email,
            password,
            adminid,
        });

        await newAdmin.save();
        const createdAdmin = await Admin.findOne({ email }).select("-password -jwtToken");
        console.log("regAdmin: ", createdAdmin)

        return res
            .status(201)
            .json(new ApiResponse(200, createdAdmin, "Admin registered successfully!"));

    } catch (err) {
        console.log("Error regAdmin Controller, ERR: ", err);
        throw new ApiError(400, "Something went wrong while registering admin");
    }
})

export const loginAdmin = asyncHandler(async (req, res) => {


    const { email, password } = req.body;
    if (!email && !password) {
        throw new ApiError(400, "Invalid Credentials")
    }

    const admin = await Admin.findOne({ email });
    if (!admin) {
        throw new ApiError(400, "Admin Not Found");
    }

    const isPasswordValid = await admin.isPasswordCorrect(password);
    if (!isPasswordValid) {
        console.log("Error in admin controller")
        throw new ApiError(400, "Invalid Credentials")
    }

    const jwtToken = generateToken(email, password, res);
    const adminId = admin._id;


    const loggedInAdmin = await Admin.findByIdAndUpdate(
        adminId,
        { jwtToken },
        { new: true }
    ).select("-password");

    const options = {
        httpOnly: true,
        secure: process.env.NODE_ENV !== "development"
    }

    return res
        .status(201)
        .cookie("JWT_TOKEN", jwtToken, options)
        .json(new ApiResponse(200, loggedInAdmin, "Admin loggedIn successfully!"));


});

export const logoutAdmin = async (req, res) => {
    try {
        const token = req.cookies?.JWT_TOKEN || req.headers.authorization?.split(" ")[1];
        if (!token) {
            throw new ApiError(400, "token undefined or invalid")
        }

        await Admin.findByIdAndUpdate(
            req.admin._id,
            {
                $unset: {
                    jwtToken: 1, // this removes the field from the document
                },
            },
            {
                new: true,
            }
        );

        const options = {
            httpOnly: true,
            secure: process.env.NODE_ENV !== "development"
        }
        console.log("logout : ", token);

        return res
            .status(200)
            .clearCookie("JWT_TOKEN", options)
            .json(new ApiResponse(200, {}, "Admin Logged Out"));
    } catch (err) {
        throw new ApiError(400, "error in logout controller")
    }
};

// export const getStatus = (req, res) => {
//     const token = req.cookies?.JWT_TOKEN || req.headers.authorization?.split(" ")[1];
//     if (!token) {
//         throw new ApiError(400, "token undefined or invalid")
//     }

//     return res
//         .status(200)
//         .json(
//             new ApiResponse(200, req.admin, "Fetched current admin successfully!")
//         );
// };


//---------------------------------------=------=------=------=-----------------------------------------//

//Announcements 
export const getAnnouncement = asyncHandler(async (req, res) => {
    if (!req.admin) {
        throw new ApiError(403, "Unauthorized access")
    }

    const announcements = await Announcement.find().sort({ createdAt: -1 });

    res.status(200).json(new ApiResponse(200, announcements, "Fetched notices successfully!"));
})

export const addAnnouncement = asyncHandler(async (req, res) => {
})

//Notices
export const getNotice = asyncHandler(async (req, res) => {
    if (!req.admin) {
        throw new ApiError(403, "Unauthorized access");
    }

    const notices = await Notice.find().sort({ createdAt: -1 });

    res.status(200).json(new ApiResponse(200, notices, "Fetched notices successfully!"));
})
export const addNotice = asyncHandler(async (req, res) => {
})



