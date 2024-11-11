'use client';
import { Button } from '@/Components/ui/button';
import Navbar from './Navbar/page';
import { Updown } from '@/Components/upDown/updown';
import Footer from '@/Components/footer';
import selfimage from '../../../public/alijan.jpg';
import Image from 'next/image';

function HomePage() {
  return (
    <div className="min-h-screen">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative py-20 bg-white text-gray-900 dark:bg-gray-900 dark:text-gray-100 flex flex-col items-center text-center h-screen">
        {/* Background shapes */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10">
          <div className="absolute top-20 left-10 bg-yellow-200 rounded-full w-48 h-48"></div>
          <div className="absolute top-60 right-10 bg-pink-200 rounded-full w-32 h-32"></div>
          <div className="absolute bottom-20 left-20 bg-blue-200 rounded-full w-40 h-40"></div>
        </div>

        {/* Hero Content */}
        <div className="max-w-2xl mx-auto z-10">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6">
            Design Summit: <br />
            <span className="text-yellow-500">Unleashing</span> 
            <span className="text-yellow-600"> Creative brilliance</span>
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
            San Francisco <span className="text-blue-500">March 25-27</span>
          </p>
          
          {/* Buttons */}
          <div className="flex gap-4 justify-center mb-10">
            <Button className="bg-blue-500 text-white px-6 py-2 rounded-lg">Schedule</Button>
            <Button className="bg-white text-blue-500 border border-blue-500 px-6 py-2 rounded-lg">Learn more</Button>
          </div>
          
          {/* Countdown Timer (Placeholder) */}
          <div className="text-2xl font-semibold text-gray-800 dark:text-gray-200">
            <div>Days: 01 | Hours: 02 | Minutes: 59 | Seconds: 51</div>
          </div>
        </div>
        
        {/* People Images (you can replace with actual image URLs) */}
        <div className="absolute top-1/3 right-1/4">
          <div className="w-24 h-24 rounded-full bg-yellow-500 overflow-hidden">
            <img src="/path-to-image1.jpg" alt="Person 1" className="object-cover w-full h-full" />
          </div>
        </div>
        <div className="absolute bottom-1/4 left-1/4">
          <div className="w-24 h-24 rounded-full bg-blue-500 overflow-hidden">
            <Image src={selfimage} alt="Person 2" className="object-cover w-full h-full" />
          </div>
        </div>
        <div className="absolute bottom-10 right-1/3">
          <div className="w-24 h-24 rounded-full bg-pink-500 overflow-hidden">
            <img src="/path-to-image3.jpg" alt="Person 3" className="object-cover w-full h-full" />
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section className="py-20 bg-gradient-to-r from-gray-100 via-gray-300 to-gray-400 dark:bg-gradient-to-r dark:from-gray-800 dark:via-gray-700 dark:to-gray-900">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl font-semibold text-teal-600 dark:text-teal-400 mb-8">
            My Projects
          </h2>
          <Updown />
        </div>
      </section>
      <Footer />
    </div>
  );
}

export default HomePage;


