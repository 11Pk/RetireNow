import mongoose from "mongoose";
const storySchema=new mongoose.Schema({
     userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User", 
        required: false,
      },
    title:{
        type:String,
        required:true

    },
    description:{
        type:String,
        required:True

    },
    photo:{
        type:String,
        

    },
    date:{
        type:Date,
        required:True

    },

},{timestamps:true})

export default mongoose.model('Story',storySchema)
