import React from "react";

const Sidebar = () => {
  return (
    <div className="bg-gray-800 text-white w-64 p-4 flex flex-col">
      <h1 className="text-2xl font-bold mb-8">My Dashboard</h1>
      <nav className="space-y-4">
        <a href="/dashboard" className="block text-gray-300 hover:text-white">
          Dashboard
        </a>
        <a href="/contact" className="block text-gray-300 hover:text-white">
          Contact
        </a>
        <a href="/" className="block text-gray-300 hover:text-white">
          Home
        </a>
      </nav>
    </div>
  );
};

export default Sidebar;
