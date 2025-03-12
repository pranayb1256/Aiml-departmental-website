import express from "express"
import { handleImage, getImages, createAlumni, deleteAlumni } from '../controllers/homepage.controller.js'
import { upload } from "../middleware/multer.middleware.js"

const router = express.Router();

//Images Routes
router.post('/images', upload.fields([
    { name: 'recruiters', maxCount: 12 },
    { name: 'studentGallery', maxCount: 7 },
    { name: 'homepageEvent', maxCount: 10 }
]), handleImage);
router.get('/get-images', getImages);

//Alumni routes
router.post('/alumni/create', upload.single("photoLocalPath"), createAlumni);
router.delete('/alumni/delete/:id', deleteAlumni);


export default router