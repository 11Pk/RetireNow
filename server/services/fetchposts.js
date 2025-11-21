

import  Post  from "../MODELS/posts.js";
async function fetchPosts(interest)
{
limit=10;
const posts= await Post.find({ interestTag: interest })
.sort({ createdAt: -1 })
.limit(limit)
.populate("user", "name ")     //User linked
    .lean();

return posts;
}

export default fetchPosts;