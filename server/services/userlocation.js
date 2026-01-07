import User from "../MODELS/User.js";

const storeuserlocation= async(id,latitude,longitude)=>{
const user= await User.findById(id);


     if (!latitude || !longitude) {
      return res.status(400).json({ message: "Latitude & longitude required" });
    }
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
      user.location = {
      type: "Point",
      coordinates: [longitude, latitude],
    };
      await user.save();
}

export default storeuserlocation;