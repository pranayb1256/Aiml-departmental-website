import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

// Configuration- This config gives permissions to upload files on cloudinary
cloudinary.config({
  cloud_name: "dzydycrjo",
  api_key: "217943167443461",
  api_secret: "cDfYyRa5TTckPI9OIMiLroPWNyA",
});

const uploadOnCloudinary = async (localFilePath) => {
  try {
    if (!localFilePath) return null;
    // upload the file on cloudinary
    
    const response = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto",
    });

    // file has been uploaded successfully
    fs.unlinkSync(localFilePath);
    
    return response;
  } catch (error) {
    fs.unlinkSync(localFilePath); // remove the locally saved temporary file as the upload operation got failed
    return null;
  }
};

export { uploadOnCloudinary };

