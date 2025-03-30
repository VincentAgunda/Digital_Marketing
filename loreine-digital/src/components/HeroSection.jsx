import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import emailjs from "@emailjs/browser";

function HeroSection() {
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    service: "",
    email: "",
  });
  const [message, setMessage] = useState("");

  const sendEmail = async (e) => {
    e.preventDefault();

    const serviceId = process.env.REACT_APP_EMAILJS_SERVICE_ID;
    const templateId = process.env.REACT_APP_EMAILJS_TEMPLATE_ID;
    const publicKey = process.env.REACT_APP_EMAILJS_PUBLIC_KEY;

    if (!formData.name || !formData.phone || !formData.service || !formData.email) {
      setMessage("All fields are required.");
      return;
    }

    const templateParams = {
      to_name: "Admin",
      from_name: formData.name,
      user_email: formData.email,
      message: `Phone: ${formData.phone}\nService Required: ${formData.service}`,
    };

    try {
      await emailjs.send(serviceId, templateId, templateParams, publicKey);
      setMessage("Booking request sent successfully!");
      setFormData({ name: "", phone: "", service: "", email: "" });

      // Close modal after animation completes
      setTimeout(() => setShowModal(false), 300);
    } catch (error) {
      console.error("Email sending error:", error);
      setMessage("Failed to send. Try again.");
    }
  };

  return (
    <section
      className="py-16 md:py-36 relative overflow-hidden bg-cover bg-center"
      style={{ backgroundImage: "url('background3.webp')" }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-30"></div>

      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center relative z-10">
        <div className="text-center md:text-left md:max-w-lg lg:max-w-xl w-full mb-8 md:mb-0">
          <h1 className="text-2xl md:text-4xl font-bold text-white mb-4 leading-tight">
            We Are Brilliant In <br className="hidden md:block" /> Terms of Digital Marketing
          </h1>
          <p className="text-md md:text-lg text-white mb-5">
            Book Your 30-minute strategy call
          </p>
          <button
            className="bg-pink-500 hover:bg-pink-600 text-white font-semibold py-2 px-4 rounded-full transition"
            onClick={() => setShowModal(true)}
          >
            Book Now
          </button>
        </div>

        {/* REMOVED THE SECOND IMAGE */}
        {/* <div className="relative w-full max-w-xs md:max-w-sm lg:max-w-md">
          <img
            src="background3.webp"
            alt="Digital marketing illustration"
            className="rounded-lg shadow-xl w-full"
            loading="lazy"
          />
        </div> */}
      </div>

      {/* MODAL with Smooth Exit Animation */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 px-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.3 } }}
          >
            <motion.div
              className="bg-white p-4 md:p-5 rounded-xl shadow-lg w-full max-w-xs md:max-w-sm"
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.85, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <h2 className="text-lg font-bold mb-3 text-center">Book a Strategy Call</h2>

              <form onSubmit={sendEmail} className="space-y-2">
                <input
                  type="text"
                  placeholder="Your Name"
                  className="w-full p-2 border rounded-md text-sm focus:ring focus:ring-pink-500"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                />
                <input
                  type="text"
                  placeholder="Phone Number"
                  className="w-full p-2 border rounded-md text-sm focus:ring focus:ring-pink-500"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  required
                />
                <input
                  type="text"
                  placeholder="Service (e.g., SEO, Social Media)"
                  className="w-full p-2 border rounded-md text-sm focus:ring focus:ring-pink-500"
                  value={formData.service}
                  onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                  required
                />
                <input
                  type="email"
                  placeholder="Your Email"
                  className="w-full p-2 border rounded-md text-sm focus:ring focus:ring-pink-500"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                />

                {message && <p className="text-xs text-gray-600">{message}</p>}

                <div className="flex justify-between space-x-2 mt-2">
                  <button
                    type="button"
                    className="px-3 py-1 bg-gray-400 text-white rounded-md text-xs"
                    onClick={() => setShowModal(false)}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-3 py-1 bg-pink-500 hover:bg-pink-600 text-white rounded-md text-xs"
                  >
                    Submit
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

export default HeroSection;