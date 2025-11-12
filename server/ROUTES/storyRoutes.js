import express from "express";
import { addStory,getAllStories,editStory,deleteStory } from "../CONTROLLERS/storyController.js";


const router = express.Router();

// define URLs (endpoints)
router.post("/addStory", addStory);    
router.get("/getAllStory", getAllStories);  
router.put("/edit:id", editStory);  
router.delete("/delete:id", deleteStory);


export default router;
