import express from "express";
import {
  addStory,
  getAllStories,
  editStory,
  deleteStory,
} from "../controllers/storyController.js";

const router = express.Router();

// URLs
router.post("/addStory", addStory);
router.get("/getAllStories", getAllStories);
router.put("/edit/:id", editStory);
router.delete("/delete/:id", deleteStory);

export default router;

