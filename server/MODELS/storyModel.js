import mongoose from "mongoose";

const storySchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: false,
    },

    title: {
      type: String,
      required: true,
    },

    description: {
      type: String,
      required: true, 
    },

    photo: {
      type: String,
    },

    date: {
      type: Date,
      required: true, 
    },
  },
  { timestamps: true }
);

const Story = mongoose.model("Story", storySchema);
export default Story;
