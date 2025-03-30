import React from "react";
import { motion } from "framer-motion";
import Pricing from "../components/Pricing"; // Assuming Pricing.js is in the components directory

const pageAnimation = {
  initial: { opacity: 0, y: 5 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -5 },
  transition: { duration: 0.6, ease: "easeInOut" },
};

const Services = () => {
  return (
    <motion.div {...pageAnimation}>
      <div className="max-w-6xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-white mb-6 text-center">Our Services & Pricing</h1>
        <p className="text-lg text-gray-400 mb-8 text-center">
          Explore our flexible and transparent pricing plans designed to help your business thrive in the digital landscape.
        </p>
        <Pricing /> {/* Include the Pricing component here */}
        <div className="mt-12 text-center text-gray-400 text-sm">
          <p>Need a custom solution? <a href="/contact" className="text-indigo-600 hover:underline">Contact us</a> for a personalized quote.</p>
        </div>
      </div>
    </motion.div>
  );
};

export default Services;