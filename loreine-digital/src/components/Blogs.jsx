import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { collection, onSnapshot, updateDoc, doc } from "firebase/firestore";
import { db } from "../firebase";
import { useNavigate } from "react-router-dom";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { useAuth } from "../auth/AuthContext";

const Blogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    try {
      const unsubscribe = onSnapshot(
        collection(db, "blogs"),
        (snapshot) => {
          const blogsData = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
            createdAt: doc.data().createdAt?.toDate(),
            likes: doc.data().likes || {},
            paidUsers: doc.data().paidUsers || [],
          }));
          setBlogs(blogsData);
          setLoading(false);
        },
        (error) => {
          setError("Failed to load blogs");
          setLoading(false);
          console.error("Error fetching blogs:", error);
        }
      );
      return unsubscribe;
    } catch (err) {
      setError("Failed to initialize blog listener");
      setLoading(false);
      console.error("Initialization error:", err);
    }
  }, []);

  const formatDate = (date) =>
    date ? new Intl.DateTimeFormat("en-US", { dateStyle: "medium" }).format(date) : "Unknown Date";

  const handleLike = async (blogId, likes) => {
    if (!currentUser) return alert("Please login to like posts");
    try {
      const blogRef = doc(db, "blogs", blogId);
      await updateDoc(blogRef, {
        likes: { ...likes, [currentUser.uid]: !likes[currentUser.uid] },
      });
    } catch (error) {
      console.error("Error updating like:", error);
      alert("Failed to update like");
    }
  };

  const handleReadMore = (blog, hasPaid) => {
    setLoading(true);
    setTimeout(() => {
      navigate(hasPaid ? `/blog/${blog.id}` : `/payment/${blog.id}`, { state: { blogData: blog } });
      setLoading(false);
    }, 300); // Slightly reduced timeout
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-40">
        <p className="text-gray-500 text-sm">Loading blogs...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-40">
        <p className="text-red-500 text-sm">{error}</p>
      </div>
    );
  }

  return (
    <div className="w-full">
      {blogs.length === 0 ? (
        <p className="text-center text-gray-500 py-2 text-sm">No blogs available yet. Check back soon!</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 md:gap-3"> {/* Increased to 4 columns on larger screens and reduced gap */}
          {blogs.map((blog) => {
            const hasPaid = currentUser && blog.paidUsers.includes(currentUser.uid);
            return (
              <motion.div
                key={blog.id}
                className="bg-gray-100 rounded-md shadow-sm overflow-hidden"
                whileHover={{ y: -3 }}
                transition={{ duration: 0.15 }}
              >
                <div className="relative aspect-video rounded-t-md overflow-hidden">
                  <img
                    src={blog.imageUrl || "/background3.webp"}
                    alt={blog.title}
                    className="w-full h-full object-cover"
                  />
                  <span className="absolute top-1 left-1 bg-gray-800 text-white text-[0.6rem] py-0.5 px-1 rounded-sm">
                    {formatDate(blog.createdAt)}
                  </span>
                </div>
                <div className="p-2 text-left">
                  <h3 className="text-xs font-semibold text-gray-800 mb-1 leading-tight">
                    {blog.title}
                  </h3>
                  <div className="flex justify-between items-center">
                    <button
                      onClick={() => handleReadMore(blog, hasPaid)}
                      className="text-blue-500 text-[0.7rem] font-medium hover:underline"
                    >
                      READ MORE +
                    </button>
                    <motion.button
                      onClick={() => handleLike(blog.id, blog.likes)}
                      className="flex items-center gap-0.5 text-red-500 hover:text-red-600 text-xs"
                      whileTap={{ scale: 1.05 }}
                    >
                      {currentUser?.uid && blog.likes[currentUser.uid] ? (
                        <AiFillHeart size={12} />
                      ) : (
                        <AiOutlineHeart size={12} />
                      )}
                      <span className="text-[0.7rem]">{Object.values(blog.likes).filter(Boolean).length}</span>
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Blogs;