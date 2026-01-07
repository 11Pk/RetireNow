import fetchPosts from '../services/fetchposts.js'
import savePosts from '../services/saveposts.js'

export const currentposts= async(req,res)=>{
    try{
       const posts = await fetchPosts(req.query.interest);
    res.status(200).json(posts);

    }
    catch(error){
       console.log("Error fetching posts from the current category");
       throw error; 
    }
}


export const newpost=async(req,res)=>{
    try{
        const userId=req.user.id;
            const { content, interest, images } = req.body; 
               const newPost = await savePosts(userId, content, interest, images || []);

    res.status(201).json({
      message: "Post created successfully",
      post: newPost
    });
    }
    catch(error){
console.log("Error in creating this post.");
throw error;
    }
}