import mongoose from "mongoose";

const clubEventSchema = new mongoose.Schema({
    images: {
        type: String, // cloudinary url
    },
    title: {
        type: String,
        required: true,
        trim: true,
        maxlength: 30
    },
    eventDate: {
        type: String,
    },
    description: {
        type: String,
        trim: true,
        maxlength: 300
    },
    guestSpeaker: {
        type: String,
        trim: true,
        default: "TBA"
    },
    venue: {
        type: String,
        trim: true
    },
    learnings: {
        type: String,
        trim: true,
        maxlength: 100
    },

}, { timestamps: true }
);

const ClubEvent = mongoose.model('ClubEvent', clubEventSchema);

export default ClubEvent;
