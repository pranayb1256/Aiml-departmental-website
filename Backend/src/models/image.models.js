import mongoose, { Schema } from "mongoose";

const imageSchema = new Schema({
    recruiters: {
        type: [String],
    },
    studentGallery: {
        type: [String],
    },
    homepageEvent: {
        type: [String],
    },
}, { timestamps: true }
);


const Image = mongoose.model("Image", imageSchema);

export default Image;
