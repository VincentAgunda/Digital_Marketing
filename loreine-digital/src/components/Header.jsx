import React, { useState, useEffect, useRef } from "react";
import { FaSearch, FaUserCircle, FaBars } from "react-icons/fa";
import { Link } from "react-router-dom";
import { auth } from "../firebase";
import { signOut } from "firebase/auth";
import { motion, AnimatePresence } from "framer-motion";

function Header({ user }) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = async () => {
    await signOut(auth);
    setDropdownOpen(false);
  };

  return (
    <header className="bg-[#f2f4f8] py-4 relative z-50 shadow-md">
      <nav className="max-w-6xl mx-auto px-4 flex justify-between items-center">
        {/* Logo */}
        <div className="text-xl font-bold text-gray-800">
          <Link to="/">LOGO</Link>
        </div>

        {/* Desktop Navigation */}
        <ul className="hidden md:flex space-x-6">
          <li><Link to="/" className="text-gray-600 hover:text-gray-800">Home</Link></li>
          <li><a href="/#about-us-section" className="text-gray-600 hover:text-gray-800">About</a></li>
          <li><a href="/#what-we-offer-section" className="text-gray-600 hover:text-gray-800">Services</a></li>
          <li><Link to="/portfolio" className="text-gray-600 hover:text-gray-800">Portfolio</Link></li>
          <li><Link to="/blogs" className="text-gray-600 hover:text-gray-800">Blogs</Link></li>
        </ul>

        {/* Right Icons */}
        <div className="flex items-center space-x-4">
          {/* Search Icon */}
          <FaSearch className="text-gray-600 cursor-pointer" />

          {/* User Profile */}
          <div className="relative" ref={dropdownRef}>
            {user ? (
              <>
                <FaUserCircle
                  className="text-gray-700 text-2xl cursor-pointer"
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                />
                <AnimatePresence>
                  {dropdownOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.2 }}
                      className="absolute right-0 mt-2 w-44 bg-white shadow-lg rounded-md z-50"
                    >
                      {user.email === "admin@loreinedigital.com" && (
                        <Link
                          to="/admin-dashboard"
                          className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                        >
                          Admin Dashboard
                        </Link>
                      )}
                      <button
                        onClick={handleLogout}
                        className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                      >
                        Logout
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </>
            ) : (
              <Link to="/login">
                <FaUserCircle className="text-gray-700 text-2xl cursor-pointer" />
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button className="md:hidden" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            <FaBars className="text-gray-600 text-2xl" />
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="absolute top-16 left-0 w-full bg-white shadow-md md:hidden"
          >
            <ul className="flex flex-col items-center space-y-4 py-4">
              <li><Link to="/" className="text-gray-600 hover:text-gray-800" onClick={() => setMobileMenuOpen(false)}>Home</Link></li>
              <li><a href="/#about-us-section" className="text-gray-600 hover:text-gray-800" onClick={() => setMobileMenuOpen(false)}>About</a></li>
              <li><a href="/#what-we-offer-section" className="text-gray-600 hover:text-gray-800" onClick={() => setMobileMenuOpen(false)}>Services</a></li>
              <li><Link to="/portfolio" className="text-gray-600 hover:text-gray-800" onClick={() => setMobileMenuOpen(false)}>Portfolio</Link></li>
              <li><Link to="/blogs" className="text-gray-600 hover:text-gray-800" onClick={() => setMobileMenuOpen(false)}>Blogs</Link></li>
              {user ? (
                <>
                  {user.email === "admin@loreinedigital.com" && (
                    <li>
                      <Link to="/admin-dashboard" className="text-gray-600 hover:text-gray-800" onClick={() => setMobileMenuOpen(false)}>
                        Admin Dashboard
                      </Link>
                    </li>
                  )}
                  <li>
                    <button onClick={handleLogout} className="text-gray-600 hover:text-gray-800">
                      Logout
                    </button>
                  </li>
                </>
              ) : (
                <li>
                  <Link to="/login" className="text-gray-600 hover:text-gray-800" onClick={() => setMobileMenuOpen(false)}>
                    Login
                  </Link>
                </li>
              )}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

export default Header;
