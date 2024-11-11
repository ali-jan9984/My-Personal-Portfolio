// Footer.tsx
import { useState } from 'react';
import { FaFacebook, FaTwitter, FaGithub, FaLinkedin } from 'react-icons/fa';

const Footer = () => {

  return (
    <footer className={`text-gray-700 p-10 dark:text-white`}>
      <div className="container mx-auto grid grid-cols-1 sm:grid-cols-3 gap-6">
        {/* Links Section */}
        <div>
          <h2 className="text-xl font-bold mb-2">Quick Links</h2>
          <ul className="space-y-2">
            <li><a href="#about" className="hover:text-blue-500">About</a></li>
            <li><a href="#projects" className="hover:text-blue-500">Projects</a></li>
            <li><a href="#contact" className="hover:text-blue-500">Contact</a></li>
          </ul>
        </div>

        {/* Socials Section */}
        <div>
          <h2 className="text-xl font-bold mb-2 ">Connect with Me</h2>
          <div className="flex space-x-4">
            <a href="https://facebook.com" className="text-blue-500 transform hover:scale-125 transition duration-300"><FaFacebook size={24} /></a>
            <a href="https://twitter.com" className="text-blue-400 transform hover:scale-125 transition duration-300"><FaTwitter size={24} /></a>
            <a href="https://github.com" className="text-gray-800 transform hover:scale-125 transition duration-300"><FaGithub size={24} /></a>
            <a href="https://linkedin.com" className="text-blue-700 transform hover:scale-125 transition duration-300"><FaLinkedin size={24} /></a>
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="mt-8 flex justify-between items-center border-t pt-4">
        <span className="text-sm">&copy; 2024 Ali Jan. All rights reserved.</span>
      </div>
    </footer>
  );
};

export default Footer;
