import express from "express";
import { 
    addResult, 
    getResults, 
    getTopper, 
    updateResult, 
    deleteResult 
} from "../controllers/result.controller.js";
import { upload } from "../middleware/multer.middleware.js";
const router = express.Router();

// Route to add a new result
router.post("/", upload.single("topperImage"), addResult);

// Route to get results by year and/or semester
router.get("/", getResults);

// Route to get the overall department topper
router.get("/topper", getTopper);

//Route to get the update department topper
router.put("/:id", upload.single("topperImage"), updateResult);

// Route to delete a result
router.delete("/:id", deleteResult);

export default router;
