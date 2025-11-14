import mongoose from "mongoose";

const jobSchema = new mongoose.Schema({
  title: String,
  company: String,
  location: String,
  pay: String,
  type: String,
  hours: String,
  description: String,
  skills: [String],
}, { timestamps: true });

export default mongoose.model("Job", jobSchema);
