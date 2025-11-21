import express from "express";
import {currentposts,newpost} from '../controllers/postcontroller.js'

const router = express.Router();

router.get("/posts",currentposts);
router.post("/new",newpost);
export default router;