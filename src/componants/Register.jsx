

import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router";
import { motion } from "framer-motion";
import { AuthContext } from "../provider/AuthContext";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import Swal from "sweetalert2";

const Register = () => {
  const [error, setError] = useState("");
  const [showPass, setShowPass] = useState(false);

  const {
    createUserWithEmailAndPasswordFunc,
    updateProfilefunc,
    signInWithPopupFunc,
    logout,
  } = useContext(AuthContext);
  const navigate = useNavigate();

  // ✅ Password validation
  const validatePassword = (password) => {
    if (password.length < 6) return "Password must be at least 6 characters";
    if (!/[A-Z]/.test(password)) return "Must contain an uppercase letter";
    if (!/[a-z]/.test(password)) return "Must contain a lowercase letter";
    return null;
  };

  // ✅ Handle email/password registration
  const handleRegister = (e) => {
    e.preventDefault();
    const name = e.target.name.value.trim();
    const email = e.target.email.value.trim();
    const photoURL = e.target.photoURL.value.trim();
    const password = e.target.password.value.trim();

    const validationError = validatePassword(password);
    if (validationError) {
      setError(validationError);
      return;
    }

    setError("");

    createUserWithEmailAndPasswordFunc(email, password)
      .then(() => updateProfilefunc(name, photoURL))
      .then(() => logout()) // ✅ Immediately log out after registration
      .then(() => {
        Swal.fire({
          icon: "success",
          title: "Account Created!",
          text: "Please log in using your new account credentials.",
          confirmButtonText: "Go to Login",
          confirmButtonColor: "#6366f1",
        }).then(() => navigate("/login"));
      })
      .catch((err) => {
        console.error("Registration Error:", err.message);
        Swal.fire({
          icon: "error",
          title: "Registration Failed",
          text: err.message.replace("Firebase: ", ""),
          confirmButtonColor: "#e53e3e",
        });
      });
  };

  // ✅ Handle Google registration/login
  const handleGoogleRegister = () => {
    Swal.fire({
      title: "Signing in with Google...",
      text: "Please wait a moment",
      allowOutsideClick: false,
      didOpen: () => Swal.showLoading(),
    });

    signInWithPopupFunc()
      .then((res) => {
        Swal.fire({
          icon: "success",
          title: `Welcome ${res.user.displayName || "User"}!`,
          timer: 2000,
          showConfirmButton: false,
        });
        navigate("/");
      })
      .catch((err) => {
        Swal.fire({
          icon: "error",
          title: "Google Sign-in Failed",
          text: err.message.replace("Firebase: ", ""),
          confirmButtonColor: "#e53e3e",
        });
      });
  };

  return (
    <div className="min-h-screen flex justify-center items-center p-4">
      <title>Register</title>
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 40 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="w-full max-w-md backdrop-blur-xl shadow-2xl p-10 rounded-2xl border border-white/30 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500"
      >
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-3xl font-bold text-center text-white mb-6"
        >
          Create Your Account
        </motion.h2>

        {/* ✅ Registration Form */}
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
            placeholder="Photo URL (optional)"
            className="w-full border border-white/40 bg-white/10 text-white placeholder-white/70 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-white/70"
          />
          <motion.div whileFocus={{ scale: 1.03 }} className="relative">
            <input
              type={showPass ? "text" : "password"}
              name="password"
              placeholder="Password"
              className="w-full border border-white/40 bg-white/10 text-white placeholder-white/70 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-white/70"
              required
            />
            <span
              className="absolute right-3 top-3 cursor-pointer text-white/70"
              onClick={() => setShowPass(!showPass)}
            >
              {showPass ? <FaEyeSlash /> : <FaEye />}
            </span>
          </motion.div>

          {error && <p className="text-red-200 text-sm">{error}</p>}

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            type="submit"
            className="w-full bg-white/90 text-purple-700 font-bold p-3 rounded-lg shadow-lg hover:bg-white transition-all"
          >
            Register
          </motion.button>
        </form>

        {/* ✅ Google Login */}
        <button
          onClick={handleGoogleRegister}
          className="btn mt-4 text-black border-[#e5e5e5] w-full bg-white/90 font-bold rounded-lg shadow-lg hover:bg-white transition-all"
        >
          <svg
            aria-label="Google logo"
            width="16"
            height="16"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
          >
            <g>
              <path d="m0 0H512V512H0" fill="#fff"></path>
              <path
                fill="#34a853"
                d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"
              ></path>
              <path
                fill="#4285f4"
                d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"
              ></path>
              <path
                fill="#fbbc02"
                d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"
              ></path>
              <path
                fill="#ea4335"
                d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"
              ></path>
            </g>
          </svg>
          Continue with Google
        </button>

        {/* ✅ Login Link */}
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
