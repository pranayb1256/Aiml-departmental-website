import mongoose, { Schema } from 'mongoose';

const noticeSchema = new Schema({
    text: {
        type: String,
        required: true
    }
}, { timestamps: true }
);

const Notice = mongoose.model('Notice', noticeSchema);

export default Notice;