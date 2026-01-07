
async function nearbyUsers(currentUserLocation)
{
const nearbyUsers = await User.find({
 
  location: {
    $near: {
      $geometry: currentUserLocation, // user's location
      $maxDistance: 5000 // 5 km in meters
    }
  }
}).limit(10);

return nearbyUsers;
};

export default nearbyUsers;