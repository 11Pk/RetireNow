// import React, { useState } from "react";
// import {
//   Heart,
//   Search,
//   BookmarkPlus,
//   Clock,
//   DollarSign,
//   CheckCircle,
//   MapPin,
// } from "lucide-react";

// const mockJobs = [
//   {
//     id: 1,
//     title: "Online Homework Assistant",
//     employer: "EduCare",
//     description:
//       "Help school students with homework for a few hours a week.",
//     city: "Remote",
//     type: "Part-time",
//     pay: "₹400/hr",
//   },
//   {
//     id: 2,
//     title: "Community Garden Helper",
//     employer: "Green Society",
//     description:
//       "Guide local residents on gardening and plant care.",
//     city: "Nearby",
//     type: "Flexible",
//     pay: "₹350/hr",
//   },
// ];

// const MicroJobs = () => {
//   const [searchTerm, setSearchTerm] = useState("");
//   const [savedJobs, setSavedJobs] = useState([]);

//   const toggleSave = (id) => {
//     setSavedJobs((prev) =>
//       prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
//     );
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      
//       {/* Navbar */}
//       <nav className="bg-white shadow-md">
//         <div className="max-w-7xl mx-auto px-6 py-5 flex justify-between items-center">
//           <div className="flex items-center gap-3">
//             <div className="w-10 h-10 bg-purple-600 rounded-full flex items-center justify-center">
//               <Heart className="text-white" />
//             </div>
//             <span className="text-2xl font-bold text-purple-600">
//               RetireWell
//             </span>
//           </div>
//         </div>
//       </nav>

//       {/* Content */}
//       <div className="max-w-7xl mx-auto px-6 py-12">

//         {/* Heading */}
//         <h1 className="text-4xl font-bold text-gray-900 mb-2">
//           Microjobs for You
//         </h1>
//         <p className="text-gray-600 text-lg mb-8">
//           Light-burdened, skill-matched opportunities
//         </p>

//         {/* Search Bar */}
//         <div className="relative max-w-xl mb-10">
//           <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
//           <input
//             type="text"
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//             placeholder="Search by profession (teacher, gardener...)"
//             className="w-full pl-12 pr-4 py-4 border-2 border-gray-300 rounded-xl focus:outline-none focus:border-purple-500"
//           />
//         </div>

//         {/* Job Cards */}
//         <div className="grid md:grid-cols-2 gap-6">
//           {mockJobs.map((job) => (
//             <div
//               key={job.id}
//               className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition"
//             >
//               <div className="flex justify-between items-start mb-4">
//                 <div>
//                   <h3 className="text-2xl font-semibold text-gray-900">
//                     {job.title}
//                   </h3>
//                   <p className="text-gray-600">{job.employer}</p>
//                 </div>

//                 <button
//                   onClick={() => toggleSave(job.id)}
//                   className={`p-2 rounded-full ${
//                     savedJobs.includes(job.id)
//                       ? "bg-purple-100 text-purple-600"
//                       : "bg-gray-100 text-gray-400"
//                   }`}
//                 >
//                   <BookmarkPlus />
//                 </button>
//               </div>

//               <p className="text-gray-700 mb-4">
//                 {job.description}
//               </p>

//               <div className="grid grid-cols-2 gap-4 text-gray-600 mb-5">
//                 <div className="flex items-center gap-2">
//                   <MapPin size={18} /> {job.city}
//                 </div>
//                 <div className="flex items-center gap-2">
//                   <Clock size={18} /> {job.type}
//                 </div>
//                 <div className="flex items-center gap-2">
//                   <DollarSign size={18} /> {job.pay}
//                 </div>
//               </div>

//               <button className="w-full py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl font-semibold flex items-center justify-center gap-2">
//                 <CheckCircle size={18} />
//                 Apply Now
//               </button>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default MicroJobs;
import React, { useState, useEffect } from "react";
import {
  Heart,
  Search,
  BookmarkPlus,
  Clock,
  CheckCircle,
  MapPin,
} from "lucide-react";

const MicroJobs = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [savedJobs, setSavedJobs] = useState([]);
  const [jobs, setJobs] = useState([]);
  const [appliedJobs, setAppliedJobs] = useState([]);

useEffect(() => {
  fetch("http://localhost:5000/api/jobs/applied", {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  })
    .then((res) => res.json())
    .then((data) =>
      setAppliedJobs(data.applications.map((a) => a.job._id))
    );
}, []);


  useEffect(() => {
    fetch("http://localhost:5000/api/jobs", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => setJobs(data.jobs));
  }, []);

  const toggleSave = (id) => {
    setSavedJobs((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };


  const applyJob = async (jobId) => {
  const res = await fetch(
    `http://localhost:5000/api/jobs/apply/${jobId}`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }
  );

  const data = await res.json();
  alert(data.message);
};


  const filteredJobs = jobs.filter(
    (job) =>
      job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.profession.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">

      <nav className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-6 py-5 flex items-center gap-3">
          <div className="w-10 h-10 bg-purple-600 rounded-full flex items-center justify-center">
            <Heart className="text-white" />
          </div>
          <span className="text-2xl font-bold text-purple-600">
            RetireWell
          </span>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-6 py-12">

        <h1 className="text-4xl font-bold text-gray-900 mb-2">
          Microjobs for You
        </h1>
        <p className="text-gray-600 text-lg mb-8">
          Light-burdened, skill-matched opportunities
        </p>

        <div className="relative max-w-xl mb-10">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by profession (teacher, gardener...)"
            className="w-full pl-12 pr-4 py-4 border-2 border-gray-300 rounded-xl"
          />
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {jobs.map((job) => (
            <div
              key={job._id}
              className="bg-white rounded-2xl shadow-lg p-6"
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-2xl font-semibold">
                    {job.title}
                  </h3>
                  <p className="text-gray-600">
                    Posted by: {job.postedBy.name}
                  </p>
                </div>

                <button
                  onClick={() => toggleSave(job._id)}
                  className={`p-2 rounded-full ${
                    savedJobs.includes(job._id)
                      ? "bg-purple-100 text-purple-600"
                      : "bg-gray-100 text-gray-400"
                  }`}
                >
                  <BookmarkPlus />
                </button>
              </div>

              <p className="text-gray-700 mb-4">
                {job.description}
              </p>

              <div className="grid grid-cols-2 gap-4 text-gray-600 mb-5">
                <div className="flex items-center gap-2">
                  <MapPin size={18} /> {job.location}
                </div>
                <div className="flex items-center gap-2">
                  <Clock size={18} /> Flexible
                </div>
                <div>
                  Needed: {job.peopleRequired - job.peopleHired}
                </div>
              </div>

           <button
  disabled={appliedJobs.includes(job._id)}
  onClick={() => applyJob(job._id)}
  className={`w-full py-3 rounded-xl font-semibold ${
    appliedJobs.includes(job._id)
      ? "bg-gray-400 cursor-not-allowed"
      : "bg-purple-600 text-white"
  }`}
>
  {appliedJobs.includes(job._id) ? "Applied" : "Apply Now"}
</button>

            </div>
          ))}
        </div>

        {filteredJobs.length === 0 && (
          <p className="text-gray-600 text-lg mt-10 text-center">
            No jobs found.
          </p>
        )}
      </div>
    </div>
  );
};

export default MicroJobs;

