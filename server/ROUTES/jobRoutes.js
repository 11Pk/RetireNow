import express from "express";
import { createJob, getMyJobs , getActiveJobs } from "../controllers/jobController.js";
import { protect, allowRoles } from "../middleware/authMiddleware.js";

const router = express.Router();

/**
 * Provider submits job
 */
router.post(
  "/",
  protect,
  allowRoles("job_provider"),
  createJob
);

router.get(
  "/",
  protect,
  allowRoles("retiree"),
  getActiveJobs
);

/**
 * Provider views his jobs
 */

router.get(
  "/my-jobs",
  protect,
  allowRoles("job_provider"),
  getMyJobs
);

export default router;
