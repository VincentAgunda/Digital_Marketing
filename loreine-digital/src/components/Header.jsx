import React, { useState, useEffect, useRef, useCallback } from "react";
import { FaSearch, FaUserCircle, FaBars, FaTimes } from "react-icons/fa";
import { Link } from "react-router-dom";
import { auth } from "../firebase";
import { signOut } from "firebase/auth";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { path: "/", label: "Home" },
  { path: "/about", label: "About" },
  { path: "/services", label: "Services" },
  { path: "/portfolio", label: "Portfolio" },
  { path: "/blogs", label: "Blogs" },
];

const Header = React.memo(({ user }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const dropdownRef = useRef(null);
  const menuRef = useRef(null);

  const closeAllMenus = useCallback(() => {
    setDropdownOpen(false);
    setMobileMenuOpen(false);
  }, []);

  const handleLogout = useCallback(async () => {
    await signOut(auth);
    closeAllMenus();
  }, [closeAllMenus]);

  const toggleMobileMenu = useCallback(() => {
    setMobileMenuOpen((prev) => !prev);
    setDropdownOpen(false);
  }, []);

  // Close dropdown or menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMobileMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <>
      {/* Fixed Header */}
      <header className="bg-[#f2f4f8] h-16 fixed top-0 left-0 w-full z-50 shadow-md">
        <nav className="max-w-6xl mx-auto px-4 flex justify-between items-center h-full">
          {/* Logo */}
          <div className="text-xl font-bold text-gray-800">
            <Link to="/" onClick={closeAllMenus}>LOGO</Link>
          </div>

          {/* Desktop Navigation */}
          <ul className="hidden md:flex space-x-6">
            {navLinks.map((link) => (
              <li key={link.path}>
                <Link
                  to={link.path}
                  className="text-gray-600 hover:text-gray-800 transition-colors duration-200"
                  onClick={closeAllMenus}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          {/* Right Icons */}
          <div className="flex items-center space-x-4">
            <button aria-label="Search">
              <FaSearch className="text-gray-600 cursor-pointer hover:text-gray-800 transition-colors" />
            </button>

            {/* User Profile */}
            <div className="relative" ref={dropdownRef}>
              {user ? (
                <>
                  <button
                    aria-label="User menu"
                    onClick={() => setDropdownOpen(!dropdownOpen)}
                    className="focus:outline-none"
                  >
                    <FaUserCircle className="text-gray-700 text-2xl cursor-pointer hover:text-gray-900 transition-colors" />
                  </button>
                  <AnimatePresence>
                    {dropdownOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2 }}
                        className="absolute right-0 mt-2 w-44 bg-white shadow-lg rounded-md z-50 overflow-hidden"
                      >
                        {user.email === "admin@loreinedigital.com" && (
                          <Link
                            to="/admin-dashboard"
                            className="block px-4 py-2 text-gray-700 hover:bg-gray-100 transition-colors"
                            onClick={closeAllMenus}
                          >
                            Admin Dashboard
                          </Link>
                        )}
                        <button
                          onClick={handleLogout}
                          className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 transition-colors"
                        >
                          Logout
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </>
              ) : (
                <Link to="/login" onClick={closeAllMenus} aria-label="Login">
                  <FaUserCircle className="text-gray-700 text-2xl cursor-pointer hover:text-gray-900 transition-colors" />
                </Link>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden focus:outline-none"
              onClick={toggleMobileMenu}
              aria-label="Mobile menu"
            >
              {mobileMenuOpen ? (
                <FaTimes className="text-gray-600 text-2xl hover:text-gray-800 transition-colors" />
              ) : (
                <FaBars className="text-gray-600 text-2xl hover:text-gray-800 transition-colors" />
              )}
            </button>
          </div>
        </nav>

       {/* Mobile Menu - Compact Version */}
<AnimatePresence>
  {mobileMenuOpen && (
    <motion.div
      ref={menuRef}
      initial={{ x: "100%" }}
      animate={{ x: 0 }}
      exit={{ x: "100%" }}
      transition={{ type: "tween", ease: "easeOut", duration: 0.25 }}
      className="fixed top-16 right-0 w-56 z-50 bg-white/20 backdrop-blur-lg shadow-lg p-3 border-l border-white/30 rounded-bl-lg"
    >
      <ul className="flex flex-col space-y-2">
        {navLinks.map((link) => (
          <li key={link.path}>
            <Link
              to={link.path}
              className="block py-1.5 px-3 text-gray-800 hover:bg-white/30 rounded transition-colors text-sm"
              onClick={closeAllMenus}
            >
              {link.label}
            </Link>
          </li>
        ))}

        {user ? (
          <>
            {user.email === "admin@loreinedigital.com" && (
              <li>
                <Link
                  to="/admin-dashboard"
                  className="block py-1.5 px-3 text-gray-800 hover:bg-white/30 rounded transition-colors text-sm"
                  onClick={closeAllMenus}
                >
                  Admin Dashboard
                </Link>
              </li>
            )}
            <li>
              <button
                onClick={handleLogout}
                className="w-full text-left py-1.5 px-3 text-gray-800 hover:bg-white/30 rounded transition-colors text-sm"
              >
                Logout
              </button>
            </li>
          </>
        ) : (
          <li>
            <Link
              to="/login"
              className="block py-1.5 px-3 text-gray-800 hover:bg-white/30 rounded transition-colors text-sm"
              onClick={closeAllMenus}
            >
              Login
            </Link>
          </li>
        )}
      </ul>
    </motion.div>
  )}
</AnimatePresence>
      </header>

      {/* Spacer for fixed header */}
      <div className="h-16"></div>
    </>
  );
});

export default Header;