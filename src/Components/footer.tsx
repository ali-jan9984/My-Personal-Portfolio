import { FaFacebook, FaTwitter, FaGithub, FaLinkedin } from 'react-icons/fa';

const Footer = () => {

  return (
    <footer className={`p-8 transition-all duration-300`}>
      <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Quick Links Section */}
        <div>
          <h2 className="text-xl font-bold mb-2 text-white">Quick Links</h2>
          <ul className="space-y-2">
            <li><a href="#about" className="hover:text-blue-500 transition duration-300">About</a></li>
            <li><a href="#projects" className="hover:text-blue-500 transition duration-300">Projects</a></li>
            <li><a href="#contact" className="hover:text-blue-500 transition duration-300">Contact</a></li>
            <li><a href="#privacy-policy" className="hover:text-blue-500 transition duration-300">Privacy Policy</a></li>
            <li><a href="#terms-of-service" className="hover:text-blue-500 transition duration-300">Terms of Service</a></li>
          </ul>
        </div>

        {/* Socials Section */}
        <div>
          <h2 className="text-xl font-bold mb-2 text-white">Connect with Me</h2>
          <div className="flex space-x-4 justify-center lg:justify-start">
            <a href="https://facebook.com" className="text-blue-500 transform hover:scale-110 transition duration-300" aria-label="Facebook">
              <FaFacebook size={24} />
            </a>
            <a href="https://twitter.com" className="text-blue-400 transform hover:scale-110 transition duration-300" aria-label="Twitter">
              <FaTwitter size={24} />
            </a>
            <a href="https://github.com" className="text-gray-800 transform hover:scale-110 transition duration-300" aria-label="GitHub">
              <FaGithub size={24} />
            </a>
            <a href="https://linkedin.com" className="text-blue-700 transform hover:scale-110 transition duration-300" aria-label="LinkedIn">
              <FaLinkedin size={24} />
            </a>
          </div>
        </div>

        {/* Footer Bottom Section */}
        <div className="mt-8 lg:mt-0 flex flex-col sm:flex-row justify-between items-center border-t pt-4 border-gray-600">
          <span className="text-sm text-center sm:text-left">
            &copy; 2024 Ali Jan. All rights reserved.
          </span>
          <button 
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="text-sm hover:text-blue-500 transform hover:scale-110 transition duration-300 mt-4 sm:mt-0"
          >
            Back to Top
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
