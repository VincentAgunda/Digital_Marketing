import React, { useState, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { FaSun, FaMoon, FaTimes, FaLinkedin, FaTwitter } from "react-icons/fa";

// Animation variants
const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 1.2,
      ease: "easeOut",
    },
  },
};

const modalVariants = {
  hidden: {
    opacity: 0,
    scale: 0.95,
    transition: {
      duration: 0.2,
      ease: "easeIn"
    }
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.25,
      ease: "easeOut",
      when: "beforeChildren",
      staggerChildren: 0.1
    }
  }
};

const staggerItem = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut"
    }
  }
};

// Data
const TEAM_MEMBERS = [
  {
    id: 1,
    name: "Vincent Agunda",
    role: "Executive Director",
    bio: "Crafting intuitive interfaces and navigating the Tech Landscape.",
    image: "camera4.webp",
    linkedin: "#",
    twitter: "#"
  },
  {
    id: 2,
    name: "Brian Okungu",
    role: "Senior Developer",
    bio: "Building robust, scalable systems.",
    image: "camera1.webp",
    linkedin: "#",
    twitter: "#"
  },
  {
    id: 3,
    name: "Brian Oloo",
    role: "Full Stack Developer",
    bio: "Shaping compelling brand narratives.",
    image: "camera1.webp",
    linkedin: "#",
    twitter: "#"
  }
];

const DESIGN_PRINCIPLES = [
  {
    title: "Precision",
    description: "Pixel-perfect execution with atomic attention.",
    icon: "⚡"
  },
  {
    title: "Clarity",
    description: "Simplifying complexity through thoughtful design.",
    icon: "🔍"
  },
  {
    title: "Depth",
    description: "Layered experiences that reward exploration.",
    icon: "🌌"
  }
];

const AboutPage = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [showTeam, setShowTeam] = useState(false);
  const containerRef = useRef(null);

  // Hook to check if the container is in view - not directly used for popup logic
  // const isInView = useInView(containerRef, { once: true, amount: 0.5 });


  return (
    <section className={`${darkMode ? "bg-black" : "bg-white"} min-h-screen transition-colors duration-500`} ref={containerRef}>
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

        {/* Hero Section - Original Content with New Styling */}
        <div className="container mx-auto px-6 py-12 md:py-20 flex flex-col md:flex-row items-center gap-8 md:gap-12">
          <div className="flex-1">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              className="mb-6"
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: {
                    staggerChildren: 0.15,
                    delayChildren: 0.2
                  }
                }
              }}
            >
              <motion.h1
                className={`text-4xl md:text-5xl font-medium leading-tight mb-6 ${darkMode ? "text-white" : "text-gray-900"}`}
                variants={fadeInUp}
              >
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">Crafting</span> digital
              </motion.h1>
              <motion.h1
                className={`text-4xl md:text-5xl font-medium leading-tight mb-6 ${darkMode ? "text-white" : "text-gray-900"}`}
                variants={fadeInUp}
                transition={{ delay: 0.2 }}
              >
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">experiences</span> with
              </motion.h1>
              <motion.h1
                className={`text-4xl md:text-5xl font-medium leading-tight mb-6 ${darkMode ? "text-white" : "text-gray-900"}`}
                variants={fadeInUp}
                transition={{ delay: 0.4 }}
              >
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">purpose</span>
              </motion.h1>
            </motion.div>

            <motion.p
              className={`text-xl mb-8 max-w-md ${darkMode ? "text-white/80" : "text-gray-700"}`}
              variants={fadeInUp}
              transition={{ delay: 0.6 }}
            >
              Founded in <span className={`${darkMode ? "text-cyan-400" : "text-blue-600"}`}>2025</span>, we build <span className={`${darkMode ? "text-cyan-400" : "text-blue-600"}`}>next-gen</span> digital solutions.
            </motion.p>

            <motion.button
              onClick={() => setShowTeam(true)}
              variants={fadeInUp}
              transition={{ delay: 0.8 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-3 bg-gradient-to-r from-cyan-600 to-blue-600 rounded-lg text-white font-medium hover:from-cyan-500 hover:to-blue-500 transition-all"
            >
              Meet our experts →
            </motion.button>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="flex-1 aspect-video md:aspect-square bg-gray-800 rounded-xl overflow-hidden border border-gray-700"
          >
            <img
              src="camera1.webp"
              alt="Digital interface"
              className="w-full h-full object-cover"
              loading="lazy"
              width="600"
              height="600"
            />
          </motion.div>
        </div>

        {/* Values Section - Original Content with New Styling */}
        <motion.div
          className="container mx-auto px-6 py-16 mb-24"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
        >
          <motion.h2
            className={`text-3xl md:text-4xl font-medium text-center mb-16 ${darkMode ? "text-white" : "text-gray-900"}`}
            variants={fadeInUp}
          >
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">Design</span> Principles
          </motion.h2>

          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {DESIGN_PRINCIPLES.map((item, index) => (
              <motion.div
                key={item.title}
                variants={fadeInUp}
                transition={{ delay: index * 0.1 }}
                className={`p-8 rounded-xl ${darkMode ? "bg-gray-900/50" : "bg-gray-100"} border ${darkMode ? "border-gray-800" : "border-gray-200"} hover:border-cyan-400/30 transition-colors`}
                whileHover={{ y: -5 }}
              >
                <div className={`text-3xl mb-4 ${darkMode ? "text-cyan-400" : "text-blue-600"}`}>{item.icon}</div>
                <h3 className={`text-xl font-medium mb-2 ${darkMode ? "text-white" : "text-gray-900"}`}>
                  {item.title}
                </h3>
                <p className={`${darkMode ? "text-white/80" : "text-gray-700"}`}>
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* CTA Section - Original Content with New Styling */}
        <motion.div
          className={`rounded-[50px] p-12 text-center ${darkMode ? "bg-gray-900/50" : "bg-gray-100"} border ${darkMode ? "border-gray-800" : "border-gray-200"} mb-24`}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
        >
          <motion.h2
            className={`text-3xl md:text-4xl font-medium mb-6 ${darkMode ? "text-white" : "text-gray-900"}`}
            variants={fadeInUp}
          >
            Ready to <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">ignite</span> your digital presence?
          </motion.h2>
          <motion.button
            variants={fadeInUp}
            transition={{ delay: 0.2 }}
            className={`px-8 py-3 rounded-lg font-semibold border-2 ${darkMode ? "border-cyan-400 text-white hover:bg-gray-800" : "border-blue-600 text-blue-600 hover:bg-gray-50"} transition-all`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Start a project
          </motion.button>
        </motion.div>

        {/* Team Popup Modal - Original Content with New Styling */}
        <AnimatePresence>
          {showTeam && (
            <motion.div
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={() => setShowTeam(false)} // Close when clicking outside the modal content
            >
              <motion.div
                variants={modalVariants}
                initial="hidden"
                animate="visible"
                exit="hidden"
                className={`relative w-full max-w-4xl max-h-[90vh] rounded-3xl overflow-hidden ${darkMode ? 'bg-gray-900' : 'bg-white'} shadow-2xl flex flex-col`}
                onClick={(e) => e.stopPropagation()} // Prevent click inside modal content from closing it
              >
                <button
                  onClick={() => setShowTeam(false)}
                  className={`absolute top-3 right-3 z-10 p-2 rounded-full ${darkMode ? 'text-white hover:bg-gray-800' : 'text-gray-800 hover:bg-gray-100'}`}
                >
                  <FaTimes className="text-xl" />
                </button>

                <div className="p-6 md:p-8 sticky top-0 bg-gray-900 border-b border-gray-800 z-10">
                  <h3 className={`text-2xl font-medium text-center ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
                      Our Core Team
                    </span>
                  </h3>
                </div>

                <div className="overflow-y-auto p-6 md:p-8">
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                    {TEAM_MEMBERS.map((member) => (
                      <motion.div
                        key={member.id}
                        variants={staggerItem}
                        className={`rounded-xl overflow-hidden ${darkMode ? 'bg-gray-800' : 'bg-gray-50'} border ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}
                      >
                        <div className="h-48 w-full bg-gray-300 dark:bg-gray-700 relative overflow-hidden">
                          <img
                            src={member.image}
                            alt={member.name}
                            className="w-full h-full object-cover"
                            loading="lazy"
                          />
                        </div>
                        <div className="p-4">
                          <h3 className={`text-lg font-medium mb-1 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                            {member.name}
                          </h3>
                          <p className={`text-sm mb-3 ${darkMode ? 'text-cyan-400' : 'text-blue-600'}`}>
                            {member.role}
                          </p>
                          <p className={`text-sm mb-4 ${darkMode ? 'text-white/80' : 'text-gray-700'}`}>
                            {member.bio}
                          </p>
                          <div className="flex gap-3">
                            <a
                              href={member.linkedin}
                              className={`p-2 rounded-full ${darkMode ? 'bg-gray-700 text-white hover:bg-gray-600' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
                            >
                              <FaLinkedin />
                            </a>
                            <a
                              href={member.twitter}
                              className={`p-2 rounded-full ${darkMode ? 'bg-gray-700 text-white hover:bg-gray-600' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
                            >
                              <FaTwitter />
                            </a>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default AboutPage;