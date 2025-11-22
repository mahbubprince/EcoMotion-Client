import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { motion } from "framer-motion";
import { Link } from "react-router";

export default function Login() {
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    const email = e.target.email.value;
    const password = e.target.password.value;

    if (!email || !password) {
      setError("Email and password are required!");
      return;
    }

    setError("");
    alert("Login successful!");
  };

  return (
    <div className="h-screen flex items-center justify-center  p-4">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="bg-white/40 backdrop-blur-xl border border-white/30 shadow-2xl p-8 rounded-3xl w-full max-w-md bg-gradient-to-br from-blue-200 via-purple-200 to-pink-200"
      >
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.7 }}
          className="text-3xl font-semibold text-center mb-6 text-gray-800"
        >
          Welcome Back
        </motion.h2>

        <form onSubmit={handleLogin}>
          {/* Email */}
          <label className="block mb-2 font-medium text-gray-700">Email</label>
          <motion.input
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            type="email"
            name="email"
            placeholder="Enter your email"
            className="w-full mb-4 p-3 border border-gray-300 rounded-xl bg-white/60 focus:ring-2 focus:ring-purple-300 outline-none"
            required
          />

          {/* Password */}
          <label className="block mb-2 font-medium text-gray-700">
            Password
          </label>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="relative mb-4"
          >
            <input
              type={showPass ? "text" : "password"}
              name="password"
              placeholder="Enter password"
              className="w-full p-3 border border-gray-300 rounded-xl bg-white/60 focus:ring-2 focus:ring-purple-300 outline-none"
              required
            />

            <span
              className="absolute right-3 top-3 cursor-pointer text-gray-600"
              onClick={() => setShowPass(!showPass)}
            >
              {showPass ? <FaEyeSlash /> : <FaEye />}
            </span>
          </motion.div>

          {/* Error */}
          {error && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-red-500 text-sm mb-3"
            >
              {error}
            </motion.p>
          )}

          {/* Button */}
          <motion.button
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            type="submit"
            className="w-full bg-purple-600 text-white py-3 rounded-xl text-lg shadow-lg hover:bg-purple-700 hover:shadow-xl transition-all"
          >
            Login
          </motion.button>
        </form>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="text-center mt-4 text-sm text-gray-700"
        >
          Don't have an account?{" "}
          <Link to="/register" className="text-purple-700 font-medium">
            Register
          </Link>
        </motion.p>
      </motion.div>
    </div>
  );
}
