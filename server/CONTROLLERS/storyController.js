import Story from "../MODELS/storyModel.js";

export const addStory=async(req,res)=>{
    try {
    const story = new Story(req.body);
    const savedStory = await story.save();
    res.status(201).json(savedStory);
  } catch (err) {
    res.status(500).json({ message: "Failed to add story", err });
  }
};

export const getAllStories=async(req,res)=>{
   try{
    const stories=await Story.find()
    res.status(201).json(stories);


   }catch(err){
      res.status(500).json({ message: "Failed to fetch stories", err });
   }
}

export const editStory=async(req,res)=>{
    try{
         const {id}=req.params;
         const updated = await Story.findByIdAndUpdate(id, req.body, { new: true });
         res.status(200).json(updated);
    }
    catch(err){
         res.status(500).json({ message: "Failed to update story", err });
    }

}

export const deleteStory=async(req,res)=>{
    try{
         const {id}=req.params;
         const deleted = await Story.findByIdAndDelete(id)
         res.status(200).json({message:'Deleted successfully!'
         });
    }
    catch(err){
         res.status(500).json({ message: "Failed to delete story", err });
    }

}

