import express from "express";
import {currentposts,newpost} from '../controllers/postcontroller.js'
import {protect } from "../middleware/authMiddleware.js";
const router = express.Router();

router.get("/posts",currentposts);
router.post("/new",protect,newpost);
export default router;