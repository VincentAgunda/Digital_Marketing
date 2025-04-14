import React, { useState } from "react";
import emailjs from "@emailjs/browser";
import {
  FaPhone,
  FaEnvelope,
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn,
  FaInstagram,
} from "react-icons/fa";

function Footer() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const sendEmail = async (e) => {
    e.preventDefault();

    const serviceId = process.env.REACT_APP_EMAILJS_SERVICE_ID;
    const templateId = process.env.REACT_APP_EMAILJS_TEMPLATE_ID;
    const publicKey = process.env.REACT_APP_EMAILJS_PUBLIC_KEY;

    if (!email) {
      setMessage("Please enter an email address.");
      return;
    }

    const templateParams = {
      user_email: email,
    };

    try {
      await emailjs.send(serviceId, templateId, templateParams, publicKey);
      setMessage("Subscribed successfully!");
      setEmail("");
    } catch (error) {
      console.error("Email sending error:", error);
      setMessage("Subscription failed. Please try again.");
    }
  };

  return (
    <footer className="bg-[#F0F0F0] text-gray-800 pt-8 pb-4 font-sf">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          
          {/* Address Section */}
          <div className="space-y-2">
            <h3 className="text-sm font-semibold hover:text-pink-500 transition-colors duration-200 cursor-default">
              ADDRESS
            </h3>
            <p className="text-gray-600 text-xs hover:text-gray-900 transition-colors duration-200">
              123 Main Street<br />
              Anytown, Nairobi
            </p>
          </div>

          {/* Navigation Section */}
          <div className="space-y-2">
            <h3 className="text-sm font-semibold hover:text-pink-500 transition-colors duration-200 cursor-default">
              NAVIGATION
            </h3>
            <ul className="space-y-1.5">
              {['Home', 'About', 'Services', 'Portfolio', 'Contact'].map((item) => (
                <li key={item}>
                  <a 
                    href="#" 
                    className="text-gray-600 text-xs hover:text-pink-500 transition-colors duration-200 flex items-center"
                  >
                    <span className="w-1 h-1 bg-pink-500 rounded-full mr-1.5"></span>
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Section */}
          <div className="space-y-2">
            <h3 className="text-sm font-semibold hover:text-pink-500 transition-colors duration-200 cursor-default">
              CONTACT US
            </h3>
            <div className="space-y-1.5">
              <p className="text-gray-600 text-xs flex items-center hover:text-gray-900 transition-colors duration-200">
                <FaPhone className="mr-1.5 text-xs" />
                +254 (746)-968-441 
              </p>
              <p className="text-gray-600 text-xs flex items-center hover:text-gray-900 transition-colors duration-200">
                <FaEnvelope className="mr-1.5 text-xs" />
                info@loreinedigital.com
              </p>
            </div>
          </div>

          {/* Newsletter Section */}
          <div className="space-y-2">
            <h3 className="text-sm font-semibold hover:text-pink-500 transition-colors duration-200 cursor-default">
              NEWSLETTER
            </h3>
            <p className="text-gray-600 text-xs hover:text-gray-900 transition-colors duration-200">
              Get the latest updates
            </p>
            <form onSubmit={sendEmail} className="space-y-1.5">
              <div className="flex">
                <input
                  type="email"
                  placeholder="Your Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1 text-xs px-2.5 py-1.5 rounded-l bg-white text-gray-800 focus:outline-none focus:ring-1 focus:ring-pink-500 border border-gray-300"
                  required
                />
                <button
                  type="submit"
                  className="px-2.5 py-1.5 text-xs bg-pink-600 hover:bg-pink-700 text-white rounded-r transition-colors duration-200"
                >
                  Subscribe
                </button>
              </div>
              {message && (
                <p className={`text-2xs ${message.includes('success') ? 'text-green-600' : 'text-pink-600'}`}>
                  {message}
                </p>
              )}
            </form>
            <div className="flex space-x-3 pt-1">
              {[
                { icon: <FaFacebookF className="text-xs" />, label: "Facebook" },
                { icon: <FaTwitter className="text-xs" />, label: "Twitter" },
                { icon: <FaLinkedinIn className="text-xs" />, label: "LinkedIn" },
                { icon: <FaInstagram className="text-xs" />, label: "Instagram" },
              ].map((social, index) => (
                <a
                  key={index}
                  href="#"
                  className="text-gray-600 hover:text-pink-500 transition-colors duration-200"
                  aria-label={social.label}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Copyright Section */}
        <div className="mt-6 pt-4 border-t border-gray-300 text-center text-gray-600 text-2xs">
          &copy; {new Date().getFullYear()} LoreineDigital. All rights reserved.
        </div>
      </div>
    </footer>
  );
}

export default Footer;