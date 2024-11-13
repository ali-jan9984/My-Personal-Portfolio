import Image from 'next/image';
import { motion } from 'framer-motion';
import { FaTree, FaLeaf, FaRocket, FaMeteor, FaStar, FaSpaceShuttle } from 'react-icons/fa';
import alijanImage from '../../public/alijan.jpg'
import { useState } from 'react';
import { Button } from '@/Components/ui/button';

const Hero = () => {
    const [isSpaceTheme, setIsSpaceTheme] = useState(true);

    const toggleTheme = () => setIsSpaceTheme(!isSpaceTheme);
  
    const themeIcons = isSpaceTheme
      ? [FaRocket, FaMeteor, FaStar, FaSpaceShuttle]
      : [FaTree, FaLeaf, FaTree, FaLeaf];
  
  return (
    <div
        className={`relative min-h-screen overflow-hidden ${
          isSpaceTheme ? 'bg-gradient-to-b from-black via-purple-900 to-blue-900' : 'bg-gradient-to-b from-green-800 to-green-500'
        } text-white flex flex-col items-center`}
      >
        {/* Background Animation Icons */}
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
          {[...Array(80)].map((_, i) => (
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
              className={`absolute ${isSpaceTheme ? 'text-yellow-300' : 'text-green-200'} opacity-70`}
              style={{
                fontSize: `${Math.random() * 24 + 16}px`,
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
              }}
              animate={{ y: [0, -20, 20, 0], x: [0, -10, 10, 0] }}
              transition={{ repeat: Infinity, duration: 10 + Math.random() * 10 }}
            >
              {themeIcons[i % 4]()}
            </motion.div>
          ))}
        </div>

        {/* Content Section */}
        <section className="relative z-20 flex flex-col md:flex-row items-center min-h-screen p-8">
          {/* Left Side - Profile Image with Graphic Design */}
          <div className="flex flex-col items-center md:items-start w-full md:w-1/2 mb-10 md:mb-0">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1 }}
              className="relative w-80 h-80 rounded-full overflow-hidden shadow-xl border-4 border-yellow-500 bg-gradient-to-tr from-indigo-500 to-purple-700"
            >
              <Image src={alijanImage} alt="Ali Jan" layout="fill" objectFit="cover" className="rounded-full" />
            </motion.div>
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 1, delay: 0.5 }}
              className="mt-6"
            >
              <Button onClick={toggleTheme} className="bg-yellow-500 text-black font-semibold rounded-full shadow-md hover:bg-yellow-600 transition">
                Switch to {isSpaceTheme ? 'Forest' : 'Space'} Theme
              </Button>
            </motion.div>
          </div>

          {/* Right Side - Text Section */}
          <div className="text-center md:text-left md:w-1/2 space-y-6">
            <motion.h1
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
              className="text-5xl font-extrabold leading-snug"
            >
              Welcome to the <span className="text-yellow-400">{isSpaceTheme ? 'Digital Galaxy' : 'Forest Adventure'}</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 1 }}
              className="text-lg italic text-gray-300"
            >
              {isSpaceTheme
                ? 'Exploring the cosmos of digital creativity.'
                : 'Uncovering the serenity of technology and nature.'}
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 1 }}
              className="text-sm font-light text-gray-400"
            >
              Full Stack Developer | Crafting experiences that bridge imagination and reality.
            </motion.p>
          </div>
        </section>
      </div>
  )
}

export default Hero