// import React, { useState, useEffect } from "react";
// import { Calendar, Edit2, Trash2, ImagePlus } from "lucide-react";
// import Navbar from "./Navbar";

// const BASE_URL = "http://localhost:5000/api/story";

// const Story = () => {
//   const [lifeBook, setLifeBook] = useState([]);
// const [loadingLifeBook, setLoadingLifeBook] = useState(false);


//   const [form, setForm] = useState({
//     title: "",
//     description: "",
//     photo: "",
//     date: "",
//   });

//   const [memories, setMemories] = useState([]);
//   const [editIndex, setEditIndex] = useState(null);

//   //FETCH ALL STORIES
//   const fetchStories = async () => {
//     try {
//       const res = await fetch(`${BASE_URL}/getAllStories`);
//       const data = await res.json();
//       setMemories(data);
//     } catch (err) {
//       console.log("Error fetching stories:", err);
//     }
//   };

//   useEffect(() => {
//     fetchStories();
//   }, []);

//   const handleChange = (e) => {
//     const { name, value, files } = e.target;
//     if (name === "photo") {
//       const reader = new FileReader();
//       reader.onloadend = () => setForm({ ...form, photo: reader.result });
//       reader.readAsDataURL(files[0]);
//     } else {
//       setForm({ ...form, [name]: value });
//     }
//   };

//   //add new post
//   const addStory = async () => {
//     try {
//       const response = await fetch(`${BASE_URL}/addStory`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(form),
//       });

//       const data = await response.json();

//       if (response.ok) {
//         alert("Story added!");
//         fetchStories();
//         setForm({ title: "", date: "", description: "", photo: "" });
//       } else {
//         alert(data.message || "Something went wrong");
//       }
//     } catch (err) {
//       console.log("Add story error:", err);
//     }
//   };

//   //update story
//   const updateStory = async (id) => {
//     try {
//       const response = await fetch(`${BASE_URL}/edit/${id}`, {
//         method: "PUT",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(form),
//       });

//       if (response.ok) {
//         alert("Story updated!");
//         fetchStories();
//         setEditIndex(null);
//         setForm({ title: "", date: "", description: "", photo: "" });
//       }
//     } catch (err) {
//       console.log("Update story error:", err);
//     }
//   };

//   const handleDelete = async (id) => {
//     try {
//       const response = await fetch(`${BASE_URL}/delete/${id}`, {
//         method: "DELETE",
//       });

//       if (response.ok) fetchStories();
//     } catch (err) {
//       console.log("Delete error:", err);
//     }
//   };

//   const handleSubmit = () => {
//     if (!form.title || !form.date || !form.description)
//       return alert("All fields are required!");

//     if (editIndex !== null) {
//       updateStory(memories[editIndex]._id);
//     } else {
//       addStory();
//     }
//   };

//   //generate the life book
//   const generateLifeBook = async () => {
//   if (memories.length === 0) {
//     return alert("Add some memories first");
//   }

//   try {
//     setLoadingLifeBook(true);

//     const res = await fetch(`${BASE_URL}/generateLifeBook?userId=req.user.id`, {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ memories }),
//     });

//     const data = await res.json();

//     if (res.ok) {
//       setLifeBook(data.autobiography);
//     } else {
//       alert(data.message || "Failed to generate LifeBook");
//     }
//   } catch (err) {
//     console.log("LifeBook error:", err);
//   } finally {
//     setLoadingLifeBook(false);
//   }
// };


//   return (
//     <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-100">
//       <Navbar />

//       <div className="max-w-5xl mx-auto py-10 px-6">
//         <div className="flex justify-center mb-6">
//           <h2 className="text-3xl font-bold text-center text-amber-800 mb-6">
//             🕰️ My Life Story
//           </h2>
//           <button
//             onClick={generateLifeBook}
//             className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-full font-semibold shadow-md transition"
//           >
//             📘 Generate My LifeBook
//           </button>
//         </div>

//         {/* Add/Edit Story */}
//         <div className="bg-white rounded-2xl shadow-lg p-6 mb-10">
//           <h3 className="text-xl font-semibold mb-4">
//             {editIndex !== null ? "Edit Memory" : "Add New Memory"}
//           </h3>

//           <div className="grid gap-3">
//             <input
//               type="text"
//               name="title"
//               placeholder="Memory Title"
//               value={form.title}
//               onChange={handleChange}
//               className="border p-2 rounded-lg"
//             />

//             <div className="flex items-center gap-2">
//               <Calendar size={18} />
//               <input
//                 type="date"
//                 name="date"
//                 value={form.date}
//                 onChange={handleChange}
//                 className="border p-2 rounded-lg flex-1"
//               />
//             </div>

//             <textarea
//               name="description"
//               placeholder="Write about this memory..."
//               rows={4}
//               value={form.description}
//               onChange={handleChange}
//               className="border p-2 rounded-lg"
//             ></textarea>

//             <label className="flex items-center gap-2 cursor-pointer">
//               <ImagePlus size={18} />
//               <span>Add Photo</span>
//               <input
//                 type="file"
//                 name="photo"
//                 onChange={handleChange}
//                 className="hidden"
//               />
//             </label>

//             {form.photo && (
//               <img
//                 src={form.photo}
//                 alt="Preview"
//                 className="w-40 h-40 object-cover rounded-lg mt-2 border"
//               />
//             )}

//             <button
//               onClick={handleSubmit}
//               className="bg-amber-600 hover:bg-amber-700 text-white font-semibold py-2 px-4 rounded-lg mt-3"
//             >
//               {editIndex !== null ? "Update Memory" : "Add Memory"}
//             </button>
//           </div>
//         </div>

//         {/* Display Memories*/}
//         <div className="space-y-6">
//           {memories.length === 0 ? (
//             <p className="text-center text-gray-500">
//               No memories yet. Start writing your story!
//             </p>
//           ) : (
//             memories.map((m, i) => (
//               <div
//                 key={m._id}
//                 className="bg-white shadow-md rounded-xl p-6 border-l-4 border-amber-600 hover:shadow-lg transition"
//               >
//                 <div className="flex justify-between items-center">
//                   <h4 className="text-xl font-semibold text-amber-800">
//                     {m.title}
//                   </h4>

//                   <div className="flex gap-2">
//                     <button
//                       onClick={() => {
//                         setEditIndex(i);
//                         setForm(m);
//                       }}
//                       className="text-blue-600 hover:text-blue-800"
//                     >
//                       <Edit2 size={18} />
//                     </button>

//                     <button
//                       onClick={() => handleDelete(m._id)}
//                       className="text-red-500 hover:text-red-700"
//                     >
//                       <Trash2 size={18} />
//                     </button>
//                   </div>
//                 </div>

//                 <p className="text-gray-500 text-sm mt-1">{m.date}</p>

//                 {m.photo && (
//                   <img
//                     src={m.photo}
//                     alt="memory"
//                     className="w-full max-h-60 object-cover rounded-lg my-3"
//                   />
//                 )}

//                 <p className="text-gray-700">{m.description}</p>
//               </div>
//             ))
//           )}
//         </div>
//       </div>

//       <footer className="text-center py-4 text-gray-600">
//         © 2025 RetireWell Platform
//       </footer>
//     </div>
//   );
// };

// export default Story;

import React, { useState, useEffect } from "react";
import { Calendar, Edit2, Trash2, ImagePlus } from "lucide-react";
import Navbar from "./Navbar";

const BASE_URL = "http://localhost:5000/api/story";

const Story = () => {
  const token = localStorage.getItem("token");

  const [memories, setMemories] = useState([]);
  const [lifeBook, setLifeBook] = useState(null);
  const [loadingLifeBook, setLoadingLifeBook] = useState(false);

  const [form, setForm] = useState({
    title: "",
    description: "",
    photo: "",
    date: "",
  });

  const [editIndex, setEditIndex] = useState(null);

  // ================= FETCH STORIES =================
  const fetchStories = async () => {
    try {
      const res = await fetch(`${BASE_URL}/getAllStories`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();
      setMemories(Array.isArray(data) ? data : []); 
    } catch (err) {
      console.log("Error fetching stories:", err);
    }
  };

  useEffect(() => {
    fetchStories();
  }, []);

  // ================= FORM HANDLER =================
  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "photo" && files[0]) {
      const reader = new FileReader();
      reader.onloadend = () => setForm({ ...form, photo: reader.result });
      reader.readAsDataURL(files[0]);
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  // ================= ADD STORY =================
  const addStory = async () => {
    const res = await fetch(`${BASE_URL}/addStory`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(form),
    });

    if (res.ok) {
      fetchStories();
      setForm({ title: "", date: "", description: "", photo: "" });
    }
  };

  // ================= UPDATE STORY =================
  const updateStory = async (id) => {
    const res = await fetch(`${BASE_URL}/edit/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(form),
    });

    if (res.ok) {
      fetchStories();
      setEditIndex(null);
      setForm({ title: "", date: "", description: "", photo: "" });
    }
  };

  // ================= DELETE STORY =================
  const handleDelete = async (id) => {
    await fetch(`${BASE_URL}/delete/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    fetchStories();
  };

  const handleSubmit = () => {
    if (!form.title || !form.date || !form.description) {
      alert("All fields required");
      return;
    }

    editIndex !== null
      ? updateStory(memories[editIndex]._id)
      : addStory();
  };

  // ================= GENERATE LIFEBOOK =================
  const generateLifeBook = async () => {
    if (memories.length === 0) return alert("Add memories first");

    try {
      setLoadingLifeBook(true);

      const res = await fetch(`${BASE_URL}/generateLifeBook`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ memories }),
      });

      const data = await res.json();

      if (res.ok) {
        setLifeBook(data.autobiography);
        window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
      }
    } catch (err) {
      console.log(err);
    } finally {
      setLoadingLifeBook(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-100">
      <Navbar />

      <div className="max-w-5xl mx-auto py-10 px-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold text-amber-800">🕰️ My Life Story</h2>

          <button
            onClick={generateLifeBook}
            disabled={loadingLifeBook}
            className="bg-purple-600 text-white px-6 py-2 rounded-full disabled:opacity-50"
          >
            📘 Generate LifeBook
          </button>
        </div>

        {/* ================= ADD MEMORY ================= */}
        <div className="bg-white p-6 rounded-xl shadow mb-10">
          <input
            type="text"
            name="title"
            placeholder="Title"
            value={form.title}
            onChange={handleChange}
            className="border p-2 w-full mb-2"
          />

          <input
            type="date"
            name="date"
            value={form.date}
            onChange={handleChange}
            className="border p-2 w-full mb-2"
          />

          <textarea
            name="description"
            placeholder="Memory description"
            value={form.description}
            onChange={handleChange}
            className="border p-2 w-full mb-2"
          />
          
          <input type="file" name="photo" onChange={handleChange} />

          <button
            onClick={handleSubmit}
            className="mt-3 bg-amber-600 text-white px-4 py-2 rounded"
          >
            {editIndex !== null ? "Update" : "Add"} Memory
          </button>
        </div>

        {/* ================= MEMORIES ================= */}
        {memories.map((m, i) => (
          <div key={m._id} className="bg-white p-5 rounded-xl shadow mb-5">
            <div className="flex justify-between">
              <h3 className="font-bold text-xl">{m.title}</h3>
              <div className="flex gap-2">
                <Edit2
                  onClick={() => {
                    setEditIndex(i);
                    setForm(m);
                  }}
                  className="cursor-pointer"
                />
                <Trash2
                  onClick={() => handleDelete(m._id)}
                  className="cursor-pointer text-red-500"
                />
              </div>
            </div>

            <p className="text-sm text-gray-500">{m.date}</p>

        {m.photo && (
  <img
    src={m.photo}
    alt="Memory"
    className="my-3 w-full max-w-md h-auto rounded-lg object-cover"
  />
)}


            <p>{m.description}</p>
          </div>
        ))}

        {/* ================= LIFEBOOK DISPLAY ================= */}
        {lifeBook && (
          <div className="mt-12 bg-white p-8 rounded-2xl shadow-xl border-t-4 border-purple-600">
            <h2 className="text-3xl font-bold text-center text-purple-700 mb-6">
              📖 My LifeBook
            </h2>

            {lifeBook.chapters.map((c, i) => (
              <div key={i} className="mb-6">
                <h3 className="text-xl font-semibold text-amber-800">
                  {c.title}
                </h3>
                <p className="text-gray-700 whitespace-pre-line">
                  {c.content}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Story;


