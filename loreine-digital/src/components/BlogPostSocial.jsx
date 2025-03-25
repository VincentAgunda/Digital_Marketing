import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom'; // Import Link

const BlogPostSocial = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="py-12"
    >
      <div className="max-w-3xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">The Power of Social Media Engagement</h1>
        <p className="text-gray-700 mb-4">
          Social media platforms offer unparalleled opportunities for brands to connect with their audience, build communities, and drive engagement. Here's why social media engagement is so powerful and how you can improve it:
        </p>
        <ul className="list-disc list-inside text-gray-700 mb-4">
          <li><strong>Build Brand Awareness:</strong> Active engagement increases your visibility and helps more people discover your brand.</li>
          <li><strong>Foster Community:</strong> Responding to comments, messages, and participating in conversations helps build a loyal community around your brand.</li>
          <li><strong>Gain Valuable Feedback:</strong> Social media provides a direct channel for customers to share their opinions and feedback.</li>
          <li><strong>Drive Website Traffic:</strong> Engaging content and strategic calls-to-action can drive traffic to your website.</li>
          <li><strong>Improve Customer Loyalty:</strong> Prompt and helpful responses to customer inquiries can significantly improve satisfaction and loyalty.</li>
          <li><strong>Enhance Brand Reputation:</strong> Positive interactions and addressing concerns publicly can enhance your brand's reputation.</li>
        </ul>
        <p className="text-gray-700 mb-6">
          To boost social media engagement, focus on creating valuable and interesting content, responding promptly and authentically to your audience, running interactive campaigns, and fostering a sense of community.
        </p>
        <Link to="/blogs" className="text-pink-500 hover:text-pink-700 font-semibold">
          Back to Blogs
        </Link>
      </div>
    </motion.div>
  );
};

export default BlogPostSocial;