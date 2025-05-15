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
    <footer className="bg-gray-900 text-gray-300 pt-8 pb-4 font-sf">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">

          {/* Address Section */}
          <div className="space-y-2">
            <h3 className="text-sm font-semibold hover:text-blue-500 transition-colors duration-200 cursor-default text-gray-100">
              ADDRESS
            </h3>
            <p className="text-gray-500 text-xs hover:text-gray-300 transition-colors duration-200">
              123 Main Street<br />
              Anytown, Nairobi
            </p>
          </div>

          {/* Navigation Section */}
          <div className="space-y-2">
            <h3 className="text-sm font-semibold hover:text-indigo-500 transition-colors duration-200 cursor-default text-gray-100">
              NAVIGATION
            </h3>
            <ul className="space-y-1.5">
              {['Home', 'About', 'Services', 'Portfolio', 'Contact'].map((item) => (
                <li key={item}>
                  <a
                    href="#"
                    className="text-gray-500 text-xs hover:text-indigo-500 transition-colors duration-200 flex items-center"
                  >
                    <span className="w-1 h-1 bg-indigo-900 rounded-full mr-1.5"></span>
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Section */}
          <div className="space-y-2">
            <h3 className="text-sm font-semibold hover:text-indigo-900 transition-colors duration-200 cursor-default text-gray-100">
              CONTACT US
            </h3>
            <div className="space-y-1.5">
              <p className="text-gray-500 text-xs flex items-center hover:text-gray-300 transition-colors duration-200">
                <FaPhone className="mr-1.5 text-xs" />
                +254 (792)-823-182
              </p>
              <p className="text-gray-500 text-xs flex items-center hover:text-gray-300 transition-colors duration-200">
                <FaEnvelope className="mr-1.5 text-xs" />
                info@nexturedigital.com
              </p>
            </div>
          </div>

          {/* Newsletter Section */}
          <div className="space-y-2">
            <h3 className="text-sm font-semibold hover:text-indigo-900 transition-colors duration-200 cursor-default text-gray-100">
              NEWSLETTER
            </h3>
            <p className="text-gray-500 text-xs hover:text-gray-300 transition-colors duration-200">
              Get the latest updates
            </p>
            <form onSubmit={sendEmail} className="space-y-1.5">
              <div className="flex">
                <input
                  type="email"
                  placeholder="Your Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1 text-xs px-2.5 py-1.5 rounded-l bg-gray-800 text-gray-300 focus:outline-none focus:ring-1 focus:ring-indigo-900 border border-gray-700"
                  required
                />
                <button
                  type="submit"
                  className="px-2.5 py-1.5 text-xs bg-indigo-600 hover:bg-indigo-700 text-white rounded-r transition-colors duration-200"
                >
                  Subscribe
                </button>
              </div>
              {message && (
                <p className={`text-2xs ${message.includes('success') ? 'text-green-500' : 'text-indigo-500'}`}>
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
                  className="text-gray-500 hover:text-indigo-500 transition-colors duration-200"
                  aria-label={social.label}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Copyright Section */}
        <div className="mt-6 pt-4 border-t border-gray-700 text-center text-gray-500 text-2xs">
          &copy; {new Date().getFullYear()} Nexture-Digital. All rights reserved.
        </div>
      </div>
    </footer>
  );
}

export default Footer;