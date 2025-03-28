import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { collection, onSnapshot, updateDoc, doc } from "firebase/firestore";
import { db } from "../firebase";
import { Link } from "react-router-dom";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { useAuth } from "../auth/AuthContext";

const Blogs = () => {
  const [blogs, setBlogs] = useState([]);
  const { currentUser } = useAuth();

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "blogs"), (snapshot) => {
      setBlogs(snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        createdAt: doc.data().createdAt?.toDate(),
        likes: doc.data().likes || {}
      })));
    });
    return unsubscribe;
  }, []);

  const formatDate = (date) => 
    date ? new Intl.DateTimeFormat("en-US", { dateStyle: "medium" }).format(date) : "Unknown Date";

  const handleLike = async (blogId, likes) => {
    if (!currentUser) return alert("Please login to like posts");
    const blogRef = doc(db, "blogs", blogId);
    await updateDoc(blogRef, { 
      likes: { ...likes, [currentUser.uid]: !likes[currentUser.uid] } 
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="py-8"
    >
      <div className="max-w-5xl mx-auto px-3">
        <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">Latest Blogs</h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {blogs.length === 0 ? (
            <p className="text-center col-span-3 text-gray-500">No blogs available</p>
          ) : (
            blogs.map((blog) => (
              <motion.div
                key={blog.id}
                className="bg-white rounded-md shadow-sm overflow-hidden flex flex-col"
                whileHover={{ scale: 1.02 }}
              >
                <img
                  src={blog.imageUrl || "/default-blog.jpg"}
                  alt={blog.title}
                  className="w-full h-40 object-cover"
                />

                <div className="p-4 flex flex-col flex-grow">
                  <p className="text-xs text-gray-500">{formatDate(blog.createdAt)}</p>
                  <h2 className="text-lg font-semibold text-gray-700 mt-1 mb-2 hover:text-orange-500">
                    {blog.title}
                  </h2>

                  <p className="text-gray-600 text-xs flex-grow">
                    {blog.content.replace(/<[^>]+>/g, "").slice(0, 80)}...
                  </p>

                  <div className="mt-3 flex justify-between items-center">
                    <Link
                      to={`/blog/${blog.id}`}
                      className="text-blue-500 hover:text-blue-600 text-sm font-medium"
                    >
                      Read More
                    </Link>

                    <motion.button
                      onClick={() => handleLike(blog.id, blog.likes)}
                      className="flex items-center gap-1 text-red-500 hover:text-red-600 text-sm"
                      whileTap={{ scale: 1.1 }}
                    >
                      {currentUser?.uid && blog.likes[currentUser.uid] ? 
                        <AiFillHeart size={16} /> : <AiOutlineHeart size={16} />}
                      <span>{Object.values(blog.likes).filter(Boolean).length}</span>
                    </motion.button>
                  </div>
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