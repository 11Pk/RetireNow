import nearbyUsers from "../services/nearbyusers";

async function nearbyUsers(req,res)
{
users=nearbyUsers();
res.json(users);
}

export default nearbyUsers;