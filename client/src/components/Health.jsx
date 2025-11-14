// import React, { useState, useEffect } from "react";
// import { Calendar, HeartPulse, BellRing, Share2, PlusCircle } from "lucide-react";
// import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from "recharts";
// import Navbar from "./Navbar";

// const Health = () => {
//   const [healthData, setHealthData] = useState({
//     age: "",
//     weight: "",
//     bp: "",
//     sugar: "",
//   });

//   const [records, setRecords] = useState([]);
//   const [reminders, setReminders] = useState([]);
//   const [newReminder, setNewReminder] = useState({ title: "", date: "" });

//   const handleHealthChange = (e) => {
//     const { name, value } = e.target;
//     setHealthData({ ...healthData, [name]: value });
//   };

//   const addRecord = () => {
//     if (!healthData.weight || !healthData.bp || !healthData.sugar)
//       return alert("Please fill all health fields!");
//     setRecords([...records, { ...healthData, date: new Date().toLocaleDateString() }]);
//     setHealthData({ ...healthData, weight: "", bp: "", sugar: "" });
//   };

//   const addReminder = () => {
//     if (!newReminder.title || !newReminder.date)
//       return alert("Please enter reminder details!");
//     setReminders([...reminders, newReminder]);
//     setNewReminder({ title: "", date: "" });
//   };

//   const dataForChart = records.map((r, i) => ({
//     name: `Day ${i + 1}`,
//     Weight: parseFloat(r.weight),
//     Sugar: parseFloat(r.sugar),
//   }));

// //   Here, r.weight and r.sugar are still strings (e.g., "60", "95") because they came from healthData → setRecords → records

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100">
//      <Navbar/>
     

//       <div className="max-w-5xl mx-auto py-10 px-6">
//         <h2 className="text-3xl font-bold text-center text-emerald-800 mb-8">
//           💚 My Health Tracker
//         </h2>

//         {/* Health Data Input */}
//         <div className="bg-white rounded-2xl shadow-lg p-6 mb-10">
//           <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
//             <HeartPulse size={20} className="text-emerald-600" /> Daily Health Info
//           </h3>

//           <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
//             <input
//               type="number"
//               name="age"
//               placeholder="Age"
//               value={healthData.age}
//               onChange={handleHealthChange}
//               className="border p-2 rounded-lg"
//             />
//             <input
//               type="number"
//               name="weight"
//               placeholder="Weight (kg)"
//               value={healthData.weight}
//               onChange={handleHealthChange}
//               className="border p-2 rounded-lg"
//             />
//             <input
//               type="text"
//               name="bp"
//               placeholder="Blood Pressure (e.g., 120/80)"
//               value={healthData.bp}
//               onChange={handleHealthChange}
//               className="border p-2 rounded-lg"
//             />
//             <input
//               type="number"
//               name="sugar"
//               placeholder="Sugar (mg/dL)"
//               value={healthData.sugar}
//               onChange={handleHealthChange}
//               className="border p-2 rounded-lg"
//             />
//           </div>

//           <button
//             onClick={addRecord}
//             className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-2 px-4 rounded-lg mt-4"
//           >
//             Save Record
//           </button>
//         </div>

//         {/* Chart Section */}
//         {records.length > 0 && (
//           <div className="bg-white rounded-2xl shadow-lg p-6 mb-10">
//             <h3 className="text-xl font-semibold mb-4 text-emerald-700">📈 Weekly Health Summary</h3>
//             <ResponsiveContainer width="100%" height={300}>
//               <LineChart data={dataForChart}>
//                 <CartesianGrid strokeDasharray="3 3" />
//                 <XAxis dataKey="name" />
//                 <YAxis />
//                 <Tooltip />
//                 <Line type="monotone" dataKey="Weight" stroke="#10b981" strokeWidth={2} />
//                 <Line type="monotone" dataKey="Sugar" stroke="#f97316" strokeWidth={2} />
//               </LineChart>
//             </ResponsiveContainer>

//             <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg mt-4 flex items-center gap-2">
//               <Share2 size={18} /> Share with Doctor
//             </button>
//           </div>
//         )}

//         {/* Medication / Appointment Reminders */}
//         <div className="bg-white rounded-2xl shadow-lg p-6">
//           <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
//             <BellRing size={20} className="text-amber-600" /> Medication & Appointments
//           </h3>

//           <div className="flex flex-col md:flex-row gap-3 mb-4">
//             <input
//               type="text"
//               placeholder="Reminder Title"
//               value={newReminder.title}
//               onChange={(e) => setNewReminder({ ...newReminder, title: e.target.value })}
//               className="border p-2 rounded-lg flex-1"
//             />
//             <div className="flex items-center gap-2">
//               <Calendar size={18} />
//               <input
//                 type="date"
//                 value={newReminder.date}
//                 onChange={(e) => setNewReminder({ ...newReminder, date: e.target.value })}
//                 className="border p-2 rounded-lg"
//               />
//             </div>
//             <button
//               onClick={addReminder}
//               className="bg-amber-500 hover:bg-amber-600 text-white font-semibold py-2 px-4 rounded-lg flex items-center gap-2"
//             >
//               <PlusCircle size={18} /> Add
//             </button>
//           </div>

//           <ul className="space-y-2">
//             {reminders.length === 0 ? (
//               <p className="text-gray-500">No reminders yet. Add one to get started!</p>
//             ) : (
//               reminders.map((r, i) => (
//                 <li
//                   key={i}
//                   className="p-3 border rounded-lg flex justify-between items-center bg-emerald-50"
//                 >
//                   <span>
//                     <strong>{r.title}</strong> — {r.date}
//                   </span>
//                 </li>
//               ))
//             )}
//           </ul>
//         </div>
//       </div>

//       <footer className="text-center py-4 text-gray-600">
//         © 2025 RetireWell Platform
//       </footer>
//     </div>
//   );
// };

// export default Health;

import React, { useState, useEffect } from "react";
import {
  Calendar,
  HeartPulse,
  BellRing,
  Share2,
  PlusCircle,
} from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import Navbar from "./Navbar";


const HEALTH_URL = "http://localhost:5000/api/health"; 

const Health = () => {
  const [healthData, setHealthData] = useState({
    age: "",
    weight: "",
    bp: "",
    sugar: "",
  });

  const [records, setRecords] = useState([]);
  const [reminders, setReminders] = useState([]);
  const [newReminder, setNewReminder] = useState({ title: "", date: "" });

  
  // FETCH HEALTH RECORDS FROM BACKEND

  const fetchRecords = async () => {
    try {
      const res = await fetch(`${HEALTH_URL}/getAllRecord`);
      const data = await res.json();
      setRecords(data);
    } catch (error) {
      console.log("Error fetching records:", error);
    }
  };

  
  // FETCH REMINDERS FROM BACKEND
  const fetchReminders = async () => {
    try {
      const res = await fetch(`${HEALTH_URL}/getAllReminder`);
      const data = await res.json();
      setReminders(data);
    } catch (error) {
      console.log("Error fetching reminders:", error);
    }
  };

  // Load on mount
  useEffect(() => {
    fetchRecords();
    fetchReminders();
  }, []);


  const handleHealthChange = (e) => {
    const { name, value } = e.target;
    setHealthData({ ...healthData, [name]: value });
  };

  
  // ADD HEALTH RECORD 

  const addRecord = async () => {
    if (!healthData.weight || !healthData.bp || !healthData.sugar)
      return alert("Please fill all health fields!");

    const payload = {
      ...healthData,
      date: new Date().toISOString(),
    };

    try {
      const res = await fetch(`${HEALTH_URL}/addRecord`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (res.ok) {
        alert("Health record saved!");
        fetchRecords(); // refresh list
        setHealthData({ age: "", weight: "", bp: "", sugar: "" });
      } else {
        alert(data.message || "Error saving record");
      }
    } catch (err) {
      console.log("Add record error:", err);
    }
  };


  // ADD REMINDER (POST)
  
  const addReminder = async () => {
    if (!newReminder.title || !newReminder.date)
      return alert("Please enter reminder details!");

    try {
      const res = await fetch(`${HEALTH_URL}/addReminder`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newReminder),
      });

      const data = await res.json();

      if (res.ok) {
        alert("Reminder added!");
        fetchReminders();
        setNewReminder({ title: "", date: "" });
      } else {
        alert(data.message);
      }
    } catch (err) {
      console.log("Add reminder error:", err);
    }
  };

  
  // CHART DATA PROCESSING
  
  const dataForChart = records.map((r, i) => ({
    name: `Day ${i + 1}`,
    Weight: parseFloat(r.weight),
    Sugar: parseFloat(r.sugar),
  }));

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100">
      <Navbar />

      <div className="max-w-5xl mx-auto py-10 px-6">
        <h2 className="text-3xl font-bold text-center text-emerald-800 mb-8">
          💚 My Health Tracker
        </h2>

        {/* Health Data Input */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-10">
          <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <HeartPulse size={20} className="text-emerald-600" /> Daily Health
            Info
          </h3>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <input
              type="number"
              name="age"
              placeholder="Age"
              value={healthData.age}
              onChange={handleHealthChange}
              className="border p-2 rounded-lg"
            />
            <input
              type="number"
              name="weight"
              placeholder="Weight (kg)"
              value={healthData.weight}
              onChange={handleHealthChange}
              className="border p-2 rounded-lg"
            />
            <input
              type="text"
              name="bp"
              placeholder="Blood Pressure (120/80)"
              value={healthData.bp}
              onChange={handleHealthChange}
              className="border p-2 rounded-lg"
            />
            <input
              type="number"
              name="sugar"
              placeholder="Sugar (mg/dL)"
              value={healthData.sugar}
              onChange={handleHealthChange}
              className="border p-2 rounded-lg"
            />
          </div>

          <button
            onClick={addRecord}
            className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-2 px-4 rounded-lg mt-4"
          >
            Save Record
          </button>
        </div>

        {/* CHART */}
        {records.length > 0 && (
          <div className="bg-white rounded-2xl shadow-lg p-6 mb-10">
            <h3 className="text-xl font-semibold mb-4 text-emerald-700">
              📈 Weekly Health Summary
            </h3>

            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={dataForChart}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="Weight"
                  stroke="#10b981"
                  strokeWidth={2}
                />
                <Line
                  type="monotone"
                  dataKey="Sugar"
                  stroke="#f97316"
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>

            <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg mt-4 flex items-center gap-2">
              <Share2 size={18} /> Share with Doctor
            </button>
          </div>
        )}

        {/* Reminders */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <BellRing size={20} className="text-amber-600" /> Medication &
            Appointments
          </h3>

          <div className="flex flex-col md:flex-row gap-3 mb-4">
            <input
              type="text"
              placeholder="Reminder Title"
              value={newReminder.title}
              onChange={(e) =>
                setNewReminder({ ...newReminder, title: e.target.value })
              }
              className="border p-2 rounded-lg flex-1"
            />

            <div className="flex items-center gap-2">
              <Calendar size={18} />
              <input
                type="date"
                value={newReminder.date}
                onChange={(e) =>
                  setNewReminder({ ...newReminder, date: e.target.value })
                }
                className="border p-2 rounded-lg"
              />
            </div>

            <button
              onClick={addReminder}
              className="bg-amber-500 hover:bg-amber-600 text-white font-semibold py-2 px-4 rounded-lg flex items-center gap-2"
            >
              <PlusCircle size={18} /> Add
            </button>
          </div>

          <ul className="space-y-2">
            {reminders.length === 0 ? (
              <p className="text-gray-500">
                No reminders yet. Add one to get started!
              </p>
            ) : (
              reminders.map((r, i) => (
                <li
                  key={i}
                  className="p-3 border rounded-lg flex justify-between items-center bg-emerald-50"
                >
                  <span>
                    <strong>{r.title}</strong> — {r.date}
                  </span>
                </li>
              ))
            )}
          </ul>
        </div>
      </div>

      <footer className="text-center py-4 text-gray-600">
        © 2025 RetireWell Platform
      </footer>
    </div>
  );
};

export default Health;


// {/* // User Types in "65"
// //         ↓
// // onChange → handleHealthChange()
// //         ↓
// // setHealth({...health, age: "65"})
// //         ↓
// // Component re-renders
// //         ↓
// // value={health.age} → shows "65" again in input */}

// {/* Tooltip */}
// {/* When you hover on a point in the chart, a tooltip pops up showing the value. */}
