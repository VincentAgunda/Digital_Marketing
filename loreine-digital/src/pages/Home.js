import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaLaptopCode, FaMobileAlt, FaPaintBrush, FaBullhorn } from "react-icons/fa";
import emailjs from "@emailjs/browser";

const pageAnimation = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
  transition: { duration: 0.5 },
};

// --- Define consistent animation variants ---
const fadeIn = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
  transition: { duration: 0.4, ease: "easeInOut" },
};

const slideInFromBottom = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: 20 },
  transition: { duration: 0.5, ease: "easeOut" },
};

const scaleUp = {
  initial: { opacity: 0, scale: 0.95 },
  animate: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0.95 },
  transition: { duration: 0.4, ease: "easeOut" },
};

// --- Placeholder Data (Replace with your actual content) ---
// **** ACTION NEEDED: Update these image paths ****
const portfolioItems = [
  { id: 1, title: "Project Alpha", category: "Web Design", image: "camera1.webp", icon: <FaLaptopCode/> },
  { id: 2, title: "Project Beta", category: "Mobile App", image: "camera2.webp", icon: <FaMobileAlt/> },
  { id: 3, title: "Project Gamma", category: "Branding", image: "camera3.webp", icon: <FaPaintBrush/> },
  { id: 4, title: "Project Delta", category: "Marketing Campaign", image: "camera1.webp", icon: <FaBullhorn/> },
  // Add more portfolio items as needed
];

// **** ACTION NEEDED: Update these image paths ****
const newsData = [
  { title: 'The Future of UI/UX in 2025', date: 'Apr 10, 2025', image: 'camera1.webp', link: '#' },
  { title: 'Headless CMS: A Developer\'s Guide', date: 'Mar 28, 2025', image: 'camera1.webp', link: '#' },
  { title: 'AI Integration in Web Development', date: 'Mar 15, 2025', image: 'camera3.webp', link: '#' },
];


const faqData = [
    { q: "What services do you offer?", a: "We offer a range of digital services including web design, development, branding, and marketing." },
    { q: "What is your design process?", a: "Our process involves discovery, design, development, testing, and launch, with client collaboration at each stage." },
    { q: "How long does a project typically take?", a: "Project timelines vary based on complexity, but we typically estimate 4-12 weeks for standard websites." },
    { q: "What are your pricing models?", a: "We offer project-based pricing and retainer options. Contact us for a custom quote." },
];
// --- End Placeholder Data ---


const Home = () => {
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({ name: "", phone: "", service: "", email: "" });
  const [message, setMessage] = useState("");

  // Email Sending Function (Keep your existing logic)
  const sendEmail = async (e) => {
    e.preventDefault();
    const serviceId = process.env.REACT_APP_EMAILJS_SERVICE_ID || 'YOUR_SERVICE_ID'; // Add fallback for safety
    const templateId = process.env.REACT_APP_EMAILJS_TEMPLATE_ID || 'YOUR_TEMPLATE_ID';
    const publicKey = process.env.REACT_APP_EMAILJS_PUBLIC_KEY || 'YOUR_PUBLIC_KEY';

    if (!formData.name || !formData.phone || !formData.service || !formData.email) {
      setMessage("All fields are required.");
      return;
    }
      if (!serviceId || !templateId || !publicKey || serviceId === 'YOUR_SERVICE_ID') {
        console.error("EmailJS credentials are not configured correctly in environment variables (REACT_APP_EMAILJS_...).");
        setMessage("Configuration error. Cannot send email at this time.");
        return;
      }

    const templateParams = {
      to_name: "Admin", // Or your name
      from_name: formData.name,
      user_email: formData.email,
      message: `Phone: ${formData.phone}\nService Interest: ${formData.service}`, // Adjusted message
    };

    // Indicate sending process (optional)
    setMessage("Sending...");

    try {
      await emailjs.send(serviceId, templateId, templateParams, publicKey);
      setMessage("Request sent successfully! We'll be in touch.");
      setFormData({ name: "", phone: "", service: "", email: "" });
      setTimeout(() => {
        setShowModal(false);
        setMessage(""); // Clear message after modal closes
      }, 2500); // Keep modal open a bit longer to show success
    } catch (error) {
      console.error("Email sending error:", error);
      setMessage("Failed to send request. Please try again later or contact us directly.");
    }
  };

  // Simple FAQ Toggle State
  const [openFAQ, setOpenFAQ] = useState(null);

  return (
    <motion.div
      {...pageAnimation}
      className="bg-black text-gray-300 min-h-screen" // Base dark theme
    >
      {/* Hero Section - Adjusted to match image */}
      <motion.section
        className="min-h-screen flex items-center px-6 md:px-12 lg:px-24 relative overflow-hidden py-20 bg-gradient-to-br from-[#4a00e0] via-[#8e2de2] to-black"
        {...fadeIn}
      >
        {/* ... (Hero content, make sure any background images here are correct) ... */}
         <div className="relative z-10 max-w-4xl">
          <motion.h1
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight text-left"
            {...slideInFromBottom}
            transition={{ ...slideInFromBottom.transition, delay: 0.2 }}
          >
            Crafting narrative through design {/* REPLACE Text if needed */}
          </motion.h1>
          {/* Optional: Add sub-headline if present in the image */}
          {/* <motion.p
            className="text-lg md:text-xl text-gray-300 mb-8 text-left max-w-xl"
            {...slideInFromBottom}
            transition={{ ...slideInFromBottom.transition, delay: 0.4 }}
          >
            Add sub-headline text here if needed.
          </motion.p> */}

          {/* Small Thumbnails Placeholder */}
          <motion.div
            className="flex space-x-4 my-8"
            {...slideInFromBottom}
            transition={{ ...slideInFromBottom.transition, delay: 0.6 }}
          >
             {/* **** ACTION NEEDED: Replace placeholders with actual logos/images **** */}
            <img src="camera1.webp" alt="Client Logo 1" className="w-16 h-10 object-contain rounded"/>
            <img src="camera2.webp" alt="Client Logo 2" className="w-16 h-10 object-contain rounded"/>
            <img src="camera1.webp" alt="Client Logo 3" className="w-16 h-10 object-contain rounded"/>
            {/* <div className="w-16 h-10 bg-gray-700 rounded flex items-center justify-center text-xs text-gray-400">Logo 1</div>
            <div className="w-16 h-10 bg-gray-700 rounded flex items-center justify-center text-xs text-gray-400">Logo 2</div>
            <div className="w-16 h-10 bg-gray-700 rounded flex items-center justify-center text-xs text-gray-400">Logo 3</div> */}
          </motion.div>

          <motion.button
            className="bg-white text-black font-semibold py-3 px-8 rounded-full hover:bg-gray-200 transition duration-300 mt-4"
            onClick={() => setShowModal(true)}
            {...scaleUp}
            transition={{ duration: 0.3, delay: 0.8 }}
          >
            Explore {/* Changed Button Text */}
          </motion.button>
        </div>
      </motion.section>

      {/* About/Intro Section */}
      <motion.section
        className="py-14 md:py-18 px-5 bg-gray-950"
        {...fadeIn}
      >
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-8 md:gap-12 items-center">
          {/* ... (Text content) ... */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <h2 className="text-2xl md:text-3xl font-semibold text-white mb-5 leading-snug tracking-tight">
              At <span className="text-indigo-400">Nexture Digital</span> — we craft more than interfaces.
            </h2>
            <p className="text-[5px] md:text-base text-gray-300 mb-10 font-thin leading-relaxed">
  We engineer digital experiences with purpose. Every pixel serves a function, every interaction tells a story, and every solution leaves a mark.
</p>

            <motion.div
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <button className="px-6 py-3 text-sm font-medium bg-gray-900 border border-gray-700 rounded-lg text-white hover:bg-gray-800 transition-all duration-200 hover:border-gray-600">
                Our Philosophy &rarr;
              </button>
            </motion.div>
          </motion.div>

          <motion.div
            className="relative"
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <div className="aspect-[5/3] bg-gray-900 rounded-xl overflow-hidden border border-gray-800 hover:border-indigo-400/40 transition-all duration-500">
             {/* **** ACTION NEEDED: Update this image path **** */}
              <img
                src="camera1.webp" // <-- UPDATE THIS
                alt="Nexture Digital team working"
                className="w-full h-full object-cover opacity-95 hover:opacity-100 transition-opacity duration-300"
                loading="lazy"
              />
              <div className="absolute inset-0 rounded-xl pointer-events-none mix-blend-overlay opacity-20 bg-gradient-to-tr from-gray-950 via-indigo-900/30 to-gray-950" />
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* Portfolio/Showcase Section */}
      <motion.section
        id="portfolio"
        className="py-12 md:py-20 px-6 bg-gray-950"
        {...fadeIn}
      >
        <div className="max-w-6xl mx-auto">
          <motion.h2
            className="text-3xl md:text-4xl font-bold text-indigo-300  text-center mb-12"
            {...slideInFromBottom}
            transition={{ ...slideInFromBottom.transition, delay: 0.1 }}
          >
            Selected Works
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            {portfolioItems.map((item, index) => (
              <motion.div
                key={item.id}
                className="bg-gray-900 rounded-xl overflow-hidden shadow-2xl group border border-gray-800 hover:border-gray-700 transition-colors duration-300"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.5, delay: index * 0.15, ease: "easeOut" }}
              >
                <div className="relative aspect-video overflow-hidden">
                   {/* **** ACTION NEEDED: Use the image path from portfolioItems **** */}
                   {/* Make sure item.image has the correct path */}
                   <img
                      src={item.image} // <-- Uses path from portfolioItems array
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      loading="lazy"
                   />
                   <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div> {/* Optional overlay */}
                  {/* Removed the placeholder div */}
                </div>
                <div className="p-5">
                  <h3 className="text-lg font-medium text-white mb-1">{item.title}</h3>
                  <p className="text-indigo-400/90 text-xs font-light tracking-wide">{item.category}</p>
                </div>
              </motion.div>
            ))}
          </div>

           {/* ... (Services subsection) ... */}
           <motion.div
            className="mt-14 md:mt-20 grid md:grid-cols-3 gap-5"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <motion.div
              className="bg-gray-900/50 p-5 rounded-xl border border-gray-800 hover:border-gray-700 transition-colors duration-300"
              {...slideInFromBottom}
              transition={{ ...slideInFromBottom.transition, delay: 0.4 }}
            >
              <div className="text-indigo-400 mb-3 text-xl inline-block"><FaMobileAlt /></div>
              <h4 className="text-base font-medium text-white mb-2">Mobile Design</h4>
              <p className="text-xs text-gray-400 font-light">Intuitive interfaces for iOS and Android</p>
            </motion.div>
            <motion.div
              className="bg-gray-900/50 p-5 rounded-xl border border-gray-800 hover:border-gray-700 transition-colors duration-300"
              {...slideInFromBottom}
              transition={{ ...slideInFromBottom.transition, delay: 0.5 }}
            >
              <div className="text-indigo-400 mb-3 text-xl inline-block"><FaPaintBrush /></div>
              <h4 className="text-base font-medium text-white mb-2">Motion Design</h4>
              <p className="text-xs text-gray-400 font-light">Engaging animations and micro-interactions</p>
            </motion.div>
            <motion.div
              className="bg-gray-900/50 p-5 rounded-xl border border-gray-800 hover:border-gray-700 transition-colors duration-300"
              {...slideInFromBottom}
              transition={{ ...slideInFromBottom.transition, delay: 0.6 }}
            >
              <div className="text-indigo-400 mb-3 text-xl inline-block"><FaLaptopCode /></div>
              <h4 className="text-base font-medium text-white mb-2">Web Development</h4>
              <p className="text-xs text-gray-400 font-light">Modern, performant web experiences</p>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>

      {/* Featured Project Section */}
      <motion.section
        className="py-24 md:py-32 px-6 relative bg-cover bg-center bg-fixed"
        // **** ACTION NEEDED: Update this background image path ****
        style={{ backgroundImage: "url('camera1.webp')" }} // <-- UPDATE THIS
        {...fadeIn}
      >
        <div className="absolute inset-0 bg-black bg-opacity-60"></div>
        <div className="relative z-10 max-w-4xl mx-auto text-center">
         {/* ... (Featured Project text content) ... */}
          <motion.p
            className="text-indigo-300 uppercase tracking-wider mb-2 text-sm"
            {...slideInFromBottom}
            transition={{ ...slideInFromBottom.transition, delay: 0.2 }}
          >
            Featured Project
          </motion.p>
          <motion.h2
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4"
            {...slideInFromBottom}
            transition={{ ...slideInFromBottom.transition, delay: 0.3 }}
          >
            Honest style: Lonsleep App {/* REPLACE */}
          </motion.h2>
          <motion.p
            className="text-lg text-gray-300 mb-8"
            {...slideInFromBottom}
            transition={{ ...slideInFromBottom.transition, delay: 0.4 }}
          >
            Reimagining relaxation through a seamless mobile experience. {/* REPLACE */}
          </motion.p>
          <motion.a
            href="#"
            className="text-white font-semibold border-b border-indigo-400 pb-1 hover:text-indigo-300 hover:border-indigo-300 transition"
            {...scaleUp}
            transition={{ duration: 0.3, delay: 0.5 }}
          >
            View Case Study
          </motion.a>
        </div>
      </motion.section>

     {/* Latest News Section */}
    <motion.section
      className="py-16 md:py-24 px-6 bg-black"
      {...fadeIn}
    >
      <div className="max-w-7xl mx-auto">
        <motion.h2
          className="text-3xl md:text-4xl font-bold text-white text-center mb-12 md:mb-16"
          {...slideInFromBottom}
          transition={{ ...slideInFromBottom.transition, delay: 0.1 }}
        >
          Insights & News
        </motion.h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {newsData.map((news, index) => (
            <motion.div
              key={index}
              className="bg-gray-900 rounded-lg overflow-hidden shadow-lg group flex flex-col"
              initial={{ opacity: 0, x: -50 }} // Move from left
              whileInView={{ opacity: 1, x: 0 }} // Move to original position
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: index * 0.2, ease: "easeOut" }} // Adjust duration and delay for smoother effect
            >
              <div className="relative aspect-video overflow-hidden">
                {/* **** ACTION NEEDED: Uncomment this img tag and ensure news.image path is correct **** */}
                <img
                    src={news.image} // <-- Uses path from newsData array
                    alt={news.title}
                    className="w-full h-full object-cover group-hover:opacity-80 transition-opacity duration-300"
                    loading="lazy"
                 />
                {/* Removed the placeholder div */}
                <span className="absolute bottom-2 left-2 bg-black bg-opacity-70 text-white text-xs py-1 px-2 rounded">
                  {news.date}
                </span>
              </div>
              <div className="p-5 flex flex-col flex-grow">
                <h3 className="text-lg font-semibold text-white mb-3 leading-snug flex-grow">
                  {news.title}
                </h3>
                <motion.a
                  href={news.link}
                  className="text-indigo-400 text-sm font-medium hover:text-indigo-300 transition self-start mt-auto"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.2 }}
                >
                  READ MORE →
                </motion.a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>

      {/* FAQ Section - (No images here, likely okay) */}
      <motion.section
         className="py-16 bg-gray-900 px-4 sm:px-6"
        {...fadeIn}
      >
       {/* ... (FAQ content) ... */}
        <div className="max-w-3xl mx-auto">
          <motion.h2
            className="text-3xl sm:text-4xl font-bold text-center mb-10 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300 font-sf"
            {...slideInFromBottom}
            transition={{ ...slideInFromBottom.transition, delay: 0.1 }}
          >
            Frequently Asked Questions
          </motion.h2>

          <div className="space-y-3">
            {faqData.map((faq, index) => (
              <motion.div
                key={index}
                className="bg-gray-800 rounded-lg overflow-hidden border border-gray-700 transition-all hover:border-gray-600"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.4, delay: index * 0.1, ease: "easeOut" }}
              >
                <button
                  className="w-full flex justify-between items-center p-4 sm:p-5 text-left group"
                  onClick={() => setOpenFAQ(openFAQ === index ? null : index)}
                >
                  <span className="text-base sm:text-lg font-medium text-gray-100 group-hover:text-white font-sf transition-colors">
                    {faq.q}
                  </span>
                  <div className={`p-1 rounded-full transition-all ${openFAQ === index ? 'bg-gray-700 rotate-180' : 'bg-gray-700/70'}`}>
                    <svg
                      className="w-5 h-5 text-gray-300"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </div>
                </button>

                <AnimatePresence>
                  {openFAQ === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2, ease: "easeOut" }}
                    >
                      <div className="px-4 sm:px-5 pb-4 sm:pb-5 text-gray-300 font-sf text-sm sm:text-base leading-relaxed">
                        {faq.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Booking Modal - (No images here, likely okay) */}
       <AnimatePresence>
        {showModal && (
          <motion.div
            className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-80 z-50 px-4 py-8" // Slightly darker overlay
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
             {/* ... (Modal content) ... */}
            <motion.div
              className="bg-gray-800 p-6 md:p-8 rounded-xl shadow-xl w-full max-w-md relative" // Dark modal background
              {...scaleUp}
              transition={{ duration: 0.3 }}
            >
              {/* Close Button */}
                <button
                  onClick={() => {
                    setShowModal(false);
                    setMessage(""); // Clear message on close
                  }}
                  className="absolute top-3 right-3 text-gray-400 hover:text-white transition-colors"
                  aria-label="Close modal"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>

              <h2 className="text-xl font-bold mb-5 text-white text-center">Start Your Project Inquiry</h2>
              <form onSubmit={sendEmail} className="space-y-4">
                <input
                  type="text"
                  placeholder="Your Name"
                  className="w-full p-3 bg-gray-700 border border-gray-600 rounded-md text-sm text-white placeholder-gray-400 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                />
                <input
                  type="tel" // Use tel type for better mobile UX
                  placeholder="Phone Number"
                  className="w-full p-3 bg-gray-700 border border-gray-600 rounded-md text-sm text-white placeholder-gray-400 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  required
                />
                  <input
                    type="email"
                    placeholder="Your Email"
                    className="w-full p-3 bg-gray-700 border border-gray-600 rounded-md text-sm text-white placeholder-gray-400 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                  />
                <input
                  type="text"
                  placeholder="Briefly describe your project or service needed" // More descriptive placeholder
                  className="w-full p-3 bg-gray-700 border border-gray-600 rounded-md text-sm text-white placeholder-gray-400 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition"
                  value={formData.service}
                  onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                  required
                />

                {message && <p className={`text-xs text-center py-2 ${message.includes("successfully") ? 'text-green-400' : message.includes("Sending") ? 'text-blue-400' : 'text-red-400'}`}>{message}</p>}

                <div className="flex justify-end space-x-3 pt-3">
                  <button
                    type="submit"
                    className="w-full px-5 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-md text-sm font-semibold transition disabled:opacity-50"
                    disabled={message === "Sending..."} // Disable button while sending
                  >
                    {message === "Sending..." ? "Sending..." : "Send Inquiry"}
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default Home;