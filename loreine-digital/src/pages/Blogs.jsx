import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaSun, FaMoon, FaChevronLeft, FaBookmark, FaShare } from "react-icons/fa";

// Animation variants matching pricing page
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

// Sample blog data (same as original)
const BLOG_POSTS = [
  {
    id: 1,
    title: "The Future of Web Design in 2025",
    date: "April 12, 2025",
    author: "Dr. Elena Voss",
    image: "camera1.webp",
    excerpt: "How neural interfaces and quantum computing are reshaping digital experiences",
    content: `
      <h2 class="text-2xl font-light mb-4">The New Design Paradigm</h2>
      <p>As we approach 2025, web design is undergoing its most radical transformation since the advent of mobile. The convergence of several emerging technologies is creating entirely new canvas for digital experiences.</p>
      
      <h3 class="text-xl font-light mt-8 mb-4">Key Developments</h3>
      <ul class="space-y-3 mb-6">
        <li><strong>Neural Interface Design:</strong> With direct brain-computer interfaces becoming commercially viable, designers must now consider thought-driven navigation patterns and neural feedback loops.</li>
        <li><strong>Quantum Layout Systems:</strong> New CSS frameworks leverage quantum computing principles to generate dynamic, context-aware layouts that adapt to users' cognitive states.</li>
        <li><strong>Holographic UI Patterns:</strong> Spatial computing requires entirely new interaction models that account for depth, perspective, and physical space.</li>
      </ul>

      <div class="p-6 rounded-xl border my-8">
        <h4 class="text-lg font-medium mb-3">Case Study: Tesla's Neural Dashboard</h4>
        <p>Tesla's 2025 vehicle interface demonstrates how thought-controlled navigation reduces cognitive load by 47% compared to traditional touchscreens.</p>
      </div>

      <h3 class="text-xl font-light mt-8 mb-4">Implementation Challenges</h3>
      <p>While exciting, these new paradigms present significant challenges:</p>
      <ol class="list-decimal list-inside space-y-2 mt-3">
        <li>Ethical considerations around neural data privacy</li>
        <li>Cross-platform compatibility in a fragmented spatial computing market</li>
        <li>Accessibility requirements for users without neural implants</li>
      </ol>

      <p class="mt-8">The designers who will thrive in this new era are those who can blend technical understanding with deep empathy for human cognition.</p>
    `,
    tags: ["Design", "Future Tech", "UX"]
  },
  {
    id: 2,
    title: "React 19: The Quantum Component Revolution",
    date: "April 5, 2025",
    author: "Mark Chen",
    image: "camera1.webp",
    excerpt: "How quantum principles are transforming component architecture",
    content: `
      <h2 class="text-2xl font-light mb-4">Beyond Hooks: The New Frontier</h2>
      <p>React 19 introduces quantum-inspired component models that fundamentally change how we think about state management and rendering.</p>

      <h3 class="text-xl font-light mt-8 mb-4">Core Features</h3>
      <div class="grid md:grid-cols-2 gap-6 mb-8">
        <div class="p-4 rounded-lg">
          <h4 class="font-medium mb-2">Superposition States</h4>
          <p class="text-sm">Components can now exist in multiple states simultaneously until observed by the user.</p>
        </div>
        <div class="p-4 rounded-lg">
          <h4 class="font-medium mb-2">Entanglement Hooks</h4>
          <p class="text-sm">New useEntangle() hook creates instantaneous connections between distant components.</p>
        </div>
      </div>

      <h3 class="text-xl font-light mt-8 mb-4">Performance Benchmarks</h3>
      <p>Early tests show remarkable improvements:</p>
      <table class="w-full border-collapse mt-4 mb-8">
        <thead>
          <tr class="border-b">
            <th class="text-left py-2">Operation</th>
            <th class="text-right py-2">React 18</th>
            <th class="text-right py-2">React 19</th>
          </tr>
        </thead>
        <tbody>
          <tr class="border-b">
            <td class="py-2">Component Render</td>
            <td class="text-right">4.2ms</td>
            <td class="text-right">0.7ms</td>
          </tr>
          <tr class="border-b">
            <td class="py-2">State Update</td>
            <td class="text-right">3.8ms</td>
            <td class="text-right">0.3ms</td>
          </tr>
        </tbody>
      </table>

      <h3 class="text-xl font-light mt-8 mb-4">Migration Path</h3>
      <p>For teams considering adoption:</p>
      <ul class="space-y-3">
        <li>Start with non-critical components to test quantum behavior</li>
        <li>Use the new Quantum DevTools extension for debugging</li>
        <li>Expect a 2-3 week learning curve for senior developers</li>
      </ul>
    `,
    tags: ["React", "Quantum", "Performance"]
  },
  {
    id: 3,
    title: "Neural Interface Design Patterns",
    date: "March 29, 2025",
    author: "Sarah Nakamura",
    image: "camera4.webp",
    excerpt: "Principles for designing thought-controlled interfaces",
    content: `
      <h2 class="text-2xl font-light mb-4">The Mind-Computer Continuum</h2>
      <p>Neural interfaces have moved beyond medical applications into mainstream computing, requiring entirely new design patterns.</p>

      <h3 class="text-xl font-light mt-8 mb-4">Core Principles</h3>
      <div class="space-y-6 mb-8">
        <div>
          <h4 class="font-medium text-lg mb-2">1. Cognitive Load Management</h4>
          <p>Thought-controlled interfaces must account for the "mental weight" of commands. Best practices include:</p>
          <ul class="list-disc list-inside mt-2 space-y-1">
            <li>Implementing neural command queuing</li>
            <li>Providing subconscious feedback loops</li>
            <li>Limiting choice paralysis through progressive disclosure</li>
          </ul>
        </div>
        <div>
          <h4 class="font-medium text-lg mb-2">2. Intent Decoupling</h4>
          <p>Unlike physical interfaces, neural inputs often contain multiple simultaneous intentions. Effective designs:</p>
          <ul class="list-disc list-inside mt-2 space-y-1">
            <li>Separate primary from secondary neural signals</li>
            <li>Implement probabilistic interaction models</li>
            <li>Provide clear "intention confirmation" states</li>
          </ul>
        </div>
      </div>

      <div class="p-6 rounded-xl border my-8">
        <h4 class="text-lg font-medium mb-3">Real-World Example: Facebook's MindScroll</h4>
        <p>Facebook's neural scrolling implementation reduced accidental activations by 72% through:</p>
        <ul class="list-disc list-inside mt-2 space-y-1">
          <li>Dual-layer intent verification</li>
          <li>Micro-calibration during use</li>
          <li>Context-aware sensitivity adjustment</li>
        </ul>
      </div>

      <h3 class="text-xl font-light mt-8 mb-4">Ethical Considerations</h3>
      <p>Designers must navigate complex new territory:</p>
      <ul class="space-y-3">
        <li><strong>Privacy:</strong> Neural data is the most personal information imaginable</li>
        <li><strong>Accessibility:</strong> Not all users can or want to use neural interfaces</li>
        <li><strong>Addiction:</strong> The dopamine effects of direct mind-computer interaction</li>
      </ul>

      <p class="mt-8">The next decade will see neural design become its own specialized discipline within UX.</p>
    `,
    tags: ["Neural", "UX", "Ethics"]
  }
];

const BlogPage = () => {
  const [posts, setPosts] = useState([]);
  const [selectedPost, setSelectedPost] = useState(null);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    setPosts(BLOG_POSTS);
  }, []);

  return (
    <section className={`${darkMode ? "bg-black" : "bg-white"} min-h-screen transition-colors duration-500`}>
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

        {/* Hero Section */}
        <motion.div 
          className="text-center mb-24"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.h1
            className={`text-4xl md:text-5xl font-medium mb-6 ${darkMode ? "text-white" : "text-gray-900"}`}
            variants={fadeInUp}
          >
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
              Nexture Insights
            </span>
          </motion.h1>
          <motion.p
            className={`text-xl max-w-2xl mx-auto ${darkMode ? "text-white/80" : "text-gray-700"}`}
            variants={fadeInUp}
            transition={{ delay: 0.2 }}
          >
            Exploring the bleeding edge of digital innovation
          </motion.p>
        </motion.div>

        {/* Blog Posts */}
        {!selectedPost ? (
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.1
                }
              }
            }}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            {posts.map((post) => (
              <motion.div
                key={post.id}
                variants={staggerItem}
                className={`rounded-[30px] overflow-hidden ${darkMode ? "bg-gray-900/50 border border-gray-800" : "bg-white border border-gray-200"} transition-all duration-300 hover:shadow-xl flex flex-col`}
                whileHover={{ y: -5 }}
              >
                <div className="aspect-[4/3] overflow-hidden cursor-pointer" onClick={() => setSelectedPost(post)}>
                  <img 
                    src={post.image} 
                    alt={post.title}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-6 flex-grow">
                  <div className="flex flex-wrap gap-2 mb-4">
                    {post.tags.map(tag => (
                      <span 
                        key={tag}
                        className={`text-xs px-2 py-1 rounded-full ${darkMode ? "bg-gray-800 text-cyan-400" : "bg-gray-100 text-blue-600"}`}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <h3 className={`text-xl font-medium mb-2 ${darkMode ? "text-white" : "text-gray-900"}`}>
                    {post.title}
                  </h3>
                  <p className={`text-sm mb-4 ${darkMode ? "text-white/80" : "text-gray-700"}`}>
                    {post.excerpt}
                  </p>
                  <div className={`text-sm ${darkMode ? "text-gray-500" : "text-gray-500"}`}>
                    {post.date}
                  </div>
                </div>
                <div 
                  className={`px-6 pb-6 pt-2 flex justify-end ${darkMode ? "text-cyan-400" : "text-blue-600"}`}
                >
                  <button 
                    onClick={() => setSelectedPost(post)}
                    className="flex items-center gap-1 hover:gap-2 transition-all"
                  >
                    Read more
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <AnimatePresence>
            <motion.article
              className="max-w-4xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
            >
              <motion.button
                onClick={() => setSelectedPost(null)}
                className={`flex items-center mb-8 ${darkMode ? "text-cyan-400 hover:text-white" : "text-blue-600 hover:text-blue-800"}`}
                whileHover={{ x: -3 }}
              >
                <FaChevronLeft className="mr-2" />
                All Articles
              </motion.button>

              <motion.header
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.1 }}
              >
                <div className="flex flex-wrap gap-2 mb-4">
                  {selectedPost.tags.map(tag => (
                    <span 
                      key={tag}
                      className={`text-xs px-2 py-1 rounded-full ${darkMode ? "bg-gray-800 text-cyan-400" : "bg-gray-100 text-blue-600"}`}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <h2 className={`text-3xl md:text-4xl font-medium mb-4 ${darkMode ? "text-white" : "text-gray-900"}`}>
                  {selectedPost.title}
                </h2>
                <p className={`mb-6 ${darkMode ? "text-white/80" : "text-gray-700"}`}>
                  By {selectedPost.author} · {selectedPost.date}
                </p>
              </motion.header>

              <motion.div
                className="aspect-[16/9] rounded-xl overflow-hidden mb-8 bg-gray-200 dark:bg-gray-800"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                <img
                  src={selectedPost.image}
                  alt={selectedPost.title}
                  className="w-full h-full object-cover"
                />
              </motion.div>

              <motion.div
                className={`prose max-w-none ${darkMode ? "prose-invert" : ""}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                dangerouslySetInnerHTML={{ __html: selectedPost.content
                  .replace(/class="text-2xl font-light mb-4"/g, `class="${darkMode ? "text-cyan-400" : "text-blue-600"} text-2xl font-medium mb-4"`)
                  .replace(/class="text-xl font-light mt-8 mb-4"/g, `class="${darkMode ? "text-white" : "text-gray-900"} text-xl font-medium mt-8 mb-4"`)
                  .replace(/class="p-6 rounded-xl border my-8"/g, `class="${darkMode ? "bg-gray-800/50 border-gray-700" : "bg-gray-100 border-gray-200"} p-6 rounded-xl border my-8"`)
                  .replace(/class="p-4 rounded-lg"/g, `class="${darkMode ? "bg-gray-800/50 border border-gray-700" : "bg-gray-100 border border-gray-200"} p-4 rounded-lg"`)
                  .replace(/class="font-medium mb-2"/g, `class="${darkMode ? "text-cyan-400" : "text-blue-600"} font-medium mb-2"`)
                  .replace(/class="border-b"/g, `class="border-b ${darkMode ? "border-gray-700" : "border-gray-200"}"`)
                }}
              />

              <motion.div
                className={`mt-16 pt-8 ${darkMode ? "border-t border-gray-800" : "border-t border-gray-200"}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                <h3 className={`text-lg font-medium mb-4 ${darkMode ? "text-white" : "text-gray-900"}`}>
                  About the Author
                </h3>
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center text-xl ${darkMode ? "bg-gray-800 text-gray-300" : "bg-gray-200 text-gray-700"}`}>
                    {selectedPost.author.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <p className={`font-medium ${darkMode ? "text-white" : "text-gray-900"}`}>
                      {selectedPost.author}
                    </p>
                    <p className={`text-sm ${darkMode ? "text-white/80" : "text-gray-700"}`}>
                      Senior Researcher at NeuroTech Labs
                    </p>
                  </div>
                </div>

                <div className="mt-8 flex gap-4">
                  <button
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg ${darkMode ? "bg-gray-800 hover:bg-gray-700 text-white" : "bg-gray-100 hover:bg-gray-200 text-gray-800"}`}
                  >
                    <FaBookmark />
                    Save
                  </button>
                  <button
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg ${darkMode ? "bg-gray-800 hover:bg-gray-700 text-white" : "bg-gray-100 hover:bg-gray-200 text-gray-800"}`}
                  >
                    <FaShare />
                    Share
                  </button>
                </div>
              </motion.div>
            </motion.article>
          </AnimatePresence>
        )}
      </div>
    </section>
  );
};

export default BlogPage;