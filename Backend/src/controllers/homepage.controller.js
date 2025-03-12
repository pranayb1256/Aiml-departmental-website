import { asyncHandler } from '../utils/asyncHandler.js';
import { ApiError } from '../utils/ApiError.js';
import { ApiResponse } from '../utils/Apiresponse.js';
import { uploadOnCloudinary } from "../utils/cloudniary.js";
import Image from '../models/image.models.js';
import Alumni from '../models/alumni.models.js';
import Announcement from '../models/announcement.models.js';
import Notice from '../models/notice.models.js';

//recruitors,studGallery&homepgEvent
export const handleImage = asyncHandler(async (req, res) => {

    const recruitersLocalPathArr = req.files?.recruiters?.map(file => file.path)
    const studGalleryLocalPathArr = req.files?.studentGallery?.map(file => file.path)
    const homepageEventLocalPathArr = req.files?.homepageEvent?.map(file => file.path)



    // const obj = req.files;
    // // Validate the number of images 
    // if (obj.recruiters.length !== 11 || obj.studentGallery.length !== 11 || obj.homepageEvent.length !== 11) {
    //     throw new ApiError(400, "Each field must have exactly 11 images.")
    // }


    //Uploading arr of file string paths on cloudinary 
    const recruiters = [];
    const studentGallery = [];
    const homepageEvent = [];
    for (const eachFilePath of recruitersLocalPathArr) {
        const path = await uploadOnCloudinary(eachFilePath);
        recruiters.push(path.secure_url); // Push URL after each upload completes
    }
    for (const eachFilePath of studGalleryLocalPathArr) {
        const path = await uploadOnCloudinary(eachFilePath);
        studentGallery.push(path.secure_url); // Push URL after each upload completes
    }
    for (const eachFilePath of homepageEventLocalPathArr) {
        const path = await uploadOnCloudinary(eachFilePath);
        homepageEvent.push(path.secure_url); // Push URL after each upload completes
    }

    const img = await Image.create({
        recruiters,
        studentGallery,
        homepageEvent,
    });

    console.log(img);
    res.status(200).json(new ApiResponse(200, img, "Successfully stored array of urls in DB!"));
});

//add thiss controller in frontend store to access data on frontend
export const getImages = asyncHandler(async (req, res) => {
    // Fetch all image documents from the database
    const images = await Image.find();
    console.log(images)

    if (!images || images.length === 0) {
        throw new ApiError(400, "Imgs not found")
    }

    res.status(200).json(new ApiResponse(200, images, "Images retrieved successfully"));
});

//Alumni Corner
export const createAlumni = asyncHandler(async (req, res) => {
    const { name, jobTitle, linkedIn, github } = req.body;
    console.log(req.file);

    const photoLocalPath = req.file.path;
    if (!photoLocalPath) {
        throw new ApiError(400, "Alumni image not provided");
    }
    if (
        [name, jobTitle, linkedIn, github].some(x => x?.trim() === "")
    ) {
        throw new ApiError(400, "All fields are required");
    }


    //upload photo on cloudinary
    const uploadResponse = await uploadOnCloudinary(photoLocalPath);
    if (!uploadResponse) {
        throw new ApiError(400, "Error while uploading alumni photo on cloudinary")
    }

    const newAlumni = await Alumni.create({
        name,
        jobTitle,
        linkedIn,
        github,
        photo: uploadResponse.secure_url
    });

    return res.status(201).json(new ApiResponse(201, newAlumni, "Successfully Added new Alumni"))
})
export const deleteAlumni = asyncHandler(async (req, res) => {
    //NOTE FOR frontend guy: Plz provide userId in params of the user to be deleted
    const { id } = req.params;
    if (!id) {
        throw new ApiError(400, "Alumni _id not provided")
    }

    await Alumni.findByIdAndDelete(id);

    return res.status(200).json(new ApiResponse(200, null, "Alumni deleted successfully"))
})



