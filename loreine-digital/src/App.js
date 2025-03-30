import React from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "./auth/AuthContext";
import SharedLayout from "./components/SharedLayout";

import Header from "./components/Header";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";

import Blogs from "./components/Blogs";
import BlogPostFuture from "./components/BlogPostFuture";
import BlogPostSEO from "./components/BlogPostSEO";
import BlogPostSocial from "./components/BlogPostSocial";
import BlogDetails from "./components/BlogDetails";
import Login from "./auth/Login";
import Register from "./auth/Register";
import AdminDashboard from "./admin/AdminDashboard";
import Payment from "./components/Payment";

import About from "./pages/About";
import Services from "./pages/Services";
import Portfolio from "./pages/Portfolio";
import Home from "./pages/Home";

const pageAnimation = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -30 },
  transition: { duration: 0.3, ease: "easeOut" },
};

const ProtectedRoute = ({ children }) => {
  const { currentUser } = useAuth();

  if (!currentUser || currentUser.email !== "admin@loreinedigital.com") {
    return <Navigate to="/login" />;
  }
  return children;
};

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
  const { currentUser, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <>
      <ScrollToTop />
      <Header user={currentUser} />

      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          {/* Routes with SharedLayout */}
          <Route element={<SharedLayout />}>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/services" element={
              <motion.div {...pageAnimation}>
                <Services />
              </motion.div>
            } />
            <Route path="/portfolio" element={
              <motion.div {...pageAnimation}>
                <Portfolio />
              </motion.div>
            } />
            <Route path="/blogs" element={
              <motion.div {...pageAnimation}>
                <Blogs />
              </motion.div>
            } />
          </Route>

          {/* Regular Routes */}
          <Route path="/" element={
            <motion.div {...pageAnimation}>
              <Home />
            </motion.div>
          } />

          <Route path="/about" element={
            <motion.div {...pageAnimation}>
              <About />
            </motion.div>
          } />

          <Route path="/blog/future-of-digital-marketing" element={
            <motion.div {...pageAnimation}>
              <BlogPostFuture />
            </motion.div>
          } />

          <Route path="/blog/mastering-seo" element={
            <motion.div {...pageAnimation}>
              <BlogPostSEO />
            </motion.div>
          } />

          <Route path="/blog/social-media-engagement" element={
            <motion.div {...pageAnimation}>
              <BlogPostSocial />
            </motion.div>
          } />

          <Route path="/blog/:id" element={
            <motion.div {...pageAnimation}>
              <BlogDetails />
            </motion.div>
          } />

          <Route path="/payment/:blogId" element={
            <motion.div {...pageAnimation}>
              <Payment />
            </motion.div>
          } />

          {/* Protected Admin Route */}
          <Route
            path="/admin-dashboard"
            element={
              <ProtectedRoute>
                <motion.div {...pageAnimation}>
                  <AdminDashboard />
                </motion.div>
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