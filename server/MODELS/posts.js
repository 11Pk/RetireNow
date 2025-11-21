// import User from './User.js'
import mongoose from "mongoose";
import User from "../models/User.js";
const CommentSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: `${User}`, required: true },
  text: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

const PostSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: `${User}`, required: true },   //User linked
  content: { type: String, required: true },
  interest: { type: String, index: true },      
  images: [String],                               
  likesCount: { type: Number, default: 0 },
  
  comments: [CommentSchema],
  createdAt: { type: Date, default: Date.now, index: true }
});

export default mongoose.model("Post", PostSchema);