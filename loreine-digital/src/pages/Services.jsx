import React from "react";
import { motion } from "framer-motion";
import { FaLaptopCode, FaMobileAlt, FaPaintBrush, FaBullhorn } from "react-icons/fa";

// Font setup - make sure to include SF Pro in your project (via CSS or font loader)
const fontStyle = {
  fontFamily: "'SF Pro Display', -apple-system, BlinkMacSystemFont, sans-serif",
  fontWeight: 300
};

const pageAnimation = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
  transition: { duration: 0.5 },
};

const fadeIn = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
  transition: { duration: 0.4, ease: "easeInOut" },
};

const slideInFromBottom = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: 20 },
  transition: { duration: 0.5, ease: "easeOut" },
};

const ServicesPage = () => {
  return (
    <motion.div
      {...pageAnimation}
      className="bg-black text-gray-100 min-h-screen"
      style={fontStyle}
    >
      <motion.section
        className="py-16 md:py-24 px-6"
        {...fadeIn}
      >
        <div className="max-w-7xl mx-auto">
          <motion.h2
            className="text-4xl md:text-5xl font-light text-center mb-16 tracking-tight"
            {...slideInFromBottom}
            transition={{ ...slideInFromBottom.transition, delay: 0.1 }}
          >
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">Services</span>
          </motion.h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <motion.div
              className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl overflow-hidden border border-gray-800 hover:border-cyan-400/20 transition-all duration-300 hover:shadow-[0_10px_30px_-15px_rgba(34,211,238,0.3)]"
              {...slideInFromBottom}
              transition={{ ...slideInFromBottom.transition, delay: 0.2 }}
            >
              <div className="p-8">
                <div className="text-cyan-400 mb-6 text-3xl">
                  <FaLaptopCode />
                </div>
                <h3 className="text-xl font-normal text-white mb-4 tracking-wide">Web Development</h3>
                <p className="text-sm text-gray-400 font-light leading-relaxed tracking-wide">
                  Cutting-edge web solutions with responsive design, performance optimization, and seamless UX.
                </p>
              </div>
            </motion.div>

            <motion.div
              className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl overflow-hidden border border-gray-800 hover:border-blue-400/20 transition-all duration-300 hover:shadow-[0_10px_30px_-15px_rgba(96,165,250,0.3)]"
              {...slideInFromBottom}
              transition={{ ...slideInFromBottom.transition, delay: 0.3 }}
            >
              <div className="p-8">
                <div className="text-blue-400 mb-6 text-3xl">
                  <FaMobileAlt />
                </div>
                <h3 className="text-xl font-normal text-white mb-4 tracking-wide">Mobile Apps</h3>
                <p className="text-sm text-gray-400 font-light leading-relaxed tracking-wide">
                  Native and cross-platform mobile applications with intuitive interfaces and robust functionality.
                </p>
              </div>
            </motion.div>

            <motion.div
              className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl overflow-hidden border border-gray-800 hover:border-purple-400/20 transition-all duration-300 hover:shadow-[0_10px_30px_-15px_rgba(168,85,247,0.3)]"
              {...slideInFromBottom}
              transition={{ ...slideInFromBottom.transition, delay: 0.4 }}
            >
              <div className="p-8">
                <div className="text-purple-400 mb-6 text-3xl">
                  <FaPaintBrush />
                </div>
                <h3 className="text-xl font-normal text-white mb-4 tracking-wide">Brand Design</h3>
                <p className="text-sm text-gray-400 font-light leading-relaxed tracking-wide">
                  Cohesive visual identities that communicate your brand's essence across all touchpoints.
                </p>
              </div>
            </motion.div>

            <motion.div
              className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl overflow-hidden border border-gray-800 hover:border-pink-400/20 transition-all duration-300 hover:shadow-[0_10px_30px_-15px_rgba(236,72,153,0.3)]"
              {...slideInFromBottom}
              transition={{ ...slideInFromBottom.transition, delay: 0.5 }}
            >
              <div className="p-8">
                <div className="text-pink-400 mb-6 text-3xl">
                  <FaBullhorn />
                </div>
                <h3 className="text-xl font-normal text-white mb-4 tracking-wide">Digital Strategy</h3>
                <p className="text-sm text-gray-400 font-light leading-relaxed tracking-wide">
                  Data-driven marketing strategies to amplify your reach and engagement across digital channels.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.section>
    </motion.div>
  );
};

export default ServicesPage;