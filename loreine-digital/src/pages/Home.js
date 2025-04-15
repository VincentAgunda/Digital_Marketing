import React, { useState, useEffect, useRef, useCallback, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaLaptopCode, FaMobileAlt, FaPaintBrush, FaBullhorn, FaChevronDown } from "react-icons/fa";
import emailjs from "@emailjs/browser";

// Constants
const FONT_STYLE = {
  fontFamily: "'SF Pro Display', -apple-system, BlinkMacSystemFont, sans-serif",
  fontWeight: 300
};

const ANIMATION_VARIANTS = {
  fadeIn: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
    transition: { duration: 0.4, ease: "easeInOut" }
  },
  slideUp: {
    initial: { opacity: 0, y: 40 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] }
  },
  scaleUp: {
    initial: { opacity: 0, scale: 0.96 },
    animate: { opacity: 1, scale: 1 },
    transition: { duration: 0.5, ease: "easeOut" }
  }
};

// Data
const PORTFOLIO_ITEMS = [
  {
    id: 1,
    title: "Quantum UI Framework",
    category: "Web Design",
    image: "camera3.webp",
    excerpt: "Next-gen interface system leveraging quantum computing principles"
  },
  {
    id: 2,
    title: "Neural Commerce App",
    category: "Mobile App",
    image: "default-blog1.webp",
    excerpt: "Thought-controlled shopping experience with biometric feedback"
  },
  {
    id: 3,
    title: "Digital Branding",
    category: "Branding",
    image: "camera4.webp",
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

const NEWS_DATA = [
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

const FAQ_DATA = [
  {
    q: "What services do you offer?",
    a: "We specialize in quantum web design, neural interface development, holographic branding, and AI-powered marketing systems."
  },
  {
    q: "What makes your approach unique?",
    a: "We combine quantum computing principles with neural design patterns to create interfaces that adapt to users' cognitive states in real-time."
  }
];

const Home = () => {
  // State
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
  
  // Refs
  const formRef = useRef();
  const newsContainerRef = useRef();
  const animationFrameRef = useRef();

  // Memoized data
  const memoizedPortfolioItems = useMemo(() => PORTFOLIO_ITEMS, []);
  const memoizedNewsData = useMemo(() => NEWS_DATA, []);
  const memoizedFaqData = useMemo(() => FAQ_DATA, []);

  // Event handlers
  const handleMouseMove = useCallback((e) => {
    setMousePosition({ x: e.clientX, y: e.clientY });
  }, []);

  const handleFormChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  }, []);

  const toggleFAQ = useCallback((index) => {
    setActiveFAQ(prev => prev === index ? null : index);
  }, []);

  // Effects
  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameRef.current);
    };
  }, [handleMouseMove]);

  // Email sending
  const sendEmail = useCallback(async (e) => {
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
  }, []);

  // Parallax effect
  const getParallaxStyle = useCallback((intensity) => ({
    transform: `translate(
      ${(mousePosition.x - window.innerWidth/2) / (50 / intensity)}px,
      ${(mousePosition.y - window.innerHeight/2) / (50 / intensity)}px
    )`,
    transition: "transform 0.1s linear"
  }), [mousePosition.x, mousePosition.y]);

  // News animation
  useEffect(() => {
    if (!newsContainerRef.current) return;

    const container = newsContainerRef.current;
    const content = container.firstChild;
    let position = 0;
    const speed = 0.5;

    const animate = () => {
      position -= speed;
      if (position <= -content.offsetWidth / 2) {
        position = 0;
      }
      content.style.transform = `translateX(${position}px)`;
      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animationFrameRef.current = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationFrameRef.current);
  }, []);

  // Components
  const MobileMockup = useMemo(() => () => (
    <motion.div
      className="relative"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.2, duration: 0.5 }}
    >
      <div className="relative mx-auto w-full max-w-[240px] md:max-w-[280px] aspect-[9/19] bg-gray-900 rounded-[30px] overflow-hidden border-6 border-gray-800 shadow-xl p-0.5">
        <div className="relative w-full h-full overflow-hidden">
          <img
            src="camera1.webp"
            alt="App interface"
            className="w-full h-full object-cover"
            loading="lazy"
          />
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
          <div className="absolute top-12 right-3 bg-blue-600/90 text-white px-2 py-1 rounded-full text-xs font-medium">
            Tech Ready
          </div>
          <div className="absolute bottom-16 left-3 bg-black/70 text-white px-3 py-1.5 rounded-lg">
            <span className="text-xl font-bold">21i</span>
            <span className="block text-[10px]">Track</span>
          </div>
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
  ), []);

  const PortfolioItem = useCallback(({ item }) => (
    <motion.div
      className="group relative overflow-hidden rounded-md border border-gray-800/40 hover:border-cyan-400/15 transition-all duration-250 bg-gray-900/30 backdrop-blur-xs"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
    >
      <div className="aspect-video overflow-hidden relative">
        <img
          src={item.image}
          alt={item.title}
          className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-400"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-950/70 via-gray-950/20 to-transparent" />
      </div>
      <div className="p-4">
        <h3 className="text-base font-medium mb-1">{item.title}</h3>
        <p className="text-cyan-400 text-2xs mb-1.5">{item.category}</p>
        <p className="text-gray-400 text-2xs">{item.excerpt}</p>
      </div>
    </motion.div>
  ), []);

  const NewsItem = useCallback(({ item }) => (
    <div className="min-w-[300px] max-w-sm group">
      <div className="aspect-video rounded-xl overflow-hidden mb-4 relative">
        <img
          src={item.image}
          alt={item.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-950/50 via-transparent to-transparent" />
      </div>
      <p className="text-gray-500 text-sm mb-2">{item.date}</p>
      <h3 className="text-xl font-medium mb-2 group-hover:text-cyan-400 transition-colors">
        {item.title}
      </h3>
      <p className="text-gray-400 text-sm mb-3">{item.excerpt}</p>
      <a href="#" className="text-cyan-400 text-sm hover:text-white transition-colors">
        Read More →
      </a>
    </div>
  ), []);

  const FAQItem = useCallback(({ item, index, isActive, onClick }) => (
    <motion.div
      className="border-b border-gray-800 pb-4"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ delay: index * 0.1, duration: 0.6 }}
    >
      <button
        className="flex justify-between items-center w-full text-left py-4"
        onClick={() => onClick(index)}
      >
        <h3 className="text-lg font-medium">{item.q}</h3>
        <div className={`transition-transform ${isActive ? 'rotate-180' : ''}`}>
          <FaChevronDown className="text-cyan-400" />
        </div>
      </button>
      <AnimatePresence>
        {isActive && (
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
  ), []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-gray-950 text-gray-100 overflow-x-hidden"
      style={FONT_STYLE}
    >
      {/* Background elements */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,...')] opacity-5"></div>
        <div
          className="absolute inset-0 opacity-15"
          style={{
            background: `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(34, 211, 238, 0.08) 0%, transparent 70%)`
          }}
        ></div>
      </div>

      {/* Hero Section */}
      <section className="relative py-24 px-6 md:px-16 lg:px-32 overflow-hidden text-white">
        <div className="absolute inset-0">
          <img
            src="camera1.webp"
            alt="Background"
            className="w-full h-full object-cover"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm"></div>
        </div>

        <div className="relative z-10 max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <h1 className="text-4xl md:text-5xl font-semibold leading-tight mb-5">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">Nexture Digital</span><br />
              Designing <span className="text-indigo-400">futuristic</span> experiences
            </h1>
            <p className="text-gray-300 text-base md:text-lg max-w-md mb-6">
              We blend AI, neural UX, and modern tech into sleek adaptive interfaces.
            </p>
            <div className="flex flex-wrap gap-4">
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => setShowModal(true)}
                className="px-5 py-2.5 bg-cyan-600 hover:bg-cyan-700 rounded-lg text-sm font-medium shadow-md transition"
              >
                Start Project
              </motion.button>
              <motion.a
                href="#work"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="px-5 py-2.5 border border-gray-600 hover:border-cyan-500 rounded-lg text-sm font-medium transition"
              >
                View Work
              </motion.a>
            </div>
          </motion.div>

          <MobileMockup />
        </div>
      </section>

      {/* Portfolio Section */}
      <section id="work" className="py-12 px-4 bg-gray-950/80 backdrop-blur-sm">
        <div className="max-w-5xl mx-auto">
          <motion.div
            className="text-center mb-10"
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
          >
            <h2 className="text-xl md:text-4xl font-light mb-4">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">Selected</span> Works
            </h2>
            <p className="text-gray-400 max-w-lg mx-auto text-xl">
              Explore our groundbreaking projects that redefine digital interaction paradigms.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {memoizedPortfolioItems.map((item) => (
              <PortfolioItem key={item.id} item={item} />
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-12 px-4 bg-gray-900 backdrop-blur-sm">
        <div className="max-w-4xl mx-auto">
          <motion.div
            className="text-center mb-10"
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
          >
            <h2 className="text-xl md:text-2xl font-light mb-2 text-[#ECF2F0]">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#8BA89A] to-[#C7CFCA]">Specialized</span> Services
            </h2>
            <p className="text-[#C7CFCA] max-w-lg mx-auto text-xs">
              Our offerings blend cutting-edge technology with intuitive design principles.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-3">
            <motion.div
              className="bg-gray-800 p-4 rounded-md border border-gray-700 hover:border-[#8BA89A] transition-colors"
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ delay: 0.08, duration: 0.4 }}
            >
              <div className="text-[#8BA89A] text-lg mb-2"><FaLaptopCode /></div>
              <h3 className="text-base font-medium mb-1 text-[#ECF2F0]">Quantum Web Design</h3>
              <p className="text-[#C7CFCA] text-2xs">
                Websites that leverage quantum principles for adaptive layouts and predictive interfaces.
              </p>
            </motion.div>

            <motion.div
              className="bg-gray-800 p-4 rounded-md border border-gray-700 hover:border-[#8BA89A] transition-colors"
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ delay: 0.16, duration: 0.4 }}
            >
              <div className="text-[#8BA89A] text-lg mb-2"><FaMobileAlt /></div>
              <h3 className="text-base font-medium mb-1 text-[#ECF2F0]">Neural Mobile Apps</h3>
              <p className="text-[#C7CFCA] text-2xs">
                Thought-controlled applications with biometric feedback and cognitive load optimization.
              </p>
            </motion.div>

            <motion.div
              className="bg-gray-800 p-4 rounded-md border border-gray-700 hover:border-[#8BA89A] transition-colors"
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ delay: 0.24, duration: 0.4 }}
            >
              <div className="text-[#8BA89A] text-lg mb-2"><FaPaintBrush /></div>
              <h3 className="text-base font-medium mb-1 text-[#ECF2F0]">Motion Design</h3>
              <p className="text-[#C7CFCA] text-2xs">
                Engaging animations and micro-interactions.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* News Section */}
      <section className="py-20 px-6 overflow-hidden">
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

          <div className="relative w-full overflow-hidden" ref={newsContainerRef}>
            <div className="flex gap-8 w-max">
              {memoizedNewsData.map((item, index) => (
                <NewsItem key={index} item={item} />
              ))}
            </div>
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
            {memoizedFaqData.map((item, index) => (
              <FAQItem 
                key={index} 
                item={item} 
                index={index}
                isActive={activeFAQ === index}
                onClick={toggleFAQ}
              />
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
                    onChange={handleFormChange}
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
                    onChange={handleFormChange}
                    className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400/30 outline-none transition"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm text-gray-400 mb-1">Project Details</label>
                  <textarea
                    name="project"
                    value={formData.project}
                    onChange={handleFormChange}
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
                    onChange={handleFormChange}
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