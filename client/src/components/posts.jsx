import { Search, Bell, User, Heart, MessageCircle, Image as ImageIcon, Paperclip, MoreVertical, MapPin } from 'lucide-react';
import { useState } from 'react';
import { useEffect } from 'react';
function Posts() {
  const [postText, setPostText] = useState("");

const handleCreatePost = async () => {
  try {
    const response = await fetch("http://localhost:5000/api/community/new", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        userId: "67452fb4c4a35e82b9f270ea",   // Replace with actual user ID
        content: postText,
        interest: selectedInterest,          // Your selected interest
        images: []                      // Later add file upload here
      })
    });

    const data = await response.json();
    console.log("Post saved:", data);
    fetchPosts(selectedInterest);
setPostText(""); 
  } catch (err) {
    console.error("Error creating post:", err);
  }
};

const [selectedInterest, setSelectedInterest] = useState("Gardening");
const [posts, setPosts] = useState([]);

const fetchPosts = async (interest) => {
  try {
    const res = await fetch(
      `http://localhost:5000/api/community/posts?interest=${interest}`
    );
    const data = await res.json();
    setPosts(data);
  } catch (err) {
    console.log("Error fetching posts:", err);
  }
};

useEffect(() => {
  fetchPosts(selectedInterest);

}, [selectedInterest]);
  return (
    <div >
      {/* Header */}
      
      <header className="bg-white  border-gray-200 px-6 py-4 flex items-center justify-between gap-4">
        <h1 className="text-2xl font-bold text-gray-900">COMMUNITY HUB</h1>
        
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search"
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        
        <div className="flex items-center gap-4">
          <Bell className="w-6 h-6 text-gray-600 cursor-pointer hover:text-gray-900" />
          <div className="w-10 h-10 rounded-full bg-blue-500 cursor-pointer flex items-center justify-center">
            <User className="w-6 h-6 text-white" />
          </div>
        </div>
      </header>
      

      {/* Main Content */}
      <div className="container mx-auto px-6 py-6 ">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Column */}
          <div className="lg:col-span-3 space-y-6">
            {/* Quote of the Day */}
            <div className="bg-amber-50 rounded-xl p-6 shadow-sm">
              <h2 className="text-lg font-bold text-gray-900 mb-4">Quote of the Day</h2>
              <p className="text-gray-800 mb-2">Every day is a new beginning — embrace it with joy.</p>
              <p className="text-sm text-gray-600 mb-4">— Anonymous</p>
              {/* <div className="flex gap-2">
                <button className="w-8 h-8 rounded-full bg-white flex items-center justify-center hover:bg-gray-100">
                  <MoreVertical className="w-4 h-4 text-gray-600" />
                </button>
                <button className="w-8 h-8 rounded-full bg-white flex items-center justify-center hover:bg-gray-100">
                  <Heart className="w-4 h-4 text-gray-600" />
                </button>
              </div> */}
            </div>

            {/* My Interests */}
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h2 className="text-lg font-bold text-gray-900 mb-4">My Interests</h2>
              <div className="space-y-3">
                <div className="flex items-center gap-3 cursor-pointer" onClick={() => setSelectedInterest("Gardening")}>
                  <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
                    <span className="text-green-600 text-lg">🌳</span>
                  </div>
                  <span className="text-gray-700">Gardening</span>
                </div>
                <div className="flex items-center gap-3 cursor-pointer" onClick={() => setSelectedInterest("Music")}>
                  <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                    <span className="text-blue-600 text-lg">🎵</span>
                  </div>
                  <span className="text-gray-700">Music</span>
                </div>
                <div className="flex items-center gap-3 cursor-pointer" onClick={() => setSelectedInterest("Reading")}>
                  <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center">
                    <span className="text-purple-600 text-lg">📚</span>
                  </div>
                  <span className="text-gray-700">Reading</span>
                </div>
                <div className="flex items-center gap-3 cursor-pointer" onClick={() => setSelectedInterest("Volunteering")}>
                  <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center">
                    <span className="text-red-600 text-lg">❤️</span>
                  </div>
                  <span className="text-gray-700">Volunteering</span>
                </div>
              </div>
            </div>

            {/* Quick Links */}
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h2 className="text-lg font-bold text-gray-900 mb-4">Quick Links</h2>
            </div>
          </div>

          {/* Middle Column */}
          <div className="lg:col-span-6">
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Gardening Group Chat</h2>
              
              {/* Post Input */}
              <div className="mb-6">
                <div className="flex items-center gap-3 border border-gray-300 rounded-lg p-3">
                  <input
                    type="text"
                    placeholder="Post something..."
                    className="flex-1 outline-none text-gray-700"
                    value={postText}
  onChange={(e) => setPostText(e.target.value)}
                  />
                  <button className="p-2 hover:bg-gray-100 rounded-lg"  >
                    <ImageIcon className="w-5 h-5 text-gray-600" />
                  </button>
                  <button className="p-2 hover:bg-gray-100 rounded-lg">
                    <Paperclip className="w-5 h-5 text-gray-600" />
                  </button>
                  <button  
  onClick={handleCreatePost}   // Add this
  className="p-2 bg-blue-500 text-white rounded-lg"
>
  Post
</button>
                </div>
              </div>

{/* Dynamic Posts */}
{posts.length === 0 ? (
  <p className="text-gray-600 text-sm">No posts found for {selectedInterest}.</p>
) : (
  posts.map((post) => (
    <div key={post._id} className="border border-gray-200 rounded-lg p-4 mb-4">
      
      {/* Post Header */}
      <div className="flex items-start gap-3 mb-3">
        <div className="w-12 h-12 rounded-full bg-blue-200 flex items-center justify-center">
          <span className="text-blue-700 font-semibold">
            {post.user?.name ? post.user.name.charAt(0) : "U"}
          </span>
        </div>

        <div className="flex-1">
          <div className="flex items-center justify-between mb-1">
            <div>
              <h3 className="font-bold text-gray-900">
                {post.user?.name || "Unknown User"}
              </h3>
              <p className="text-sm text-gray-500">
                {new Date(post.createdAt).toLocaleString()}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Post Content */}
      <p className="text-gray-800 mb-3 ml-14">{post.content}</p>

      {/* Post Images */}
      {post.images && post.images.length > 0 && (
        <img
          src={post.images[0]}
          alt="post image"
          className="ml-14 rounded-lg w-full max-w-md"
        />
      )}

      {/* Buttons */}
      <div className="flex items-center gap-4 ml-14 mt-3">
        <button className="flex items-center gap-2 text-gray-600 hover:text-red-500">
          <Heart className="w-5 h-5" />
          <span className="text-sm">0</span>
        </button>
        <button className="flex items-center gap-2 text-gray-600 hover:text-blue-500">
          <MessageCircle className="w-5 h-5" />
          <span className="text-sm">0</span>
        </button>
      </div>

    </div>
  ))
)}

              {/* Posts */}
              
                {/* Ramesh's Post */}
                {/* <div className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-start gap-3 mb-3">
                    <div className="w-12 h-12 rounded-full bg-blue-200 flex items-center justify-center  ">
                      <span className="text-blue-700 font-semibold">R</span>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <div>
                          <h3 className="font-bold text-gray-900">Ramesh</h3>
                          <p className="text-sm text-gray-500">2h ago</p>
                        </div>
                        <span className="text-sm text-gray-500">2h ago</span>
                      </div>
                    </div>
                  </div>
                  <p className="text-gray-800 mb-3 ml-14">My rose plant finally bloomed today!</p>
                  <div className="flex items-center gap-4 ml-14">
                    <button className="flex items-center gap-2 text-gray-600 hover:text-red-500">
                      <Heart className="w-5 h-5" />
                      <span className="text-sm">12</span>
                    </button>
                    <button className="flex items-center gap-2 text-gray-600 hover:text-blue-500">
                      <MessageCircle className="w-5 h-5" />
                      <span className="text-sm">3</span>
                    </button>
                  </div>
                </div> */}

                {/* Sunita's Post */}
                {/* <div className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-start gap-3 mb-3">
                    <div className="w-12 h-12 rounded-full bg-red-200 flex items-center justify-center flex-shrink-0">
                      <span className="text-red-700 font-semibold">S</span>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <div>
                          <h3 className="font-bold text-gray-900">Sunita</h3>
                          <p className="text-sm text-gray-500">1 day ago</p>
                        </div>
                        <span className="text-sm text-gray-500">1d ago</span>
                      </div>
                    </div>
                  </div>
                  <div className="mb-3 ml-14">
                    <div className="relative rounded-lg overflow-hidden bg-gray-200 aspect-video mb-2">
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-16 h-16 rounded-full bg-white bg-opacity-90 flex items-center justify-center">
                          <span className="text-2xl">▶</span>
                        </div>
                      </div>
                    </div>
                    <p className="text-sm text-gray-700 font-medium">Composting_tips.mp4</p>
                  </div>
                  <div className="flex items-center gap-4 ml-14">
                    <button className="flex items-center gap-2 text-gray-600 hover:text-red-500">
                      <Heart className="w-5 h-5" />
                      <span className="text-sm">8</span>
                    </button>
                    <button className="flex items-center gap-2 text-gray-600 hover:text-blue-500">
                      <MessageCircle className="w-5 h-5" />
                      <span className="text-sm">5</span>
                    </button>
                  </div>
                </div> */}

                {/* Marst's Post */}
                {/* <div className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-start gap-3 mb-3">
                    <div className="w-12 h-12 rounded-full bg-purple-200 flex items-center justify-center flex-shrink-0">
                      <span className="text-purple-700 font-semibold">M</span>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <div>
                          <h3 className="font-bold text-gray-900">Marst</h3>
                          <p className="text-sm text-gray-500">3 days ago</p>
                        </div>
                        <span className="text-sm text-gray-500">3d ago</span>
                      </div>
                    </div>
                  </div>
                </div> */}
              
            </div>
          </div>

          {/* Right Column */}
          <div className="lg:col-span-3 space-y-6">
            {/* People Near You */}
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h2 className="text-lg font-bold text-gray-900 mb-4">People Near You</h2>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-12 h-12 rounded-full bg-green-200 flex items-center justify-center">
                    <span className="text-green-700 font-semibold">N</span>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-gray-900">Neelam</h3>
                    <p className="text-sm text-gray-500 mb-2">2 km away</p>
                    <div className="flex gap-2">
                      <button className="px-3 py-1 text-sm bg-blue-500 text-white rounded-lg hover:bg-blue-600">
                        Connect
                      </button>
                      <button className="px-3 py-1 text-sm border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50">
                        Message
                      </button>
                    </div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-12 h-12 rounded-full bg-purple-200 flex items-center justify-center flex-shrink-0">
                    <span className="text-purple-700 font-semibold">M</span>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-gray-900">Mohan</h3>
                    <p className="text-sm text-gray-500 mb-2">3 km away</p>
                    <div className="flex gap-2">
                      <button className="px-3 py-1 text-sm bg-blue-500 text-white rounded-lg hover:bg-blue-600">
                        Connect
                      </button>
                      <button className="px-3 py-1 text-sm border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50">
                        Join
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Upcoming Events */}
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h2 className="text-lg font-bold text-gray-900 mb-4">Upcoming Events</h2>
              <div className="space-y-4">
                <div className="flex gap-3">
                  <div className="flex flex-col items-center justify-center bg-gray-100 rounded-lg px-3 py-2 min-w-[50px]">
                    <span className="text-lg font-bold text-gray-900">10</span>
                    <span className="text-xs text-gray-600 uppercase">Nov</span>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-gray-900 mb-1">Gardening Drive</h3>
                    <p className="text-sm text-gray-500">10 Nov, 2 km away</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="flex flex-col items-center justify-center bg-gray-100 rounded-lg px-3 py-2 min-w-[50px]">
                    <span className="text-lg font-bold text-gray-900">15</span>
                    <span className="text-xs text-gray-600 uppercase">Nov</span>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-gray-900 mb-1">Music Evening</h3>
                    <p className="text-sm text-gray-500">15 Nov, 2.5 km away</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Visit with Someone */}
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h2 className="text-lg font-bold text-gray-900 mb-4">Visit with Someone</h2>
              <div className="flex items-center gap-3">
                <div className="flex -space-x-2">
                  <div className="w-10 h-10 rounded-full bg-pink-200 border-2 border-white flex items-center justify-center">
                    <span className="text-pink-700 text-sm font-semibold">F</span>
                  </div>
                  <div className="w-10 h-10 rounded-full bg-blue-200 border-2 border-white flex items-center justify-center">
                    <span className="text-blue-700 text-sm font-semibold">M</span>
                  </div>
                </div>
                <p className="text-gray-700 text-sm">Local NGO with Gurudwara</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Posts;
