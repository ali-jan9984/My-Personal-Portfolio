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
    <nav className={`w-full shadow-lg fixed top-0 left-0 z-50 ${isDarkMode ? "bg-gray-900" : "bg-white"} text-gray-800 dark:text-white`}>
      <div className="max-w-7xl mx-auto flex items-center justify-between p-5">
        {/* Logo */}
        <Link href="/" className="text-2xl font-bold text-blue-500 dark:text-blue-400">
          MyPortfolio
        </Link>

        {/* Hamburger Menu */}
        <div className="flex md:hidden">
          <button onClick={toggleMenu} className="text-2xl">
            {isOpen ? "✖" : "☰"}
          </button>
        </div>

        {/* Links */}
        <div className={`flex-col md:flex md:flex-row md:items-center w-full md:w-auto space-y-5 md:space-y-0 ${isOpen ? "flex" : "hidden"} md:flex`}>
          {links.map((link) => (
            <Link
              key={link.name}
              href={link.path}
              className={`text-lg flex items-center gap-2 py-2 px-4 rounded-lg hover:bg-blue-500 hover:text-white transition-all duration-200 ${
                pathname === link.path ? "bg-blue-500 text-white" : ""
              }`}
              onClick={() => setIsOpen(false)}
            >
              {link.icon}
              {link.name}
            </Link>
          ))}
        </div>

        {/* Dark Mode Toggle */}
        <button
          onClick={toggleDarkMode}
          className="text-2xl p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-800 transition duration-200"
        >
          {isDarkMode ? <FaSun /> : <FaMoon />}
        </button>
      </div>
    </nav>
  );
}

export default Navbar;

