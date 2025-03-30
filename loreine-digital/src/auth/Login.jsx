import React, { useState, useEffect } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";
import { FaUser, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";
import { motion, useAnimation } from "framer-motion";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const controls = useAnimation(); // Controls for animation

  useEffect(() => {
    controls.start({ opacity: 1, y: 0 });
  }, [controls]); // Ensures animation starts after mounting

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      if (user?.email?.toLowerCase() === "admin@loreinedigital.com") {
        navigate("/admin-dashboard");
      } else {
        navigate("/blogs");
      }
    } catch (err) {
      setError(getFirebaseErrorMessage(err.code));
    } finally {
      setLoading(false);
    }
  };

  const getFirebaseErrorMessage = (code) => {
    switch (code) {
      case "auth/user-not-found":
      case "auth/wrong-password":
        return "Invalid email or password.";
      case "auth/too-many-requests":
        return "Too many login attempts. Try again later.";
      case "auth/invalid-email":
        return "Invalid email format.";
      default:
        return "Login failed. Please try again.";
    }
  };

  return (
    <motion.div
      className="relative z-10 w-full max-w-md"
      initial={{ opacity: 0, y: 20 }}
      animate={controls} // Use animation controls
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
            <h2 className="text-3xl font-bold mb-2" style={{ color: "#1F4D3B" }}>
              Welcome Back
            </h2>
            <p className="text-sm" style={{ color: "#101337" }}>
              Sign in to access your account
            </p>
          </div>

          {error && (
            <motion.p className="text-red-500 text-sm text-center mb-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              {error}
            </motion.p>
          )}

          <form onSubmit={handleLogin} className="space-y-5">
            <div className="relative">
              <FaUser className="absolute left-4 top-1/2 transform -translate-y-1/2" style={{ color: "#1c4550" }} />
              <input
                type="email"
                placeholder="Email"
                className="w-full p-3 pl-12 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1F4D3B]"
                style={{ borderColor: "#1c4550", backgroundColor: "#F0F0F0" }}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="relative">
              <FaLock className="absolute left-4 top-1/2 transform -translate-y-1/2" style={{ color: "#1c4550" }} />
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                className="w-full p-3 pl-12 pr-12 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1F4D3B]"
                style={{ borderColor: "#1c4550", backgroundColor: "#F0F0F0" }}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <span
                className="absolute right-4 top-1/2 transform -translate-y-1/2 cursor-pointer"
                style={{ color: "#1c4550" }}
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>

            <motion.button
              className="w-full py-3 rounded-lg text-white font-medium transition-colors"
              style={{ backgroundColor: "#1F4D3B" }}
              type="submit"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              disabled={loading}
            >
              {loading ? "Logging in..." : "Login"}
            </motion.button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm" style={{ color: "#101337" }}>
              Don't have an account?{" "}
              <span className="font-medium cursor-pointer hover:underline" style={{ color: "#1F4D3B" }} onClick={() => navigate("/register")}>
                Register
              </span>
            </p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Login;
