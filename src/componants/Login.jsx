
import { useContext, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router";
import { AuthContext } from "../provider/AuthContext";
import Swal from "sweetalert2";

export default function Login() {
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState("");
  const { signInWithEmailAndPasswordFunc, signInWithPopupFunc, sendPasswordResetEmailFunc } =
    useContext(AuthContext);
  const navigate = useNavigate();

  // ✅ Google Login
  const handelGoogleReg = () => {
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
          title: "Welcome!",
          text: `Signed in as ${res.user.displayName || "Google User"}`,
          showConfirmButton: false,
          timer: 2000,
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

  //  Email Login
  const handleLogin = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    if (!email || !password) {
      setError("Email and password are required!");
      return;
    }

    setError("");
    signInWithEmailAndPasswordFunc(email, password)
      .then((res) => {
        Swal.fire({
          icon: "success",
          title: "Login Successful!",
          text: `Welcome back, ${res.user.displayName || "User"}!`,
          showConfirmButton: false,
          timer: 2000,
        });
        navigate("/");
      })
      .catch((err) => {
        Swal.fire({
          icon: "error",
          title: "Login Failed!",
          text: err.message.replace("Firebase: ", ""),
          confirmButtonColor: "#e53e3e",
        });
      });
  };

  
  const handleForgotPassword = async () => {
    const { value: email } = await Swal.fire({
      title: "Reset your password",
      input: "email",
      inputLabel: "Enter your registered email address",
      inputPlaceholder: "you@example.com",
      confirmButtonText: "Send Reset Link",
      showCancelButton: true,
      confirmButtonColor: "#6366f1",
      background: "#f9fafb",
      customClass: {
        input: "text-gray-800",
      },
      inputValidator: (value) => {
        if (!value) return "Email is required!";
      },
    });

    if (email) {
      Swal.fire({
        title: "Sending reset link...",
        allowOutsideClick: false,
        didOpen: () => Swal.showLoading(),
      });

      sendPasswordResetEmailFunc(email)
        .then(() => {
          Swal.fire({
            icon: "success",
            title: "Email Sent!",
            text: "A password reset link has been sent to your email.",
            confirmButtonColor: "#16a34a",
          });
        })
        .catch((err) => {
          Swal.fire({
            icon: "error",
            title: "Failed to send email",
            text: err.message.replace("Firebase: ", ""),
            confirmButtonColor: "#e53e3e",
          });
        });
    }
  };

  return (
    <div className="h-screen flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="bg-white/40 backdrop-blur-xl border border-white/30 shadow-2xl p-8 rounded-3xl w-full max-w-md bg-linear-to-br from-blue-200 via-purple-200 to-pink-200"
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
          <label className="block mb-2 font-medium text-gray-700">Password</label>
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

          {/* Forgot Password */}
          <p
            onClick={handleForgotPassword}
            className="text-sm text-purple-700 hover:underline cursor-pointer mb-4 text-right font-medium"
          >
            Forgot Password?
          </p>

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

        {/* Google Login */}
        <button
          onClick={handelGoogleReg}
          className="btn mt-4 text-black border-[#e5e5e5] w-full bg-white/90 font-bold rounded-lg shadow-lg hover:bg-white"
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
          Login with Google
        </button>

        {/* Register Link */}
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

