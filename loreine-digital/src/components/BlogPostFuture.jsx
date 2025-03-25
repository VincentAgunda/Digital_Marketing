import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom'; // Import Link

const BlogPostFuture = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="py-12"
    >
      <div className="max-w-3xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">The Future of Digital Marketing in 2025</h1>
        <p className="text-gray-700 mb-4">
          The digital marketing landscape is constantly evolving, and 2025 promises to bring even more exciting changes.
          Here's a glimpse into some of the key trends you should be aware of:
        </p>
        <ul className="list-disc list-inside text-gray-700 mb-4">
          <li><strong>AI-Powered Personalization:</strong> Artificial intelligence will play a more significant role in tailoring marketing messages to individual customer needs and preferences.</li>
          <li><strong>Immersive Experiences:</strong> Augmented reality (AR) and virtual reality (VR) will offer new ways for brands to engage with their audience.</li>
          <li><strong>Emphasis on Privacy:</strong> With increasing concerns about data privacy, marketers will need to focus on building trust and obtaining explicit consent.</li>
          <li><strong>Video Dominance:</strong> Video content will continue its upward trajectory, becoming an even more crucial format for communication and engagement.</li>
          <li><strong>The Rise of Short-Form Content:</strong> Platforms like TikTok and Instagram Reels have highlighted the power of concise and engaging short-form video.</li>
        </ul>
        <p className="text-gray-700 mb-6">
          Staying ahead of these trends will be essential for businesses looking to thrive in the digital age. By embracing new technologies and strategies, you can connect with your audience in more meaningful and effective ways.
        </p>
        <Link to="/blogs" className="text-pink-500 hover:text-pink-700 font-semibold">
          Back to Blogs
        </Link>
      </div>
    </motion.div>
  );
};

export default BlogPostFuture;