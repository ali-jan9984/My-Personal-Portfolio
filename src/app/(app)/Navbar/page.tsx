"use client";
import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaHome, FaUser, FaEnvelope, FaProjectDiagram, FaSun, FaMoon, FaSignInAlt } from "react-icons/fa";

function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle("dark", !isDarkMode);
  };

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const links = [
    { name: "Home", path: "/", icon: <FaHome /> },
    { name: "About", path: "/about", icon: <FaUser /> },
    { name: "Projects", path: "/projects", icon: <FaProjectDiagram /> },
    { name: "Contact", path: "/contact", icon: <FaEnvelope /> },
    { name: "Sign-In", path: "/sign-in", icon: <FaSignInAlt /> },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 backdrop-blur-md transition-all duration-500 ${
        isDarkMode
          ? "bg-gradient-to-r from-gray-900 via-gray-800 to-gray-700" // Dark mode: Dark and Neutral
          : "bg-gradient-to-tr from-slate-300 via-slate-400 to-slate-500" 
      } shadow-xl transform-gpu`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between p-5">
        {/* Logo with Neon Effect */}
        <Link href="/" className="text-2xl font-bold text-white neon-effect">
          MyPortfolio =>(Ali_Jan)
        </Link>
        {/* Hamburger Menu */}
        <div className="flex md:hidden">
          <button onClick={toggleMenu} className="text-3xl text-white neon-effect">
            {isOpen ? "✖" : "☰"}
          </button>
        </div>
        {/* Links */}
        <div
          className={`flex-col md:flex md:flex-row md:items-center w-full md:w-auto space-y-5 md:space-y-0 transition-all duration-500 ${
            isOpen ? "flex" : "hidden"
          } md:flex`}
        >
          {links.map((link) => (
            <Link
              key={link.name}
              href={link.path}
              className={`text-lg flex items-center gap-3 py-2 px-4 rounded-full transition-all duration-300 transform hover:scale-110 hover:text-gold-500 ${
                pathname === link.path
                  ? "bg-gradient-to-t from-slate-400 to-slate-500 text-white"
                  : "text-white"
              }`}
              onClick={() => setIsOpen(false)}
            >
              {link.icon}
              <span className="font-semibold">{link.name}</span>
            </Link>
          ))}
        </div>
        {/* Dark Mode Toggle with Glowing Effect */}
        <button
          onClick={toggleDarkMode}
          className="text-3xl p-3 rounded-full neon-effect transition duration-300 hover:scale-125"
        >
          {isDarkMode ? <FaSun className="text-yellow-400 glow-effect" /> : <FaMoon className="text-indigo-400 glow-effect" />}
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
