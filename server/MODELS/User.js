import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    password: {
      type: String,
      required: true,
    },

    age: {
      type: Number,
      required: true,
      min: 0,
    },

    role: {
      type: String,
      enum: ["job_provider", "retiree"],
      required: true,
    },

    phone: {
      type: String,
      required: true,
    },
    // location:{
    //  type: { type: String, enum: ["Point"], default: "Point" },
    // coordinates: [longitude, latitude],
    
    // }
     location: {
      type: {
        type: String,
        enum: ["Point"],
        default: "Point",
      },
      coordinates: {
        type: [Number], // longitude, latitude
        required: true,
      },
    },
  },
  { timestamps: true }
);
userSchema.index({ location: "2dsphere" });
// export default mongoose.model("User", userSchema);
export default mongoose.models.User ||
  mongoose.model("User", userSchema);
