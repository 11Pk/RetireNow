import React, { useState, useEffect } from "react";
import { Calendar, Edit2, Trash2, ImagePlus } from "lucide-react";
import Navbar from "./Navbar";

const BASE_URL = "http://localhost:5000/api/story"; 

const Story = () => {
  const [form, setForm] = useState({
    title: "",
    description: "",
    photo: "",
    date: "",
  });

  const [memories, setMemories] = useState([]);
  const [editIndex, setEditIndex] = useState(null);

  //FETCH ALL STORIES 
  const fetchStories = async () => {
    try {
      const res = await fetch(`${BASE_URL}/getAllStories`);
      const data = await res.json();
      setMemories(data);
    } catch (err) {
      console.log("Error fetching stories:", err);
    }
  };

  useEffect(() => {
    fetchStories();
  }, []);

 
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "photo") {
      const reader = new FileReader();
      reader.onloadend = () => setForm({ ...form, photo: reader.result });
      reader.readAsDataURL(files[0]);
    } else {
      setForm({ ...form, [name]: value });
    }
  };

 //add new post
  const addStory = async () => {
    try {
      const response = await fetch(`${BASE_URL}/addStory`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await response.json();

      if (response.ok) {
        alert("Story added!");
        fetchStories();
        setForm({ title: "", date: "", description: "", photo: "" });
      } else {
        alert(data.message || "Something went wrong");
      }
    } catch (err) {
      console.log("Add story error:", err);
    }
  };

  //update story
  const updateStory = async (id) => {
    try {
      const response = await fetch(`${BASE_URL}/edit/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (response.ok) {
        alert("Story updated!");
        fetchStories();
        setEditIndex(null);
        setForm({ title: "", date: "", description: "", photo: "" });
      }
    } catch (err) {
      console.log("Update story error:", err);
    }
  };

  
  const handleDelete = async (id) => {
    try {
      const response = await fetch(`${BASE_URL}/delete/${id}`, {
        method: "DELETE",
      });

      if (response.ok) fetchStories();
    } catch (err) {
      console.log("Delete error:", err);
    }
  };

  
  const handleSubmit = () => {
    if (!form.title || !form.date || !form.description)
      return alert("All fields are required!");

    if (editIndex !== null) {
      updateStory(memories[editIndex]._id);
    } else {
      addStory();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-100">
      <Navbar />

      <div className="max-w-5xl mx-auto py-10 px-6">
        <h2 className="text-3xl font-bold text-center text-amber-800 mb-6">
          🕰️ My Life Story
        </h2>

        {/* Add/Edit Story */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-10">
          <h3 className="text-xl font-semibold mb-4">
            {editIndex !== null ? "Edit Memory" : "Add New Memory"}
          </h3>

          <div className="grid gap-3">
            <input
              type="text"
              name="title"
              placeholder="Memory Title"
              value={form.title}
              onChange={handleChange}
              className="border p-2 rounded-lg"
            />

            <div className="flex items-center gap-2">
              <Calendar size={18} />
              <input
                type="date"
                name="date"
                value={form.date}
                onChange={handleChange}
                className="border p-2 rounded-lg flex-1"
              />
            </div>

            <textarea
              name="description"
              placeholder="Write about this memory..."
              rows={4}
              value={form.description}
              onChange={handleChange}
              className="border p-2 rounded-lg"
            ></textarea>

            <label className="flex items-center gap-2 cursor-pointer">
              <ImagePlus size={18} />
              <span>Add Photo</span>
              <input
                type="file"
                name="photo"
                onChange={handleChange}
                className="hidden"
              />
            </label>

            {form.photo && (
              <img
                src={form.photo}
                alt="Preview"
                className="w-40 h-40 object-cover rounded-lg mt-2 border"
              />
            )}

            <button
              onClick={handleSubmit}
              className="bg-amber-600 hover:bg-amber-700 text-white font-semibold py-2 px-4 rounded-lg mt-3"
            >
              {editIndex !== null ? "Update Memory" : "Add Memory"}
            </button>
          </div>
        </div>

        {/* Display Memories */}
        <div className="space-y-6">
          {memories.length === 0 ? (
            <p className="text-center text-gray-500">
              No memories yet. Start writing your story!
            </p>
          ) : (
            memories.map((m, i) => (
              <div
                key={m._id}
                className="bg-white shadow-md rounded-xl p-6 border-l-4 border-amber-600 hover:shadow-lg transition"
              >
                <div className="flex justify-between items-center">
                  <h4 className="text-xl font-semibold text-amber-800">
                    {m.title}
                  </h4>

                  <div className="flex gap-2">
                    <button
                      onClick={() => {
                        setEditIndex(i);
                        setForm(m);
                      }}
                      className="text-blue-600 hover:text-blue-800"
                    >
                      <Edit2 size={18} />
                    </button>

                    <button
                      onClick={() => handleDelete(m._id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>

                <p className="text-gray-500 text-sm mt-1">{m.date}</p>

                {m.photo && (
                  <img
                    src={m.photo}
                    alt="memory"
                    className="w-full max-h-60 object-cover rounded-lg my-3"
                  />
                )}

                <p className="text-gray-700">{m.description}</p>
              </div>
            ))
          )}
        </div>
      </div>

      <footer className="text-center py-4 text-gray-600">
        © 2025 RetireWell Platform
      </footer>
    </div>
  );
};

export default Story;
