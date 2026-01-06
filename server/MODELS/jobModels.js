import mongoose from "mongoose";

const jobSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      required: true,
    },

    profession: {
      type: String,
      required: true,
      trim: true,
    },

    location: {
      type: String,
      required: true, // city / remote
    },

    jobType: {
      type: String,
      enum: ["part-time", "flexible"],
      default: "flexible",
    },

    burdenLevel: {
      type: String,
      enum: ["low"],
      default: "low",
    },

    peopleRequired: {
      type: Number,
      required: true,
      min: 1,
    },

    peopleHired: {
      type: Number,
      default: 0,
    },

    postedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true, // job provider (<50)
    },

    isActive: {
      type: Boolean,
      default: true, // visible to retirees
    },
  },
  { timestamps: true }
);

export default mongoose.model("Job", jobSchema);
