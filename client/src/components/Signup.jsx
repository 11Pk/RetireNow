// import React, { useState } from 'react';
// import { Heart } from 'lucide-react';
// import { useNavigate } from "react-router-dom";

// const Signup = () => {
//   const navigate = useNavigate();
//   const [formData, setFormData] = useState({
//     name: '',
//     email: '',
//     password: '',
//     confirmPassword: ''
//   });
//   const [errors, setErrors] = useState({});

//   const validateForm = () => {
//     const newErrors = {};
//     if (!formData.name) newErrors.name = 'Name is required';
//     if (!formData.email) {
//       newErrors.email = 'Email is required';
//     } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
//       newErrors.email = 'Email is invalid';
//     }
//     if (!formData.password) {
//       newErrors.password = 'Password is required';
//     } else if (formData.password.length < 8) {
//       newErrors.password = 'Password must be at least 8 characters';
//     }
//     if (formData.password !== formData.confirmPassword) {
//       newErrors.confirmPassword = 'Passwords do not match';
//     }
//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

// const handleSubmit = async () => {
//   if (!validateForm()) return;

//   const response = await fetch("http://localhost:5000/api/auth/signup", {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify(formData),
//   });

//   const data = await response.json();
//   alert(data.message);

//   if (data.message === "Signup successful") {
//     navigate("/");
//   }
// };


//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 flex items-center justify-center px-4 py-12">
//       <div className="max-w-md w-full">
//         <div className="text-center mb-8">
//           <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full mb-4">
//             <Heart className="text-white" size={32} />
//           </div>
//           <h1 className="text-4xl font-bold text-gray-900 mb-2">Join RetireWell</h1>
//           <p className="text-lg text-gray-600">Start your new chapter today</p>
//         </div>

//         <div className="bg-white rounded-2xl shadow-xl p-8">
//           <div className="space-y-6">
//             <div>
//               <label className="block text-lg font-semibold text-gray-700 mb-2">Full Name</label>
//               <input
//                 type="text"
//                 value={formData.name}
//                 onChange={(e) => setFormData({ ...formData, name: e.target.value })}
//                 className="w-full px-4 py-4 text-lg border-2 border-gray-300 rounded-xl focus:border-purple-500 focus:outline-none transition"
//                 placeholder="John Doe"
//               />
//               {errors.name && <p className="text-red-500 text-sm mt-2">{errors.name}</p>}
//             </div>

//             <div>
//               <label className="block text-lg font-semibold text-gray-700 mb-2">Email Address</label>
//               <input
//                 type="email"
//                 value={formData.email}
//                 onChange={(e) => setFormData({ ...formData, email: e.target.value })}
//                 className="w-full px-4 py-4 text-lg border-2 border-gray-300 rounded-xl focus:border-purple-500 focus:outline-none transition"
//                 placeholder="your.email@example.com"
//               />
//               {errors.email && <p className="text-red-500 text-sm mt-2">{errors.email}</p>}
//             </div>

//             <div>
//               <label className="block text-lg font-semibold text-gray-700 mb-2">Password</label>
//               <input
//                 type="password"
//                 value={formData.password}
//                 onChange={(e) => setFormData({ ...formData, password: e.target.value })}
//                 className="w-full px-4 py-4 text-lg border-2 border-gray-300 rounded-xl focus:border-purple-500 focus:outline-none transition"
//                 placeholder="At least 8 characters"
//               />
//               {errors.password && <p className="text-red-500 text-sm mt-2">{errors.password}</p>}
//             </div>

//             <div>
//               <label className="block text-lg font-semibold text-gray-700 mb-2">Confirm Password</label>
//               <input
//                 type="password"
//                 value={formData.confirmPassword}
//                 onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
//                 className="w-full px-4 py-4 text-lg border-2 border-gray-300 rounded-xl focus:border-purple-500 focus:outline-none transition"
//                 placeholder="Re-enter your password"
//               />
//               {errors.confirmPassword && <p className="text-red-500 text-sm mt-2">{errors.confirmPassword}</p>}
//             </div>

//             <button
//               onClick={handleSubmit}
//               className="w-full py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl text-lg font-semibold hover:shadow-lg transform hover:scale-105 transition"
//             >
//               Create Account
//             </button>
//           </div>

//           <div className="mt-6 text-center">
//             <p className="text-gray-600">
//               Already have an account?{' '}
//               <button onClick={() => navigate('/login')} className="text-purple-600 font-semibold hover:text-purple-700">
//                 Sign In
//               </button>
//             </p>
//           </div>
//         </div>

//         <button onClick={() => navigate('/')} className="mt-6 w-full py-3 text-gray-600 hover:text-gray-900 font-semibold">
//           ← Back to Home
//         </button>
//       </div>
//     </div>
//   );
// };

// export default Signup;
// Signup.jsx
import React, { useState } from "react";
import { Heart } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    age: "",
    phone: "",
  });

  const handleSubmit = async () => {
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    const response = await fetch("http://localhost:5000/api/auth/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    const data = await response.json();
    alert(data.message);

    if (data.success) {
      navigate("/login");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-purple-50">
      <div className="bg-white p-8 rounded-xl shadow-xl w-full max-w-md">
        <div className="text-center mb-6">
          <Heart className="mx-auto text-purple-600" size={40} />
          <h2 className="text-3xl font-bold">Create Account</h2>
        </div>

        {["name", "email", "password", "confirmPassword", "age", "phone"].map(
          (field) => (
            <input
              key={field}
              type={field === "password" || field === "confirmPassword" ? "password" : field === "age" ? "number" : "text"}
              placeholder={field.toUpperCase()}
              value={formData[field]}
              onChange={(e) =>
                setFormData({ ...formData, [field]: e.target.value })
              }
              className="w-full mb-4 p-3 border rounded-lg"
            />
          )
        )}

        <button
          onClick={handleSubmit}
          className="w-full bg-purple-600 text-white py-3 rounded-lg"
        >
          Sign Up
        </button>
      </div>
    </div>
  );
};

export default Signup;
