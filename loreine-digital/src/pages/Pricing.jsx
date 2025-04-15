import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaCheck, FaTimes, FaChevronDown } from "react-icons/fa";
import emailjs from "@emailjs/browser";

// Font setup
const fontStyle = {
  fontFamily: "'SF Pro Display', -apple-system, BlinkMacSystemFont, sans-serif",
  fontWeight: 300
};

// Animation variants
const fadeIn = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
  transition: { duration: 0.4, ease: "easeInOut" }
};

const slideUp = {
  initial: { opacity: 0, y: 40 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] }
};

const scaleUp = {
  initial: { opacity: 0, scale: 0.96 },
  animate: { opacity: 1, scale: 1 },
  transition: { duration: 0.5, ease: "easeOut" }
};

// Data
const pricingTiers = [
  {
    id: 1,
    name: "Quantum Basic",
    price: 99,
    features: [
      "Neural interface compatibility",
      "Up to 5 quantum nodes",
      "Basic holographic support",
      "10TB quantum storage"
    ],
    mostPopular: false,
    color: "from-blue-500 to-cyan-400"
  },
  {
    id: 2,
    name: "Quantum Pro",
    price: 299,
    features: [
      "All Basic features",
      "Unlimited quantum nodes",
      "Priority neural support",
      "100TB quantum storage",
      "AI optimization",
      "3D holographic analytics"
    ],
    mostPopular: true,
    color: "from-purple-500 to-indigo-400"
  },
  {
    id: 3,
    name: "Quantum Enterprise",
    price: 999,
    features: [
      "All Pro features",
      "Custom quantum algorithms",
      "24/7 dedicated support",
      "Unlimited quantum storage",
      "Dedicated account manager",
      "Neural network integration"
    ],
    mostPopular: false,
    color: "from-pink-500 to-purple-400"
  }
];

const faqData = [
  { 
    q: "What payment methods do you accept?", 
    a: "We accept quantum crypto transfers, neural credit, and all major digital currencies." 
  },
  { 
    q: "Is there a free trial?", 
    a: "Yes, we offer a 7-day quantum trial with full access to our neural network." 
  },
  { 
    q: "Can I upgrade my plan later?", 
    a: "Absolutely! Your quantum nodes will adapt seamlessly to your new plan." 
  },
  { 
    q: "How does quantum storage work?", 
    a: "Our storage uses quantum entanglement principles for instant access across dimensions." 
  }
];

const Home = () => {
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({ 
    name: "", 
    email: "", 
    plan: "",
    message: ""
  });
  const [message, setMessage] = useState("");
  const [activeFAQ, setActiveFAQ] = useState(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const formRef = useRef();

  // Mouse position tracker for parallax effects
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Email sending function
  const sendEmail = async (e) => {
    e.preventDefault();
    setMessage("Sending through quantum link...");
    
    try {
      await emailjs.sendForm(
        process.env.REACT_APP_EMAILJS_SERVICE_ID,
        process.env.REACT_APP_EMAILJS_TEMPLATE_ID,
        formRef.current,
        process.env.REACT_APP_EMAILJS_PUBLIC_KEY
      );
      setMessage("Message entangled successfully! We'll contact you within 24 hours.");
      setFormData({ name: "", email: "", plan: "", message: "" });
    } catch (error) {
      setMessage("Quantum interference detected. Please try again.");
    }
  };

  // Parallax effect generator
  const getParallaxStyle = (intensity) => ({
    transform: `translate(
      ${(mousePosition.x - window.innerWidth/2) / (50 / intensity)}px,
      ${(mousePosition.y - window.innerHeight/2) / (50 / intensity)}px
    )`,
    transition: "transform 0.1s linear"
  });

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-gray-950 text-gray-100 overflow-x-hidden"
      style={fontStyle}
    >
      {/* Holographic background elements */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxkZWZzPjxwYXR0ZXJuIGlkPSJwYXR0ZXJuIiB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHBhdHRlcm5Vbml0cz0idXNlclNwYWNlT25Vc2UiIHBhdHRlcm5UcmFuc2Zvcm09InJvdGF0ZSg0NSkiPjxyZWN0IHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCIgZmlsbD0icmdiYSgyNTUsMjU1LDI1NSwwLjAyKSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3QgZmlsbD0idXJsKCNwYXR0ZXJuKSIgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIvPjwvc3ZnPg==')] opacity-5"></div>
        <div 
          className="absolute inset-0 opacity-20"
          style={{
            background: `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(34, 211, 238, 0.1) 0%, transparent 70%)`
          }}
        ></div>
      </div>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center px-6 md:px-12 lg:px-24 pt-24 pb-12 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/30 via-gray-950 to-black z-0"></div>
        
        <div className="relative z-10 max-w-6xl mx-auto text-center">
          <motion.h1
            className="text-4xl sm:text-5xl md:text-6xl font-light leading-tight mb-6"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">Quantum</span> Pricing
          </motion.h1>
          <motion.p
            className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            Experience the future with our cutting-edge quantum solutions
          </motion.p>
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setShowModal(true)}
            className="px-8 py-3 bg-gradient-to-r from-cyan-600 to-blue-600 rounded-lg text-white font-medium"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            Request Quantum Demo
          </motion.button>
        </div>

        {/* Floating quantum particles */}
        <div className="absolute top-1/4 left-1/4 w-4 h-4 rounded-full bg-blue-500/30 blur-md"></div>
        <div className="absolute top-1/3 right-1/4 w-6 h-6 rounded-full bg-purple-500/30 blur-md"></div>
        <div className="absolute bottom-1/4 left-1/3 w-5 h-5 rounded-full bg-cyan-500/30 blur-md"></div>
      </section>

      {/* Pricing Tiers Section */}
      <section className="py-20 px-6 bg-gray-950/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <h2 className="text-3xl md:text-4xl font-light mb-4">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">Quantum</span> Plans
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Choose the quantum frequency that resonates with your needs
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {pricingTiers.map((plan) => (
              <motion.div
                key={plan.id}
                className={`group relative overflow-hidden rounded-xl border border-gray-800 hover:border-${plan.color.split(' ')[1]}/30 transition-all duration-300`}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ delay: plan.id * 0.15, duration: 0.6 }}
              >
                {plan.mostPopular && (
                  <div className="absolute top-0 right-0 bg-gradient-to-r from-purple-500 to-indigo-400 text-white text-xs font-medium px-3 py-1 rounded-bl-lg">
                    POPULAR
                  </div>
                )}
                <div className="p-6">
                  <h3 className="text-xl font-medium mb-2">{plan.name}</h3>
                  <div className="mb-6">
                    <span className="text-4xl font-bold bg-gradient-to-r bg-clip-text text-transparent ${plan.color}">
                      ${plan.price}
                    </span>
                    <span className="text-gray-400">/quantum cycle</span>
                  </div>
                  <ul className="space-y-3 mb-8">
                    {plan.features.map((feature, index) => (
                      <li key={index} className="flex items-start">
                        <div className="flex-shrink-0 mt-1">
                          <div className="w-5 h-5 rounded-full bg-gradient-to-r from-green-400 to-teal-500 flex items-center justify-center">
                            <FaCheck className="text-white text-xs" />
                          </div>
                        </div>
                        <span className="ml-3 text-gray-300">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <motion.button
                    className={`w-full py-3 rounded-lg bg-gradient-to-r ${plan.color} text-white font-medium`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setShowModal(true)}
                  >
                    Quantum Entanglement
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 px-6 bg-gray-900/50">
        <div className="max-w-3xl mx-auto">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <h2 className="text-3xl md:text-4xl font-light mb-4">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">Quantum</span> Inquiries
            </h2>
            <p className="text-gray-400">Answers to your interdimensional questions</p>
          </motion.div>

          <div className="space-y-4">
            {faqData.map((faq, index) => (
              <motion.div
                key={index}
                className="border-b border-gray-800 pb-4"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
              >
                <button
                  className="flex justify-between items-center w-full text-left py-4"
                  onClick={() => setActiveFAQ(activeFAQ === index ? null : index)}
                >
                  <h3 className="text-lg font-medium">{faq.q}</h3>
                  <div className={`transition-transform ${activeFAQ === index ? 'rotate-180' : ''}`}>
                    <FaChevronDown className="text-cyan-400" />
                  </div>
                </button>
                <AnimatePresence>
                  {activeFAQ === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <p className="text-gray-400 pb-4">{faq.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 bg-gradient-to-br from-indigo-900/50 to-gray-950">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            className="bg-gray-900/50 border border-gray-800 rounded-xl p-8 md:p-12 backdrop-blur-sm"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <h2 className="text-2xl md:text-3xl font-light mb-4">
              Ready to <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">quantum leap</span> your business?
            </h2>
            <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
              Our quantum specialists are standing by to entangle with your needs.
            </p>
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setShowModal(true)}
              className="px-8 py-3 bg-gradient-to-r from-cyan-600 to-blue-600 rounded-lg text-white font-medium"
            >
              Initiate Quantum Link
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* Contact Modal */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            className="fixed inset-0 flex items-center justify-center p-4 z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
              onClick={() => setShowModal(false)}
            ></div>
            
            <motion.div
              className="relative bg-gray-900 rounded-xl border border-gray-800 shadow-2xl w-full max-w-md p-6"
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ type: "spring", damping: 25 }}
            >
              <button
                className="absolute top-4 right-4 text-gray-400 hover:text-white"
                onClick={() => setShowModal(false)}
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path d="M18 6L6 18M6 6l12 12" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              </button>

              <h3 className="text-2xl font-light mb-6">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">Quantum</span> Inquiry
              </h3>

              <form ref={formRef} onSubmit={sendEmail} className="space-y-4">
                <div>
                  <label className="block text-sm text-gray-400 mb-1">Your Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400/30 outline-none transition"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm text-gray-400 mb-1">Email Address</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400/30 outline-none transition"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm text-gray-400 mb-1">Plan Interest</label>
                  <select
                    name="plan"
                    value={formData.plan}
                    onChange={(e) => setFormData({...formData, plan: e.target.value})}
                    className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400/30 outline-none appearance-none"
                    required
                  >
                    <option value="">Select a quantum plan</option>
                    <option value="Quantum Basic">Quantum Basic</option>
                    <option value="Quantum Pro">Quantum Pro</option>
                    <option value="Quantum Enterprise">Quantum Enterprise</option>
                    <option value="Custom Solution">Custom Quantum Solution</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm text-gray-400 mb-1">Your Quantum Needs</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                    rows="3"
                    className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400/30 outline-none transition"
                    required
                  ></textarea>
                </div>

                {message && (
                  <div className={`text-sm py-2 px-3 rounded-lg ${
                    message.includes("successfully") ? "bg-green-900/50 text-green-400" : 
                    message.includes("Sending") ? "bg-blue-900/50 text-blue-400" : 
                    "bg-red-900/50 text-red-400"
                  }`}>
                    {message}
                  </div>
                )}

                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-cyan-600 to-blue-600 text-white py-3 px-6 rounded-lg font-medium hover:from-cyan-500 hover:to-blue-500 transition-all disabled:opacity-50"
                  disabled={message === "Sending through quantum link..."}
                >
                  {message === "Sending through quantum link..." ? "Entangling..." : "Initiate Quantum Link"}
                </button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default Home;