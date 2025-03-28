import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";
import { motion } from "framer-motion";
import parse from "html-react-parser";

const BlogDetails = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    const fetchBlog = async () => {
      try {
        const docSnap = await getDoc(doc(db, "blogs", id));
        if (docSnap.exists()) {
          setBlog({
            ...docSnap.data(),
            createdAt: docSnap.data().createdAt?.toDate() || null,
          });
        } else {
          setError("Blog not found");
        }
      } catch (err) {
        setError("Failed to load blog");
        console.error("Error:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchBlog();
  }, [id]);

  const formatDate = (date) => {
    return date ? new Intl.DateTimeFormat("en-US", { 
      month: "short", 
      day: "numeric", 
      year: "numeric" 
    }).format(date) : "Date not available";
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-40">
        <p className="text-gray-500">Loading blog post...</p>
      </div>
    );
  }

  if (error || !blog) {
    return (
      <div className="flex justify-center items-center h-40">
        <p className="text-gray-500">{error || "Blog not found"}</p>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
      className="max-w-2xl mx-auto px-3 py-6"
    >
      {/* Blog Image */}
      <motion.img
        src={blog.imageUrl || "/default-blog.jpg"}
        alt={blog.title}
        className="w-full h-48 sm:h-56 object-cover rounded-md mb-4 shadow-sm"
        whileHover={{ scale: 1.01 }}
      />

      {/* Blog Metadata */}
      <div className="flex items-center justify-between mb-3">
        <p className="text-xs text-gray-500">{formatDate(blog.createdAt)}</p>
        {blog.category && (
          <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
            {blog.category}
          </span>
        )}
      </div>

      {/* Blog Title */}
      <h1 className="text-2xl font-bold text-gray-800 mb-3 leading-tight">
        {blog.title}
      </h1>

      {/* Blog Content */}
      <div className="prose-sm max-w-none text-gray-600">
        {parse(blog.content)}
      </div>

      {/* Author Info (if available) */}
      {blog.author && (
        <div className="mt-6 pt-4 border-t border-gray-100 flex items-center">
          <div className="flex-shrink-0">
            <img
              src={blog.author.avatar || "/default-avatar.jpg"}
              alt={blog.author.name}
              className="h-8 w-8 rounded-full"
            />
          </div>
          <div className="ml-3">
            <p className="text-sm font-medium text-gray-700">
              {blog.author.name}
            </p>
            {blog.author.bio && (
              <p className="text-xs text-gray-500">{blog.author.bio}</p>
            )}
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default BlogDetails;