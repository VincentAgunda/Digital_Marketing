import React, { useState } from "react";
import { db, storage } from "../firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import ReactQuill from "react-quill"; // Rich Text Editor
import "react-quill/dist/quill.snow.css"; // Quill CSS

const AdminDashboard = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      let imageUrl = "/default-blog.jpg"; // Default image from public folder

      if (image) {
        const storageRef = ref(storage, `blogImages/${image.name}`);
        await uploadBytes(storageRef, image);
        imageUrl = await getDownloadURL(storageRef);
      }

      await addDoc(collection(db, "blogs"), {
        title,
        content, // Rich text formatted content
        imageUrl,
        createdAt: serverTimestamp(),
      });

      // Clear form
      setTitle("");
      setContent("");
      setImage(null);
      alert("Blog post added successfully!");
    } catch (error) {
      console.error("Error adding blog post:", error);
      alert("Failed to add blog post.");
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Add a New Blog Post</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Blog Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-2 border rounded mb-3"
          required
        />

        {/* Rich Text Editor */}
        <ReactQuill
          theme="snow"
          value={content}
          onChange={setContent}
          className="mb-3"
        />

        <input type="file" onChange={handleImageChange} className="mb-3" />
        <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded">
          Submit Blog
        </button>
      </form>
    </div>
  );
};

export default AdminDashboard;
