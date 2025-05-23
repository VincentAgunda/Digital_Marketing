import React, { useState, useEffect, useRef, useCallback, useMemo, createContext, useContext } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaLaptopCode, FaMobileAlt, FaBullhorn, FaChevronDown, FaPaintBrush } from "react-icons/fa";
import { FiArrowRight, FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import emailjs from "@emailjs/browser";

// Theme Context
const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('dark');

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') ||
      (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    setTheme(savedTheme);
  }, []);

  const toggleTheme = () => {
    setTheme(prevTheme => {
      const newTheme = prevTheme === 'dark' ? 'light' : 'dark';
      localStorage.setItem('theme', newTheme);
      return newTheme;
    });
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);

// Theme Toggle Button
const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <motion.button
      onClick={toggleTheme}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      className={`fixed bottom-6 right-6 z-50 p-3 rounded-full shadow-lg flex items-center justify-center ${
        theme === 'dark' ? 'bg-white text-gray-900' : 'bg-gray-900 text-white'
      }`}
      aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}
    >
      {theme === 'dark' ? (
        <span className="text-xl">☀️</span>
      ) : (
        <span className="text-xl">🌙</span>
      )}
    </motion.button>
  );
};

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
    id: 3,
    title: "Digital Branding",
    category: "Branding",
    image: "camera4.webp",
    excerpt: "3D identity system for spatial computing platforms"
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
    q: 'Is this technology compatible with existing systems?',
    a: 'Yes, our technology is designed with interoperability in mind and offers comprehensive APIs for easy integration into your current infrastructure.'
  },
  
  {
    q: "What makes your approach unique?",
    a: "We combine quantum computing principles with neural design patterns to create interfaces that adapt to users' cognitive states in real-time."
  }
];

const Home = () => {
  const { theme } = useTheme();

  // Theme-specific styles
  const themeStyles = {
    dark: {
      background: 'bg-gray-950',
      text: 'text-gray-100',
      secondaryText: 'text-gray-400',
      accentText: 'text-cyan-400',
      accentTextHover: 'hover:text-cyan-300',
      border: 'border-gray-800',
      cardBg: 'bg-gray-900/30',
      modalBg: 'bg-gray-900',
      buttonBg: 'bg-cyan-600 hover:bg-cyan-700',
      buttonSecondary: 'border-gray-600 hover:border-cyan-500',
      gradientText: 'from-cyan-400 to-blue-500'
    },
    light: {
      background: 'bg-[#F0F8FF]',
      text: 'text-[#002D62]',
      secondaryText: 'text-[#334155]',
      accentText: 'text-[#007AFF]',
      accentTextHover: 'hover:text-[#005ECB]',
      border: 'border-[#E5E7EB]',
      cardBg: 'bg-white',
      modalBg: 'bg-white',
      buttonBg: 'bg-[#007AFF] hover:bg-[#005ECB]',
      buttonSecondary: 'border-[#E5E7EB] hover:border-[#007AFF]',
      gradientText: 'from-[#007AFF] to-[#005ECB]'
    }
  };

  const currentTheme = themeStyles[theme];

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
  const [currentIndex, setCurrentIndex] = useState(0);
  const [services] = useState([
    {
      title: "Web Development",
      description: "Crafting seamless and intuitive web experiences with cutting-edge technologies.",
      icon: <FaLaptopCode />
    },
    {
      title: "Mobile App Development",
      description: "Building high-performance mobile applications for iOS and Android platforms.",
      icon: <FaMobileAlt />
    },
    {
      title: "Digital Marketing",
      description: "Driving growth and engagement through strategic digital marketing campaigns.",
      icon: <FaBullhorn />
    },
    {
      title: "UI/UX Design",
      description: "Creating visually stunning and user-centered designs that enhance usability.",
      icon: <FaPaintBrush />
    }
  ]);

  // Newsletter state
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [newsletterMessage, setNewsletterMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Refs
  const formRef = useRef();
  const newsContainerRef = useRef();
  const animationFrameRef = useRef();
  const newsletterFormRef = useRef();

  // Memoized data
  const memoizedPortfolioItems = useMemo(() => PORTFOLIO_ITEMS, []);
  const memoizedNewsData = useMemo(() => NEWS_DATA, []);
  const memoizedFaqData = useMemo(() => FAQ_DATA, []);

  // Event handlers
  const handleFormChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  }, []);

  const toggleFAQ = useCallback((index) => {
    setActiveFAQ(prev => prev === index ? null : index);
  }, []);

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

  // Newsletter submission
  const handleNewsletterSubmit = useCallback(async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setNewsletterMessage("Subscribing...");

    try {
      await emailjs.sendForm(
        process.env.REACT_APP_EMAILJS_SERVICE_ID,
        process.env.REACT_APP_EMAILJS_TEMPLATE_ID,
        newsletterFormRef.current,
        process.env.REACT_APP_EMAILJS_PUBLIC_KEY
      );
      setNewsletterMessage("Thank you for subscribing! You'll receive our next update.");
      setNewsletterEmail("");
    } catch (error) {
      setNewsletterMessage("Failed to subscribe. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  }, []);

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
      <div className={`relative mx-auto w-full max-w-[240px] md:max-w-[280px] aspect-[9/19] ${
        theme === 'dark' ? 'bg-gray-900' : 'bg-white'
      } rounded-[30px] overflow-hidden border-6 ${
        theme === 'dark' ? 'border-gray-800' : 'border-gray-200'
      } shadow-xl p-0.5`}>
        <div className="relative w-full h-full overflow-hidden">
          <img
            src="camera1.webp"
            alt="App interface"
            className="w-full h-full object-cover"
            loading="lazy"
          />
          <div className={`absolute top-0 left-0 right-0 h-8 ${
            theme === 'dark' ? 'bg-black/50' : 'bg-white/80'
          } backdrop-blur-sm flex items-center justify-between px-3 ${
            theme === 'dark' ? 'text-white' : 'text-gray-900'
          } text-[10px]`}>
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
          <div className={`absolute top-12 right-3 ${
            theme === 'dark' ? 'bg-blue-600/90 text-white' : 'bg-blue-500 text-white'
          } px-2 py-1 rounded-full text-xs font-medium`}>
            Tech Ready
          </div>
          <div className={`absolute bottom-16 left-3 ${
            theme === 'dark' ? 'bg-black/70 text-white' : 'bg-white/90 text-gray-900'
          } px-3 py-1.5 rounded-lg`}>
            <span className="text-xl font-bold">21i</span>
            <span className="block text-[10px]">Track</span>
          </div>
          <div className={`absolute bottom-0 left-0 right-0 h-12 ${
            theme === 'dark' ? 'bg-black/50' : 'bg-white/80'
          } backdrop-blur-sm flex items-center justify-around`}>
            <div className="w-5 h-5 rounded-full bg-blue-500"></div>
            <div className={`w-5 h-5 rounded-full ${
              theme === 'dark' ? 'bg-gray-600' : 'bg-gray-300'
            }`}></div>
            <div className={`w-5 h-5 rounded-full ${
              theme === 'dark' ? 'bg-gray-600' : 'bg-gray-300'
            }`}></div>
          </div>
        </div>
      </div>
      <div className={`absolute -bottom-4 -left-4 w-24 h-24 rounded-full ${
        theme === 'dark' ? 'bg-blue-600/20' : 'bg-blue-400/20'
      } blur-xl`}></div>
    </motion.div>
  ), [theme]);

  const PortfolioItem = useCallback(({ item }) => (
    <motion.div
      className={`group relative overflow-hidden rounded-md border ${
        theme === 'dark' ? 'border-gray-800/40 hover:border-cyan-400/15' : 'border-gray-200 hover:border-blue-400/30'
      } transition-all duration-250 ${
        theme === 'dark' ? 'bg-gray-900/30' : 'bg-white'
      } backdrop-blur-xs`}
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
      </div>
      <div className="p-4">
        <h3 className={`text-lg font-medium mb-1 ${
          theme === 'dark' ? 'text-white' : 'text-gray-900'
        }`}>{item.title}</h3>
        <p className={`${
          theme === 'dark' ? 'text-cyan-400' : 'text-blue-500'
        } text-sm mb-1.5`}>{item.category}</p>
        <p className={`${
          theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
        } text-sm`}>{item.excerpt}</p>
      </div>
    </motion.div>
  ), [theme]);

  const NewsItem = useCallback(({ item }) => (
    <div className="min-w-[300px] max-w-sm group">
      <div className="aspect-video rounded-xl overflow-hidden mb-4 relative">
        <img
          src={item.image}
          alt={item.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
      </div>
      <p className={`${
        theme === 'dark' ? 'text-gray-500' : 'text-gray-600'
      } text-base mb-2`}>{item.date}</p>
      <h3 className={`text-xl font-medium mb-2 group-hover:${
        theme === 'dark' ? 'text-cyan-400' : 'text-blue-600'
      } transition-colors ${
        theme === 'dark' ? 'text-white' : 'text-gray-900'
      }`}>
        {item.title}
      </h3>
      <p className={`${
        theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
      } text-base mb-3`}>{item.excerpt}</p>
      <a href="#" className={`${
        theme === 'dark' ? 'text-cyan-400 hover:text-white' : 'text-blue-500 hover:text-blue-700'
      } transition-colors text-base`}>
        Read More →
      </a>
    </div>
  ), [theme]);

  const FAQItem = useCallback(({ item, index, isActive, onClick }) => (
    <motion.div
      className={`border-b ${
        theme === 'dark' ? 'border-gray-800' : 'border-gray-200'
      } pb-4`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ delay: index * 0.1, duration: 0.6 }}
    >
      <button
        className="flex justify-between items-center w-full text-left py-4"
        onClick={() => onClick(index)}
      >
        <h3 className={`text-xl font-medium ${
          theme === 'dark' ? 'text-white' : 'text-gray-900'
        }`}>{item.q}</h3>
        <div className={`transition-transform ${isActive ? 'rotate-180' : ''}`}>
          <FaChevronDown className={theme === 'dark' ? 'text-cyan-400' : 'text-blue-500'} />
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
            <p className={`${
              theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
            } pb-4 text-lg`}>{item.a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  ), [theme]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className={`min-h-screen ${currentTheme.background} ${currentTheme.text} overflow-x-hidden transition-colors duration-300`}
      style={FONT_STYLE}
    >
{/* Hero Section */}
<section className={`relative py-24 px-6 md:px-16 lg:px-32 overflow-hidden ${
  theme === 'dark' ? 'bg-gray-900 text-white' : 'blue-700 text-gray-900'
}`}>
  <div className="absolute inset-0">
    <img
      src="camera1.webp"
      alt="Background"
      className="w-full h-full object-cover"
      loading="lazy"
    />
    <div className={`absolute inset-0 ${
      theme === 'dark' ? 'bg-black/20' : 'bg-white/70'
    } backdrop-blur-sm`}></div>
  </div>

  <div className="relative z-10 max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7 }}
    >
      <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold leading-tight mb-5">
        <span className={`text-transparent bg-clip-text bg-gradient-to-r ${
          theme === 'dark' ? 'from-[#42A5F5] to-[#E91E63]' : 'from-[#007AFF] to-[#005ECB]'
        } font-medium tracking-tight`}>Nexture Digital</span><br />
        Designing <span className={theme === 'dark' ? 'text-[#E91E63]' : 'text-[#005ECB]'}>futuristic</span> experiences
      </h1>
      <p className={`${
        theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
      } text-lg md:text-xl max-w-md mb-6`}>
        We blend AI, neural UX, and modern tech into sleek adaptive interfaces.
      </p>
      <div className="flex flex-wrap gap-4">
        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          onClick={() => setShowModal(true)}
          className={`px-6 py-3 ${
            theme === 'dark' ? 'bg-[#42A5F5] hover:bg-[#64B5F6]' : 'bg-[#007AFF] hover:bg-[#005ECB]'
          } rounded-lg text-base font-medium shadow-md transition text-white`}
        >
          Book a strategic Call
        </motion.button>
        <motion.a
          href="#work"
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          className={`px-6 py-3 border ${
            theme === 'dark' ? 'border-gray-600 hover:border-[#E91E63]' : 'border-gray-300 hover:border-[#007AFF]'
          } rounded-lg text-base font-medium transition ${
            theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
          }`}
        >
          View Work
        </motion.a>
      </div>
    </motion.div>

    <MobileMockup />
  </div>
</section>

<section id="work" className={`py-16 px-4 ${theme === 'dark' ? 'bg-gray-950' : 'bg-gray-100'}`}> {/* Light gray background for light theme */}
  <div className="max-w-6xl mx-auto relative"> {/* Relative positioning for absolute arrows */}
    {/* Header - Styled with dark text colors and increased font sizes */}
    <motion.div
      className="text-center mb-12"
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
    >
      <h2 className={`text-3xl md:text-4xl font-light mb-2 ${theme === 'dark' ? 'text-white' : 'text-[#5a7894]'}`}>
        Selected Works
      </h2>
      <p className={`${
        theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
      } max-w-lg mx-auto text-lg md:text-xl`}>
        Explore our groundbreaking projects that redefine digital interaction paradigms.
      </p>
    </motion.div>

    {/* Carousel container with padding for arrows and styled scrollbar */}
    <div className="relative px-8 md:px-12"> {/* Horizontal padding to make space for arrows */}
       <div className="flex overflow-x-auto snap-x snap-mandatory scroll-smooth space-x-6 pb-4 styled-scrollbar"> {/* Horizontal scrolling, snapping, spacing, and styled scrollbar class */}
        {/* Carousel Items */}
        {/* These will scroll horizontally */}
        {memoizedPortfolioItems.map((item, index) => (
          <motion.div
            key={item.id}
            id={`slide-${index}`}
            className="flex-shrink-0 w-full md:w-1/2 lg:w-1/3 snap-center" // Item sizing for carousel slides
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ delay: 0.08 * index, duration: 0.4 }}
          >
            {/* Card Styles - White background in light mode, shadow, etc. */}
            <div className={`p-5 rounded-2xl ${theme === 'dark' ? 'bg-gray-900' : 'bg-white'} shadow-md h-full`}>
              {/* Image container */}
              <div className="aspect-video rounded-xl overflow-hidden mb-4">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-300 ease-in-out hover:scale-105"
                  loading="lazy"
                />
              </div>
              {/* Card content with dark text colors and adjusted font sizes */}
              <h3 className={`text-xl md:text-2xl font-medium mb-1 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                {item.title}
              </h3>
              <p className={`${theme === 'dark' ? 'text-cyan-400' : 'text-gray-700'} text-base mb-3`}> {/* Dark gray category text */}
                {item.category}
              </p>
              <p className={`${theme === 'dark' ? 'text-gray-400' : 'text-gray-700'} text-base md:text-lg mb-6`}> {/* Dark gray description text */}
                {item.excerpt}
              </p>
              {/* Arrow icon within card - Dark gray color */}
               <div className={`text-2xl ${theme === 'dark' ? 'text-cyan-400' : 'text-gray-800'} absolute bottom-5 right-5 transition-all duration-300 ease-in-out hover:scale-110`}>
                 <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                   <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                 </svg>
               </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Navigation arrows - Positioned absolutely, centered vertically on the sides */}
      {/* Styled as circular buttons with light gray background and dark arrow icons */}
      <div className="absolute inset-y-0 left-0 right-0 flex items-center justify-between px-2 pointer-events-none">
          {/* Left Arrow */}
          <button
            onClick={() => {
              const container = document.querySelector('.styled-scrollbar');
              if (container) {
                 const firstCard = container.querySelector('.flex-shrink-0');
                 if (firstCard) {
                    const cardWidth = firstCard.offsetWidth;
                    const gap = 24; // space-x-6 is 24px
                    container.scrollBy({ left: -(cardWidth + gap), behavior: 'smooth' });
                 } else {
                     container.scrollBy({ left: -container.clientWidth / 2, behavior: 'smooth' });
                 }
              }
            }}
            className={`p-3 rounded-full bg-gray-300 text-gray-800 hover:bg-gray-400 transition-colors shadow-md pointer-events-auto`}
            aria-label="Previous slide"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
            </svg>
          </button>

          {/* Right Arrow */}
          <button
            onClick={() => {
              const container = document.querySelector('.styled-scrollbar');
               if (container) {
                  const firstCard = container.querySelector('.flex-shrink-0');
                  if (firstCard) {
                     const cardWidth = firstCard.offsetWidth;
                     const gap = 24; // space-x-6 is 24px
                     container.scrollBy({ left: (cardWidth + gap), behavior: 'smooth' });
                   } else {
                       container.scrollBy({ left: container.clientWidth / 2, behavior: 'smooth' });
                   }
               }
            }}
             className={`p-3 rounded-full bg-gray-300 text-gray-800 hover:bg-gray-400 transition-colors shadow-md pointer-events-auto`}
            aria-label="Next slide"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
            </svg>
          </button>
      </div>
    </div>
  </div>
</section>

{/* Add this CSS to your global stylesheet (e.g., index.css or within a <style> tag) */}
{/* This styles the thin scrollbar for the carousel */}
<style jsx global>{`
.styled-scrollbar {
  scrollbar-width: thin; /* For Firefox */
  scrollbar-color: #a0a0a0 #f1f1f1; /* For Firefox (thumb track) */
}

/* For Chrome, Edge, and Safari */
.styled-scrollbar::-webkit-scrollbar {
  height: 6px; /* Thickness of the scrollbar */
}

.styled-scrollbar::-webkit-scrollbar-track {
  background: #f1f1f1; /* Color of the scrollbar track */
  border-radius: 3px;
}

.styled-scrollbar::-webkit-scrollbar-thumb {
  background-color: #a0a0a0; /* Color of the scrollbar thumb */
  border-radius: 3px;
}

.styled-scrollbar::-webkit-scrollbar-thumb:hover {
  background-color: #808080; /* Color of the scrollbar thumb on hover */
}
`}</style>
<section className="py-16 px-4 bg-[#f0f8ff]">
  <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
    
    {/* Product Support Block */}
    <div className="bg-[#dce6e3] rounded-xl p-6 flex flex-col justify-between min-h-[180px]">
      <div>
        <h3 className="text-xl font-semibold text-gray-900 mb-2">Product support</h3>
        <p className="text-base text-gray-700">
          Access technical manuals, tutorials, and essential resources tailored to your device.
        </p>
      </div>
      <button className="mt-4 text-base text-black font-medium bg-[#EDEEEE] px-5 py-2 rounded-full w-fit hover:bg-yellow-300 transition">
        Show me more →
      </button>
    </div>

    {/* Public Sector Block */}
    <div className="bg-[#5a7894] text-white rounded-xl p-6 flex flex-col justify-between min-h-[180px]">
      <div>
        <h3 className="text-xl font-semibold mb-2">Public sector</h3>
        <p className="text-base">
          Purpose-built communication solutions for government, education, and frontline services.
        </p>
      </div>
      <button className="mt-4 text-base font-medium bg-[#EDEEEE] text-black px-5 py-2 rounded-full w-fit hover:bg-yellow-300 transition">
        Show me more →
      </button>
    </div>

    {/* Social Media Block */}
    <div className="bg-[#acb4b4] text-white rounded-xl p-6 flex flex-col justify-center items-start">
      <h3 className="text-xl font-semibold mb-4">Follow us</h3>
      <p className="text-base mb-4">Stay updated with the latest stories, updates, and announcements.</p>
      <div className="flex space-x-3 text-black">
        <div className="bg-black rounded-full p-2 text-white">T</div>
        <div className="bg-black rounded-full p-2 text-white">F</div>
        <div className="bg-black rounded-full p-2 text-white">Y</div>
        <div className="bg-black rounded-full p-2 text-white">L</div>
      </div>
    </div>

    {/* Newsletter Block */}
    <div className="bg-[#EDEEEE] rounded-xl p-6 flex flex-col justify-center">
      <h3 className="text-xl font-semibold mb-4 text-black">Sign up for our newsletter</h3>
      <form 
        ref={newsletterFormRef}
        onSubmit={handleNewsletterSubmit}
        className="space-y-2"
      >
        <div className="flex items-center bg-white rounded-full overflow-hidden w-full max-w-md">
          <input
            type="email"
            name="email"
            value={newsletterEmail}
            onChange={(e) => setNewsletterEmail(e.target.value)}
            placeholder="E-mail"
            className="px-4 py-2 w-full text-base focus:outline-none"
            required
          />
          <button 
            type="submit" 
            className="bg-black text-white px-4 py-2 text-lg"
            disabled={isSubmitting}
          >
            {isSubmitting ? '...' : '→'}
          </button>
        </div>
        {newsletterMessage && (
          <p className={`text-sm ${
            newsletterMessage.includes("Thank you") 
              ? "text-green-600" 
              : "text-red-600"
          }`}>
            {newsletterMessage}
          </p>
        )}
        <p className="text-sm text-gray-800">
          Get product insights, tips, and exclusive offers delivered to your inbox.
        </p>
      </form>
    </div>
  </div>
</section>

   {/* News Section */}
   <section className={`py-20 px-6 overflow-hidden rounded-xl ${
        theme === 'dark' ? 'bg-gray-950' : 'bg-white'
      }`}>
        <div className="max-w-6xl mx-auto">
          <motion.div
            className="flex justify-between items-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <div>
              <h2 className="text-4xl md:text-5xl font-light mb-2">
                <span className={`text-transparent bg-clip-text bg-gradient-to-r ${
                  theme === 'dark' ? 'from-cyan-400 to-blue-500' : 'from-blue-500 to-blue-700'
                }`}>Latest</span> Insights
              </h2>
              <p className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>Stay updated with the frontier of digital interaction</p>
            </div>
            <a href="#" className={`${
              theme === 'dark' ? 'text-cyan-400 hover:text-white' : 'text-blue-500 hover:text-blue-700'
            } transition-colors hidden md:block`}>
              View All →
            </a>
          </motion.div>

          <div className="relative w-full overflow-hidden" ref={newsContainerRef}>
            <div className="flex gap-8 w-max">
              {memoizedNewsData.map((item, index) => (
                // Added p-6 for padding inside the tile container
                <div key={`news-item-wrapper-${index}`} className="bg-[#EDEEEE] rounded-xl p-6">
                  <NewsItem item={item} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className={`py-20 px-6 ${
        theme === 'dark' ? 'bg-gray-950/50' : 'bg-gray-50'
      }`}>
        <div className="max-w-3xl mx-auto">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <h2 className="text-3xl md:text-4xl font-light mb-4">
              <span className={`text-transparent bg-clip-text bg-gradient-to-r ${
                theme === 'dark' ? 'from-cyan-400 to-blue-500' : 'from-blue-500 to-blue-700'
              }`}>Frequently</span> Asked
            </h2>
            <p className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>Answers to common questions about our futuristic approach</p>
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

      <AnimatePresence>
  {showModal && (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* Overlay */}
      <div
        className={`absolute inset-0 backdrop-blur-sm ${
          theme === 'dark' ? 'bg-black/80' : 'bg-black/40'
        }`}
        onClick={() => setShowModal(false)}
      />

      {/* Modal */}
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        transition={{ type: 'spring', damping: 20 }}
        className={`relative w-full max-w-sm sm:max-w-md rounded-xl border shadow-xl p-4 sm:p-6 overflow-hidden max-h-[90vh] ${
          theme === 'dark' ? 'bg-gray-900 border-gray-800 text-white' : 'bg-white border-gray-200 text-gray-900'
        }`}
      >
        {/* Close Button */}
        <button
          className={`absolute top-3 right-3 text-sm ${
            theme === 'dark' ? 'text-gray-400 hover:text-white' : 'text-gray-500 hover:text-gray-700'
          }`}
          onClick={() => setShowModal(false)}
        >
          <svg width="20" height="20" fill="none" stroke="currentColor">
            <path d="M18 6L6 18M6 6l12 12" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </button>

        {/* Header */}
        <h3 className="text-xl sm:text-2xl font-light mb-3 sm:mb-4">
          <span
            className={`text-transparent bg-clip-text bg-gradient-to-r ${
              theme === 'dark' ? 'from-cyan-400 to-blue-500' : 'from-blue-500 to-blue-700'
            }`}
          >
            Start
          </span>{' '}
          Your Project
        </h3>

        {/* Form (scrollable) */}
        <form
          ref={formRef}
          onSubmit={sendEmail}
          className="space-y-3 overflow-y-auto max-h-[60vh] pr-1"
        >
          {[
            { label: 'Your Name', name: 'name', type: 'text' },
            { label: 'Email Address', name: 'email', type: 'email' },
          ].map(({ label, name, type }) => (
            <div key={name}>
              <label className="block text-sm mb-1">{label}</label>
              <input
                type={type}
                name={name}
                value={formData[name]}
                onChange={handleFormChange}
                required
                className={`w-full px-3 py-2 rounded-lg border text-sm focus:ring-1 outline-none ${
                  theme === 'dark'
                    ? 'bg-gray-800 border-gray-700 text-white focus:border-cyan-400 focus:ring-cyan-400/30'
                    : 'bg-white border-gray-300 text-gray-900 focus:border-cyan-400 focus:ring-cyan-400/30'
                }`}
              />
            </div>
          ))}

          <div>
            <label className="block text-sm mb-1">Project Details</label>
            <textarea
              name="project"
              value={formData.project}
              onChange={handleFormChange}
              rows="3"
              required
              className={`w-full px-3 py-2 rounded-lg border text-sm resize-none focus:ring-1 outline-none ${
                theme === 'dark'
                  ? 'bg-gray-800 border-gray-700 text-white focus:border-cyan-400 focus:ring-cyan-400/30'
                  : 'bg-white border-gray-300 text-gray-900 focus:border-cyan-400 focus:ring-cyan-400/30'
              }`}
            />
          </div>

          <div>
            <label className="block text-sm mb-1">Budget Range</label>
            <select
              name="budget"
              value={formData.budget}
              onChange={handleFormChange}
              required
              className={`w-full px-3 py-2 rounded-lg border text-sm appearance-none focus:ring-1 outline-none ${
                theme === 'dark'
                  ? 'bg-gray-800 border-gray-700 text-white focus:border-cyan-400 focus:ring-cyan-400/30'
                  : 'bg-white border-gray-300 text-gray-900 focus:border-cyan-400 focus:ring-cyan-400/30'
              }`}
            >
              <option value="">Select an option</option>
              <option value="5k-15k">5K - 15K</option>
              <option value="15k-50k">15K - 50K</option>
              <option value="50k+">50K+</option>
            </select>
          </div>

          {message && (
            <div
              className={`text-sm py-2 px-3 rounded-lg ${
                message.includes('sent')
                  ? theme === 'dark'
                    ? 'bg-green-900/50 text-green-400'
                    : 'bg-green-100 text-green-800'
                  : message.includes('Sending')
                  ? theme === 'dark'
                    ? 'bg-blue-900/50 text-blue-400'
                    : 'bg-blue-100 text-blue-800'
                  : theme === 'dark'
                  ? 'bg-red-900/50 text-red-400'
                  : 'bg-red-100 text-red-800'
              }`}
            >
              {message}
            </div>
          )}

          <button
            type="submit"
            disabled={message === 'Sending...'}
            className={`w-full py-2 text-sm rounded-lg font-medium text-white bg-gradient-to-r transition-all ${
              theme === 'dark'
                ? 'from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500'
                : 'from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600'
            } disabled:opacity-50`}
          >
            {message === 'Sending...' ? 'Sending...' : 'Submit Inquiry'}
          </button>
        </form>
      </motion.div>
    </motion.div>
  )}
</AnimatePresence>


      <ThemeToggle />
    </motion.div>
  );
};

const App = () => {
  return (
    <ThemeProvider>
      <Home />
    </ThemeProvider>
  );
};

export default App;