import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { updateDoc, doc } from "firebase/firestore";
import { db } from "../firebase";
import { useAuth } from "../auth/AuthContext";

const Payment = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const blogData = location.state?.blogData; // ✅ Receive blog data from Blogs.jsx
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [cardDetails, setCardDetails] = useState({ number: "", expiry: "", cvv: "" });

  if (!blogData) return <p className="text-center text-gray-500 mt-10">No blog data available.</p>;

  const handlePayment = async () => {
    if (!currentUser) return alert("Please login to make a payment");

    // ✅ Update Firestore to mark user as paid
    const blogRef = doc(db, "blogs", blogData.id);
    await updateDoc(blogRef, {
      paidUsers: [...blogData.paidUsers, currentUser.uid],
    });

    alert("Payment successful! Redirecting to the blog...");
    navigate(`/blog/${blogData.id}`);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.3 }}
      className="max-w-lg mx-auto mt-10 p-6 bg-white shadow-md rounded-lg"
    >
      <h1 className="text-2xl font-semibold text-gray-800 text-center mb-6">Payment for: {blogData.title}</h1>

      {/* ✅ Tab Navigation */}
      <div className="flex justify-between border-b mb-4">
        {["card", "bank", "mobile"].map((method) => (
          <motion.button
            key={method}
            onClick={() => setPaymentMethod(method)}
            className={`flex-1 py-2 text-center ${
              paymentMethod === method ? "text-blue-500 border-b-2 border-blue-500" : "text-gray-500"
            }`}
            whileTap={{ scale: 0.95 }}
          >
            {method.charAt(0).toUpperCase() + method.slice(1)}
          </motion.button>
        ))}
      </div>

      {/* ✅ Payment Forms */}
      <AnimatePresence mode="wait">
        {paymentMethod === "card" && (
          <motion.div
            key="card"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            <label className="block text-gray-700 text-sm mb-2">Card Number</label>
            <input
              type="text"
              placeholder="1234 5678 9101 1121"
              value={cardDetails.number}
              onChange={(e) => setCardDetails({ ...cardDetails, number: e.target.value })}
              className="w-full p-2 border rounded mb-2"
            />

            <div className="flex gap-2">
              <div className="flex-1">
                <label className="block text-gray-700 text-sm mb-2">Expiry Date</label>
                <input
                  type="text"
                  placeholder="MM/YY"
                  value={cardDetails.expiry}
                  onChange={(e) => setCardDetails({ ...cardDetails, expiry: e.target.value })}
                  className="w-full p-2 border rounded"
                />
              </div>

              <div className="flex-1">
                <label className="block text-gray-700 text-sm mb-2">CVV</label>
                <input
                  type="text"
                  placeholder="123"
                  value={cardDetails.cvv}
                  onChange={(e) => setCardDetails({ ...cardDetails, cvv: e.target.value })}
                  className="w-full p-2 border rounded"
                />
              </div>
            </div>
          </motion.div>
        )}

        {paymentMethod === "bank" && (
          <motion.div
            key="bank"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            <p className="text-gray-600 text-sm">Bank Transfer Details:</p>
            <p className="text-gray-700 font-medium mt-2">Account Name: Loreine Digital</p>
            <p className="text-gray-700">Account Number: 123456789</p>
            <p className="text-gray-700">Bank: XYZ Bank</p>
          </motion.div>
        )}

        {paymentMethod === "mobile" && (
          <motion.div
            key="mobile"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            <p className="text-gray-600 text-sm">Mobile Money Details:</p>
            <p className="text-gray-700 font-medium mt-2">Provider: M-Pesa</p>
            <p className="text-gray-700">Number: +254 700 123 456</p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ✅ Payment Button */}
      <motion.button
        onClick={handlePayment}
        className="w-full mt-6 bg-blue-500 text-white py-2 rounded-md font-medium hover:bg-blue-600"
        whileTap={{ scale: 0.95 }}
      >
        Pay Now
      </motion.button>
    </motion.div>
  );
};

export default Payment;
