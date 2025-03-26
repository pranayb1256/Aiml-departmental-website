import mongoose, { Schema } from "mongoose";

const eventsSchema = new Schema({
   images: {
        type: [String],
    },
    clubName: {
        type: String,
        trim: true,
        required: true, 
    },
    dateTime: {
        type: Date, 
        required: true 
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
    eventType: { 
        type: String,
        trim: true,
        enum: ["Workshop", "Hackathon", "Seminar", "Conference", "Meetup"],
        default: "Seminar"
    }
}, { timestamps: true });

const Event = mongoose.model('Event', eventsSchema);

export default Event;
