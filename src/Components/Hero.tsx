'use client'; // Mark this file as a client component

import React, { useEffect } from "react";

function Hero() {
  useEffect(() => {
    // Adding a simple animation to icons in the background (you can replace this with other animation logic if needed)
    const icons = document.querySelectorAll('.background-icon');
    icons.forEach((icon, index) => {
      icon.style.animationDelay = `${index * 2}s`; // Stagger animation for each icon
    });
  }, []);

  return (
    <section className="relative flex flex-col items-center justify-center text-center py-16 px-8 bg-gray-900 text-white overflow-hidden">
      
      {/* Background icons animation */}
      <div className="absolute top-0 left-0 w-full h-full z-0">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="background-icon absolute animate-pulse opacity-20 transform translate-x-12 translate-y-12 text-6xl text-gray-600">
            &#9733; {/* Star Icon */}
          </div>
          <div className="background-icon absolute animate-bounce opacity-20 transform translate-x-24 translate-y-24 text-6xl text-gray-600">
            &#9734; {/* Star Outline Icon */}
          </div>
          <div className="background-icon absolute animate-ping opacity-20 transform translate-x-36 translate-y-36 text-6xl text-gray-600">
            &#9733; {/* Star Icon */}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <h1 className="text-5xl font-extrabold mb-4 animate__animated animate__fadeIn animate__delay-1s z-10">Hey friends —</h1>
      <p className="text-2xl mb-4 font-semibold opacity-80 animate__animated animate__fadeIn animate__delay-1.5s z-10">
        I’m Ali. Welcome to my learning journey!
      </p>
      <p className="text-lg mb-6 opacity-70 animate__animated animate__fadeIn animate__delay-2s z-10">
        I’m a learner, and this site is where I share my progress, knowledge, and the tools that help me learn and grow every day.
      </p>
      
      {/* YouTube video with hover effect */}
      <div className="w-full max-w-3xl mb-8 rounded-xl overflow-hidden shadow-xl transform transition-all duration-500 hover:scale-105 hover:shadow-2xl z-10">
        <iframe
          width="100%"
          height="315"
          src="https://www.youtube.com/embed/YZ_rRAdT73s?start=201"
          title="YouTube video"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>
      
      <p className="text-lg mb-4 animate__animated animate__fadeIn animate__delay-2.5s z-10">
        Sign up below to join my growing learning community.
      </p>
      
      {/* Enhanced Newsletter Signup */}
      <form className="mt-6 flex flex-col items-center space-y-4 animate__animated animate__fadeIn animate__delay-3s z-10">
        <input
          type="email"
          placeholder="Email address"
          className="px-6 py-3 border-2 border-gray-600 rounded-lg mb-4 w-full max-w-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-all duration-300 shadow-lg transform hover:scale-105"
        />
        <button className="bg-blue-500 text-white px-8 py-3 rounded-lg shadow-md hover:bg-blue-600 transition-colors duration-300 z-10">
          Subscribe
        </button>
      </form>

      {/* Ultimate Guides Link */}
      <div className="mt-8 z-10">
        <a href="/ultimate-guides" className="text-lg font-semibold text-gray-400 hover:text-white transition-colors duration-300">
          Check out my Ultimate Guides
        </a>
      </div>
    </section>
  );
}

export default Hero;
