import express from "express";
import { createJob, getMyJobs , getActiveJobs , getAppliedJobs } from "../controllers/jobController.js";
import { protect, allowRoles } from "../middleware/authMiddleware.js";
import { applyToJob } from "../controllers/jobController.js";
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

router.post(
  "/apply/:jobId",
  protect,
  allowRoles("retiree"),
  applyToJob
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

router.get(
  "/applied",
  protect,
  allowRoles("retiree"),
  getAppliedJobs
);

