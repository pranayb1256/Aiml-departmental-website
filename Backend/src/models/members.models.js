import mongoose from "mongoose";

const MemberSchema = new mongoose.Schema({
  name: { type: String, required: true },
  yearBranch: { type: String,},
  position: { type: String, required: true },
  photo: { type: String,},
  linkedin: { type: String },
  instagram: { type: String },
  github: { type: String },
  club: { type: String, required: true }, // Changed to string instead of ObjectId
});

export default mongoose.model("Member", MemberSchema);
