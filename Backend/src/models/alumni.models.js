import mongoose, { Schema } from "mongoose";

const alumniSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    jobTitle: {
        type: String,
    },
    linkedIn: {
        type: String,
        required: true,
        unique: true
    },
    github: {
        type: String,
        required: true,
        unique: true
    },
    photo: {
        type: String
    }

}, { timestamps: true });

const Alumni = mongoose.model('Alumni', alumniSchema);

export default Alumni;