import express from "express";
import {protect } from "../middleware/authMiddleware.js";
import { nearbyusers,storelocation } from "../controllers/nearbyuserscontroller.js";
const router = express.Router();
router.get("/nearby",protect,nearbyusers);
router.post("/storelocation",protect,storelocation);
export default router;