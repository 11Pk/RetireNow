

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
    <div className="min-h-screen bg-[#87CEEB]">
      <Navbar />

      <div className="max-w-5xl mx-auto py-10 px-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold text-[#0c1113]"> My Life Story</h2>

          <button
  onClick={generateLifeBook}
  disabled={loadingLifeBook}
  className="
    px-6 py-2 rounded-full
    text-[#EAE0CF]
    bg-[#061E29]
    hover:bg-[#1D546D]
    disabled:opacity-50
    transition-colors
  "
>
  Generate LifeBook
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
  className="
    mt-3
    px-4 py-2 rounded
    text-[#EAE0CF]
    bg-[#042734] hover:bg-[#214e60]
    transition-colors
  "
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
                  className="cursor-pointer text-[#0c1113]"
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
          <div className="mt-12 bg-white p-8 rounded-2xl shadow-xl border-t-4 border-[#0c1113]">
            <h2 className="text-3xl font-bold text-center text-[#0c1113] mb-6">
              📖 My LifeBook
            </h2>

            {lifeBook.chapters.map((c, i) => (
              <div key={i} className="mb-6">
                <h3 className="text-xl font-semibold text-[#0c1113]">
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


