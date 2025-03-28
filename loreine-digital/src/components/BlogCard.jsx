import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase";
import { FaHeart } from "react-icons/fa";

const BlogCard = ({ blog }) => {
  const [likes, setLikes] = useState(blog.likes || 0);
  const [liked, setLiked] = useState(false);

  // Format the timestamp to a readable date
  const formatDate = (timestamp) => {
    if (!timestamp) return "Unknown Date";
    const date = timestamp.toDate();
    return new Intl.DateTimeFormat("en-US", { dateStyle: "medium" }).format(date);
  };

  // Handle like functionality
  const handleLike = async () => {
    if (!liked) {
      const blogRef = doc(db, "blogs", blog.id);
      await updateDoc(blogRef, { likes: likes + 1 });
      setLikes((prev) => prev + 1);
      setLiked(true);
    }
  };

  return (
    <motion.div
      className="bg-white rounded-lg shadow-md overflow-hidden"
      whileHover={{ scale: 1.03 }}
    >
      {/* Blog Image */}
      <img src={blog.imageUrl || "/default-blog.jpg"} alt={blog.title} className="w-full h-48 object-cover" />

      {/* Blog Content */}
      <div className="p-6">
        <div className="flex justify-between items-center text-gray-500 text-sm mb-2">
          <span>Admin</span>
          <span>{formatDate(blog.timestamp)}</span>
        </div>

        {/* Blog Title (Hover Effect) */}
        <h2 className="text-xl font-semibold text-gray-700 mb-2 hover:text-orange-500 transition duration-200">
          {blog.title}
        </h2>

        {/* Blog Excerpt */}
        <p className="text-gray-600 text-sm mb-4">
          {blog.content.replace(/(<([^>]+)>)/gi, "").slice(0, 100)}...
        </p>

        {/* Read More & Like Section */}
        <div className="flex justify-between items-center">
          <Link to={`/blog/${blog.id}`} className="text-pink-500 hover:text-pink-700 font-semibold">
            Read More
          </Link>

          <button className="flex items-center text-gray-600 hover:text-red-500 transition" onClick={handleLike}>
            <FaHeart className={`${liked ? "text-red-500" : ""} mr-1`} />
            {likes}
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default BlogCard;
