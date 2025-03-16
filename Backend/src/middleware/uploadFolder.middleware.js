import { v2 as cloudinary } from "cloudinary"
import { CloudinaryStorage } from "multer-storage-cloudinary"
import multer from "multer"


//CLOUDINARY CONFIG
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

// Configure Cloudinary Storage for PDFs
const storage = new CloudinaryStorage({
    cloudinary,
    params: {
        folder: 'timetables',  // Folder name in Cloudinary
        resource_type: 'raw',  // Ensures PDF files are uploaded correctly
        format: async () => "pdf",  // Force file format to PDF
    },
});

// File filter to accept only PDFs
const fileFilter = (req, file, cb) => {
    if (file.mimetype === "application/pdf") {
        cb(null, true);
    } else {
        cb(new Error("Only PDF files are allowed!"), false);
    }
};

export const uploadFolder = multer({ storage });