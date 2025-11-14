import fetchposts from '../services/fetchposts.js'
import savePosts from '../services/saveposts.js'

export const currentposts= async(req,res)=>{
    try{
       const posts = await fetchPosts(req.query.interest);
    res.status(200).json(posts);
    }
    catch{
       console.log("Error fetching posts from the current category");
       throw error; 
    }
}


export const newpost=async(req,res)=>{
    try{
            const newPost = await savePosts(req.query.userId, req.query.content, req.query.interest, req.query.images);

    res.status(201).json({
      message: "Post created successfully",
      post: newPost
    });
    }
    catch{
console.log("Error in creating this post.");
throw error;
    }
}