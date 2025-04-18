// middleware/uploadPdf.js
import multer from "multer";
import path from "path";

// Local storage temporarily (files go to Cloudinary later)
const storage = multer.diskStorage({
  destination: "temp_uploads/",
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});

const fileFilter = (req, file, cb) => {
  const ext = path.extname(file.originalname);
  if (file.mimetype === "application/pdf" && ext === ".pdf") {
    cb(null, true);
  } else {
    cb(new Error("Only PDF files are allowed!"));
  }
};

export const upload = multer({ storage, fileFilter });
