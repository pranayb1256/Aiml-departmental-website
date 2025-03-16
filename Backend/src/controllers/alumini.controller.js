// controllers/alumniController.js
import Alumni from "../models/alumni.models.js";

// Create a new alumni
export const createAlumni = async (req, res) => {
    try {
        const newAlumni = new Alumni(req.body);
        await newAlumni.save();
        res.status(201).json(newAlumni);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get all alumni
export const getAllAlumni = async (req, res) => {
    try {
        const alumni = await Alumni.find();
        res.status(200).json(alumni);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get a single alumni by ID
export const getAlumniById = async (req, res) => {
    try {
        const alumni = await Alumni.findById(req.params.id);
        if (!alumni) return res.status(404).json({ message: "Alumni not found" });
        res.status(200).json(alumni);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update an alumni
export const updateAlumni = async (req, res) => {
    try {
        const updatedAlumni = await Alumni.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedAlumni) return res.status(404).json({ message: "Alumni not found" });
        res.status(200).json(updatedAlumni);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Delete an alumni
export const deleteAlumni = async (req, res) => {
    try {
        const deletedAlumni = await Alumni.findByIdAndDelete(req.params.id);
        if (!deletedAlumni) return res.status(404).json({ message: "Alumni not found" });
        res.status(200).json({ message: "Alumni deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


// routes/alumniRoutes.js
