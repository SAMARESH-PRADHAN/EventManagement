import React from "react";
import { FaUserCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Navbar = ({ userName }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear session/localStorage (where you store auth)
    localStorage.clear();
    navigate("/"); // redirect back to login
  };

  return (
    <nav className="flex justify-between items-center px-6 py-4 bg-indigo-600 text-white shadow-md">
      {/* Left Side Brand */}
      <h1 className="text-xl font-bold">Event Management System</h1>

      {/* Right Side */}
      <div className="flex items-center space-x-4">
        {/* User Icon + Name */}
        <div className="flex items-center space-x-2">
          <FaUserCircle className="text-2xl" />
          <span className="font-medium">{userName}</span>
        </div>

        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded-lg text-sm font-semibold"
        >
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
