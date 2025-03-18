import express from "express";
import Student from "../models/student.models.js";
import { upload } from "../middleware/multer.middleware.js";
import { uploadOnCloudinary } from "../utils/cloudniary.js";
import fs from "fs";

const router = express.Router();

// Get all placed students
router.get("/", async (req, res) => {
  try {
    const students = await Student.find();
    res.json(students);
  } catch (error) {
    res.status(500).json({ message: "Error fetching students" });
  }
});

// Add a new placed student with image upload
router.post("/", upload.single("image"), async (req, res) => {
  try {
    const { name, company } = req.body;
    const localFilePath = req.file?.path;

    if (!localFilePath) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    // Upload to Cloudinary
    const cloudinaryResponse = await uploadOnCloudinary(localFilePath);

    if (!cloudinaryResponse) {
      return res.status(500).json({ message: "Failed to upload image" });
    }

    // Save student with Cloudinary image URL
    const newStudent = new Student({
      name,
      company,
      image: cloudinaryResponse.secure_url,
    });

    await newStudent.save();
    res.status(201).json(newStudent);
  } catch (error) {
    res.status(500).json({ message: "Error adding student" });
  }
});

// Update student details (with optional image upload)
router.put("/:id", upload.single("image"), async (req, res) => {
  try {
    const { name, company } = req.body;
    let imageUrl = req.body.image; // Default to existing image

    if (req.file) {
      const cloudinaryResponse = await uploadOnCloudinary(req.file.path);
      if (cloudinaryResponse) {
        imageUrl = cloudinaryResponse.secure_url;
      }
    }

    const updatedStudent = await Student.findByIdAndUpdate(
      req.params.id,
      { name, company, image: imageUrl },
      { new: true }
    );

    res.json(updatedStudent);
  } catch (error) {
    res.status(500).json({ message: "Error updating student" });
  }
});

// Delete a student
router.delete("/:id", async (req, res) => {
  try {
    await Student.findByIdAndDelete(req.params.id);
    res.json({ message: "Student deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting student" });
  }
});

export default router;
