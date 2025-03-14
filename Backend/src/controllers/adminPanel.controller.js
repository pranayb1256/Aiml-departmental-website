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
        const { fullname, email, password } = req.body
        if (
            [fullname, email, password].some(field => field?.trim() === "")
        ) {
            throw new ApiError(400, "All fields are required");
        }

        const newAdmin = new Admin({
            fullname,
            email,
            password
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


//---------------------------------------=------=------=------=-----------------------------------------//

//Announcements 
export const getAllAnnouncements = asyncHandler(async (req, res) => {

    const announcements = await Announcement.find().sort({ createdAt: -1 });

    res.status(201).json({ announcements });
    // res.status(200).json(new ApiResponse(200, announcements, "Fetched notices successfully!"));
})

export const addAnnouncement = asyncHandler(async (req, res) => {

    const { text } = req.body;

    if (!text) {
        throw new ApiError(400, "Announcement text is required");
    }

    const announcement = new Announcement({ text });

    await announcement.save();

    res.status(201).json({ announcement });
    // res.status(201).json(new ApiResponse(201, announcement, "Announcement added successfully!"));
})

export const deleteAnnouncement = asyncHandler(async (req, res) => {
    const { id } = req.params;
    // Validate MongoDB ObjectId before querying
    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
        throw new ApiError(400, "Invalid notice ID format");
    }

    const announcement = await Announcement.findByIdAndDelete(id);
    if (!announcement) {
        throw new ApiError(404, "announcement not found");
    }

    res.status(200).json({ success: true, message: "announcement deleted successfully" });
});



//Notices
export const getAllNotices = asyncHandler(async (req, res) => {

    const notices = await Notice.find().sort({ createdAt: -1 });

    res.status(201).json({ notices });
    // res.status(200).json(new ApiResponse(200, notices, "Fetched notices successfully!"));
})

// Add a new notice
export const addNotice = asyncHandler(async (req, res) => {
    const { text } = req.body;

    if (!text || typeof text !== "string" || !text.trim()) {
        throw new ApiError(400, "Notice text is required and must be a non-empty string");
    }

    const notice = new Notice({ text });
    await notice.save();

    res.status(201).json({ success: true, notice });
});

// Delete a notice
export const deleteNotice = asyncHandler(async (req, res) => {
    const { id } = req.params;

    // Validate MongoDB ObjectId before querying
    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
        throw new ApiError(400, "Invalid notice ID format");
    }

    const notice = await Notice.findByIdAndDelete(id);
    if (!notice) {
        throw new ApiError(404, "Notice not found");
    }

    res.status(200).json({ success: true, message: "Notice deleted successfully" });
});

//---------------------------------------=------=------=------=-----------------------------------------//

//---------------------------------------=------=------=------=-----------------------------------------//

//faculty controllers
export const getAllFaculty = asyncHandler(async () => {

});
export const createFaculty = asyncHandler(async () => {

});
export const updateFaculty = asyncHandler(async () => {

});
export const deleteFaculty = asyncHandler(async () => {

});




