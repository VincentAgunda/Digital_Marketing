import React, { useState, useEffect, useRef, useMemo } from "react";
import { motion, AnimatePresence, useInView, useAnimation } from "framer-motion";

// --- Animation Variants (moved to constants outside component) ---
const HEADING_CONTAINER_VARIANTS = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.2, delayChildren: 0.1 } },
};

const LINE_VARIANTS = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

const FADE_IN_VARIANTS = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const TEAM_CARD_VARIANTS = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 300, damping: 25 }
  },
  exit: { opacity: 0, y: 20 }
};

const PRINCIPLES_CONTAINER_VARIANTS = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } }
};

const PRINCIPLE_CARD_VARIANTS = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
};

// --- Data (moved to constants outside component) ---
const TEAM_MEMBERS = [
  { id: 1, name: "Alex Chen", role: "Lead Designer", bio: "Crafting intuitive interfaces with precision.", image: "camera4.webp", linkedin: "#", twitter: "#" },
  { id: 2, name: "Samira Khan", role: "Senior Developer", bio: "Building robust, scalable systems.", image: "camera1.webp", linkedin: "#", twitter: "#" },
  { id: 3, name: "Jordan Wright", role: "Creative Director", bio: "Shaping compelling brand narratives.", image: "camera1.webp", linkedin: "#", twitter: "#" }
];

const DESIGN_PRINCIPLES = [
  { title: "Precision", description: "Pixel-perfect execution with atomic attention.", icon: "⚡" },
  { title: "Clarity", description: "Simplifying complexity through thoughtful design.", icon: "🔍" },
  { title: "Depth", description: "Layered experiences that reward exploration.", icon: "🌌" }
];

// Background pattern as constant
const BG_PATTERN = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxkZWZzPjxwYXR0ZXJuIGlkPSJwYXR0ZXJuIiB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHBhdHRlcm5Vbml0cz0idXNlclNwYWNlT25Vc2UiIHBhdHRlcm5UcmFuc2Zvcm09InJvdGF0ZSg0NSkiPjxyZWN0IHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCIgZmlsbD0icmdiYSgyNTUsMjU1LDI1NSwwLjAyKSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3QgZmlsbD0idXJsKCNwYXR0ZXJuKSIgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIvPjwvc3ZnPg==';

// --- Optimized PulsingIcon Component ---
const PulsingIcon = ({ children, index }) => {
  const controls = useAnimation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.5 });

  useEffect(() => {
    if (isInView) {
      const animation = {
        scale: [1, 1.1, 1],
        transition: { 
          duration: 2, 
          repeat: Infinity, 
          repeatType: "loop", 
          ease: "easeInOut", 
          delay: index * 0.3 
        }
      };
      controls.start(animation);
    } else {
      controls.stop();
      controls.start({ scale: 1, transition: { duration: 0.1 } });
    }
  }, [isInView, controls, index]);

  return (
    <motion.div ref={ref} className="text-2xl mb-3" animate={controls}>
      {children}
    </motion.div>
  );
};

// --- Main Component ---
const AboutPage = () => {
  const [showTeam, setShowTeam] = useState(false);
  const containerRef = useRef(null);

  // Cached DOM references
  const scrollToTop = useMemo(() => ({
    top: 0,
    behavior: 'smooth'
  }), []);

  // Effect for smooth scroll-to-top on mount
  useEffect(() => {
    window.scrollTo(scrollToTop);
  }, [scrollToTop]);

  // Optimized team modal toggle
  const toggleTeamModal = useMemo(() => () => setShowTeam(prev => !prev), []);

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100 font-sans overflow-x-hidden" ref={containerRef}>
      {/* Fixed Background SVG Pattern */}
      <div 
        className="fixed inset-0 opacity-5 pointer-events-none" 
        style={{ backgroundImage: `url(${BG_PATTERN})` }} 
      />

      {/* Hero Section */}
      <section className="container mx-auto px-6 py-12 md:py-20 flex flex-col md:flex-row items-center gap-8 md:gap-12">
        <div className="flex-1">
          <motion.h1
            className="text-4xl md:text-5xl font-light mb-6 leading-tight"
            variants={HEADING_CONTAINER_VARIANTS}
            initial="hidden"
            animate="visible"
          >
            <motion.span className="block" variants={LINE_VARIANTS}>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">Crafting</span> digital 
            </motion.span>
            <motion.span className="block" variants={LINE_VARIANTS}>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-500">experiences</span> with 
            </motion.span>
            <motion.span className="block" variants={LINE_VARIANTS}>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-500">purpose</span>
            </motion.span>
          </motion.h1>

          <motion.p
            className="text-gray-400 mb-8 max-w-md"
            variants={FADE_IN_VARIANTS}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            Founded in <span className="text-cyan-400">2025</span>, we build <span className="text-blue-400">next-gen</span> digital solutions.
          </motion.p>

          <motion.button
            onClick={toggleTeamModal}
            aria-haspopup="dialog"
            className="px-6 py-3 bg-gradient-to-r from-cyan-600 to-blue-600 rounded-lg hover:from-cyan-500 hover:to-blue-500 transition-all"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Meet our team →
          </motion.button>
        </div>

        <motion.div
          className="flex-1 aspect-video md:aspect-square bg-gray-800 rounded-xl overflow-hidden border border-gray-700"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          <img 
            src="camera1.webp" 
            alt="Digital interface showing abstract design" 
            className="w-full h-full object-cover" 
            loading="lazy" 
            width="600"
            height="600"
          />
        </motion.div>
      </section>

      {/* Team Popup Modal */}
      <AnimatePresence>
        {showTeam && (
          <motion.div
            role="dialog" 
            aria-modal="true" 
            aria-labelledby="team-popup-title"
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <motion.div
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
              onClick={toggleTeamModal}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            />

            <motion.button
              aria-label="Close team details"
              className="absolute top-4 right-4 z-50 text-gray-400 hover:text-white transition-colors"
              onClick={toggleTeamModal}
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
              transition={{ delay: 0.2 }}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <path d="M18 6L6 18M6 6l12 12"/>
              </svg>
            </motion.button>

            <motion.div
              className="relative z-40 w-full max-w-4xl bg-gray-900 rounded-xl border border-gray-800 p-6 md:p-8"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
              <h3 id="team-popup-title" className="text-2xl font-light mb-6 text-center text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">
                Our Core Team
              </h3>

              <motion.div
                className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6"
                variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
                initial="hidden"
                animate="visible"
              >
                {TEAM_MEMBERS.map((member) => (
                  <motion.div
                    key={member.id}
                    className="bg-gray-800 rounded-lg overflow-hidden border border-gray-700 hover:border-cyan-400/30 transition-colors flex flex-col"
                    variants={TEAM_CARD_VARIANTS}
                  >
                    <div className="h-40 sm:h-32 md:h-40 relative overflow-hidden">
                      <img 
                        src={member.image} 
                        alt={member.name} 
                        className="w-full h-full object-cover" 
                        loading="lazy"
                        width="300"
                        height="200"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-gray-900/70 via-transparent to-transparent" />
                    </div>
                    <div className="p-4 flex flex-col flex-grow">
                      <h4 className="font-medium">{member.name}</h4>
                      <p className="text-cyan-400 text-sm mb-2">{member.role}</p>
                      <p className="text-gray-400 text-xs mb-3 flex-grow">{member.bio}</p>
                      <div className="flex space-x-2 mt-auto">
                        <a 
                          href={member.linkedin} 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          aria-label={`${member.name}'s LinkedIn`} 
                          className="text-gray-400 hover:text-cyan-400 transition-colors"
                        >
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                            <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"/>
                            <circle cx="4" cy="4" r="2"/>
                          </svg>
                        </a>
                        <a 
                          href={member.twitter} 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          aria-label={`${member.name}'s Twitter`} 
                          className="text-gray-400 hover:text-cyan-400 transition-colors"
                        >
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                            <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"/>
                          </svg>
                        </a>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Values Section */}
      <section className="container mx-auto px-6 py-16">
        <motion.h2
          className="text-3xl font-light text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6 }}
        >
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">Design</span> Principles
        </motion.h2>
        <motion.div
          className="grid md:grid-cols-3 gap-4 max-w-4xl mx-auto"
          variants={PRINCIPLES_CONTAINER_VARIANTS}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {DESIGN_PRINCIPLES.map((item, index) => (
            <motion.div
              key={item.title}
              className="p-6 bg-gray-800/50 rounded-lg border border-gray-700 hover:border-cyan-400/30 transition-colors"
              variants={PRINCIPLE_CARD_VARIANTS}
            >
              <PulsingIcon index={index}>{item.icon}</PulsingIcon>
              <h3 className="font-medium mb-2">{item.title}</h3>
              <p className="text-gray-400 text-sm">{item.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Call to Action (CTA) Section */}
      <section className="container mx-auto px-6 py-16 text-center">
        <motion.div
          className="max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6 }}
        >
          <h3 className="text-2xl font-light mb-6">
            Ready to <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">ignite</span> your digital presence?
          </h3>
          <motion.button
            className="px-8 py-3 bg-transparent text-cyan-400 rounded-lg border border-cyan-400 hover:bg-cyan-400/10 transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Start a project
          </motion.button>
        </motion.div>
      </section>
    </div>
  );
};

export default React.memo(AboutPage);