import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

import Header from "./components/Header";
import Footer from "./components/Footer";

import About from "./pages/About";
import Services from "./pages/Services";
import Portfolio from "./pages/Portfolio";
import Home from "./pages/Home";
import Blogs from "./pages/Blogs";

const pageVariants = {
  initial: {
    opacity: 0.8,
    scale: 0.98
  },
  animate: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.3,
      ease: "easeInOut"
    }
  },
  exit: {
    opacity: 0.8,
    scale: 0.98,
    transition: {
      duration: 0.2,
      ease: "easeInOut"
    }
  }
};

function App() {
  const location = useLocation();

  return (
    <div className="app">
      <Header />
      
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route
            path="/"
            element={
              <motion.div
                variants={pageVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                className="page-content"
              >
                <Home />
              </motion.div>
            }
          />
          <Route
            path="/about"
            element={
              <motion.div
                variants={pageVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                className="page-content"
              >
                <About />
              </motion.div>
            }
          />
          <Route
            path="/services"
            element={
              <motion.div
                variants={pageVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                className="page-content"
              >
                <Services />
              </motion.div>
            }
          />
          <Route
            path="/portfolio"
            element={
              <motion.div
                variants={pageVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                className="page-content"
              >
                <Portfolio />
              </motion.div>
            }
          />
          <Route
            path="/blogs"
            element={
              <motion.div
                variants={pageVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                className="page-content"
              >
                <Blogs />
              </motion.div>
            }
          />
        </Routes>
      </AnimatePresence>

      <Footer />
    </div>
  );
}

export default App;