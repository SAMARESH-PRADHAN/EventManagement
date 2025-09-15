import React, { useState } from "react";
import UserManagement from "./UserManagement";
import EventManagement from "./EventManagement";
import { useNavigate } from "react-router-dom";


const AdminPanel = () => {
  const [activePage, setActivePage] = useState("users");
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear session/localStorage (where you store auth)
    localStorage.clear();
    navigate("/"); // redirect back to login
  };


  return (
    <div className="h-screen flex flex-col">
      {/* Top Navbar */}
      <nav className="flex justify-between items-center bg-indigo-700 text-white px-6 py-3 shadow-md">
        <h1 className="text-xl font-bold">Admin Panel</h1>
        <div className="space-x-4">
          <button
            onClick={() => setActivePage("users")}
            className={`px-4 py-2 rounded ${
              activePage === "users" ? "bg-indigo-500" : "bg-indigo-800"
            }`}
          >
            User Management
          </button>
          <button
            onClick={() => setActivePage("events")}
            className={`px-4 py-2 rounded ${
              activePage === "events" ? "bg-indigo-500" : "bg-indigo-800"
            }`}
          >
            Event Management
          </button>
          <button
          onClick={handleLogout}
          className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded-lg text-sm font-semibold"
        >
          Logout
        </button>
        </div>
      </nav>

      {/* Content */}
      <div className="flex-1 p-6 bg-gray-100 overflow-y-auto">
        {activePage === "users" && <UserManagement />}
        {activePage === "events" && <EventManagement />}
      </div>
    </div>
  );
};

export default AdminPanel;
