import React, { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { FaLaptopCode, FaMobileAlt, FaPaintBrush, FaBullhorn, FaSun, FaMoon } from "react-icons/fa";

// Service data with theme-based styles
const services = [
  {
    icon: <FaLaptopCode />,
    title: "Web Development",
    desc: "Cutting-edge web solutions with responsive design, performance optimization, and seamless UX.",
    bgDark: "bg-[#7B93AA]",
    bgLight: "bg-[#E3EDF7]",
    imgBgDark: "bg-gray-900",
    imgBgLight: "bg-white",
  },
  {
    icon: <FaMobileAlt />,
    title: "Mobile Apps",
    desc: "Native and cross-platform mobile applications with intuitive interfaces and robust functionality.",
    bgDark: "bg-[#E7E1DA]",
    bgLight: "bg-[#f9f6f2]",
    imgBgDark: "bg-gray-800",
    imgBgLight: "bg-white",
  },
  {
    icon: <FaPaintBrush />,
    title: "Brand Design",
    desc: "Cohesive visual identities that communicate your brand's essence across all touchpoints.",
    bgDark: "bg-[#5E7B80]",
    bgLight: "bg-[#dfeae7]",
    imgBgDark: "bg-gray-900",
    imgBgLight: "bg-white",
  },
  {
    icon: <FaBullhorn />,
    title: "Digital Strategy",
    desc: "Data-driven marketing strategies to amplify your reach and engagement across digital channels.",
    bgDark: "bg-[#22344C]",
    bgLight: "bg-[#e0e5ea]",
    imgBgDark: "bg-gray-800",
    imgBgLight: "bg-white",
  },
];

// Text fade-in variant
const fadeInUp = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: "easeOut" },
  },
};

// Service card
const ServiceSection = ({ service, index, darkMode }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "0px 0px -50px 0px" });

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={fadeInUp}
      className={`relative overflow-hidden ${
        darkMode ? service.bgDark : service.bgLight
      } rounded-[50px] flex flex-col-reverse md:flex-row items-center justify-between px-6 md:px-12 py-16 md:py-20 transition-all duration-500`}
    >
      {/* Bubbly Animated Icon */}
      <motion.div
        initial={{ scale: 0.6, opacity: 0 }}
        animate={isInView ? { scale: 1, opacity: 1 } : {}}
        transition={{
          type: "spring",
          stiffness: 200,
          damping: 15,
          delay: 0.1,
        }}
        className={`relative w-60 h-60 md:w-80 md:h-80 rounded-full ${
          darkMode ? service.imgBgDark : service.imgBgLight
        } shadow-2xl mb-8 md:mb-0 ${
          index % 2 === 0 ? "md:mr-12" : "md:ml-12"
        } transition-all duration-500`}
      >
        <div className="absolute inset-0 rounded-full overflow-hidden flex items-center justify-center">
          <div className={`text-5xl md:text-6xl ${darkMode ? "text-white" : "text-black"}`}>
            {service.icon}
          </div>
        </div>
      </motion.div>

      {/* Text Content */}
      <div
        className={`flex-1 max-w-xl text-center md:text-left ${
          index % 2 !== 0 ? "md:order-first md:text-right" : ""
        }`}
      >
        <h3 className={`text-2xl md:text-3xl font-normal mb-4 ${darkMode ? "text-white" : "text-gray-900"}`}>
          {service.title}
        </h3>
        <p className={`text-base md:text-lg font-light leading-relaxed mb-6 ${darkMode ? "text-white/80" : "text-gray-700"}`}>
          {service.desc}
        </p>
        <button className="bg-yellow-400 hover:bg-yellow-300 text-black font-semibold px-5 py-2 rounded-full transition-all">
          Show me more
        </button>
      </div>
    </motion.div>
  );
};

// Main component
const ServicesPage = () => {
  const [darkMode, setDarkMode] = useState(true);

  return (
    <section className={`${darkMode ? "bg-black" : "bg-white"} min-h-screen transition-colors duration-500`}>
      <div className="max-w-7xl mx-auto py-20 px-4 md:px-8">
        {/* Theme Toggle */}
        <div className="flex justify-end mb-6">
          <button
            onClick={() => setDarkMode((prev) => !prev)}
            className="flex items-center gap-2 px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-full text-sm transition-all"
          >
            {darkMode ? <FaSun /> : <FaMoon />}
            {darkMode ? "Light Mode" : "Dark Mode"}
          </button>
        </div>

        {/* Services Title - ONLY THIS IS BOLD */}
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className={`text-4xl md:text-5xl font-medium text-center mb-24 tracking-tight ${
            darkMode ? "text-white" : "text-gray-900"
          }`}
        >
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
            Services
          </span>
        </motion.h2>

        {/* Services List */}
        <div className="space-y-24">
          {services.map((service, index) => (
            <ServiceSection key={index} service={service} index={index} darkMode={darkMode} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesPage;
