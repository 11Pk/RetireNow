

import  Post  from "../MODELS/posts.js";
async function fetchPosts(interest)
{

const posts= await Post.find({ interest: interest })
.sort({ createdAt: -1 })
.limit(5)
.populate("user", "name ")     //User name fetched
    .lean();

return posts;
}

export default fetchPosts;