import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaSun, FaMoon } from "react-icons/fa"; // Import icons

// Font setup - Keep this consistent
const fontStyle = {
  fontFamily: "'SF Pro Display', -apple-system, BlinkMacSystemFont, sans-serif",
  fontWeight: 300
};

const BlogPage = () => {
  const [posts, setPosts] = useState([]);
  const [selectedPost, setSelectedPost] = useState(null);
  const [hoveredPost, setHoveredPost] = useState(null);
  const [darkMode, setDarkMode] = useState(true); // Add darkMode state

  // Sample blog data with expanded content (same as before)
  useEffect(() => {
    const placeholderPosts = [
      {
        id: 1,
        title: "The Future of Web Design in 2025",
        date: "April 12, 2025",
        author: "Dr. Elena Voss",
        image: "camera1.webp",
        excerpt: "How neural interfaces and quantum computing are reshaping digital experiences",
        content: `
          <h2 class="text-2xl font-light text-cyan-400 mb-4">The New Design Paradigm</h2>
          <p>As we approach 2025, web design is undergoing its most radical transformation since the advent of mobile. The convergence of several emerging technologies is creating entirely new canvas for digital experiences.</p>
          
          <h3 class="text-xl font-light mt-8 mb-4">Key Developments</h3>
          <ul class="space-y-3 mb-6">
            <li><strong class="text-blue-400">Neural Interface Design:</strong> With direct brain-computer interfaces becoming commercially viable, designers must now consider thought-driven navigation patterns and neural feedback loops.</li>
            <li><strong class="text-blue-400">Quantum Layout Systems:</strong> New CSS frameworks leverage quantum computing principles to generate dynamic, context-aware layouts that adapt to users' cognitive states.</li>
            <li><strong class="text-blue-400">Holographic UI Patterns:</strong> Spatial computing requires entirely new interaction models that account for depth, perspective, and physical space.</li>
          </ul>

          <div class="bg-gray-800/50 p-6 rounded-xl border border-gray-700 my-8">
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
          <h2 class="text-2xl font-light text-cyan-400 mb-4">Beyond Hooks: The New Frontier</h2>
          <p>React 19 introduces quantum-inspired component models that fundamentally change how we think about state management and rendering.</p>

          <h3 class="text-xl font-light mt-8 mb-4">Core Features</h3>
          <div class="grid md:grid-cols-2 gap-6 mb-8">
            <div class="bg-gray-800/50 p-4 rounded-lg">
              <h4 class="font-medium text-blue-400 mb-2">Superposition States</h4>
              <p class="text-sm">Components can now exist in multiple states simultaneously until observed by the user.</p>
            </div>
            <div class="bg-gray-800/50 p-4 rounded-lg">
              <h4 class="font-medium text-blue-400 mb-2">Entanglement Hooks</h4>
              <p class="text-sm">New useEntangle() hook creates instantaneous connections between distant components.</p>
            </div>
          </div>

          <h3 class="text-xl font-light mt-8 mb-4">Performance Benchmarks</h3>
          <p>Early tests show remarkable improvements:</p>
          <table class="w-full border-collapse mt-4 mb-8">
            <thead>
              <tr class="border-b border-gray-700">
                <th class="text-left py-2">Operation</th>
                <th class="text-right py-2">React 18</th>
                <th class="text-right py-2">React 19</th>
              </tr>
            </thead>
            <tbody>
              <tr class="border-b border-gray-800">
                <td class="py-2">Component Render</td>
                <td class="text-right">4.2ms</td>
                <td class="text-right text-green-400">0.7ms</td>
              </tr>
              <tr class="border-b border-gray-800">
                <td class="py-2">State Update</td>
                <td class="text-right">3.8ms</td>
                <td class="text-right text-green-400">0.3ms</td>
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
          <h2 class="text-2xl font-light text-cyan-400 mb-4">The Mind-Computer Continuum</h2>
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

          <div class="bg-gray-800/50 p-6 rounded-xl border border-gray-700 my-8">
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
            <li><strong class="text-blue-400">Privacy:</strong> Neural data is the most personal information imaginable</li>
            <li><strong class="text-blue-400">Accessibility:</strong> Not all users can or want to use neural interfaces</li>
            <li><strong class="text-blue-400">Addiction:</strong> The dopamine effects of direct mind-computer interaction</li>
          </ul>

          <p class="mt-8">The next decade will see neural design become its own specialized discipline within UX.</p>
        `,
        tags: ["Neural", "UX", "Ethics"]
      }
    ];
    setPosts(placeholderPosts);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      // Apply theme-based background and text color to the main container
      className={`min-h-screen transition-colors duration-500 ${darkMode ? "bg-gray-950 text-gray-100" : "bg-white text-gray-900"}`}
      style={fontStyle}
    >
      {/* Theme Toggle */}
      <div className="max-w-7xl mx-auto py-4 px-4 md:px-8 flex justify-end">
         <button
            onClick={() => setDarkMode((prev) => !prev)}
            className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm transition-all ${darkMode ? "bg-gray-700 hover:bg-gray-600 text-white" : "bg-gray-200 hover:bg-gray-300 text-gray-800"}`}
          >
            {darkMode ? <FaSun /> : <FaMoon />}
            {darkMode ? "Light Mode" : "Dark Mode"}
          </button>
      </div>

      {/* Futuristic header */}
      <div className="relative overflow-hidden">
        {/* Background effect changes slightly with theme */}
        <div className={`absolute inset-0 ${darkMode ? "bg-[radial-gradient(circle_at_center,_rgba(34,211,238,0.1)_0%,_transparent_70%)] opacity-30" : "bg-[radial-gradient(circle_at_center,_rgba(59,130,246,0.1)_0%,_transparent_70%)] opacity-20"}`}></div>
        <div className="container mx-auto px-6 py-10 md:py-16 relative z-10"> {/* Adjusted padding */}
          <motion.h1
            className={`text-5xl md:text-6xl font-light text-center mb-4 tracking-tight ${darkMode ? "text-gray-100" : "text-gray-900"}`} // Theme-based text color
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">Quantum</span> Insights
          </motion.h1>
          <motion.p
            // Theme-based text color for description
            className={`text-xl text-center max-w-2xl mx-auto ${darkMode ? "text-gray-400" : "text-gray-600"}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            Exploring the bleeding edge of digital innovation
          </motion.p>
        </div>
      </div>

      {/* Blog grid */}
      <div className="container mx-auto px-6 pb-20">
        {!selectedPost ? (
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.1
                }
              }
            }}
          >
            {posts.map((post) => (
              <motion.article
                key={post.id}
                // Theme-based border and background on hover
                className={`group relative overflow-hidden rounded-xl transition-all duration-300 ${darkMode ? "border border-gray-800 hover:border-cyan-400/30" : "border border-gray-200 hover:border-blue-400/30 bg-white hover:bg-gray-50"}`}
                variants={{
                  hidden: { y: 20, opacity: 0 },
                  visible: { y: 0, opacity: 1 }
                }}
                whileHover={{ y: -5 }}
                onMouseEnter={() => setHoveredPost(post.id)}
                onMouseLeave={() => setHoveredPost(null)}
                onClick={() => setSelectedPost(post)}
              >
                {/* Holographic effect changes slightly with theme */}
                {hoveredPost === post.id && (
                  <div className={`absolute inset-0 ${darkMode ? "bg-[radial-gradient(circle_at_center,_rgba(34,211,238,0.05)_0%,_transparent_70%)]" : "bg-[radial-gradient(circle_at_center,_rgba(59,130,246,0.05)_0%,_transparent_70%)]"} pointer-events-none`}></div>
                )}

                <div className="aspect-[4/3] overflow-hidden relative">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                   {/* Gradient overlay changes slightly with theme */}
                  <div className={`absolute inset-0 ${darkMode ? "bg-gradient-to-t from-gray-950/80" : "bg-gradient-to-t from-white/80"} via-transparent to-transparent`}></div>
                </div>

                <div className="p-6">
                  <div className="flex flex-wrap gap-2 mb-3">
                    {post.tags.map(tag => (
                      // Theme-based tag style
                      <span key={tag} className={`text-xs px-2 py-1 rounded-full ${darkMode ? "bg-gray-800 text-cyan-400" : "bg-gray-200 text-blue-600"}`}>
                        {tag}
                      </span>
                    ))}
                  </div>
                  {/* Theme-based title text color */}
                  <h3 className={`text-xl font-medium mb-2 ${darkMode ? "text-gray-100" : "text-gray-900"}`}>{post.title}</h3>
                   {/* Theme-based excerpt text color */}
                  <p className={`text-sm mb-4 ${darkMode ? "text-gray-400" : "text-gray-700"}`}>{post.excerpt}</p>
                   {/* Theme-based date and link text color */}
                  <div className={`flex justify-between items-center text-sm ${darkMode ? "text-gray-500" : "text-gray-500"}`}>
                    <span>{post.date}</span>
                    <span className={`group-hover:${darkMode ? "text-white" : "text-blue-600"} transition-colors`}>
                      Read ↗
                    </span>
                  </div>
                </div>
              </motion.article>
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
                // Theme-based back button color
                onClick={() => setSelectedPost(null)}
                className={`flex items-center mb-8 transition-colors ${darkMode ? "text-cyan-400 hover:text-white" : "text-blue-600 hover:text-blue-800"}`}
                whileHover={{ x: -3 }}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="mr-2">
                  <path d="M19 12H5M12 19l-7-7 7-7" strokeWidth="2" strokeLinecap="round"/>
                </svg>
                All Articles
              </motion.button>

              <motion.header
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.1 }}
              >
                <div className="flex flex-wrap gap-2 mb-4">
                  {selectedPost.tags.map(tag => (
                     // Theme-based tag style
                    <span key={tag} className={`text-xs px-2 py-1 rounded-full ${darkMode ? "bg-gray-800 text-cyan-400" : "bg-gray-200 text-blue-600"}`}>
                      {tag}
                    </span>
                  ))}
                </div>
                 {/* Theme-based title text color */}
                <h2 className={`text-3xl md:text-4xl font-light mb-4 leading-tight ${darkMode ? "text-gray-100" : "text-gray-900"}`}>
                  {selectedPost.title}
                </h2>
                 {/* Theme-based author/date text color */}
                <p className={`mb-6 ${darkMode ? "text-gray-400" : "text-gray-600"}`}>By {selectedPost.author} · {selectedPost.date}</p>
              </motion.header>

              <motion.div
                className="aspect-[16/9] rounded-xl overflow-hidden mb-8 relative"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                <img
                  src={selectedPost.image}
                  alt={selectedPost.title}
                  className="w-full h-full object-cover"
                />
                 {/* Gradient overlay changes slightly with theme */}
                <div className={`absolute inset-0 ${darkMode ? "bg-gradient-to-t from-gray-950/30" : "bg-gradient-to-t from-white/30"} via-transparent to-transparent`}></div>
              </motion.div>

              <motion.div
                 // Use theme-based prose styles (requires @tailwindcss/typography plugin)
                className={`prose max-w-none ${darkMode ? "prose-invert" : ""}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                dangerouslySetInnerHTML={{ __html: selectedPost.content }}
              />

              {/* Article footer */}
              <motion.div
                // Theme-based border color
                className={`mt-16 pt-8 ${darkMode ? "border-t border-gray-800" : "border-t border-gray-200"}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                 {/* Theme-based text color */}
                <h3 className={`text-lg font-medium mb-4 ${darkMode ? "text-gray-100" : "text-gray-900"}`}>About the Author</h3>
                <div className="flex items-center gap-4">
                   {/* Theme-based avatar background */}
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center text-xl ${darkMode ? "bg-gray-800 text-gray-300" : "bg-gray-200 text-gray-700"}`}>
                    {selectedPost.author.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                     {/* Theme-based author name color */}
                    <p className={`font-medium ${darkMode ? "text-gray-100" : "text-gray-900"}`}>{selectedPost.author}</p>
                     {/* Theme-based author title color */}
                    <p className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-600"}`}>Senior Researcher at NeuroTech Labs</p>
                  </div>
                </div>

                <div className="mt-8 flex gap-4">
                  <button
                     // Theme-based button styles
                    className={`px-4 py-2 rounded-lg transition-colors ${darkMode ? "border border-gray-700 hover:bg-gray-800/50 text-gray-100" : "border border-gray-300 hover:bg-gray-100 text-gray-800"}`}
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="inline mr-2">
                      <path d="M4 12v8a2 2 0 002 2h12a2 2 0 002-2v-8M16 6l-4-4-4 4M12 2v13" strokeWidth="2"/>
                    </svg>
                    Save
                  </button>
                  <button
                     // Theme-based button styles
                     className={`px-4 py-2 rounded-lg transition-colors ${darkMode ? "border border-gray-700 hover:bg-gray-800/50 text-gray-100" : "border border-gray-300 hover:bg-gray-100 text-gray-800"}`}
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="inline mr-2">
                      <path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 01-3.46 0" strokeWidth="2"/>
                    </svg>
                    Share
                  </button>
                </div>
              </motion.div>
            </motion.article>
          </AnimatePresence>
        )}
      </div>
    </motion.div>
  );
};

export default BlogPage;