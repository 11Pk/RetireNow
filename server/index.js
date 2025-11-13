import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import storyRoutes from './ROUTES/storyRoutes.js'
import healthRoutes from './ROUTES/healthRoutes.js'
import "./utils/reminderScheduler.js";
import connectDb from "./config/db.js";
dotenv.config(); 
connectDb();
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Sample route
app.get("/", (req, res) => {
  res.send("Backend is running smoothly!");
});

app.use('/api/story',storyRoutes)
app.use('/api/health',healthRoutes)


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(` Server running on http://localhost:${PORT}`);
});
