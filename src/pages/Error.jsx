import { Link } from "react-router";
import { motion } from "framer-motion";

const Error = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-linear-to-br from-green-100 via-blue-100 to-purple-200 px-4 text-center">
      
      <motion.h1
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.6 }}
        className="text-9xl font-extrabold text-green-700 mb-6"
      >
        404
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.5 }}
        className="text-2xl md:text-3xl font-semibold text-gray-700 mb-4"
      >
        Oops! Page Not Found
      </motion.p>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.5 }}
        className="text-gray-600 mb-8 max-w-md"
      >
        The page you are looking for doesn’t exist or has been moved. Let’s get you back home!
      </motion.p>

      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1, duration: 0.5 }}
      >
        <Link
          to="/"
          className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg shadow-lg transition-all"
        >
          Go to Home
        </Link>
      </motion.div>

      <motion.img
        src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80"
        alt="Not Found Illustration"
        className="mt-12 w-96 md:w-[500px] rounded-xl shadow-xl"
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.6 }}
      />
    </div>
  );
};

export default Error;

