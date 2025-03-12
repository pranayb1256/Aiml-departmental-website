import mongoose from "mongoose";

const NonfacultySchema = new mongoose.Schema(
  {
    profileImage:{type: String,default: ""},
    fullname: { type: String, required: true },
    qualification: { type: String, required: true },
    designation: { type: String, required: true },
  },
  { timestamps: true }
);

const NonFaculty = mongoose.model("NonFaculty", NonfacultySchema);

export default NonFaculty;
