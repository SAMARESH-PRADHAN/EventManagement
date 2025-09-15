import React, { useState, useEffect } from "react";
import axios from "axios";

const EventManagement = () => {
  const [events, setEvents] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingEvent, setEditingEvent] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    const res = await axios.get("http://127.0.0.1:8000/events/");
    setEvents(res.data);
  };

  const handleDelete = async (id) => {
    await axios.delete(`http://127.0.0.1:8000/events/${id}`);
    fetchEvents();
    setSuccessMessage("Event deleted successfully 🗑️");

    setTimeout(() => setSuccessMessage(""), 3000);
  };

  const handleSave = async () => {
    const formData = new FormData();
    formData.append("title", editingEvent.title);
    formData.append("description", editingEvent.description);
    formData.append("date", editingEvent.date);
    formData.append("time", editingEvent.time);

    if (editingEvent.file) {
      formData.append("file", editingEvent.file);
    }

    if (editingEvent.id) {
      await axios.put(
        `http://127.0.0.1:8000/events/${editingEvent.id}`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      setSuccessMessage("Event updated successfully ✅");
    } else {
      await axios.post("http://127.0.0.1:8000/events/", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setSuccessMessage("Event added successfully 🎉");
    }

    setShowModal(false);
    setEditingEvent(null);
    fetchEvents();

    // Auto clear after 3 sec
    setTimeout(() => setSuccessMessage(""), 3000);
  };

  return (
    <div>
      <button
        onClick={() => {
          setEditingEvent({
            title: "",
            description: "",
            date: "",
            time: "",
            image_url: "",
          });
          setShowModal(true);
        }}
        className="mb-4 px-4 py-2 bg-green-600 text-white rounded"
      >
        Add Event
      </button>

      {successMessage && (
        <div className="mb-4 p-3 rounded bg-green-100 text-green-800 border border-green-400">
          {successMessage}
        </div>
      )}

      <table className="w-full border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            <th>Sno</th>
            <th>Title</th>
            <th>Desc</th>
            <th>Date</th>
            <th>Time</th>
            <th>Image</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {events.map((event, index) => (
            <tr key={event.id} className="border-b">
              <td>{index + 1}</td>
              <td>{event.title}</td>
              <td className="max-w-xs">
                <p>
                  {event.showFull
                    ? event.description
                    : event.description
                    ? event.description.split(" ").slice(0, 5).join(" ") +
                      (event.description.split(" ").length > 5 ? "..." : "")
                    : ""}
                </p>
                {event.description?.split(" ").length > 5 && (
                  <button
                    className="text-blue-600 text-sm"
                    onClick={() => {
                      setEvents((prev) =>
                        prev.map((e) =>
                          e.id === event.id
                            ? { ...e, showFull: !e.showFull }
                            : e
                        )
                      );
                    }}
                  >
                    {event.showFull ? "Show less" : "Show more"}
                  </button>
                )}
              </td>

              <td>{event.date}</td>
              <td>{event.time}</td>
              <td>
                {event.image_url ? (
                  <img
                    src={`http://127.0.0.1:8000${event.image_url}`}
                    alt="event"
                    className="w-16 h-16 object-cover"
                  />
                ) : (
                  "No Image"
                )}
              </td>
              <td>
                <button
                  onClick={() => {
                    setEditingEvent(event);
                    setShowModal(true);
                  }}
                  className="px-2 py-1 bg-blue-600 text-white rounded mr-2"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(event.id)}
                  className="px-2 py-1 bg-red-600 text-white rounded"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center">
          <div className="bg-white p-6 rounded w-96">
            <h2 className="text-xl font-bold mb-4">
              {editingEvent.id ? "Edit Event" : "Add Event"}
            </h2>
            <input
              type="text"
              placeholder="Title"
              value={editingEvent.title}
              onChange={(e) =>
                setEditingEvent({ ...editingEvent, title: e.target.value })
              }
              className="w-full mb-2 p-2 border rounded"
            />
            <textarea
              placeholder="Description"
              value={editingEvent.description}
              onChange={(e) =>
                setEditingEvent({
                  ...editingEvent,
                  description: e.target.value,
                })
              }
              className="w-full mb-2 p-2 border rounded"
            />
            <input
              type="date"
              value={editingEvent.date}
              onChange={(e) =>
                setEditingEvent({ ...editingEvent, date: e.target.value })
              }
              className="w-full mb-2 p-2 border rounded"
            />
            <input
              type="time"
              value={editingEvent.time}
              onChange={(e) =>
                setEditingEvent({ ...editingEvent, time: e.target.value })
              }
              className="w-full mb-2 p-2 border rounded"
            />
            <input
              type="file"
              placeholder="Image"
              onChange={(e) =>
                setEditingEvent({ ...editingEvent, file: e.target.files[0] })
              }
              className="w-full mb-4 p-2 border rounded"
            />
            <div className="flex justify-end">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 bg-gray-400 text-white rounded mr-2"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="px-4 py-2 bg-green-600 text-white rounded"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EventManagement;
