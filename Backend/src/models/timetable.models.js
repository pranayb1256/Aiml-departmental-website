import mongoose from "mongoose";

const timetableSchema = new mongoose.Schema({
    year: String,
    semester: String,
    urlA: String,
    urlB: String,
});

export default mongoose.model("Timetable", timetableSchema);