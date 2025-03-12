import express from "express";
import Faculty from "../models/faculty.models.js"; // Ensure file extension is added

const router = express.Router();

// Get all faculty members
router.get("/", async (req, res) => {
  try {
    const faculty = await Faculty.find();
    res.json(faculty);
  } catch (error) {
    res.status(500).json({ error: "Error fetching faculty data" });
  }
});

// Get a single faculty member by ID
router.get("/:id", async (req, res) => {
  try {
    const faculty = await Faculty.findById(req.params.id);
    if (!faculty) {
      return res.status(404).json({ error: "Faculty not found" });
    }
    res.json(faculty);
  } catch (error) {
    res.status(500).json({ error: "Error fetching faculty data" });
  }
});

// Add a new faculty member
router.post("/", async (req, res) => {
  try {
    const newFaculty = new Faculty(req.body);
    await newFaculty.save();
    res.status(201).json({ message: "Faculty added successfully", faculty: newFaculty });
  } catch (error) {
    res.status(500).json({ error: "Error adding faculty" });
  }
});

// Update a faculty member
router.put("/:id", async (req, res) => {
  try {
    const updatedFaculty = await Faculty.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedFaculty) {
      return res.status(404).json({ error: "Faculty not found" });
    }
    res.json({ message: "Faculty updated successfully", faculty: updatedFaculty });
  } catch (error) {
    res.status(500).json({ error: "Error updating faculty" });
  }
});

// Delete a faculty member
router.delete("/:id", async (req, res) => {
  try {
    const deletedFaculty = await Faculty.findByIdAndDelete(req.params.id);
    if (!deletedFaculty) {
      return res.status(404).json({ error: "Faculty not found" });
    }
    res.json({ message: "Faculty deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Error deleting faculty" });
  }
});

export default router;
