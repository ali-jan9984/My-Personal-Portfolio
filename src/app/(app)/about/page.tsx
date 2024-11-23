'use client';
import { motion } from "framer-motion";
import { Pen, Folder, Github, Linkedin } from 'lucide-react';
import { useState, useEffect } from 'react';
import { FaBars, FaSignInAlt } from "react-icons/fa";

export default function AboutPage() {
  const text = "Ali Jan is an amazing developer with a deep passion for coding. He thrives on creating dynamic and efficient solutions, whether for frontend or backend development. His expertise in various web technologies makes him a versatile developer, and his innovative ideas continue to inspire those around him. Ali has contributed to several successful projects, always delivering high-quality work on time.";
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [displayText, setDisplayText] = useState("");
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const typingInterval = setInterval(() => {
      if (index < text.length) {
        setDisplayText((prev) => prev + text[index]);
        setIndex(index + 1);
      } else {
        clearInterval(typingInterval); // Stop when all text is displayed
      }
    }, 50); // Speed of typing effect
    return () => clearInterval(typingInterval);
  }, [index, text]);

  return (
    <div className="relative w-full h-screen bg-black text-white overflow-hidden flex">
      {/* Left Side: Animated High-Class Visualization */}
      <div className="w-1/2 h-full flex flex-col justify-center items-center relative space-y-6">
        {/* Animated Lines or Bars - Abstract Representation */}
        <motion.div className="absolute w-full h-full flex items-end justify-around" style={{ bottom: "5%" }}>
          {Array.from({ length: 5 }).map((_, index) => (
            <motion.div
              key={index}
              className="w-3 bg-white rounded-t-lg"
              initial={{ height: 0 }}
              animate={{ height: `${Math.random() * 60 + 40}%` }}
              transition={{ duration: 2, delay: index * 0.2 }}
            ></motion.div>
          ))}
        </motion.div>

        {/* Abstract Geometric Animation */}
        <motion.div
          className="absolute w-24 h-24 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full opacity-70 animate-[move_4s_linear_infinite]"
          style={{ top: "10%", left: "15%" }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 2 }}
        ></motion.div>

        <motion.div
          className="absolute w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg opacity-60 animate-[move_6s_linear_infinite]"
          style={{ top: "50%", right: "5%" }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 2 }}
        ></motion.div>

        <motion.div
          className="absolute w-16 h-16 bg-gradient-to-r from-yellow-400 to-red-500 rounded-full opacity-50 animate-[move_8s_linear_infinite]"
          style={{ top: "70%", left: "25%" }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 2 }}
        ></motion.div>
      </div>
      {/* Right Side: Text and Content */}
      <div className="w-1/2 h-full flex flex-col justify-center items-start pl-12 space-y-8 relative z-10">
        <motion.h1
          className="text-6xl font-bold tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-pink-500"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
        >
          About Ali_Jan 🎗
        </motion.h1>

        {/* Typing Effect */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="text-2xl text-gray-300 font-medium whitespace-pre-line w-full"
        >
          {displayText}
        </motion.div>

        {/* Speech Bubbles */}
        <motion.div
          className="bg-white text-gray-800 p-4 rounded-lg shadow-lg mt-4 max-w-xs ml-auto"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2, duration: 1 }}
        >
          <p>"Ali's creativity knows no bounds!"</p>
        </motion.div>

        <motion.div
          className="bg-white text-gray-800 p-4 rounded-lg shadow-lg mt-4 max-w-xs mr-auto"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 3, duration: 1 }}
        >
          <p>"He brings innovative ideas to the team."</p>
        </motion.div>

        {/* Back to Home Button */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 4, duration: 1 }}
        >
          <a href="/" className="text-blue-500 hover:underline text-lg">Back to Home</a>
        </motion.div>
      </div>
      {/* Sidebar Transition */}
      <motion.div
        className={`fixed top-0 left-0 z-20 bg-gray-800 text-white w-64 h-full ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out`}
      >
        <div className="p-4">
          <button onClick={() => setSidebarOpen(false)} className="text-white text-xl">&times;</button>
          <h2 className="text-3xl font-bold mt-4">Portfolio</h2>
          <ul className="space-y-4 mt-6">
            <li className="flex items-center space-x-3">
              <Github size={24} />
              <a href="https://github.com/yourusername" target="_blank" className="text-lg">GitHub</a>
            </li>
            <li className="flex items-center space-x-3">
              <Linkedin size={24} />
              <a href="https://linkedin.com/in/yourusername" target="_blank" className="text-lg">LinkedIn</a>
            </li>
            <li className="flex items-center space-x-3">
              <Folder size={24} />
              <a href="/portfolio" className="text-lg">Portfolio</a>
            </li>
            <li className="flex items-center space-x-3">
              <FaSignInAlt size={24} />
              <a href="/sign-in" className="text-lg">Sign-in</a>
            </li>
            <li className="flex items-center space-x-3">
              <a href="/chart">Chart</a>
            </li>
          </ul>
        </div>
      </motion.div>
      {/* Button to open sidebar */}
      <motion.button
        onClick={() => setSidebarOpen(true)}
        className="fixed top-6 left-6 bg-blue-600 text-white p-3 rounded-full z-30"
        whileHover={{ scale: 1.1 }}
        transition={{ duration: 0.3 }}
      >
        <FaBars size={32} />
      </motion.button>
    </div>
  );
}

