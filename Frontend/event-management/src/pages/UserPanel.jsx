import React, { useEffect, useState } from "react";
import Navbar from "../pages/Navbar";
import axios from "axios";


const UserPanel = () => {
  const userName = localStorage.getItem("name") || "User";

  const [events, setEvents] = useState([]);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    const res = await axios.get("http://127.0.0.1:8000/events/");
    setEvents(res.data);
  };

  return (
    // <div className="h-screen bg-gray-100">
    //   <Navbar userName={userName} />
    //   <div className="p-6">
    //     <h2 className="text-2xl font-bold">Welcome to User Panel</h2>
    //   </div>
    // </div>
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white p-6">
      <Navbar userName={userName} />
      <h1 className="text-4xl font-extrabold text-center mb-10 bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-blue-500 drop-shadow-lg">
        🌟 Upcoming Events
      </h1>
      

      {events.length === 0 ? (
        <p className="text-center text-gray-400 text-lg">No events available</p>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {events.map((event) => (
            <div
              key={event.id}
              className="bg-gray-800 rounded-2xl shadow-lg overflow-hidden transform hover:scale-105 transition duration-300"
            >
              {/* Event Image */}
              <div className="h-48 w-full overflow-hidden">
                {event.image_url ? (
                  <img
                    src={`http://127.0.0.1:8000${event.image_url}`}
                    alt={event.title}
                    className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                  />
                ) : (
                  <div className="flex items-center justify-center h-full text-gray-500">
                    No Image
                  </div>
                )}
              </div>

              {/* Event Content */}
              <div className="p-5">
                <h2 className="text-2xl font-bold mb-2 text-green-400">
                  {event.title}
                </h2>
                <p className="text-gray-300 mb-3">
                  {event.description?.length > 80
                    ? event.description.substring(0, 80) + "..."
                    : event.description}
                </p>

                <div className="flex justify-between items-center text-sm text-gray-400">
                  <span>📅 {event.date}</span>
                  <span>⏰ {event.time}</span>
                </div>

                {/* <button className="mt-4 w-full bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white py-2 px-4 rounded-lg transition">
                  View Details
                </button> */}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default UserPanel;
