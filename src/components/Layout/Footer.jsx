import React from 'react';
import { Link } from 'react-router-dom';
import { FiFacebook, FiInstagram, FiLinkedin, FiMail, FiPhone, FiMapPin } from 'react-icons/fi';
import { FaXTwitter } from 'react-icons/fa6';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-800 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="col-span-1 lg:col-span-2">
            <Link to="/" className="flex items-center space-x-3 mb-6">
              <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">HH</span>
              </div>
              <span className="text-2xl font-bold">HomeHero</span>
            </Link>
            <p className="text-gray-300 mb-6 max-w-md text-lg leading-relaxed">
              Connecting homeowners with trusted local service professionals. 
              From emergency repairs to routine maintenance, we make home services simple and reliable.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="p-3 bg-gray-700 rounded-lg hover:bg-blue-600 transition-colors">
                <FiFacebook size={20} />
              </a>
              <a href="#" className="p-3 bg-gray-700 rounded-lg hover:bg-pink-600 transition-colors">
                <FiInstagram size={20} />
              </a>
              <a href="#" className="p-3 bg-gray-700 rounded-lg hover:bg-blue-400 transition-colors">
                <FaXTwitter size={20} />
              </a>
              <a href="#" className="p-3 bg-gray-700 rounded-lg hover:bg-blue-700 transition-colors">
                <FiLinkedin size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-6 text-white">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/services" className="text-gray-300 hover:text-white transition-colors text-lg">
                  All Services
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-300 hover:text-white transition-colors text-lg">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-300 hover:text-white transition-colors text-lg">
                  Contact
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="text-gray-300 hover:text-white transition-colors text-lg">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-gray-300 hover:text-white transition-colors text-lg">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-6 text-white">Contact Info</h3>
            <div className="space-y-4 text-gray-300">
              <div className="flex items-center space-x-3">
                <FiPhone className="text-blue-400 flex-shrink-0" />
                <span className="text-lg">+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center space-x-3">
                <FiMail className="text-blue-400 flex-shrink-0" />
                <span className="text-lg">support@homehero.com</span>
              </div>
              <div className="flex items-center space-x-3">
                <FiMapPin className="text-blue-400 flex-shrink-0" />
                <span className="text-lg">123 Service Street<br />City, State 12345</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-lg">24/7 Customer Support</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-lg">
            &copy; {currentYear} HomeHero. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <span className="text-gray-400 text-lg">Made with ❤️ for better homes</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;