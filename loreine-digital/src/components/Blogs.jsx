import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../firebase";
import { Link } from "react-router-dom";

const Blogs = () => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "blogs"), (snapshot) => {
      const blogsData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setBlogs(blogsData);
    });

    return () => unsubscribe();
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="py-12"
    >
      <div className="max-w-6xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">Our Latest Blogs</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogs.length === 0 ? (
            <p className="text-center col-span-3 text-gray-500">No blogs available.</p>
          ) : (
            blogs.map((blog) => (
              <motion.div
                key={blog.id}
                className="bg-white rounded-lg shadow-md overflow-hidden"
                whileHover={{ scale: 1.05 }}
              >
                <img
                  src={blog.imageUrl || "/default-blog.jpg"}
                  alt={blog.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <h2 className="text-xl font-semibold text-gray-700 mb-2">{blog.title}</h2>
                  <p className="text-gray-600 text-sm mb-4">
                    {blog.content.replace(/(<([^>]+)>)/gi, "").slice(0, 100)}...
                  </p>
                  <Link to={`/blog/${blog.id}`} className="text-pink-500 hover:text-pink-700 font-semibold">
                    Read More
                  </Link>
                </div>
              </motion.div>
            ))
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default Blogs;
