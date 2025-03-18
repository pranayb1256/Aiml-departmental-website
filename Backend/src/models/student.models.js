import mongoose from "mongoose"

const studentSchema = new mongoose.Schema({
    name: String,
    company: String,
    image: { type: String, required: true },
  },{timestamps:true});
  
export default mongoose.model("Student", studentSchema);
