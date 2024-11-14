import Image from 'next/image';
import { motion } from 'framer-motion';
import { FaTree, FaLeaf, FaRocket, FaMeteor, FaStar, FaSpaceShuttle, FaFish, FaWater, FaSun } from 'react-icons/fa';
import alijanImage from '../../public/alijan.jpg';
import { useState } from 'react';
import { Button } from '@/Components/ui/button';
const themes:any = {
  space: {
    name: 'Space',
    background: 'bg-gradient-to-b from-black via-purple-900 to-blue-900',
    icons: [FaRocket, FaMeteor, FaStar, FaSpaceShuttle],
    colors: 'text-red-300'
  },
  forest: {
    name: 'Forest',
    background: 'bg-gradient-to-b from-green-800 to-green-500',
    icons: [FaTree, FaLeaf, FaTree, FaLeaf],
    colors: 'text-green-900'
  },
  ocean: {
    name: 'Ocean',
    background: 'bg-gradient-to-b from-blue-600 to-teal-500',
    icons: [FaFish, FaWater, FaStar, FaFish],
    colors: 'text-blue-300'
  },
  desert: {
    name: 'Desert',
    background: 'bg-gradient-to-b from-yellow-700 to-orange-500',
    icons: [FaSun, FaTree, FaStar, FaLeaf],
    colors: 'text-yellow-500'
  }
};

const Hero = () => {
  const [currentTheme, setCurrentTheme] = useState('space');

  const toggleTheme = () => {
    const themeKeys = Object.keys(themes);
    const nextThemeIndex = (themeKeys.indexOf(currentTheme) + 1) % themeKeys.length;
    setCurrentTheme(themeKeys[nextThemeIndex]);
  };
  // there is an issue with our 
 
  const theme = themes[currentTheme] as any; 
  return (
    <div
      className={`relative min-h-screen overflow-hidden ${theme.background} text-white flex flex-col items-center`}
    >
      {/* Background Animation Icons */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        {[...Array(50)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute bg-white rounded-full opacity-50"
            style={{
              width: `${Math.random() * 2 + 1}px`,
              height: `${Math.random() * 2 + 1}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
            }}
            animate={{ opacity: [0.5, 1, 0.5], scale: [1, 1.2, 1] }}
            transition={{ repeat: Infinity, duration: 6 + Math.random() * 5 }}
          />
        ))}
      </div>

      {/* Moving Icons */}
      <div className="absolute inset-0 pointer-events-none z-10">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className={`absolute ${theme.colors} opacity-70`}
            style={{
              fontSize: `${Math.random() * 24 + 16}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
            }}
            animate={{ y: [0, -20, 20, 0], x: [0, -10, 10, 0] }}
            transition={{ repeat: Infinity, duration: 10 + Math.random() * 10 }}
          >
            {theme.icons[i % theme.icons.length]()}
          </motion.div>
        ))}
      </div>

      {/* Content Section */}
      <section className="relative z-20 flex flex-col md:flex-row items-center min-h-screen p-8">
        {/* Left Side - Profile Image */}
        <div className="flex flex-col items-center md:items-start w-full md:w-1/2  md:mb-10 mb-10">
  <motion.div
    initial={{ opacity: 0, scale: 0.8 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 1 }}
    className="relative w-32 mt-20 h-32 md:w-48 md:h-48 lg:w-80 lg:h-80 rounded-full overflow-hidden shadow-xl border-4 border-yellow-500"
  >
    <Image
      src={alijanImage}
      alt="Ali Jan"
      layout="fill"
      objectFit="cover"
      className="rounded-full"
    />
  </motion.div>
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="mt-6"
          >
            <Button onClick={toggleTheme} className="bg-yellow-500 text-black font-semibold rounded-full shadow-md hover:bg-yellow-600 transition">
              Switch to {themes[Object.keys(themes).find((key) => key !== currentTheme)as string]?.name} Theme
            </Button>
          </motion.div>
        </div>

        {/* Right Side - Text Section */}
        <div className="text-center md:text-left md:w-1/2 space-y-6">
          <motion.h1
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="text-4xl md:text-5xl font-extrabold leading-snug"
          >
            Welcome to the <span className="text-yellow-400">{theme.name} Adventure</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 1 }}
            className="text-lg italic text-gray-300"
          >
            {theme.name === 'Space'
              ? 'Exploring the cosmos of digital creativity.'
              : theme.name === 'Forest'
              ? 'Uncovering the serenity of technology and nature.'
              : theme.name === 'Ocean'
              ? 'Diving into the depths of innovation.'
              : 'Embracing the warmth of digital landscapes.'}
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 1 }}
            className="text-sm font-light text-white"
          >
            Full Stack Developer | Crafting experiences that bridge imagination and reality.
          </motion.p>
        </div>
      </section>
    </div>
  );
};

export default Hero;
