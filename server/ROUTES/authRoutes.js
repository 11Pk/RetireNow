import express from "express";
import { signup, login } from "../controllers/authController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);

// OPTIONAL: simple profile route
router.get("/profile", protect, (req, res) => {
  res.json(req.user);
});

export default router;
