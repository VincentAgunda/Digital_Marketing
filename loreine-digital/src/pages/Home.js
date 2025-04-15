import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaLaptopCode, FaMobileAlt, FaPaintBrush, FaBullhorn, FaChevronDown } from "react-icons/fa";
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
const portfolioItems = [
  { 
    id: 1, 
    title: "Quantum UI Framework", 
    category: "Web Design", 
    image: "camera1.webp",
    excerpt: "Next-gen interface system leveraging quantum computing principles"
  },
  { 
    id: 2, 
    title: "Neural Commerce App", 
    category: "Mobile App", 
    image: "camera1.webp",
    excerpt: "Thought-controlled shopping experience with biometric feedback"
  },
  { 
    id: 3, 
    title: "Digital Branding", 
    category: "Branding", 
    image: "camera1.webp",
    excerpt: "3D identity system for spatial computing platforms"
  },
  { 
    id: 4, 
    title: "AI Marketing Suite", 
    category: "Marketing", 
    image: "camera1.webp",
    excerpt: "Self-optimizing campaign system with predictive analytics"
  }
];

const newsData = [
  { 
    title: 'The Future of UI/UX in 2025', 
    date: 'Apr 10, 2025', 
    image: 'camera1.webp', 
    excerpt: "How neural interfaces are revolutionizing design paradigms"
  },
  { 
    title: 'Headless CMS Architecture', 
    date: 'Mar 28, 2025', 
    image: 'camera1.webp',
    excerpt: "Building ultra-fast content systems with quantum caching"
  },
  { 
    title: 'AI in Web Development', 
    date: 'Mar 15, 2025', 
    image: 'camera1.webp',
    excerpt: "How GPT-5 is automating 80% of frontend development"
  }
];

const faqData = [
  { 
    q: "What services do you offer?", 
    a: "We specialize in quantum web design, neural interface development, holographic branding, and AI-powered marketing systems. Our solutions blend cutting-edge technology with intuitive design." 
  },
  { 
    q: "What makes your approach unique?", 
    a: "We combine quantum computing principles with neural design patterns to create interfaces that adapt to users' cognitive states in real-time, reducing cognitive load by up to 60%." 
  }
];

const Home = () => {
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({ 
    name: "", 
    email: "", 
    project: "",
    budget: ""
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
    setMessage("Sending...");
    
    try {
      await emailjs.sendForm(
        process.env.REACT_APP_EMAILJS_SERVICE_ID,
        process.env.REACT_APP_EMAILJS_TEMPLATE_ID,
        formRef.current,
        process.env.REACT_APP_EMAILJS_PUBLIC_KEY
      );
      setMessage("Message sent! We'll contact you within 24 hours.");
      setFormData({ name: "", email: "", project: "", budget: "" });
    } catch (error) {
      setMessage("Failed to send. Please try again or contact us directly.");
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

{/* Compact Hero Section */}
<section className="relative py-20 flex items-center px-6 md:px-12 lg:px-24 overflow-hidden">
  {/* Background image with opacity */}
  <div className="absolute inset-0">
    <img 
      src="camera1.webp" 
      alt="Mountain background"
      className="w-full h-3/4 object-cover"
    />
    <div className="absolute inset-0 bg-black/60 backdrop-blur-sm"></div>
  </div>
  
  <div className="relative z-10 max-w-6xl mx-auto grid md:grid-cols-2 gap-8 items-center">
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <h1 className="text-3xl sm:text-4xl md:text-5xl font-light leading-tight mb-4">
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">At Nesture Digital</span> <br />
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-500">we craft</span> more<br />
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-500">than just interfaces</span>
      </h1>
      <p className="text-lg text-gray-300 mb-6 max-w-md">
        We create adaptive interfaces that blend AI, quantum principles, and neural design for unparalleled user experiences.
      </p>
      <div className="flex flex-wrap gap-3">
        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setShowModal(true)}
          className="px-6 py-2 bg-gradient-to-r from-cyan-600 to-blue-600 rounded-lg text-white font-medium"
        >
          Start Project
        </motion.button>
        <motion.a
          href="#work"
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.98 }}
          className="px-6 py-2 border border-gray-600 rounded-lg text-white font-medium hover:border-cyan-400 transition-colors"
        >
          View Work
        </motion.a>
      </div>
    </motion.div>

    <motion.div
      className="relative"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.2, duration: 0.5 }}
    >
      {/* Compact mobile device mockup */}
      <div className="relative mx-auto w-full max-w-[240px] md:max-w-[280px] aspect-[9/19] bg-gray-900 rounded-[30px] overflow-hidden border-6 border-gray-800 shadow-xl p-0.5">
        <div className="relative w-full h-full overflow-hidden">
          <img 
            src="camera1.webp" 
            alt="App interface"
            className="w-full h-full object-cover"
          />
          
          {/* Status bar */}
          <div className="absolute top-0 left-0 right-0 h-8 bg-black/50 backdrop-blur-sm flex items-center justify-between px-3 text-white text-[10px]">
            <span>9:41</span>
            <div className="flex space-x-1">
              <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
                <path d="M5 10l-2 0 0 4 2 0 0-4z"/>
              </svg>
              <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
                <path d="M13 8l-2 0 0 8 2 0 0-8z"/>
              </svg>
              <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17 5l-2 0 0 11 2 0 0-11z"/>
              </svg>
            </div>
          </div>
          
          {/* Adventure UI elements */}
          <div className="absolute top-12 right-3 bg-blue-600/90 text-white px-2 py-1 rounded-full text-xs font-medium">
            Tech Ready
          </div>
          <div className="absolute bottom-16 left-3 bg-black/70 text-white px-3 py-1.5 rounded-lg">
            <span className="text-xl font-bold">21i</span>
            <span className="block text-[10px]">Track</span>
          </div>
          
          {/* Navigation bar */}
          <div className="absolute bottom-0 left-0 right-0 h-12 bg-black/50 backdrop-blur-sm flex items-center justify-around">
            <div className="w-5 h-5 rounded-full bg-blue-500"></div>
            <div className="w-5 h-5 rounded-full bg-gray-600"></div>
            <div className="w-5 h-5 rounded-full bg-gray-600"></div>
          </div>
          
          <div className="absolute inset-0 bg-gradient-to-t from-gray-950/70 via-transparent to-transparent"></div>
        </div>
      </div>
      
      <div className="absolute -bottom-4 -left-4 w-24 h-24 rounded-full bg-blue-600/20 blur-xl"></div>
    </motion.div>
  </div>
</section>

      {/* Portfolio Section */}
      <section id="work" className="py-20 px-6 bg-gray-950/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <h2 className="text-3xl md:text-4xl font-light mb-4">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">Selected</span> Works
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Explore our groundbreaking projects that redefine digital interaction paradigms.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {portfolioItems.map((item, index) => (
              <motion.div
                key={item.id}
                className="group relative overflow-hidden rounded-xl border border-gray-800 hover:border-cyan-400/30 transition-all duration-300"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ delay: index * 0.15, duration: 0.6 }}
              >
                <div className="aspect-video overflow-hidden relative">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-950/80 via-transparent to-transparent"></div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-medium mb-1">{item.title}</h3>
                  <p className="text-cyan-400 text-sm mb-3">{item.category}</p>
                  <p className="text-gray-400 text-sm">{item.excerpt}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 px-6 bg-gray-900/50">
        <div className="max-w-5xl mx-auto">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <h2 className="text-3xl md:text-4xl font-light mb-4">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">Specialized</span> Services
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Our offerings blend cutting-edge technology with intuitive design principles.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            <motion.div
              className="bg-gray-900/50 p-6 rounded-xl border border-gray-800 hover:border-cyan-400/30 transition-colors"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ delay: 0.1, duration: 0.6 }}
            >
              <div className="text-cyan-400 text-2xl mb-4"><FaLaptopCode /></div>
              <h3 className="text-xl font-medium mb-2">Quantum Web Design</h3>
              <p className="text-gray-400 text-sm">
                Websites that leverage quantum principles for adaptive layouts and predictive interfaces.
              </p>
            </motion.div>

            <motion.div
              className="bg-gray-900/50 p-6 rounded-xl border border-gray-800 hover:border-cyan-400/30 transition-colors"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              <div className="text-cyan-400 text-2xl mb-4"><FaMobileAlt /></div>
              <h3 className="text-xl font-medium mb-2">Neural Mobile Apps</h3>
              <p className="text-gray-400 text-sm">
                Thought-controlled applications with biometric feedback and cognitive load optimization.
              </p>
            </motion.div>

            <motion.div
              className="bg-gray-900/50 p-6 rounded-xl border border-gray-800 hover:border-cyan-400/30 transition-colors"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              <div className="text-cyan-400 text-2xl mb-4"><FaPaintBrush /></div>
              <h3 className="text-xl font-medium mb-2">Motion Design</h3>
              <p className="text-gray-400 text-sm">
                Engaging animations and micro-interactions.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* News Section */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div
            className="flex justify-between items-end mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <div>
              <h2 className="text-3xl md:text-4xl font-light mb-2">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">Latest</span> Insights
              </h2>
              <p className="text-gray-400">Stay updated with the frontier of digital interaction</p>
            </div>
            <a href="#" className="text-cyan-400 hover:text-white transition-colors hidden md:block">
              View All →
            </a>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {newsData.map((item, index) => (
              <motion.div
                key={index}
                className="group"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ delay: index * 0.15, duration: 0.6 }}
              >
                <div className="aspect-video rounded-xl overflow-hidden mb-4 relative">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-950/50 via-transparent to-transparent"></div>
                </div>
                <p className="text-gray-500 text-sm mb-2">{item.date}</p>
                <h3 className="text-xl font-medium mb-2 group-hover:text-cyan-400 transition-colors">
                  {item.title}
                </h3>
                <p className="text-gray-400 text-sm mb-3">{item.excerpt}</p>
                <a href="#" className="text-cyan-400 text-sm hover:text-white transition-colors">
                  Read More →
                </a>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 px-6 bg-gray-950/50">
        <div className="max-w-3xl mx-auto">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <h2 className="text-3xl md:text-4xl font-light mb-4">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">Frequently</span> Asked
            </h2>
            <p className="text-gray-400">Answers to common questions about our futuristic approach</p>
          </motion.div>

          <div className="space-y-4">
            {faqData.map((item, index) => (
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
                  <h3 className="text-lg font-medium">{item.q}</h3>
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
                      <p className="text-gray-400 pb-4">{item.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
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
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">Start</span> Your Project
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
                  <label className="block text-sm text-gray-400 mb-1">Project Details</label>
                  <textarea
                    name="project"
                    value={formData.project}
                    onChange={(e) => setFormData({...formData, project: e.target.value})}
                    rows="3"
                    className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400/30 outline-none transition"
                    required
                  ></textarea>
                </div>

                <div>
                  <label className="block text-sm text-gray-400 mb-1">Budget Range</label>
                  <select
                    name="budget"
                    value={formData.budget}
                    onChange={(e) => setFormData({...formData, budget: e.target.value})}
                    className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400/30 outline-none appearance-none"
                    required
                  >
                    <option value="">Select an option</option>
                    <option value="5k-15k">5K - 15K</option>
                    <option value="15k-50k">15K - 50K</option>
                    <option value="50k+">50K+</option>
                  </select>
                </div>

                {message && (
                  <div className={`text-sm py-2 px-3 rounded-lg ${
                    message.includes("sent") ? "bg-green-900/50 text-green-400" : 
                    message.includes("Sending") ? "bg-blue-900/50 text-blue-400" : 
                    "bg-red-900/50 text-red-400"
                  }`}>
                    {message}
                  </div>
                )}

                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-cyan-600 to-blue-600 text-white py-3 px-6 rounded-lg font-medium hover:from-cyan-500 hover:to-blue-500 transition-all disabled:opacity-50"
                  disabled={message === "Sending..."}
                >
                  {message === "Sending..." ? "Sending..." : "Submit Inquiry"}
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