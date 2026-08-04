import multer from "multer";
import fs from "fs";

// Ensure the temp directory exists (useful for deployment environments like Render)
const tempDir = "./public/temp";
if (!fs.existsSync(tempDir)) {
    fs.mkdirSync(tempDir, { recursive: true });
}

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, tempDir)  // Set the destination folder for uploaded files
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname) // Set the filename for the uploaded file
    }
})

// Limit file size to 5MB to prevent abuse in production
export const upload = multer({ 
    storage,
    limits: { fileSize: 5 * 1024 * 1024 }
});