import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://127.0.0.1:8000/user/register", {
        name,
        email,
        password,
      });
      setSuccess(true);
      setTimeout(() => {
        navigate("/login");
      }, 2000); // Redirect after 2 sec
    } catch (err) {
      alert(err.response?.data?.detail || "Signup failed!");
    }
  };

  return (
    <div className="h-screen flex justify-center items-center bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
      <div className="bg-white shadow-xl rounded-2xl p-8 w-[400px] text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">Signup</h2>

        {/* Success animation */}
        <AnimatePresence>
          {success && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1, rotate: 360 }}
              exit={{ scale: 0 }}
              transition={{ duration: 0.5 }}
              className="flex justify-center items-center mb-4"
            >
              <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-10 w-10 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="3"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {!success && (
          <form
            className="flex flex-col space-y-4"
            onSubmit={handleSignup}
          >
            <input
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 outline-none"
            />
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 outline-none"
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 outline-none"
            />
            <button
              type="submit"
              className="bg-indigo-600 text-white p-3 rounded-lg font-semibold hover:bg-indigo-700 transition"
            >
              Signup
            </button>
            {/* Cancel Button */}
            <button
              type="button"
              onClick={() => navigate("/")}
              className="bg-gray-300 text-gray-800 p-3 rounded-lg font-semibold hover:bg-gray-400 transition"
            >
              Cancel
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default Signup;
