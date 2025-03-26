import mongoose from "mongoose";
const resultSchema = new mongoose.Schema({
    year: String,
    semester: Number, 
    passPercentage: Number,
    totalStudents: Number,
    passedStudents: Number,
    failedStudents: Number,
    topper: { name: String, percentage: Number , image: String },
  });
  
export default mongoose.model("Result", resultSchema);