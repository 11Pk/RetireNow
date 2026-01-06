import React, { useEffect, useState } from "react";

const MyJobs = () => {
  const [jobs, setJobs] = useState([]);
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/jobs/my-jobs", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setJobs(data.jobs);
        setApplications(data.applications);
      });
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
            <h2 className="text-2xl font-semibold">{job.title}</h2>

            <p>Profession: {job.profession}</p>
            <p>Location: {job.location}</p>

            <div className="mt-4 grid grid-cols-2 gap-4">
              <p><b>People Required:</b> {job.peopleRequired}</p>
              <p><b>People Hired:</b> {job.peopleHired}</p>
            </div>

            {/* Applicants Section */}
            <div className="mt-6">
              <h3 className="text-xl font-semibold mb-3">
                Applied / Hired People
              </h3>

              {applications
                .filter((app) => app.job === job._id)
                .map((app) => (
                  <div
                    key={app._id}
                    className="border p-4 rounded-lg mb-3"
                  >
                    <p><b>Name:</b> {app.applicant.name}</p>
                    <p><b>Email:</b> {app.applicant.email}</p>
                    <p><b>Phone:</b> {app.applicant.phone}</p>
                    <p><b>Status:</b> {app.status}</p>
                  </div>
                ))}

              {applications.filter((app) => app.job === job._id).length === 0 && (
                <p className="text-gray-500">
                  No one has applied yet.
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyJobs;
