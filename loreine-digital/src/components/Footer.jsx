import React from 'react';
import { FaPhone, FaEnvelope, FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram } from 'react-icons/fa';

function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-16">
      <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        <div>
          <h3 className="text-lg font-bold mb-4">YOUR LOGO</h3>
          <p className="text-gray-400 mb-4">123 Main Street, Anytown, USA 12345</p>
          <p className="text-gray-400">&copy; 2023 Your Company. All rights reserved.</p>
        </div>
        <div>
          <h3 className="text-lg font-bold mb-4">Navigation</h3>
          <ul className="text-gray-400">
            <li className="mb-2"><a href="#" className="hover:text-pink-500">Home</a></li>
            <li className="mb-2"><a href="#" className="hover:text-pink-500">About</a></li>
            <li className="mb-2"><a href="#" className="hover:text-pink-500">Services</a></li>
            <li className="mb-2"><a href="#" className="hover:text-pink-500">Portfolio</a></li>
            <li className="mb-2"><a href="#" className="hover:text-pink-500">Contact</a></li>
          </ul>
        </div>
        <div>
          <h3 className="text-lg font-bold mb-4">Contact Us</h3>
          <p className="text-gray-400 mb-2 flex items-center"><FaPhone className="mr-2" /> +1 (555) 123-4567</p>
          <p className="text-gray-400 flex items-center"><FaEnvelope className="mr-2" /> info@yourcompany.com</p>
        </div>
        <div>
          <h3 className="text-lg font-bold mb-4">Newsletter</h3>
          <p className="text-gray-400 mb-2">Subscribe to our newsletter for the latest updates.</p>
          <div className="flex">
            <input
              type="email"
              placeholder="Your Email"
              className="bg-gray-700 text-white border border-gray-600 rounded-l-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-pink-500"
            />
            <button className="bg-pink-500 hover:bg-pink-600 text-white rounded-r-md py-2 px-4 font-bold">
              Subscribe
            </button>
          </div>
          <div className="mt-4 flex space-x-4">
            <a href="#" className="text-gray-400 hover:text-pink-500"><FaFacebookF className="text-xl" /></a>
            <a href="#" className="text-gray-400 hover:text-pink-500"><FaTwitter className="text-xl" /></a>
            <a href="#" className="text-gray-400 hover:text-pink-500"><FaLinkedinIn className="text-xl" /></a>
            <a href="#" className="text-gray-400 hover:text-pink-500"><FaInstagram className="text-xl" /></a>
          </div>
        </div>
      </div>
      <div className="max-w-6xl mx-auto px-4 mt-8 text-center text-gray-500">
        &copy; 2025 Your Company. All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;