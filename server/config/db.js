import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017/retirewell", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("MongoDB connected");
  } catch (err) {
    console.error("DB Connection Error:", err);
    process.exit(1);
  }
};

export default connectDB;
