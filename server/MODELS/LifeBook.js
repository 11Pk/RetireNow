import mongoose from "mongoose";

const ChapterSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
});

const LifeBookSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    bookTitle: {
      type: String,
      default: "My Life Story",
    },

    chapters: [ChapterSchema],

    generatedFromMemories: {
      type: Number, // count of memories used
      default: 0,
    },

    createdAt: {
      type: Date,
      default: Date.now,
    },

    lastUpdatedAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

export default mongoose.model("LifeBook", LifeBookSchema);
