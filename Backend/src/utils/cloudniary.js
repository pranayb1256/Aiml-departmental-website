import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import dotenv from "dotenv";

// Load environment variables from .env file
dotenv.config();

// Configuration - Securely read credentials from .env
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadOnCloudinary = async (localFilePath) => {
  try {
    if (!localFilePath) return null;

    // Upload the file to Cloudinary
    const response = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto", // auto detects file type (image, video, pdf, etc.)
    });

    // Delete the file only if upload is successful
    if (fs.existsSync(localFilePath)) {
      fs.unlinkSync(localFilePath);
    }

    // Return structured response
    return {
      success: true,
      url: response.secure_url, // Cloudinary URL for the uploaded file
      public_id: response.public_id, // Cloudinary public ID
      resource_type: response.resource_type, // The type (e.g., image, video, pdf)
    };
  } catch (error) {
    console.error("Cloudinary upload failed:", error);

    // Delete the temporary file to avoid clutter
    if (fs.existsSync(localFilePath)) {
      fs.unlinkSync(localFilePath);
    }

    return {
      success: false,
      error: error.message,
    };
  }
};

export { uploadOnCloudinary };
