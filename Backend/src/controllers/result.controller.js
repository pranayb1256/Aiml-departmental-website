import Result from "../models/result.models.js";
import { uploadOnCloudinary } from "../utils/cloudniary.js";

export const addResult = async (req, res) => {
    try {
        const {
            year, semester, passPercentage, totalStudents,
            passedStudents, failedStudents, topperImage,
            topperName, topperCgpa, students // 👈 Add students
        } = req.body;

        if (!year || !semester || !passPercentage || !totalStudents ||
            !passedStudents || !failedStudents || !topperImage ||
            !topperName || !topperCgpa) {
            return res.status(400).json({ message: "All fields including topperName and topperCgpa are required" });
        }

        const newResult = new Result({
            year,
            semester,
            passPercentage,
            totalStudents,
            passedStudents,
            failedStudents,
            topperImage,
            topperName,
            topperCgpa,
            students: students || [] // 👈 Include students
        });

        await newResult.save();
        res.status(201).json({ message: "Result added successfully", result: newResult });
    } catch (error) {
        console.error("Error adding result:", error);
        res.status(500).json({ message: "Error adding result" });
    }
};


export const getResults = async (req, res) => {
    try {
        const { year, semester } = req.query;
        let filter = {};
        if (year) filter.year = year;
        if (semester) filter.semester = semester;

        const results = await Result.find(filter);
        res.status(200).json(results);
    } catch (error) {
        res.status(500).json({ message: "Error fetching results", error });
    }
};

// Get overall department topper
export const getTopper = async (req, res) => {
    try {
        const topper = await Result.find().sort({ "overallTopper.percentage": -1 }).limit(1);
        res.status(200).json(topper);
    } catch (error) {
        res.status(500).json({ message: "Error fetching topper", error });
    }
};

// Update a result by ID (with image handling)
export const updateResult = async (req, res) => {
    try {
        const { year, semester, passPercentage, totalStudents, passedStudents, failedStudents, topperName, topperPercentage, overallTopperName, overallTopperPercentage } = req.body;

        let imageUrl = req.body.image; // Default to existing image

        if (req.file) {
            const cloudinaryResponse = await uploadOnCloudinary(req.file.path);
            if (cloudinaryResponse) {
                imageUrl = cloudinaryResponse.secure_url;
            }
        }

        const updatedResult = await Result.findByIdAndUpdate(
            req.params.id,
            {
                year,
                semester,
                passPercentage,
                totalStudents,
                passedStudents,
                failedStudents,
                topperImage: imageUrl,
            },
            { new: true }
        );

        res.json(updatedResult);
    } catch (error) {
        res.status(500).json({ message: "Error updating result" });
    }
};

// Delete a result by ID
export const deleteResult = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedResult = await Result.findByIdAndDelete(id);
        if (!deletedResult) return res.status(404).json({ message: "Result not found" });
        res.status(200).json({ message: "Result deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting result", error });
    }
};

export const getClearedBacklogs = async (req, res) => {
    try {
        const { year, semester } = req.query;
        const filter = {};
        if (year) filter.year = year;
        if (semester) filter.semester = semester;

        const results = await Result.find(filter);
        const clearedStudents = results.flatMap(result =>
            result.students.filter(student => student.clearedBacklog)
        );

        res.status(200).json(clearedStudents);
    } catch (error) {
        res.status(500).json({ message: "Error fetching cleared backlog students", error });
    }
};
