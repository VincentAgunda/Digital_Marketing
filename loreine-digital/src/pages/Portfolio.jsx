import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

const pageAnimation = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
  transition: { duration: 0.5 },
};

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

const BlogPage = () => {
  const [posts, setPosts] = useState([]);
  const [selectedPost, setSelectedPost] = useState(null);

  // --- Placeholder Blog Post Data (Replace with your actual content fetching) ---
  useEffect(() => {
    // In a real application, you would fetch this data from an API or CMS
    const placeholderPosts = [
      {
        id: 1,
        title: "The Evolution of Web Design in 2025",
        date: "Apr 12, 2025",
        author: "Jane Doe",
        image: "camera2.webp", // **** ACTION NEEDED: Update these image paths ****
        content: `
          <p>The web design landscape is constantly shifting, and 2025 promises to bring even more exciting changes. From the rise of immersive experiences to the increasing importance of accessibility, here's what you need to know.</p>
          <h2>Key Trends to Watch</h2>
          <ul>
            <li><strong>Neobrutalism:</strong> Bold typography and raw, unpolished aesthetics are making a comeback.</li>
            <li><strong>Immersive Experiences:</strong> Expect more interactive 3D elements and WebGL integrations.</li>
            <li><strong>Accessibility First:</strong> Designing for inclusivity will be paramount, not an afterthought.</li>
            <li><strong>Privacy-Focused Design:</strong> Users are more aware of their data, leading to designs that prioritize privacy.</li>
          </ul>
          <p>Stay ahead of the curve by embracing these trends in your next web project!</p>
        `,
      },
      {
        id: 2,
        title: "React Hooks: A Deep Dive into useState",
        date: "Apr 05, 2025",
        author: "John Smith",
        image: "camera3.webp", // **** ACTION NEEDED: Update these image paths ****
        content: `
          <p>React Hooks revolutionized functional components, and <code>useState</code> is one of the most fundamental hooks. Let's take a closer look at how it works and how you can leverage it effectively.</p>
          <h3>Understanding useState</h3>
          <p>The <code>useState</code> hook allows you to add state to your functional components. It returns an array with two elements: the current state value and a function to update it.</p>
          <pre><code>
            const [count, setCount] = useState(0);
          </code></pre>
          <p>In this example, <code>count</code> is the state variable, initialized to 0, and <code>setCount</code> is the function used to modify the <code>count</code>.</p>
          <h3>Best Practices</h3>
          <ul>
            <li>Initialize state with the correct data type.</li>
            <li>Use the update function to modify state, not direct assignment.</li>
            <li>Be mindful of performance when dealing with complex state.</li>
          </ul>
          <p>Mastering <code>useState</code> is crucial for building dynamic and interactive React applications.</p>
        `,
      },
      {
        id: 3,
        title: "The Power of Headless CMS for Modern Websites",
        date: "Mar 29, 2025",
        author: "Alice Johnson",
        image: "camera1.webp", // **** ACTION NEEDED: Update these image paths ****
        content: `
          <p>Traditional CMS platforms can sometimes feel monolithic and restrictive. Headless CMS offers a more flexible approach by decoupling the content management from the presentation layer.</p>
          <h2>Benefits of Headless CMS</h2>
          <ul>
            <li><strong>Flexibility:</strong> Choose any front-end framework you prefer (React, Vue, Angular, etc.).</li>
            <li><strong>Performance:</strong> Faster loading times as the front-end is decoupled.</li>
            <li><strong>Security:</strong> Reduced attack surface compared to traditional CMS.</li>
            <li><strong>Scalability:</strong> Easier to scale the front-end and back-end independently.</li>
          </ul>
          <p>If you're looking for a modern and scalable solution for your website, consider exploring the world of headless CMS.</p>
        `,
      },
    ];
    setPosts(placeholderPosts);
  }, []);

  const showPost = (post) => {
    setSelectedPost(post);
  };

  const goBack = () => {
    setSelectedPost(null);
  };

  return (
    <motion.div
      {...pageAnimation}
      className="bg-black text-gray-300 min-h-screen py-12 md:py-20 px-6 md:px-12 lg:px-24"
    >
      <motion.h1
        className="text-4xl font-bold text-white text-center mb-8"
        {...fadeIn}
      >
        Our Latest Insights
      </motion.h1>

      {!selectedPost ? (
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          {...fadeIn}
          transition={{ delay: 0.2 }}
        >
          {posts.map((post) => (
            <motion.div
              key={post.id}
              className="bg-gray-900 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 cursor-pointer"
              onClick={() => showPost(post)}
              {...slideInFromBottom}
              transition={{ delay: 0.3 + posts.indexOf(post) * 0.1 }}
            >
              <div className="relative aspect-video overflow-hidden">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent opacity-70">
                  <div className="p-4">
                    <h3 className="text-lg font-semibold text-white mb-1">{post.title}</h3>
                    <p className="text-gray-400 text-sm">{post.date}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      ) : (
        <motion.div
          className="max-w-3xl mx-auto bg-gray-900 rounded-lg shadow-xl p-8"
          {...fadeIn}
        >
          <motion.button
            onClick={goBack}
            className="text-indigo-400 hover:text-indigo-300 transition-colors mb-4 inline-flex items-center"
          >
            &larr; Back to All Posts
          </motion.button>
          <motion.h2 className="text-3xl font-bold text-white mb-4">{selectedPost.title}</motion.h2>
          <p className="text-gray-400 mb-2">Published on: {selectedPost.date} by {selectedPost.author}</p>
          <div className="relative aspect-video overflow-hidden rounded-md mb-6">
            <img
              src={selectedPost.image}
              alt={selectedPost.title}
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </div>
          <div
            className="text-gray-300 leading-relaxed"
            dangerouslySetInnerHTML={{ __html: selectedPost.content }}
          />
        </motion.div>
      )}
    </motion.div>
  );
};

export default BlogPage;