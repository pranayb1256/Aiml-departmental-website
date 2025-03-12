import multer from "multer";

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "./public/temp")  // Set the destination folder for uploaded files
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname) // Set the filename for the uploaded file
    }
})

export const upload = multer({ storage })