// MyJobs.jsx
import React, { useEffect, useState } from "react";

const MyJobs = () => {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/jobs/my-jobs", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => setJobs(data.jobs));
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 p-10">
      <h1 className="text-3xl font-bold mb-8 text-gray-900">
        My Registered Jobs
      </h1>

      <div className="space-y-6">
        {jobs.map((job) => (
          <div
            key={job._id}
            className="bg-white p-6 rounded-2xl shadow-lg"
          >
            <h2 className="text-2xl font-semibold text-gray-900">
              {job.title}
            </h2>

            <p className="text-gray-600">
              Profession: {job.profession}
            </p>

            <p className="text-gray-600">
              Location: {job.location}
            </p>

            <div className="mt-4 grid grid-cols-2 gap-4">
              <p className="font-semibold">
                People Required: {job.peopleRequired}
              </p>

              <p className="font-semibold">
                People Hired: {job.peopleHired}
              </p>
            </div>
          </div>
        ))}

        {jobs.length === 0 && (
          <p className="text-gray-600 text-lg">
            You have not posted any jobs yet.
          </p>
        )}
      </div>
    </div>
  );
};

export default MyJobs;
