import mongoose, { Schema } from "mongoose";

const facultySchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
    },
    profileImage: {
        type: String,  // cloudinary url
    },
    qualification: {
        type: String,
        trim: true,
    },
    designation: {
        type: String,
        trim:true
    },
    experience: {
        type: String,
        trim: true,
    },
    email: {
        type: String,
        trim: true,
    }

}, { timestamps: true });

const Faculty = mongoose.model('Faculty', facultySchema);

export default Faculty;