import express from "express";
import { searchMicroJobs } from "../controllers/jobApiController.js";
import jobRoutes from "./routes/jobRoutes.js";

const router = express.Router();
app.use("/api/jobs", jobRoutes);
router.get("/search", searchMicroJobs);

export default router;
