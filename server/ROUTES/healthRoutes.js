import express from "express";
import { addHealthRecord, getAllRecords,addReminder,getAllReminders } from "../CONTROLLERS/healthController.js";


const router = express.Router();

// define URLs (endpoints)
router.post("/addRecord", addHealthRecord);     
router.get("/getAllRecord", getAllRecords);      
router.post("/addReminder", addReminder); 
router.get("/getAllReminder", getAllReminders);


export default router;
