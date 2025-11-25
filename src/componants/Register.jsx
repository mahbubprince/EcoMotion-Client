import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router";
import { motion } from "framer-motion";
import { AuthContext } from "../provider/AuthContext";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import Swal from "sweetalert2";

const Register = () => {
  const [error, setError] = useState("");
  const [showPass, setShowPass] = useState(false);

  const { createUserWithEmailAndPasswordFunc, signInWithPopupFunc,updateProfilefunc } =
    useContext(AuthContext);
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
    console.log(name, email, photoURL, password);

    const passwordErr = validatePassword(password);
    if (passwordErr) {
      setError(passwordErr);
      return;
    }

    // Firebase logic here ...
    createUserWithEmailAndPasswordFunc(email, password)
      .then((res) => {
        // console.log(res);
        const user=res.user

        
        // Swal.fire({
        //   icon: "success",
        //   title: "Registration Successful!",
        //   text: `Welcome, ${name}!`,
        //   showConfirmButton: false,
        //   timer: 2000,
        // });
        // navigate("/");


        return updateProfilefunc(name, photoURL)
        .then(() => {
          // Optional: force context refresh
          user.displayName = name;
          user.photoURL = photoURL;

          Swal.fire({
            icon: "success",
            title: "Registration Successful!",
            text: `Welcome, ${name}!`,
            showConfirmButton: false,
            timer: 2000,
          });

          navigate("/");
        });
      })
      .catch((err) => {
        console.log(err);
        Swal.fire({
          icon: "error",
          title: "Registration Failed",
          text: err.message.replace("Firebase: ", ""),
          confirmButtonColor: "#e53e3e",
        });
      });
  };
  // const handelGoogleReg = () => {
  //   signInWithPopupFunc().then((res) => {
  //     console.log(res);
  //   });
  // };

  const handelGoogleReg = () => {
    Swal.fire({
      title: "Signing in with Google...",
      text: "Please wait a moment",
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });

    signInWithPopupFunc()
      .then((res) => {
        console.log(res);

        Swal.fire({
          icon: "success",
          title: "Welcome!",
          text: `Signed in as ${res.user.displayName || "Google User"}`,
          showConfirmButton: false,
          timer: 2000,
        });

        // Optional: navigate to home page after success
        navigate("/");
      })
      .catch((err) => {
        console.error(err);
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
            type={showPass ? "text" : "password"}
            name="password"
            placeholder="Password"
            className="w-full border border-white/40 bg-white/10 text-white placeholder-white/70 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-white/70"
            required
          />
          <span
            className="absolute right-17 top-81 cursor-pointer text-gray-600"
            onClick={() => setShowPass(!showPass)}
          >
            {showPass ? <FaEyeSlash /> : <FaEye />}
          </span>

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
        <button
          onClick={handelGoogleReg}
          className="btn mt-4 text-black border-[#e5e5e5] w-full bg-white/90  font-bold rounded-lg shadow-lg hover:bg-white"
        >
          <svg
            aria-label="Google logo "
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
