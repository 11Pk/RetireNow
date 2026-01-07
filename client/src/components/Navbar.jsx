import React from "react";
import { Link } from "react-router-dom";
import { Heart } from "lucide-react";

const Navbar = () => {
  return (
    <nav className="sticky top-0 z-50 shadow-md bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3">
            <div
              className="
                w-12 h-12 rounded-full
                flex items-center justify-center
                bg-gradient-to-br
                from-[#061E29]
                via-[#1D546D]
                to-[#5F9598]
              "
            >
              <Heart className="text-[#EAE0CF]" size={24} />
            </div>

            <span
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
            </span>
          </Link>

          {/* Right side (future nav items) */}
          <div className="flex items-center space-x-6 text-[#061E29] font-medium">
            {/* Example */}
            {/* <Link to="/dashboard" className="hover:text-[#1D546D]">Dashboard</Link> */}
          </div>

        </div>
      </div>
    </nav>
  );
};

export default Navbar;
