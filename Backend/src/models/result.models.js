import mongoose from "mongoose";

const studentSchema = new mongoose.Schema({
  name: String,
  rollNo: String,
  cgpa: Number,
  backlog: Boolean,
  clearedBacklog: Boolean
});

const resultSchema = new mongoose.Schema({
  year: String,
  semester: String,
  passPercentage: Number,
  totalStudents: Number,
  passedStudents: Number,
  failedStudents: Number,
  topperImage: String,
  topperName: String,
  topperCgpa: Number,
  students: [studentSchema],
}, { timestamps: true });

export default mongoose.model("Result", resultSchema);
