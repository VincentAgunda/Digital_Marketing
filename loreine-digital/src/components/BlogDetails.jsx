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

  useEffect(() => {
    window.scrollTo(0, 0); // Ensure smooth scroll to top

    const fetchBlog = async () => {
      try {
        const docRef = doc(db, "blogs", id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setBlog(docSnap.data());
        } else {
          console.error("No such blog!");
        }
      } catch (error) {
        console.error("Error fetching blog:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
  }, [id]);

  if (loading) return <p className="text-center mt-10">Loading...</p>;
  if (!blog) return <p className="text-center mt-10">Blog not found.</p>;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.5 }}
      className="max-w-3xl mx-auto px-4 py-10"
    >
      <img
        src={blog.imageUrl || "/default-blog.jpg"}
        alt={blog.title}
        className="w-full h-64 object-cover rounded-lg mb-6"
      />
      <h1 className="text-3xl font-bold text-gray-800 mb-4">{blog.title}</h1>
      <div className="text-gray-600">{parse(blog.content)}</div>
    </motion.div>
  );
};

export default BlogDetails;
