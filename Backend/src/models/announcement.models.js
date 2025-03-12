import mongoose, { Schema } from 'mongoose';

const announcementSchema = new Schema({
    text: {
        type: String,
        required: true
    }
}, { timestamps: true }
);

const Announcement = mongoose.model('Announcement', announcementSchema);

export default Announcement;