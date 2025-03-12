import express from "express";
import NonFaculty from "../models/nonfaculty.model.js";

const router = express.Router();

// Fetch all faculty members
router.get("/", async (req, res) => {
    try {
        const faculty = await NonFaculty.find();
        res.json(faculty);
    } catch (error) {
        res.status(500).json({ error: "Error fetching faculty data" });
    }
});

// Fetch a single faculty member by ID
router.get("/:id", async (req, res) => {
    try {
        const faculty = await NonFaculty.findById(req.params.id);
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
        const newFaculty = new NonFaculty(req.body);
        await newFaculty.save();
        res.status(201).json({ message: "Faculty added successfully", faculty: newFaculty });
    } catch (error) {
        res.status(500).json({ error: "Error adding faculty" });
    }
});

// Update a faculty member
router.put("/:id", async (req, res) => {
    try {
        const updatedFaculty = await NonFaculty.findByIdAndUpdate(req.params.id, req.body, { new: true });
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
        const deletedFaculty = await NonFaculty.findByIdAndDelete(req.params.id);
        if (!deletedFaculty) {
            return res.status(404).json({ error: "Faculty not found" });
        }
        res.json({ message: "Faculty deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: "Error deleting faculty" });
    }
});

export default router;
