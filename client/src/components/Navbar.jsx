import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-white shadow-md p-4 flex justify-between items-center">
      {/* Logo / Brand */}
      <h1
  className="
    text-2xl font-bold
    bg-gradient-to-br
    from-[#061E29]
    via-[#1D546D]
    to-[#5F9598]
    bg-clip-text
    text-transparent
  "
>
  RetireWell
</h1>


      {/* Navigation Links
      <div className="space-x-6">
        <Link
          to="/"
          className="text-gray-600 hover:text-amber-700"
        >
          Home
        </Link>

        <Link
          to="/story"
          className="text-gray-600 hover:text-amber-700 font-semibold"
        >
          My Story
        </Link>

        <Link
          to="/community"
          className="text-gray-600 hover:text-amber-700"
        >
          Community
        </Link>

        <Link
          to="/health"
          className="text-gray-600 hover:text-amber-700"
        >
          Health
        </Link>
      </div> */}
    </nav>
  );
};

export default Navbar;
