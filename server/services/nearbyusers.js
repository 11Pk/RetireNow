
async function nearbyUsers()
{
const nearbyUsers = await User.find({
  interests: { $in: currentUser.interests }, // match interest
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