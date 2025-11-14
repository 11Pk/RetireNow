import express from "express";
import {
  signup,
  login,
  profile,
  forgotPassword,
} from "../controllers/authController.js";
import auth from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.get("/profile", auth, profile);
router.put("/forgot-password", forgotPassword);

export default router;
