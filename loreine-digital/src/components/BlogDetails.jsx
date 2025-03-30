import React, { useEffect, useState, useCallback } from "react";
import { useParams } from "react-router-dom";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../firebase";
import { motion } from "framer-motion";
import parse from "html-react-parser";
import PaystackPayment from "../utils/PaystackPayment"; 
import { useAuth } from "../auth/AuthContext";

const BlogDetails = () => {
  const { id } = useParams();
  const { currentUser } = useAuth();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [hasPaid, setHasPaid] = useState(false);

  const fetchBlog = useCallback(async () => {
    try {
      const docRef = doc(db, "blogs", id);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const blogData = docSnap.data();
        setBlog({
          ...blogData,
          createdAt: blogData.createdAt?.toDate() || null,
        });

        if (blogData.paidUsers?.includes(currentUser?.uid)) {
          setHasPaid(true);
        }
      } else {
        setError("Blog not found");
      }
    } catch (err) {
      setError("Failed to load blog");
      console.error("Error:", err);
    } finally {
      setLoading(false);
    }
  }, [id, currentUser?.uid]);

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchBlog();
  }, [fetchBlog]);

  const handlePaymentSuccess = async () => {
    setHasPaid(true);
    try {
      const blogRef = doc(db, "blogs", id);
      await updateDoc(blogRef, {
        paidUsers: [...(blog.paidUsers || []), currentUser.uid],
      });
    } catch (err) {
      console.error("Error updating payment status:", err);
    }
  };

  const formatDate = (date) => {
    return date
      ? new Intl.DateTimeFormat("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric",
        }).format(date)
      : "Date not available";
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[300px]">
        <div className="animate-pulse flex space-x-4">
          <div className="flex-1 space-y-4 py-1">
            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
            <div className="space-y-2">
              <div className="h-4 bg-gray-200 rounded"></div>
              <div className="h-4 bg-gray-200 rounded w-5/6"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !blog) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[300px] text-center p-6">
        <div className="bg-red-50 p-4 rounded-lg max-w-md">
          <svg
            className="w-10 h-10 mx-auto text-red-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <h3 className="mt-2 text-lg font-medium text-red-800">{error || "Blog not found"}</h3>
          <p className="mt-1 text-sm text-red-600">
            {error ? "Please try again later" : "The blog you're looking for doesn't exist"}
          </p>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8"
    >
      {/* Hero Section */}
      <div className="mb-8">
        <motion.img
          src={blog.imageUrl || "/background3.webp"}
          alt={blog.title}
          className="w-full h-64 sm:h-80 md:h-96 object-cover rounded-xl shadow-lg mb-6"
          loading="lazy"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        />

        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
          <div className="flex items-center space-x-2 mb-3 sm:mb-0">
            {blog.category && (
              <span className="px-3 py-1 text-xs font-semibold bg-indigo-100 text-indigo-800 rounded-full">
                {blog.category}
              </span>
            )}
            <span className="text-sm text-gray-500">
              {formatDate(blog.createdAt)}
            </span>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-500">
              {blog.readTime || '5 min'} read
            </span>
          </div>
        </div>

        <motion.h1 
          className="text-3xl sm:text-4xl font-bold text-gray-900 leading-tight mb-4"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          {blog.title}
        </motion.h1>

        {blog.subtitle && (
          <motion.p 
            className="text-xl text-gray-600 mb-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            {blog.subtitle}
          </motion.p>
        )}
      </div>

      {/* Payment Section */}
      {!hasPaid ? (
        <motion.div 
          className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-xl shadow-sm mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <div className="text-center max-w-lg mx-auto">
            <div className="flex justify-center mb-4">
              <div className="bg-white p-3 rounded-full shadow-md">
                <svg className="w-8 h-8 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Premium Content</h3>
            <p className="text-gray-600 mb-4">
              This is premium content that requires a small payment to access. 
              Your support helps us create more quality content.
            </p>
            <div className="bg-white p-4 rounded-lg shadow-xs mb-4">
              <PaystackPayment
                email={currentUser?.email || "guest@example.com"}
                amount={500}
                onSuccess={handlePaymentSuccess}
              />
            </div>
            <p className="text-xs text-gray-500">
              Payment is secure and processed via Paystack
            </p>
          </div>
        </motion.div>
      ) : (
        <>
          {/* Blog Content */}
          <motion.div 
            className="prose prose-sm sm:prose lg:prose-lg xl:prose-xl max-w-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            {parse(blog.content)}
          </motion.div>

          {/* Author Section */}
          {blog.author && (
            <motion.div 
              className="mt-12 pt-8 border-t border-gray-100"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <div className="flex items-center">
                <img
                  src={blog.author.avatar || "/default-avatar.jpg"}
                  alt={blog.author.name}
                  className="h-14 w-14 rounded-full object-cover border-2 border-white shadow-sm"
                  loading="lazy"
                />
                <div className="ml-4">
                  <h4 className="text-lg font-semibold text-gray-900">
                    Written by {blog.author.name}
                  </h4>
                  {blog.author.bio && (
                    <p className="text-gray-600 mt-1">{blog.author.bio}</p>
                  )}
                </div>
              </div>
            </motion.div>
          )}

          {/* Tags */}
          {blog.tags && blog.tags.length > 0 && (
            <motion.div 
              className="mt-8 flex flex-wrap gap-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              {blog.tags.map((tag, index) => (
                <span 
                  key={index}
                  className="px-3 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full"
                >
                  #{tag}
                </span>
              ))}
            </motion.div>
          )}
        </>
      )}
    </motion.div>
  );
};

export default BlogDetails;