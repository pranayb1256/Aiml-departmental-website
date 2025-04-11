// middleware/uploadPdf.js
import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import multer from "multer";

// Cloudinary config (already setup)
const storage = new CloudinaryStorage({
  cloudinary,
  params: (req, file) => {
    return {
      folder: "academic_calendars",
      resource_type: "raw", // important for non-images
      public_id: `${req.body.yearLevel}_${Date.now()}`,
      format: "pdf",
    };
  },
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype === "application/pdf") {
    cb(null, true);
  } else {
    cb(new Error("Only PDF files allowed!"), false);
  }
};

export const uploadCalendar = multer({ storage, fileFilter });
