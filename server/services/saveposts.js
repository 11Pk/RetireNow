
import  Post  from "../MODELS/posts.js";
async function savePosts(userId,content,interest,images=[])
{
const post =new Post(
    {
    user: userId,
    content,
    interest:interestTag,
    images}
);
return post.save();
}

export default savePosts;