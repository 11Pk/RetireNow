import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const ProviderJobForm = () => {
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [profession, setProfession] = useState("");
  const [location, setLocation] = useState("");
  const [peopleRequired, setPeopleRequired] = useState("");

  const submitJob = async () => {
    await fetch("http://localhost:5000/api/jobs", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({
        title,
        description,
        profession,
        location,
        peopleRequired,
      }),
    });

    alert("Job submitted successfully");
    navigate("/my-jobs");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 p-10">
      <div className="max-w-2xl mx-auto bg-white p-8 rounded-2xl shadow-xl">
        <h1 className="text-3xl font-bold mb-6 text-gray-900">
          Post a Microjob
        </h1>

        <div className="space-y-4">
          <input
            type="text"
            placeholder="Job Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-3 border rounded-lg"
          />

          <textarea
            placeholder="Job Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-3 border rounded-lg"
            rows="4"
          />

          <input
            type="text"
            placeholder="Profession (Gardening, Teaching...)"
            value={profession}
            onChange={(e) => setProfession(e.target.value)}
            className="w-full p-3 border rounded-lg"
          />

          <input
            type="text"
            placeholder="Location (City / Remote)"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="w-full p-3 border rounded-lg"
          />

          <input
            type="number"
            placeholder="Number of People Required"
            value={peopleRequired}
            onChange={(e) => setPeopleRequired(e.target.value)}
            className="w-full p-3 border rounded-lg"
          />
        </div>

        <button
          onClick={submitJob}
          className="mt-6 w-full bg-purple-600 text-white py-3 rounded-lg font-semibold"
        >
          Submit Job
        </button>

        <button
          onClick={() => navigate("/my-jobs")}
          className="mt-4 w-full border border-purple-600 text-purple-600 py-3 rounded-lg font-semibold"
        >
          View My Registered Jobs
        </button>
      </div>
    </div>
  );
};

export default ProviderJobForm;
