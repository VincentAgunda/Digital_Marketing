import React from "react";
import { motion } from "framer-motion";
import { FaLaptopCode, FaMobileAlt, FaPaintBrush, FaBullhorn } from "react-icons/fa";

const fontStyle = {
  fontFamily: "'SF Pro Display', -apple-system, BlinkMacSystemFont, sans-serif",
  fontWeight: 300,
};

// Animation Variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      duration: 0.6,
      ease: "easeInOut",
    },
  },
  exit: { opacity: 0, transition: { duration: 0.3 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

const ServicesPage = () => {
  return (
    <motion.section
      className="bg-black text-gray-100 min-h-screen py-16 md:py-24 px-6"
      style={fontStyle}
      initial="hidden"
      animate="visible"
      exit="exit"
      variants={containerVariants}
    >
      <div className="max-w-7xl mx-auto">
        <motion.h2
          className="text-4xl md:text-5xl font-light text-center mb-16 tracking-tight"
          variants={itemVariants}
        >
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
            Services
          </span>
        </motion.h2>

        <motion.div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6" variants={containerVariants}>
          {[
            {
              icon: <FaLaptopCode />,
              title: "Web Development",
              desc: "Cutting-edge web solutions with responsive design, performance optimization, and seamless UX.",
              color: "text-cyan-400",
              shadow: "hover:shadow-[0_10px_30px_-15px_rgba(34,211,238,0.3)]",
              border: "hover:border-cyan-400/20",
            },
            {
              icon: <FaMobileAlt />,
              title: "Mobile Apps",
              desc: "Native and cross-platform mobile applications with intuitive interfaces and robust functionality.",
              color: "text-blue-400",
              shadow: "hover:shadow-[0_10px_30px_-15px_rgba(96,165,250,0.3)]",
              border: "hover:border-blue-400/20",
            },
            {
              icon: <FaPaintBrush />,
              title: "Brand Design",
              desc: "Cohesive visual identities that communicate your brand's essence across all touchpoints.",
              color: "text-purple-400",
              shadow: "hover:shadow-[0_10px_30px_-15px_rgba(168,85,247,0.3)]",
              border: "hover:border-purple-400/20",
            },
            {
              icon: <FaBullhorn />,
              title: "Digital Strategy",
              desc: "Data-driven marketing strategies to amplify your reach and engagement across digital channels.",
              color: "text-pink-400",
              shadow: "hover:shadow-[0_10px_30px_-15px_rgba(236,72,153,0.3)]",
              border: "hover:border-pink-400/20",
            },
          ].map((service, index) => (
            <motion.div
              key={index}
              className={`bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl overflow-hidden border border-gray-800 transition-all duration-300 ${service.border} ${service.shadow}`}
              variants={itemVariants}
            >
              <div className="p-8">
                <div className={`mb-6 text-3xl ${service.color}`}>{service.icon}</div>
                <h3 className="text-xl font-normal text-white mb-4 tracking-wide">{service.title}</h3>
                <p className="text-sm text-gray-400 font-light leading-relaxed tracking-wide">
                  {service.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.section>
  );
};

export default ServicesPage;
