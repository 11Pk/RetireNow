import express from "express";
import { addHealthRecord, getAllRecords,addReminder,getAllReminders,shareWithDoctor } from "../CONTROLLERS/healthController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// define URLs (endpoints)
router.post("/addRecord",protect, addHealthRecord);     
router.get("/getAllRecords",protect, getAllRecords);      
router.post("/addReminder", protect,addReminder); 
router.get("/getAllReminders",protect, getAllReminders);
router.post("/shareWithDoctor",protect, shareWithDoctor);



export default router;

