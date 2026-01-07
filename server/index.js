import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import jobRoutes from "./routes/jobRoutes.js";
dotenv.config();

// Database
import connectDB from "./config/db.js";

// Routes
import storyRoutes from "./ROUTES/storyRoutes.js";
import healthRoutes from './ROUTES/healthRoutes.js'
import authRoutes from "./ROUTES/authRoutes.js";
import postRoute from "./ROUTES/postRoutes.js"
import nearbyusersroutes from "./routes/nearbyusersroutes.js";
//  Utilities
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
app.use("/api/jobs", jobRoutes);
app.use("/api/story", storyRoutes);
app.use("/api/health", healthRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/community",postRoute)
app.use("/api/nearby",nearbyusersroutes);

// Port
const PORT =5000;

app.listen(PORT, () => {
  console.log(` Server running on http://localhost:${PORT}`);
});
