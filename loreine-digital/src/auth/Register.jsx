import React, { useState, useEffect, useRef } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FaUser, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();
  const emailRef = useRef(null);

  useEffect(() => {
    emailRef.current?.focus();
  }, []);

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      setLoading(false);
      return;
    }

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      setSuccess("Registration successful! Redirecting...");

      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (err) {
      setError(getFirebaseErrorMessage(err.code));
    } finally {
      setLoading(false);
    }
  };

  const getFirebaseErrorMessage = (code) => {
    switch (code) {
      case "auth/email-already-in-use":
        return "This email is already registered.";
      case "auth/invalid-email":
        return "Invalid email format.";
      case "auth/weak-password":
        return "Password is too weak. Try a stronger one.";
      default:
        return "Registration failed. Please try again.";
    }
  };

  return (
    <motion.div
      className="relative z-10 w-full max-w-md"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
    >
      <motion.div
        className="bg-white bg-opacity-95 rounded-xl shadow-2xl overflow-hidden border border-[#7F7863]/20"
        whileHover={{ scale: 1.01 }}
        transition={{ duration: 0.3 }}
      >
        <div className="p-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-2 text-[#1F4D3B]">
              Create Account
            </h2>
            <p className="text-sm text-[#101337]">
              Join our exclusive community
            </p>
          </div>
          
          {error && (
            <motion.p
              className="text-red-500 text-sm text-center mb-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              {error}
            </motion.p>
          )}

          {success && (
            <motion.p
              className="text-green-600 text-sm text-center mb-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              {success}
            </motion.p>
          )}

          <form onSubmit={handleRegister} className="space-y-5">
            <div className="relative">
              <FaUser className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[#1c4550]" />
              <input
                type="email"
                placeholder="Email"
                className="w-full p-3 pl-12 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1F4D3B] bg-[#F0F0F0] border-[#1c4550]"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                ref={emailRef}
              />
            </div>

            <div className="relative">
              <FaLock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[#1c4550]" />
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password (min. 6 characters)"
                className="w-full p-3 pl-12 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1F4D3B] bg-[#F0F0F0] border-[#1c4550]"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <span
                className="absolute right-4 top-1/2 transform -translate-y-1/2 cursor-pointer text-[#1c4550]"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>

            <motion.button
              className={`w-full py-3 rounded-lg text-white font-medium transition-colors ${
                loading ? "opacity-75" : ""
              }`}
              style={{ backgroundColor: "#1F4D3B" }}
              type="submit"
              disabled={loading}
              whileHover={{ scale: loading ? 1 : 1.02 }}
              whileTap={{ scale: loading ? 1 : 0.98 }}
            >
              {loading ? "Registering..." : "Register"}
            </motion.button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-[#101337]">
              Already have an account?{" "}
              <span
                className="font-medium cursor-pointer hover:underline text-[#1F4D3B]"
                onClick={() => navigate("/login")}
              >
                Login
              </span>
            </p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Register;