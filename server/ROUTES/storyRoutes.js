import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import {
  addStory,
  getAllStories,
  editStory,
  deleteStory,
  generateLifeBook
} from "../controllers/storyController.js";

const router = express.Router();

// URLs
router.post("/addStory",protect, addStory);
router.get("/getAllStories",protect, getAllStories);
router.put("/edit/:id",protect, editStory);
router.delete("/delete/:id",protect, deleteStory);
router.post("/generateLifeBook",protect, generateLifeBook);

export default router;

