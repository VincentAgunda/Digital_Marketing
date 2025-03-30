import React from "react";
import { motion } from "framer-motion";

const pageAnimation = {
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -10 },
  transition: { duration: 0.4, ease: "easeInOut" },
};

const About = () => {
  return (
    <motion.div {...pageAnimation}>
      <div className="max-w-4xl mx-auto p-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">About Us</h1>
        <p className="text-gray-600">
          We are a leading digital marketing agency specializing in growth strategies.
        </p>
      </div>
    </motion.div>
  );
};

export default About;
