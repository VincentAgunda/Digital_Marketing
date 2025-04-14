import React, { useState, useEffect, useRef, useCallback, useMemo } from "react";
import { FaSearch, FaUserCircle, FaBars, FaTimes } from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";
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
  const location = useLocation();

  const closeAllMenus = useCallback(() => {
    setDropdownOpen(false);
    setMobileMenuOpen(false);
  }, []);

  const handleLogout = useCallback(async () => {
    try {
      await signOut(auth);
      closeAllMenus();
    } catch (error) {
      console.error("Logout error:", error);
    }
  }, [closeAllMenus]);

  const toggleMobileMenu = useCallback(() => {
    setMobileMenuOpen((prev) => !prev);
    setDropdownOpen(false);
  }, []);

  // Memoized navigation links to prevent unnecessary re-renders
  const renderNavLinks = useMemo(() => (
    navLinks.map((link) => (
      <li key={link.path}>
        <Link
          to={link.path}
          className={`text-gray-600 hover:text-gray-800 transition-colors duration-200 ${
            location.pathname === link.path ? "font-medium text-gray-900" : ""
          }`}
          onClick={closeAllMenus}
        >
          {link.label}
        </Link>
      </li>
    ))
  ), [closeAllMenus, location.pathname]);

  const renderMobileMenuLinks = useMemo(() => (
    navLinks.map((link) => (
      <motion.li
        key={link.path}
        initial={{ x: 20, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 0.05 }}
      >
        <Link
          to={link.path}
          className="block py-1.5 px-3 text-gray-800 hover:bg-white/30 rounded transition-colors text-sm"
          onClick={closeAllMenus}
        >
          {link.label}
        </Link>
      </motion.li>
    ))
  ), [closeAllMenus]);

  // Close dropdown or menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
      if (menuRef.current && !menuRef.current.contains(event.target) && 
          !event.target.closest('[aria-label="Mobile menu"]')) {
        setMobileMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <>
      <header className="bg-[#f2f4f8] h-16 fixed top-0 left-0 w-full z-50 shadow-md">
        <nav className="max-w-6xl mx-auto px-4 flex justify-between items-center h-full">
          <div className="text-xl font-bold text-gray-800">
            <Link to="/" onClick={closeAllMenus}>LOGO</Link>
          </div>

          <ul className="hidden md:flex space-x-6">
            {renderNavLinks}
          </ul>

          <div className="flex items-center space-x-4">
            <button aria-label="Search">
              <FaSearch className="text-gray-600 cursor-pointer hover:text-gray-800 transition-colors" />
            </button>

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

        <AnimatePresence>
          {mobileMenuOpen && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/30 z-40 md:hidden"
                onClick={closeAllMenus}
              />
              <motion.div
                ref={menuRef}
                initial={{ x: "100%" }}
                animate={{ x: 0 }}
                exit={{ x: "100%" }}
                transition={{ type: "tween", ease: "easeOut", duration: 0.25 }}
                className="fixed top-16 right-0 w-56 z-50 bg-white/20 backdrop-blur-lg shadow-lg p-3 border-l border-white/30 rounded-bl-lg"
              >
                <ul className="flex flex-col space-y-2">
                  {renderMobileMenuLinks}

                  {user ? (
                    <>
                      {user.email === "admin@loreinedigital.com" && (
                        <motion.li
                          initial={{ x: 20, opacity: 0 }}
                          animate={{ x: 0, opacity: 1 }}
                          transition={{ delay: 0.1 }}
                        >
                          <Link
                            to="/admin-dashboard"
                            className="block py-1.5 px-3 text-gray-800 hover:bg-white/30 rounded transition-colors text-sm"
                            onClick={closeAllMenus}
                          >
                            Admin Dashboard
                          </Link>
                        </motion.li>
                      )}
                      <motion.li
                        initial={{ x: 20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: 0.15 }}
                      >
                        <button
                          onClick={handleLogout}
                          className="w-full text-left py-1.5 px-3 text-gray-800 hover:bg-white/30 rounded transition-colors text-sm"
                        >
                          Logout
                        </button>
                      </motion.li>
                    </>
                  ) : (
                    <motion.li
                      initial={{ x: 20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: 0.2 }}
                    >
                      <Link
                        to="/login"
                        className="block py-1.5 px-3 text-gray-800 hover:bg-white/30 rounded transition-colors text-sm"
                        onClick={closeAllMenus}
                      >
                        Login
                      </Link>
                    </motion.li>
                  )}
                </ul>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </header>

      <div className="h-16"></div>
    </>
  );
});

Header.displayName = "Header"; // For better debugging in React DevTools
export default Header;