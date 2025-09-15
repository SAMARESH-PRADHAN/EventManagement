import React, { useEffect, useState } from "react";
import axios from "axios";

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const fetchUsers = async () => {
    try {
      const res = await axios.get("http://127.0.0.1:8000/user/all"); // You’ll create this API
      setUsers(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  // Open modal with user data
  const handleEdit = (user) => {
    setSelectedUser(user);
    setShowModal(true);
  };

  // Save updated user
  const handleSave = async () => {
    try {
      await axios.put(
        `http://127.0.0.1:8000/user/${selectedUser.id}`,
        selectedUser
      );
      setSuccessMessage("User updated successfully ✅");
      setTimeout(() => setSuccessMessage(""), 3000);
      setShowModal(false);
      fetchUsers(); // refresh table
    } catch (err) {
      alert("Error updating user");
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://127.0.0.1:8000/user/${id}`);
      setSuccessMessage("User deleted successfully 🗑️");
      setTimeout(() => setSuccessMessage(""), 3000);
      fetchUsers(); // refresh list
    } catch (err) {
      alert("Error deleting user", err);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">User Management</h2>
      {successMessage && (
        <div className="mb-4 p-3 rounded bg-green-100 text-green-800 border border-green-400">
          {successMessage}
        </div>
      )}

      <table className="w-full border-collapse border border-gray-300">
        <thead className="bg-indigo-200">
          <tr>
            <th className="border border-gray-300 px-4 py-2">Sno</th>
            <th className="border border-gray-300 px-4 py-2">Name</th>
            <th className="border border-gray-300 px-4 py-2">Email</th>
            <th className="border border-gray-300 px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u, index) => (
            <tr key={u.id}>
              <td className="border border-gray-300 px-4 py-2">{index+1}</td>
              <td className="border border-gray-300 px-4 py-2">{u.name}</td>
              <td className="border border-gray-300 px-4 py-2">{u.email}</td>
              <td className="border border-gray-300 px-4 py-2 space-x-2">
                <button
                  onClick={() => handleEdit(u)}
                  className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(u.id)}
                  className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal for Edit */}
      {showModal && selectedUser && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40">
          <div className="bg-white p-6 rounded shadow-lg w-96">
            <h3 className="text-xl font-bold mb-4">Edit User</h3>
            <input
              type="text"
              value={selectedUser.name}
              onChange={(e) =>
                setSelectedUser({ ...selectedUser, name: e.target.value })
              }
              className="w-full p-2 border mb-3"
              placeholder="Name"
            />
            <input
              type="email"
              value={selectedUser.email}
              onChange={(e) =>
                setSelectedUser({ ...selectedUser, email: e.target.value })
              }
              className="w-full p-2 border mb-3"
              placeholder="Email"
            />
            <select
              value={selectedUser.role}
              onChange={(e) =>
                setSelectedUser({ ...selectedUser, role: e.target.value })
              }
              className="w-full p-2 border mb-3"
            >
              <option value="normal">Normal</option>
              <option value="admin">Admin</option>
            </select>

            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setShowModal(false)}
                className="bg-gray-500 text-white px-4 py-2 rounded"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="bg-green-600 text-white px-4 py-2 rounded"
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

export default UserManagement;
