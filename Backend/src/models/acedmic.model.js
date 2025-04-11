import mongoose from "mongoose";

const academicCalendarSchema = new mongoose.Schema({
  yearLevel: {
    type: String,
    enum: ['FE', 'SE', 'TE', 'BE'],
    required: true
  },
  title: {
    type: String,
    required: true
  },
  pdfUrl: {
    type: String,
    required: true
  },
  uploadedAt: {
    type: Date,
    default: Date.now
  }
},{
  timestamps: true,
});

export default mongoose.model("AcademicCalendar", academicCalendarSchema);
