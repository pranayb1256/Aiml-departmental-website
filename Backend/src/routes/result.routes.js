import express from "express";
import { 
    addResult, 
    getResults, 
    getTopper, 
    updateResult, 
    deleteResult ,
    getClearedBacklogs
} from "../controllers/result.controller.js";
import { upload } from "../middleware/multer.middleware.js";
const router = express.Router();

// Route to add a new result
router.post("/", addResult);

// Route to get results by year and/or semester
router.get("/", getResults);

// Route to get the overall department topper
router.get("/topper", getTopper);

//Route to get the update department topper
router.put("/:id", updateResult);

// Route to delete a result
router.delete("/:id", deleteResult);

router.get("/cleared-backlogs", getClearedBacklogs);

export default router;
