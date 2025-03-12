import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { asyncHandler } from "../utils/asyncHandler.js"
import { ApiError } from "../utils/ApiError.js"
import { ApiResponse } from "../utils/Apiresponse.js"
import { generateToken } from "../utils/tokens.js";
import { uploadOnCloudinary } from "../utils/cloudniary.js"
import Admin from "../models/admin.models.js"
import Announcement from '../models/announcement.models.js'
import Notice from '../models/notice.models.js'
import Event from '../models/events.models.js'
import Faculty from "../models/faculty.models.js";
import { v2 as cloudinary } from "cloudinary"



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

    res.status(201).json({announcements});
    // res.status(200).json(new ApiResponse(200, announcements, "Fetched notices successfully!"));
})

export const addAnnouncement = asyncHandler(async (req, res) => {


    const { text } = req.body;

    if (!text) {
        throw new ApiError(400, "Announcement text is required");
    }

    const announcement = new Announcement({ text });

    await announcement.save();

    res.status(201).json({announcement});
    // res.status(201).json(new ApiResponse(201, announcement, "Announcement added successfully!"));
})

//Notices
export const getAllNotices = asyncHandler(async (req, res) => {

    const notices = await Notice.find().sort({ createdAt: -1 });

    res.status(201).json({notices});
    // res.status(200).json(new ApiResponse(200, notices, "Fetched notices successfully!"));
})

export const addNotice = asyncHandler(async (req, res) => {

    const { text } = req.body;

    if (!text) {
        throw new ApiError(400, "Notice text is required");
    }

    const notice = new Notice({ text });

    await notice.save();

    res.status(201).json({notice});
    // res.status(201).json(new ApiResponse(201, notice, "Notice added successfully!"));
})

//---------------------------------------=------=------=------=-----------------------------------------//

//clubsevents 
export const getAllEvents = asyncHandler(async (req, res) => {
    const events = await Event.find().sort({ createdAt: -1 });

    if (!events) {
        throw new ApiError(400, "Zero events found | use add clubevents btn to add new events");
    }

    res.status(200).json(new ApiResponse(200, events, "Fetched all clubs successfully!"));
})

export const createEvent = asyncHandler(async (req, res) => {
    const { clubName, date, venue, description, guestSpeaker } = req.body;
    const imageFiles = req.files;

    if (imageFiles.length === 0) throw new ApiError(400, "clubs Images is required")
    if (
        [clubName, date, venue, description, guestSpeaker].some(x => x.trim() === "")
    ) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    // Upload images to Cloudinary
    const uploadedImages = await Promise.all(
        imageFiles?.map(async (file) => {
            const response = await uploadOnCloudinary(file.path);
            return response.url;
        })
    );


    // Create new club entry
    const newEvent = new Event({
        images: uploadedImages, // Store Cloudinary URLs
        clubName,
        date,
        venue,
        description,
        guestSpeaker
    });

    await newEvent.save();
    res.status(201).json(new ApiResponse(200, newEvent, "New Club created successfully!"));
})

//update event not working
export const updateEvent = asyncHandler(async (req, res) => {
    //while updating clubs wont let admin to change club images
    const { clubName, date, venue, description, guestSpeaker } = req.body;
    const eventId = req.params.id;
    console.log(req.body);


    if (!eventId) throw new ApiError(404, "Event ID is required")

    const event = await Event.findById(eventId);

    if (!event) {
        return res.status(404).json({ message: 'Event not found' });
    }

    // Only update fields if provided (avoids overwriting with undefined)
    event.clubName = clubName ?? event.clubName;
    event.date = date ?? event.date;
    event.venue = venue ?? event.venue;
    event.description = description ?? event.description;
    event.guestSpeaker = guestSpeaker ?? event.guestSpeaker;

    const updatedEvent = await event.save();

    res.status(200).json(new ApiResponse(200, updatedEvent, "Updated club successfully"));
})

export const deleteEvent = asyncHandler(async (req, res) => {

    const eventId = req.params.id; // passed in params from frontend

    if (!eventId) throw new ApiError(404, "Event ID is required")
    console.log(eventId)

    let event = await Event.findById(eventId);
    console.log(event)
    // Delete images from Cloudinary
    await Promise.all(
        event.images.map(async (imageUrl) => {
            const match = imageUrl.match(/\/upload\/(?:v\d+\/)?([^/.]+)(?:\.[a-zA-Z]+)?$/);
            const publicId = match ? match[1] : null;
            await cloudinary.uploader.destroy(publicId);
        })
    );
    //delete club with given id
    await Event.findByIdAndDelete(eventId);

    res.status(200).json(new ApiResponse(200, null, "event deleted successfully"));
})

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




