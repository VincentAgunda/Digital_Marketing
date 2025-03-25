import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { auth } from "./firebase";
import { onAuthStateChanged } from "firebase/auth";

import Header from "./components/Header";
import Footer from "./components/Footer";
import Blogs from "./components/Blogs";
import BlogPostFuture from "./components/BlogPostFuture";
import BlogPostSEO from "./components/BlogPostSEO";
import BlogPostSocial from "./components/BlogPostSocial";
import BlogDetails from "./components/BlogDetails";
import Login from "./auth/Login";
import Register from "./auth/Register";
import AdminDashboard from "./admin/AdminDashboard";

import HeroSection from "./components/HeroSection";
import WhatWeOffer from "./components/WhatWeOffer";
import BuzzSection from "./components/BuzzSection";
import Testimonials from "./components/Testimonials";
import LatestNews from "./components/LatestNews";

// Page Transition Animation
const pageAnimation = {
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -10 },
  transition: { duration: 0.4, ease: "easeInOut" },
};

// Pages as Components
const Home = () => (
  <motion.div {...pageAnimation}>
    <HeroSection />
    <WhatWeOffer />
    <BuzzSection />
    <Testimonials />
    <LatestNews />
  </motion.div>
);

const About = () => (
  <motion.div {...pageAnimation}>
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-4">About Us</h1>
      <p className="text-gray-600">We are a leading digital marketing agency specializing in growth strategies.</p>
    </div>
  </motion.div>
);

const Services = () => (
  <motion.div {...pageAnimation}>
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-4">Our Services</h1>
      <p className="text-gray-600">We provide SEO, social media marketing, and PPC management.</p>
    </div>
  </motion.div>
);

const Portfolio = () => (
  <motion.div {...pageAnimation}>
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-4">Portfolio</h1>
      <p className="text-gray-600">Check out our recent projects and case studies.</p>
    </div>
  </motion.div>
);

// Protected Route for Admin Access
const ProtectedRoute = ({ user, children }) => {
  if (!user || user.email !== "admin@loreinedigital.com") {
    return <Navigate to="/login" />;
  }
  return children;
};

// Loading Component
const LoadingScreen = () => (
  <motion.div
    className="flex justify-center items-center h-screen text-xl"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 0.5 }}
  >
    Loading...
  </motion.div>
);

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const location = useLocation(); // Track page changes

  // Track Authentication State
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false); // Stop loading once authentication check is done
    });
    return () => unsubscribe();
  }, []);

  // Show loading while checking authentication
  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <>
      <Header user={user} />
      <AnimatePresence mode="wait">
        <Routes key={location.pathname} location={location}>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/blogs" element={<Blogs />} />
          <Route path="/blog/future-of-digital-marketing" element={<BlogPostFuture />} />
          <Route path="/blog/mastering-seo" element={<BlogPostSEO />} />
          <Route path="/blog/social-media-engagement" element={<BlogPostSocial />} />
          <Route path="/blog/:id" element={<BlogDetails />} />

          {/* Authentication Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Protected Admin Route */}
          <Route
            path="/admin-dashboard"
            element={
              <ProtectedRoute user={user}>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />
        </Routes>
      </AnimatePresence>
      <Footer />
    </>
  );
}

export default App;
