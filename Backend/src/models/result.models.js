import mongoose from "mongoose";
const resultSchema = new mongoose.Schema({
    topperImage: String,
    topperName: String,    // Name of the topper
    topperCgpa: Number,
    year: String,
    semester: Number,
    passPercentage: Number,
    totalStudents: Number,
    passedStudents: Number,
    failedStudents: Number,
    avgCgpa: Number,
}, { timestamps: true, });

export default mongoose.model("Result", resultSchema);