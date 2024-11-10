'use client';
import { Button } from '@/Components/ui/button';
import { Card } from '@/Components/ui/card';
import { FaProjectDiagram } from 'react-icons/fa';
import Navbar from './Navbar/page';

function HomePage() {
  return (
    <div className={`min-h-screen`}>
        <Navbar/>
      {/* Hero Section */}
      <section className="flex items-center justify-center h-screen bg-gradient-to-r from-teal-400 to-blue-500 text-center text-white p-4">
        <div>
          <h1 className="text-5xl font-extrabold mb-4 text-shadow-lg">Welcome to My Portfolio</h1>
          <p className="text-lg mb-6">I'm Ali Jan, a passionate full-stack developer focused on creating impactful software.</p>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 bg-gradient-to-r from-gray-100 via-gray-300 to-gray-400 dark:bg-gradient-to-r dark:from-gray-800 dark:via-gray-700 dark:to-gray-900">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl font-semibold text-teal-600 dark:text-teal-400 mb-8">About Me</h2>
          <p className="text-lg max-w-3xl mx-auto text-gray-600 dark:text-gray-200">
            I'm a full-stack developer with expertise in React, Node.js, and MongoDB. I enjoy building scalable and user-friendly applications that provide a seamless experience.
          </p>
        </div>
      </section>

      {/* Skills Section */}
      <section className="py-20 bg-gradient-to-r from-white via-teal-100 to-teal-200 dark:bg-gradient-to-r dark:from-gray-900 dark:via-gray-800 dark:to-gray-700">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl font-semibold text-teal-600 dark:text-teal-400 mb-8">My Skills</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <Card className="p-6 bg-white dark:bg-gray-700 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300">
              <h2 className="text-xl text-teal-500 font-semibold mb-4">React</h2>
              <p>Building dynamic and interactive UIs with reusable components.</p>
            </Card>
            <Card className="p-6 bg-white dark:bg-gray-700 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300">
              <h2 className="text-xl text-teal-500 font-semibold mb-4">Node.js</h2>
              <p>Developing fast and scalable server-side applications and APIs.</p>
            </Card>
            <Card className="p-6 bg-white dark:bg-gray-700 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300">
              <h2 className="text-xl text-teal-500 font-semibold mb-4">MongoDB</h2>
              <p>Designing scalable databases for high-performance applications.</p>
            </Card>
            <Card className="p-6 bg-white dark:bg-gray-700 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300">
              <h2 className="text-xl text-teal-500 font-semibold mb-4">TailwindCSS</h2>
              <p>Creating modern and responsive layouts with utility-first CSS.</p>
            </Card>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section className="py-20 bg-gradient-to-r from-teal-50 to-teal-200 dark:bg-gradient-to-r dark:from-gray-900 dark:to-gray-800">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl font-semibold text-teal-600 dark:text-teal-400 mb-8">My Projects</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Project Cards */}
            <Card className="p-6 bg-white dark:bg-gray-700 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300">
              <FaProjectDiagram className="text-4xl text-teal-500 mb-4" />
              <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">Project 1</h3>
              <p>A description of my first project goes here. It’s a web application that...</p>
            </Card>
            <Card className="p-6 bg-white dark:bg-gray-700 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300">
              <FaProjectDiagram className="text-4xl text-teal-500 mb-4" />
              <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">Project 2</h3>
              <p>A description of my second project goes here. It’s a mobile app that...</p>
            </Card>
            <Card className="p-6 bg-white dark:bg-gray-700 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300">
              <FaProjectDiagram className="text-4xl text-teal-500 mb-4" />
              <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">Project 3</h3>
              <p>A description of my third project goes here. It's an e-commerce platform...</p>
            </Card>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 bg-gradient-to-r from-teal-300 to-teal-500 dark:bg-gradient-to-r dark:from-gray-800 dark:to-gray-900">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl font-semibold text-white mb-8">Get in Touch</h2>
          <p className="text-lg text-gray-200 mb-6">Feel free to contact me for inquiries or collaborations. I’m always open to new opportunities!</p>
          <Button variant="primary" onClick={() => window.location.href = 'mailto:alijan998457@gmail.com'} className="bg-teal-600 hover:bg-teal-700 text-white">
            Contact Me
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-6 bg-teal-700 dark:bg-teal-800 text-center text-white">
        <p>&copy; 2024 Ali Jan. All Rights Reserved.</p>
      </footer>
    </div>
  );
}

export default HomePage;

