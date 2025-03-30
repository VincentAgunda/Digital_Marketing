import React from "react";
import { motion } from "framer-motion";

// ✅ Correct import paths (go up one level first)
import HeroSection from "../components/HeroSection";
import WhatWeOffer from "../components/WhatWeOffer";
import BuzzSection from "../components/BuzzSection";
import Testimonial from "../components/Testimonials";
import LatestNews from "../components/LatestNews";

// ✅ Optimized Page Animation
const pageAnimation = {
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -10 },
  transition: { duration: 0.3, ease: "easeOut" },
};

const Home = () => (
  <motion.div {...pageAnimation}>
    <HeroSection />
    <WhatWeOffer />
    <BuzzSection />
    <Testimonial />
    <LatestNews />
  </motion.div>
);

export default Home;
