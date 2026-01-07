import nearbyUsers from "../services/nearbyusers.js";
import storeuserlocation from "../services/userlocation.js";
import User from "../MODELS/User.js";
export const nearbyusers=(req,res)=>
{
const userid=req.user.id;
const location=User.findById(userid).location;
const users=nearbyUsers(location);
res.json(users);
}

export const storelocation=(req,res)=>{
    const userid=req.user.id;
       const { latitude, longitude } = req.body;
   storeuserlocation(userid,latitude,longitude);
   
}

// export default nearbyUsers;