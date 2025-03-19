const resultSchema = new mongoose.Schema({
    year: String,
    semester: Number, 
    passPercentage: Number,
    totalStudents: Number,
    passedStudents: Number,
    failedStudents: Number,
    topper: { name: String, percentage: Number },
    overallTopper: { name: String, percentage: Number },
    subjects: [
      {
        name: String,
        averageMarks: Number,
        highestMarks: Number,
      },
    ],
  });
  
export default mongoose.model("Result", resultSchema);