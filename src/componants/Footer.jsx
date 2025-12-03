import { Link } from "react-router";
import { motion } from "framer-motion";
import { FaFacebook, FaTwitter, FaInstagram, FaLeaf } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-br from-green-700 to-green-800 text-white pt-12 pb-6">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-10">

        {/* Logo & About */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }} 
          whileInView={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.6 }}
          className="space-y-4"
        >
          <div className="flex items-center gap-2 text-2xl font-bold">
            <FaLeaf className="text-green-300" />
            <span>EcoMotion</span>
          </div>
          <p className="text-gray-200 leading-relaxed">
            Empowering communities to create cleaner, greener, and sustainable environments through meaningful events.
          </p>

          {/* Social Icons */}
          <div className="flex gap-4 text-xl">
            <a href="#" className="hover:text-green-300 transition"><FaFacebook /></a>
            <a href="#" className="hover:text-green-300 transition"><FaXTwitter /></a>
            <a href="#" className="hover:text-green-300 transition"><FaInstagram /></a>
          </div>
        </motion.div>

        {/* Quick Links */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }} 
          whileInView={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <h3 className="text-xl font-semibold mb-4">Quick Links</h3>
          <ul className="space-y-2 text-gray-200">
            <li><Link className="hover:text-green-300 transition" to="/">Home</Link></li>
            <li><Link className="hover:text-green-300 transition" to="/upcoming">Upcoming Events</Link></li>
            <li><Link className="hover:text-green-300 transition" to="/createEvent">Create Event</Link></li>
            <li><Link className="hover:text-green-300 transition" to="/manage">Manage Events</Link></li>
            <li><Link className="hover:text-green-300 transition" to="/joined">Joined Events</Link></li>
          </ul>
        </motion.div>

        {/* Newsletter */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }} 
          whileInView={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <h3 className="text-xl font-semibold mb-4">Stay Updated</h3>
          <p className="text-gray-200 mb-4">
            Subscribe to receive the latest event updates and community activities.
          </p>
          <div className="flex">
            <input 
              type="email" 
              placeholder="Enter your email" 
              className="p-3 rounded-l-lg w-full text-gray-800 focus:ring-2 focus:ring-green-300"
            />
            <button className="bg-green-500 px-5 rounded-r-lg hover:bg-green-600 transition">
              Subscribe
            </button>
          </div>
        </motion.div>

      </div>

      {/* Bottom Section */}
      <div className="text-center text-gray-300 mt-12 border-t border-green-600 pt-4">
        © {new Date().getFullYear()} EcoMotion — All Rights Reserved.
      </div>
    </footer>
  );
};

export default Footer;
