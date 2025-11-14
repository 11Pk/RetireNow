import mongoose from "mongoose";

const healthSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: false,
  },
  age: Number,
  weight: Number,
  bp: String,
  sugar: Number,
  date: {
    type: Date,
    default: Date.now,
  }
});

const reminderSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: false,
  },
  title: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  notified: {
    type: Boolean,
    default: false,
  },
});

// SAFE MODEL EXPORTS – prevents OverwriteModelError
export const Health =
  mongoose.models.Health || mongoose.model("Health", healthSchema);

export const Reminder =
  mongoose.models.Reminder || mongoose.model("Reminder", reminderSchema);
