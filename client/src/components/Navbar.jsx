import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-white shadow-md p-4 flex justify-between items-center">
      {/* Logo / Brand */}
      <h1 className="text-2xl font-bold text-amber-700">
        RetireWell
      </h1>

      {/* Navigation Links */}
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
      </div>
    </nav>
  );
};

export default Navbar;
