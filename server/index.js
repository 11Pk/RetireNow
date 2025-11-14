import express from "express";
import cors from "cors";
import dotenv from "dotenv";

// Load environment variables
dotenv.config();

// Database
import connectDB from "./config/db.js";

// Routes
import storyRoutes from "./routes/storyRoutes.js";
import healthRoutes from "./routes/healthRoutes.js";
import authRoutes from "./routes/authRoutes.js";

// CRON / Utilities
import "./utils/reminderScheduler.js";

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Connect DB
connectDB();

// Test Route
app.get("/", (req, res) => {
  res.send("Backend is running smoothly!");
});

// API Routes
app.use("/api/story", storyRoutes);
app.use("/api/health", healthRoutes);
app.use("/api/auth", authRoutes);

// Port
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
