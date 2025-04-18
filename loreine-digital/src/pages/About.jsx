import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";

// Animation Variants
const textVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.16, 1, 0.3, 1]
    }
  }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2
    }
  }
};

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.16, 1, 0.3, 1]
    }
  }
};

// Data
const TEAM_MEMBERS = [
  { id: 1, name: "Vincent Agunda", role: "Executive Director", bio: "Crafting intuitive interfaces and navigating the Tech Landscape.", image: "camera4.webp", linkedin: "#", twitter: "#" },
  { id: 2, name: "Brian Okungu", role: "Senior Developer", bio: "Building robust, scalable systems.", image: "camera1.webp", linkedin: "#", twitter: "#" },
  { id: 3, name: "Brian Oloo", role: "Full Stack Developer", bio: "Shaping compelling brand narratives.", image: "camera1.webp", linkedin: "#", twitter: "#" }
];

const DESIGN_PRINCIPLES = [
  { title: "Precision", description: "Pixel-perfect execution with atomic attention.", icon: "⚡" },
  { title: "Clarity", description: "Simplifying complexity through thoughtful design.", icon: "🔍" },
  { title: "Depth", description: "Layered experiences that reward exploration.", icon: "🌌" }
];

const BG_PATTERN = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxkZWZzPjxwYXR0ZXJuIGlkPSJwYXR0ZXJuIiB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHBhdHRlcm5Vbml0cz0idXNlclNwYWNlT25Vc2UiIHBhdHRlcm5UcmFuc2Zvcm09InJvdGF0ZSg0NSkiPjxyZWN0IHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCIgZmlsbD0icmdiYSgyNTUsMjU1LDI1NSwwLjAyKSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3QgZmlsbD0idXJsKCNwYXR0ZXJuKSIgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIvPjwvc3ZnPg==';

// Components
const AnimatedText = ({ children, delay = 0, className = "", ...props }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "0px 0px -50px 0px" });

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={textVariants}
      transition={{ delay }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
};

const PulsingIcon = ({ children, index }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={isInView ? { 
        opacity: 1, 
        scale: 1,
        transition: {
          scale: {
            duration: 2,
            repeat: Infinity,
            repeatType: "loop",
            ease: "easeInOut",
            delay: index * 0.3
          }
        }
      } : {}}
      className="text-2xl mb-3"
    >
      {children}
    </motion.div>
  );
};

const AboutPage = () => {
  const [showTeam, setShowTeam] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const toggleTeamModal = () => setShowTeam(prev => !prev);

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100 font-sans overflow-x-hidden" ref={containerRef}>
      {/* Background Pattern */}
      <div 
        className="fixed inset-0 opacity-5 pointer-events-none" 
        style={{ backgroundImage: `url(${BG_PATTERN})` }} 
      />

      {/* Hero Section */}
      <section className="container mx-auto px-6 py-12 md:py-20 flex flex-col md:flex-row items-center gap-8 md:gap-12">
        <div className="flex-1">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            className="mb-6"
          >
            <AnimatedText className="text-4xl md:text-5xl font-light leading-tight">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#42A5F5] to-[#E91E63]">Crafting</span> digital
            </AnimatedText>
            <AnimatedText delay={0.2} className="text-4xl md:text-5xl font-light leading-tight">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#42A5F5] to-[#E91E63]">experiences</span> with
            </AnimatedText>
            <AnimatedText delay={0.4} className="text-4xl md:text-5xl font-light leading-tight">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#42A5F5] to-[#E91E63]">purpose</span>
            </AnimatedText>
          </motion.div>

          <AnimatedText delay={0.6} className="text-gray-400 mb-8 max-w-md">
            Founded in <span className="text-[#E91E63]">2025</span>, we build <span className="text-[#42A5F5]">next-gen</span> digital solutions.
          </AnimatedText>

          <motion.button
            onClick={toggleTeamModal}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.8 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-6 py-3 bg-gradient-to-r from-[#42A5F5] to-[#E91E63] rounded-lg hover:from-[#64B5F6] hover:to-[#EC407A] transition-all"
          >
            Meet our team →
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
      </section>

      {/* Values Section */}
      <section className="container mx-auto px-6 py-16">
        <AnimatedText className="text-3xl font-light text-center mb-12">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#42A5F5] to-[#E91E63]">Design</span> Principles
        </AnimatedText>
        
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="grid md:grid-cols-3 gap-4 max-w-4xl mx-auto"
        >
          {DESIGN_PRINCIPLES.map((item, index) => (
            <motion.div
              key={item.title}
              variants={fadeUp}
              className="p-6 bg-gray-800/50 rounded-lg border border-gray-700 hover:border-[#E91E63]/30 transition-colors"
              whileHover={{ y: -5 }}
            >
              <PulsingIcon index={index}>{item.icon}</PulsingIcon>
              <AnimatedText delay={0.2} className="font-medium mb-2">
                {item.title}
              </AnimatedText>
              <AnimatedText delay={0.3} className="text-gray-400 text-sm">
                {item.description}
              </AnimatedText>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-6 py-16 text-center">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="max-w-2xl mx-auto"
        >
          <AnimatedText className="text-2xl font-light mb-6">
            Ready to <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#42A5F5] to-[#E91E63]">ignite</span> your digital presence?
          </AnimatedText>
          <motion.button
            variants={fadeUp}
            className="px-8 py-3 bg-transparent text-[#E91E63] rounded-lg border border-[#E91E63] hover:bg-[#E91E63]/10 transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Start a project
          </motion.button>
        </motion.div>
      </section>

      {/* Team Popup Modal */}
      <AnimatePresence>
        {showTeam && (
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="team-popup-title"
            className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4"
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
              className="relative z-40 w-full max-w-4xl max-h-[80vh] sm:max-h-[90vh] bg-gray-900 rounded-t-xl sm:rounded-xl border border-gray-800 overflow-hidden flex flex-col"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 20, opacity: 0 }}
              transition={{ 
                type: "spring", 
                stiffness: 300, 
                damping: 30,
                mass: 0.5
              }}
            >
              <div className="p-6 md:p-8 sticky top-0 bg-gray-900 border-b border-gray-800 z-10">
                <h3 id="team-popup-title" className="text-2xl font-light text-center text-transparent bg-clip-text bg-gradient-to-r from-[#42A5F5] to-[#E91E63]">
                  Our Core Team
                </h3>
              </div>

              <div className="overflow-y-auto p-6 md:p-8">
                <motion.div
                  className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6"
                  variants={{
                    hidden: { opacity: 0 },
                    visible: { 
                      opacity: 1,
                      transition: { 
                        staggerChildren: 0.15,
                        when: "beforeChildren"
                      }
                    }
                  }}
                  initial="hidden"
                  animate="visible"
                >
                  {TEAM_MEMBERS.map((member, index) => (
                    <motion.div
                      key={member.id}
                      className="bg-gray-800 rounded-lg overflow-hidden border border-gray-700 hover:border-[#E91E63]/30 transition-colors flex flex-col"
                      variants={{
                        hidden: { 
                          opacity: 0,
                          y: 20,
                          scale: 0.95
                        },
                        visible: {
                          opacity: 1,
                          y: 0,
                          scale: 1,
                          transition: {
                            type: "spring",
                            stiffness: 400,
                            damping: 15,
                            mass: 0.5
                          }
                        }
                      }}
                      whileHover={{
                        y: -5,
                        transition: { 
                          type: "spring",
                          stiffness: 400,
                          damping: 10
                        }
                      }}
                    >
                      <motion.div
                        className="h-40 sm:h-32 md:h-40 relative overflow-hidden"
                        initial={{ scale: 1.05 }}
                        whileInView={{ scale: 1 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ 
                          duration: 0.6,
                          ease: [0.16, 1, 0.3, 1]
                        }}
                      >
                        <img 
                          src={member.image} 
                          alt={member.name} 
                          className="w-full h-full object-cover" 
                          loading="lazy"
                          width="300"
                          height="200"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-gray-900/70 via-transparent to-transparent" />
                      </motion.div>
                      <motion.div
                        className="p-4 flex flex-col flex-grow"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true, margin: "-50px" }}
                        transition={{ delay: 0.2, duration: 0.4 }}
                      >
                        <h4 className="font-medium">{member.name}</h4>
                        <motion.p 
                          className="text-[#E91E63] text-sm mb-2"
                          initial={{ x: -10 }}
                          whileInView={{ x: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: 0.1 }}
                        >
                          {member.role}
                        </motion.p>
                        <motion.p 
                          className="text-gray-400 text-xs mb-3 flex-grow"
                          initial={{ opacity: 0 }}
                          whileInView={{ opacity: 1 }}
                          viewport={{ once: true }}
                          transition={{ delay: 0.3 }}
                        >
                          {member.bio}
                        </motion.p>
                        <motion.div 
                          className="flex space-x-2 mt-auto"
                          initial={{ opacity: 0 }}
                          whileInView={{ opacity: 1 }}
                          viewport={{ once: true }}
                          transition={{ delay: 0.4 }}
                        >
                          <a 
                            href={member.linkedin} 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            aria-label={`${member.name}'s LinkedIn`} 
                            className="text-gray-400 hover:text-[#E91E63] transition-colors"
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
                            className="text-gray-400 hover:text-[#E91E63] transition-colors"
                          >
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                              <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"/>
                            </svg>
                          </a>
                        </motion.div>
                      </motion.div>
                    </motion.div>
                  ))}
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AboutPage;