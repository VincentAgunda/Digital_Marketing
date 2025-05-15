import React, { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { FaLaptopCode, FaMobileAlt, FaPaintBrush, FaBullhorn, FaSun, FaMoon, FaRobot, FaChartLine, FaTimes } from "react-icons/fa";

// Service data with expanded details
const services = [
  {
    icon: <FaLaptopCode />,
    title: "Web Development",
    desc: "Cutting-edge web solutions with responsive design, performance optimization, and seamless UX.",
    details: [
      "Custom website development",
      "E-commerce solutions",
      "CMS integration (WordPress, Shopify)",
      "API development & integration",
      "Performance optimization"
    ],
    bgDark: "bg-[#7B93AA]",
    bgLight: "bg-[#E3EDF7]",
    imgBgDark: "bg-gray-900",
    imgBgLight: "bg-white",
  },
  {
    icon: <FaMobileAlt />,
    title: "Mobile Apps",
    desc: "Native and cross-platform mobile applications with intuitive interfaces and robust functionality.",
    details: [
      "iOS and Android app development",
      "React Native cross-platform apps",
      "UI/UX mobile design",
      "App store optimization",
      "Push notification systems"
    ],
    bgDark: "bg-[#E7E1DA]",
    bgLight: "bg-[#f9f6f2]",
    imgBgDark: "bg-gray-800",
    imgBgLight: "bg-white",
  },
  {
    icon: <FaPaintBrush />,
    title: "Brand Design",
    desc: "Cohesive visual identities that communicate your brand's essence across all touchpoints.",
    details: [
      "Logo design & branding",
      "Visual identity systems",
      "Marketing collateral",
      "Packaging design",
      "Brand guidelines"
    ],
    bgDark: "bg-[#5E7B80]",
    bgLight: "bg-[#dfeae7]",
    imgBgDark: "bg-gray-900",
    imgBgLight: "bg-white",
  },
  {
    icon: <FaBullhorn />,
    title: "Digital Strategy",
    desc: "Data-driven marketing strategies to amplify your reach and engagement across digital channels.",
    details: [
      "Social media strategy",
      "Content marketing plans",
      "SEO optimization",
      "Email marketing campaigns",
      "Analytics & reporting"
    ],
    bgDark: "bg-[#22344C]",
    bgLight: "bg-[#e0e5ea]",
    imgBgDark: "bg-gray-800",
    imgBgLight: "bg-white",
  },
  {
    icon: <FaRobot />,
    title: "AI Integration",
    desc: "Intelligent automation and machine learning solutions to enhance your business processes and decision-making.",
    details: [
      "Custom AI solutions",
      "Machine learning models",
      "Chatbot development",
      "Predictive analytics",
      "Process automation"
    ],
    bgDark: "bg-[#6D466B]",
    bgLight: "bg-[#f0e6ef]",
    imgBgDark: "bg-gray-900",
    imgBgLight: "bg-white",
  },
  {
    icon: <FaChartLine />,
    title: "Software Consultancy",
    desc: "Expert guidance on technology stack selection, architecture design, and digital transformation strategies.",
    details: [
      "Technology audits",
      "System architecture design",
      "Cloud migration",
      "DevOps implementation",
      "Team training & mentoring"
    ],
    bgDark: "bg-[#3A5A40]",
    bgLight: "bg-[#e6efe7]",
    imgBgDark: "bg-gray-800",
    imgBgLight: "bg-white",
  },
];

// Animation variants
const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 1.2, ease: "easeOut" },
  },
};

const modalVariants = {
  hidden: { 
    opacity: 0,
    scale: 0.8,
    transition: { duration: 0.3 }
  },
  visible: { 
    opacity: 1,
    scale: 1,
    transition: { 
      duration: 0.4,
      ease: "easeOut",
      when: "beforeChildren",
      staggerChildren: 0.1
    }
  }
};

const modalItem = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

// Service card component
const ServiceSection = ({ service, index, darkMode, openModal }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "0px 0px -100px 0px" });

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
      {/* Icon Container */}
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={isInView ? { scale: 1, opacity: 1 } : {}}
        transition={{
          type: "spring",
          stiffness: 100,
          damping: 20,
          delay: 0.2,
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
        <p className={`text-base md:text-lg font-normal leading-relaxed mb-6 ${darkMode ? "text-white/80" : "text-gray-700"}`}>
          {service.desc}
        </p>
        <button 
          onClick={() => openModal(service)}
          className="bg-yellow-400 hover:bg-yellow-300 text-black font-semibold px-5 py-2 rounded-full transition-all hover:scale-105 active:scale-95"
        >
          Show me more
        </button>
      </div>
    </motion.div>
  );
};

// Modal component
const ServiceModal = ({ service, onClose, darkMode }) => {
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50 backdrop-blur-sm"
        onClick={onClose}
      >
        <motion.div
          variants={modalVariants}
          initial="hidden"
          animate="visible"
          exit="hidden"
          className={`relative max-w-2xl w-full rounded-3xl overflow-hidden ${darkMode ? 'bg-gray-900' : 'bg-white'} shadow-2xl`}
          onClick={(e) => e.stopPropagation()}
        >
          <button 
            onClick={onClose}
            className={`absolute top-4 right-4 z-10 p-2 rounded-full ${darkMode ? 'text-white hover:bg-gray-800' : 'text-gray-800 hover:bg-gray-100'}`}
          >
            <FaTimes className="text-xl" />
          </button>
          
          <div className={`p-8 md:p-12 ${darkMode ? service.bgDark : service.bgLight}`}>
            <div className="flex flex-col md:flex-row items-center gap-8 mb-8">
              <div className={`w-32 h-32 rounded-full flex items-center justify-center ${darkMode ? service.imgBgDark : service.imgBgLight}`}>
                <div className={`text-4xl ${darkMode ? 'text-white' : 'text-black'}`}>
                  {service.icon}
                </div>
              </div>
              <div>
                <h2 className={`text-3xl font-bold mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  {service.title}
                </h2>
                <p className={`text-lg ${darkMode ? 'text-white/80' : 'text-gray-700'}`}>
                  {service.desc}
                </p>
              </div>
            </div>
            
            <div className="mt-8">
              <h3 className={`text-xl font-semibold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                What we offer:
              </h3>
              <ul className="space-y-3">
                {service.details.map((item, i) => (
                  <motion.li
                    key={i}
                    variants={modalItem}
                    className={`flex items-start ${darkMode ? 'text-white/90' : 'text-gray-700'}`}
                  >
                    <span className={`inline-block w-2 h-2 rounded-full mt-2 mr-3 ${darkMode ? 'bg-yellow-400' : 'bg-yellow-500'}`}></span>
                    {item}
                  </motion.li>
                ))}
              </ul>
            </div>
            
            <div className="mt-12 text-center">
              <button 
                className={`px-8 py-3 rounded-full font-semibold transition-all ${darkMode ? 'bg-yellow-400 hover:bg-yellow-300 text-black' : 'bg-blue-600 hover:bg-blue-500 text-white'}`}
              >
                Get Started
              </button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

// Main component
const ServicesPage = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [selectedService, setSelectedService] = useState(null);

  const openModal = (service) => {
    setSelectedService(service);
    document.body.style.overflow = 'hidden'; // Prevent scrolling when modal is open
  };

  const closeModal = () => {
    setSelectedService(null);
    document.body.style.overflow = 'auto'; // Re-enable scrolling
  };

  return (
    <section className={`${darkMode ? "bg-black" : "bg-white"} min-h-screen transition-colors duration-500`}>
      <div className="max-w-7xl mx-auto py-20 px-4 md:px-8">
        {/* Theme Toggle */}
        <div className="flex justify-end mb-6">
          <button
            onClick={() => setDarkMode((prev) => !prev)}
            className="flex items-center gap-2 px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-full text-sm transition-all"
          >
            {darkMode ? <FaSun /> : <FaMoon />}
            {darkMode ? "Light Mode" : "Dark Mode"}
          </button>
        </div>

        {/* Services Title */}
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
            <ServiceSection 
              key={index} 
              service={service} 
              index={index} 
              darkMode={darkMode}
              openModal={openModal}
            />
          ))}
        </div>
      </div>

      {/* Modal */}
      {selectedService && (
        <ServiceModal 
          service={selectedService} 
          onClose={closeModal} 
          darkMode={darkMode}
        />
      )}
    </section>
  );
};

export default ServicesPage;