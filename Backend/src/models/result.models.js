import mongoose from "mongoose";
const resultSchema = new mongoose.Schema({
    topperImage: String,
    year: String,
    semester: Number,
    passPercentage: Number,
    totalStudents: Number,
    passedStudents: Number,
    failedStudents: Number,
});

export default mongoose.model("Result", resultSchema);