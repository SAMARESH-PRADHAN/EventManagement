import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="h-screen flex flex-col justify-center items-center bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 text-white relative overflow-hidden">
      {/* Floating background circles */}
      <div className="absolute w-72 h-72 bg-white/10 rounded-full blur-3xl top-10 left-10 animate-pulse"></div>
      <div className="absolute w-96 h-96 bg-pink-400/20 rounded-full blur-3xl bottom-10 right-10 animate-pulse"></div>

      {/* Title */}
      <motion.h1
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-6xl font-extrabold mb-8 drop-shadow-lg"
      >
        Event Management
      </motion.h1>

      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="flex space-x-6"
      >
        <button
          onClick={() => navigate("/signup")}
          className="bg-white text-indigo-600 px-8 py-3 rounded-xl font-semibold shadow-lg hover:shadow-2xl hover:scale-105 transition duration-300"
        >
          Signup
        </button>

        <button
          onClick={() => navigate("/login")}
          className="bg-white text-purple-600 px-8 py-3 rounded-xl font-semibold shadow-lg hover:shadow-2xl hover:scale-105 transition duration-300"
        >
          Login
        </button>
      </motion.div>

      {/* Footer Text */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2, delay: 0.5 }}
        className="absolute bottom-6 text-white/70 text-sm"
      >
        Manage your events with ease ✨
      </motion.p>
    </div>
  );
};

export default Home;
