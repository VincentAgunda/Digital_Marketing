import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const teamMembers = [
  {
    id: 1,
    name: "Alex Chen",
    role: "Lead Designer",
    bio: "Crafting intuitive interfaces with precision.",
    image: "camera4.webp",
    linkedin: "#",
    twitter: "#"
  },
  {
    id: 2,
    name: "Samira Khan",
    role: "Senior Developer",
    bio: "Building robust, scalable systems.",
    image: "camera1.webp",
    linkedin: "#",
    twitter: "#"
  },
  {
    id: 3,
    name: "Jordan Wright",
    role: "Creative Director",
    bio: "Shaping compelling brand narratives.",
    image: "camera1.webp",
    linkedin: "#",
    twitter: "#"
  }
];

const popupAnimation = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { type: "spring", stiffness: 300, damping: 25 }
  },
  exit: { opacity: 0, y: 20 }
};

const AboutPage = () => {
  const [showTeam, setShowTeam] = useState(false);

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100 font-sans">
      {/* Background Pattern */}
      <div className="fixed inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxkZWZzPjxwYXR0ZXJuIGlkPSJwYXR0ZXJuIiB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHBhdHRlcm5Vbml0cz0idXNlclNwYWNlT25Vc2UiIHBhdHRlcm5UcmFuc2Zvcm09InJvdGF0ZSg0NSkiPjxyZWN0IHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCIgZmlsbD0icmdiYSgyNTUsMjU1LDI1NSwwLjAyKSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3QgZmlsbD0idXJsKCNwYXR0ZXJuKSIgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIvPjwvc3ZnPg==')] opacity-5 pointer-events-none"></div>

      {/* Hero Section */}
      <section className="container mx-auto px-6 py-12 md:py-20 flex flex-col md:flex-row items-center gap-8 md:gap-12">
        <div className="flex-1">
          <motion.h1 
            className="text-4xl md:text-5xl font-light mb-6 leading-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">Crafting</span> digital<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-500">experiences</span> with<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-500">purpose</span>
          </motion.h1>

          <motion.p 
            className="text-gray-400 mb-8 max-w-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            Founded in <span className="text-cyan-400">2025</span>, we build <span className="text-blue-400">next-gen</span> digital solutions.
          </motion.p>

          <motion.button
            onClick={() => setShowTeam(true)}
            className="px-6 py-3 bg-gradient-to-r from-cyan-600 to-blue-600 rounded-lg hover:from-cyan-500 hover:to-blue-500 transition-all"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            Meet our team →
          </motion.button>
        </div>

        <motion.div 
          className="flex-1 aspect-video md:aspect-square bg-gray-800 rounded-xl overflow-hidden border border-gray-700"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <img 
            src="camera1.webp" 
            alt="Digital interface" 
            className="w-full h-full object-cover"
            loading="lazy"
          />
        </motion.div>
      </section>

      {/* Team Popup */}
      <AnimatePresence>
        {showTeam && (
          <motion.div 
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <div 
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
              onClick={() => setShowTeam(false)}
            />
            
            <button 
              className="absolute top-4 right-4 z-50 text-gray-400 hover:text-white"
              onClick={() => setShowTeam(false)}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path d="M18 6L6 18M6 6l12 12" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </button>

            <motion.div 
              className="relative z-40 w-full max-w-2xl bg-gray-900 rounded-xl border border-gray-800 p-6"
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
            >
              <h3 className="text-2xl font-light mb-6 text-center text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">
                Our Core Team
              </h3>
              
              <div className="grid sm:grid-cols-3 gap-4">
                {teamMembers.map((member) => (
                  <motion.div
                    key={member.id}
                    className="bg-gray-800 rounded-lg overflow-hidden border border-gray-700 hover:border-cyan-400/30 transition-colors"
                    variants={popupAnimation}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                  >
                    <div className="h-32 relative overflow-hidden">
                      <img 
                        src={member.image} 
                        alt={member.name}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-gray-900/70 via-transparent to-transparent" />
                    </div>
                    <div className="p-4">
                      <h4 className="font-medium">{member.name}</h4>
                      <p className="text-cyan-400 text-sm mb-2">{member.role}</p>
                      <p className="text-gray-400 text-xs mb-3">{member.bio}</p>
                      
                      <div className="flex space-x-2">
                        <a 
                          href={member.linkedin} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-gray-400 hover:text-cyan-400 transition-colors"
                        >
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                            <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"/>
                            <circle cx="4" cy="4" r="2"/>
                          </svg>
                        </a>
                        <a 
                          href={member.twitter} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-gray-400 hover:text-cyan-400 transition-colors"
                        >
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                            <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"/>
                          </svg>
                        </a>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
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
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">Design</span> Principles
        </motion.h2>

        <div className="grid md:grid-cols-3 gap-4 max-w-4xl mx-auto">
          {[
            { title: "Precision", description: "Pixel-perfect execution with atomic attention.", icon: "⚡" },
            { title: "Clarity", description: "Simplifying complexity through thoughtful design.", icon: "🔍" },
            { title: "Depth", description: "Layered experiences that reward exploration.", icon: "🌌" }
          ].map((item, index) => (
            <motion.div
              key={index}
              className="p-6 bg-gray-800/50 rounded-lg border border-gray-700 hover:border-cyan-400/30 transition-colors"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
            >
              <div className="text-2xl mb-3">{item.icon}</div>
              <h3 className="font-medium mb-2">{item.title}</h3>
              <p className="text-gray-400 text-sm">{item.description}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-6 py-16 text-center">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-2xl mx-auto"
        >
          <h3 className="text-2xl font-light mb-6">
            Ready to <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">ignite</span> your digital presence?
          </h3>
          <button className="px-8 py-3 bg-transparent text-cyan-400 rounded-lg border border-cyan-400 hover:bg-cyan-400/10 transition-colors">
            Start a project
          </button>
        </motion.div>
      </section>
    </div>
  );
};

export default AboutPage;