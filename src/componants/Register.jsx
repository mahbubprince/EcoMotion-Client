import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { motion } from "framer-motion";

const Register = () => {
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const validatePassword = (password) => {
    if (!/[A-Z]/.test(password)) return "Must include an uppercase letter";
    if (!/[a-z]/.test(password)) return "Must include a lowercase letter";
    if (password.length < 6) return "Minimum length 6 characters";
    return null;
  };

  const handleRegister = (e) => {
    e.preventDefault();
    setError("");

    const name = e.target.name.value;
    const email = e.target.email.value;
    const photoURL = e.target.photoURL.value;
    const password = e.target.password.value;
    console.log(name,email,photoURL,password)

    const passwordErr = validatePassword(password);
    if (passwordErr) {
      setError(passwordErr);
      return;
    }

    // Firebase logic here ...
  };

  return (
    <div className="min-h-screen flex justify-center items-center p-4">
      {/* Animated card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8, y: 50 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="w-full max-w-md  backdrop-blur-xl shadow-2xl p-10 rounded-2xl border border-white/30 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500"
      >
        {/* Title */}
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-3xl font-bold text-center text-white drop-shadow-lg mb-6"
        >
          Create Your Account
        </motion.h2>

        {/* Form */}
        <form onSubmit={handleRegister} className="space-y-5">
          <motion.input
            whileFocus={{ scale: 1.03 }}
            type="text"
            name="name"
            placeholder="Full Name"
            className="w-full border border-white/40 bg-white/10 text-white placeholder-white/70 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-white/70"
            required
          />

          <motion.input
            whileFocus={{ scale: 1.03 }}
            type="email"
            name="email"
            placeholder="Email"
            className="w-full border border-white/40 bg-white/10 text-white placeholder-white/70 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-white/70"
            required
          />

          <motion.input
            whileFocus={{ scale: 1.03 }}
            type="text"
            name="photoURL"
            placeholder="Photo URL"
            className="w-full border border-white/40 bg-white/10 text-white placeholder-white/70 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-white/70"
            required
          />

          <motion.input
            whileFocus={{ scale: 1.03 }}
            type="password"
            name="password"
            placeholder="Password"
            className="w-full border border-white/40 bg-white/10 text-white placeholder-white/70 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-white/70"
            required
          />

          {error && <p className="text-red-200 text-sm">{error}</p>}

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            type="submit"
            className="w-full bg-white/90 text-purple-700 font-bold p-3 rounded-lg shadow-lg hover:bg-white"
          >
            Register
          </motion.button>
        </form>

        {/* Link */}
        <p className="text-center text-white mt-5">
          Already have an account?
          <Link
            to="/login"
            className="font-semibold ml-1 underline hover:text-yellow-200 transition"
          >
            Login
          </Link>
        </p>
      </motion.div>
    </div>
  );
};

export default Register;
