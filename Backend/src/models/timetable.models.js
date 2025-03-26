import mongoose, { Schema } from "mongoose";

const timetableSchema = new Schema({
    url: {
        type: String,
        required: true
    },
    publicId: {
        type: String,
    },
    year: {
        type: String,
        required: true,
        enum:["FE", "SE", "TE", "BE",]
    },
    semester: {
        type: String,
        required: true,
    }
}, { timestamps: true });

// Ensure only one timetable exists per year and semester
timetableSchema.index({ year: 1, semester: 1 }, { unique: true });

const Timetable = mongoose.model('Timetable', timetableSchema);

export default Timetable;