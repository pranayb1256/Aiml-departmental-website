import mongoose, { Schema } from "mongoose";

const eventsSchema = new Schema({
   images: {
        type: [String], // 4(imgs) cloudinary url
    },
    clubName: {
        type: String,
        trim: true,
        require: true,
    },
    dateTime: {
        type: Date, 
        require: true 
    },
    venue: {
        type: String,
        trim: true
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
}, { timestamps: true }
);

const Event = mongoose.model('Event', eventsSchema);

export default Event;
