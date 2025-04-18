import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaCheck, FaChevronDown } from "react-icons/fa";
import emailjs from "@emailjs/browser";

// Font setup
const fontStyle = {
  fontFamily: "'SF Pro Display', -apple-system, BlinkMacSystemFont, sans-serif",
  fontWeight: 300
};

// Animation variants (More expressive animation variants)
const fadeInSlideUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0 },
  transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] }
};

const fadeInScale = {
  initial: { opacity: 0, scale: 0.9 },
  animate: { opacity: 1, scale: 1 },
  exit: { opacity: 0 },
  transition: { duration: 0.5, ease: "easeOut" }
};

const slideInLeft = {
  initial: { opacity: 0, x: -20 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0 },
  transition: { duration: 0.5, ease: "easeInOut" }
};

const slideInRight = {
  initial: { opacity: 0, x: 20 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0 },
  transition: { duration: 0.5, ease: "easeInOut" }
};

// Data
const pricingTiers = [
  {
    id: 1,
    name: "Starter Pack",
    price: 1190,
    features: [
      "Works with all devices",
      "Support for up to 5 users/devices",
      "Basic visual support",
      "10TB secure storage"
    ],
    mostPopular: false,
    color: "from-blue-500 to-cyan-400"
  },
  {
    id: 2,
    name: "Premium Plan",
    price: 2299,
    features: [
      "Includes all features from the Starter Pack",
      "Unlimited users/devices",
      "Priority customer support",
      "100TB secure storage",
      "Smart optimization",
      "Advanced visual analytics"
    ],
    mostPopular: true,
    color: "from-purple-500 to-indigo-400"
  },
  {
    id: 3,
    name: "Business Solution",
    price: 3999,
    features: [
      "Includes all features from the Premium Plan",
      "Tailored solutions",
      "24/7 customer support",
      "Unlimited secure storage",
      "Dedicated account manager",
      "Integrated intelligence"
    ],
    mostPopular: false,
    color: "from-pink-500 to-purple-400"
  }
];

const faqData = [
  {
    q: "What payment methods do you accept?",
    a: "We accept secure digital payments, digital credit, and all major online payment methods."
  },
  {
    q: "Is there a free trial?",
    a: "Yes, we offer a 7-day free trial with full access to our platform."
  },
  {
    q: "Can I upgrade my plan later?",
    a: "Absolutely! Your access will adapt seamlessly to your new plan."
  },
  {
    q: "How does secure storage work?",
    a: "Our storage uses advanced security principles for instant and reliable access."
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
    setMessage("Sending message...");

    try {
      await emailjs.sendForm(
        process.env.REACT_APP_EMAILJS_SERVICE_ID,
        process.env.REACT_APP_EMAILJS_TEMPLATE_ID,
        formRef.current,
        process.env.REACT_APP_EMAILJS_PUBLIC_KEY
      );
      setMessage("Message sent successfully! We'll contact you within 24 hours.");
      setFormData({ name: "", email: "", plan: "", message: "" });
    } catch (error) {
      setMessage("There was an issue sending your message. Please try again.");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-gray-950 text-gray-100 overflow-x-hidden"
      style={fontStyle}
    >
      {/* Holographic background elements - Made more complex */}
      <div className="fixed inset-0 pointer-events-none">
        {/* Existing subtle pattern */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxkZWZzPjxwYXR0ZXJuIGlkPSJwYXR0ZXJuIiB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHBhdHRlcm5Vbml0cz0idXNlclNwYWNlT25Vc2UiIHBhdHRlcm5UcmFuc2Zvcm09InJvdGF0ZSg0NSkiPjxyZWN0IHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCIgZmlsbD0icmdiYSgyNTUsMjU1LDI1NSwwLjAyKSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3QgZmlsbD0idXJsKCNwYXR0ZXJuKSIgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIvPjwvc3ZnPg==')] opacity-5"></div>

        {/* More complex glowing shapes */}
        <div
          className="absolute inset-0 opacity-20"
          style={{
            // This radial gradient creates a general glow around the cursor
            background: `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(34, 211, 238, 0.1) 0%, transparent 70%)`
          }}
        ></div>

        {/* Additional blurred shapes with varied properties */}
        <div className="absolute top-1/4 left-[15%] w-16 h-16 rounded-full bg-blue-600/30 blur-3xl animate-pulse-slow"></div>
        <div className="absolute top-[40%] right-[10%] w-20 h-20 rounded-full bg-purple-600/30 blur-3xl animate-pulse-slow delay-200"></div>
        <div className="absolute bottom-1/4 left-[25%] w-12 h-12 rounded-full bg-cyan-600/30 blur-3xl animate-pulse-slow delay-400"></div>
        <div className="absolute top-[10%] right-[30%] w-10 h-10 rounded-full bg-pink-600/30 blur-2xl animate-pulse-slow delay-600"></div>
         <div className="absolute bottom-[10%] right-[20%] w-14 h-14 rounded-full bg-indigo-600/30 blur-3xl animate-pulse-slow delay-800"></div>
        <div className="absolute top-[60%] left-[5%] w-10 h-10 rounded-full bg-teal-500/30 blur-2xl animate-pulse-slow delay-1000"></div>
        <div className="absolute bottom-[30%] right-[40%] w-16 h-16 rounded-full bg-violet-600/30 blur-3xl animate-pulse-slow delay-1200"></div>
         <div className="absolute top-[20%] left-[40%] w-8 h-8 rounded-full bg-blue-500/30 blur-xl animate-pulse-slow delay-1400"></div>

      </div>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center px-6 md:px-12 lg:px-24 pt-24 pb-12 overflow-hidden">
        {/* Dark overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/30 via-gray-950 to-black z-0"></div>

        <div className="relative z-10 max-w-6xl mx-auto text-center">
          <motion.h1
            className="text-4xl sm:text-5xl md:text-6xl font-light leading-tight mb-6"
            variants={fadeInSlideUp}
            initial="initial"
            animate="animate"
            transition={{ duration: 0.8 }}
          >
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">Nexture</span> Pricing
          </motion.h1>
          <motion.p
            className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto"
            variants={fadeInSlideUp}
            initial="initial"
            animate="animate"
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            Experience the future with our cutting-edge solutions
          </motion.p>
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setShowModal(true)}
            className="px-8 py-3 bg-gradient-to-r from-cyan-600 to-blue-600 rounded-lg text-white font-medium"
            variants={fadeInScale}
            initial="initial"
            animate="animate"
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            Request a Demo
          </motion.button>
        </div>

        {/* The previous simple floating particles are replaced by the more complex ones above */}
        {/*
        <div className="absolute top-1/4 left-1/4 w-4 h-4 rounded-full bg-blue-500/30 blur-md"></div>
        <div className="absolute top-1/3 right-1/4 w-6 h-6 rounded-full bg-purple-500/30 blur-md"></div>
        <div className="absolute bottom-1/4 left-1/3 w-5 h-5 rounded-full bg-cyan-500/30 blur-md"></div>
        */}
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
            <motion.h2
              className="text-3xl md:text-4xl font-light mb-4"
              variants={fadeInSlideUp}
              initial="initial"
              animate="animate"
              transition={{ duration: 0.6 }}
            >
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">Nexture</span> Plans
            </motion.h2>
            <motion.p
              className="text-gray-400 max-w-2xl mx-auto"
              variants={fadeInSlideUp}
              initial="initial"
              animate="animate"
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              Choose the plan that best suits your needs
            </motion.p>
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
                  <motion.h3
                    className="text-xl font-medium mb-2"
                    variants={slideInLeft}
                    initial="initial"
                    animate="animate"
                    transition={{ duration: 0.4 }}
                  >{plan.name}</motion.h3>
                  <div className="mb-6">
                    <motion.span
                      className={`text-4xl font-bold bg-gradient-to-r bg-clip-text text-transparent ${plan.color}`}
                      variants={fadeInScale}
                      initial="initial"
                      animate="animate"
                      transition={{ duration: 0.5 }}
                    >
                      ksh {plan.price}
                    </motion.span>
                    <motion.span
                      className="text-gray-400"
                      variants={slideInRight}
                      initial="initial"
                      animate="animate"
                      transition={{ duration: 0.4 }}
                    >/month</motion.span>
                  </div>
                  <ul className="space-y-3 mb-8">
                    {plan.features.map((feature, index) => (
                      <motion.li
                        key={index}
                        className="flex items-start"
                        variants={fadeInSlideUp}
                        initial="initial"
                        animate="animate"
                        transition={{ delay: 0.2 + index * 0.05, duration: 0.5 }}
                      >
                        <div className="flex-shrink-0 mt-1">
                          <div className="w-5 h-5 rounded-full bg-gradient-to-r from-green-400 to-teal-500 flex items-center justify-center">
                            <FaCheck className="text-white text-xs" />
                          </div>
                        </div>
                        <span className="ml-3 text-gray-300">{feature}</span>
                      </motion.li>
                    ))}
                  </ul>
                  <motion.button
                    className={`w-full py-3 rounded-lg bg-gradient-to-r ${plan.color} text-white font-medium`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setShowModal(true)}
                    variants={fadeInScale}
                    initial="initial"
                    animate="animate"
                    transition={{ delay: 0.1, duration: 0.5 }}
                  >
                    Get Started
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
            <motion.h2
              className="text-3xl md:text-4xl font-light mb-4"
              variants={fadeInSlideUp}
              initial="initial"
              animate="animate"
              transition={{ duration: 0.6 }}
            >
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">Nexture</span> Inquiries
            </motion.h2>
            <motion.p
              className="text-gray-400"
              variants={fadeInSlideUp}
              initial="initial"
              animate="animate"
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              Answers to your questions
            </motion.p>
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
                <motion.button
                  className="flex justify-between items-center w-full text-left py-4"
                  onClick={() => setActiveFAQ(activeFAQ === index ? null : index)}
                  variants={slideInLeft}
                  initial="initial"
                  animate="animate"
                  transition={{ duration: 0.4 }}
                >
                  <h3 className="text-lg font-medium">{faq.q}</h3>
                  <div className={`transition-transform ${activeFAQ === index ? 'rotate-180' : ''}`}>
                    <FaChevronDown className="text-cyan-400" />
                  </div>
                </motion.button>
                <AnimatePresence>
                  {activeFAQ === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                      variants={fadeInSlideUp}

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
            <motion.h2
              className="text-2xl md:text-3xl font-light mb-4"
              variants={fadeInSlideUp}
              initial="initial"
              animate="animate"
              transition={{ duration: 0.6 }}
            >
              Ready to <motion.span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">boost</motion.span> your business?
            </motion.h2>
            <motion.p
              className="text-gray-400 mb-8 max-w-2xl mx-auto"
              variants={fadeInSlideUp}
              initial="initial"
              animate="animate"
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              Our team is ready to help you succeed.
            </motion.p>
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setShowModal(true)}
              className="px-8 py-3 bg-gradient-to-r from-cyan-600 to-blue-600 rounded-lg text-white font-medium"
              variants={fadeInScale}
              initial="initial"
              animate="animate"
              transition={{ delay: 0.4, duration: 0.6 }}
            >
              Get in Touch
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

              <motion.h3
                className="text-2xl font-light mb-6"
                variants={fadeInSlideUp}
                initial="initial"
                animate="animate"
                transition={{ duration: 0.5 }}
              >
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">Nexture</span> Contact
              </motion.h3>

              <form ref={formRef} onSubmit={sendEmail} className="space-y-4">
                <motion.div variants={slideInRight} initial="initial" animate="animate" transition={{ duration: 0.3 }}>
                  <label className="block text-sm text-gray-400 mb-1">Your Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400/30 outline-none transition"
                    required
                  />
                </motion.div>

                <motion.div variants={slideInLeft} initial="initial" animate="animate" transition={{ duration: 0.3, delay: 0.1 }}>
                  <label className="block text-sm text-gray-400 mb-1">Email Address</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400/30 outline-none transition"
                    required
                  />
                </motion.div>

                <motion.div variants={slideInRight} initial="initial" animate="animate" transition={{ duration: 0.3, delay: 0.2 }}>
                  <label className="block text-sm text-gray-400 mb-1">Plan Interest</label>
                  <select
                    name="plan"
                    value={formData.plan}
                    onChange={(e) => setFormData({...formData, plan: e.target.value})}
                    className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400/30 outline-none appearance-none"
                    required
                  >
                    <option value="">Select a plan</option>
                    <option value="Starter Pack">Starter Pack</option>
                    <option value="Premium Plan">Premium Plan</option>
                    <option value="Business Solution">Business Solution</option>
                    <option value="Custom Solution">Custom Solution</option>
                  </select>
                </motion.div>

                <motion.div variants={slideInLeft} initial="initial" animate="animate" transition={{ duration: 0.3, delay: 0.3 }}>
                  <label className="block text-sm text-gray-400 mb-1">Your Message</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                    rows="3"
                    className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400/30 outline-none transition"
                    required
                  ></textarea>
                </motion.div>

                {message && (
                  <motion.div
                    className={`text-sm py-2 px-3 rounded-lg ${
                      message.includes("successfully") ? "bg-green-900/50 text-green-400" :
                      message.includes("Sending") ? "bg-blue-900/50 text-blue-400" :
                      "bg-red-900/50 text-red-400"
                    }`}
                    variants={fadeInScale}
                    initial="initial"
                    animate="animate"
                    transition={{ delay: 0.4, duration: 0.3 }}
                  >
                    {message}
                  </motion.div>
                )}

                <motion.button
                  type="submit"
                  className="w-full bg-gradient-to-r from-cyan-600 to-blue-600 text-white py-3 px-6 rounded-lg font-medium hover:from-cyan-500 hover:to-blue-500 transition-all disabled:opacity-50"
                  disabled={message === "Sending message..."}
                  variants={fadeInScale}
                  initial="initial"
                  animate="animate"
                  transition={{ delay: 0.5, duration: 0.3 }}
                >
                  {message === "Sending message..." ? "Sending..." : "Send Message"}
                </motion.button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default Home;