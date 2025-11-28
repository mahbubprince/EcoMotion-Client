import { useContext, useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import { motion, AnimatePresence } from "framer-motion";
import { AuthContext } from "../provider/AuthContext";
import Swal from "sweetalert2";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const location = useLocation();
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "night");

  useEffect(() => {
    const html = document.querySelector("html");
    html.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  // ✅ Theme Toggle
  const handelTheme = (checked) => {
    setTheme(checked ? "night" : "winter");
  };

  // ✅ Logout Handler
  const handleLogout = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You’ll be logged out of your account.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, logout!",
    }).then((result) => {
      if (result.isConfirmed) {
        logout()
          .then(() => {
            Swal.fire({
              icon: "success",
              title: "Logged Out",
              text: "You have been logged out successfully!",
              showConfirmButton: false,
              timer: 2000,
            });
            navigate("/login");
          })
          .catch((err) => {
            Swal.fire({
              icon: "error",
              title: "Logout Failed",
              text: err.message,
            });
          });
      }
    });
  };

  // ✅ Menu items
  const menuItems = [
    { name: "Home", path: "/" },
    { name: "Upcoming Events", path: "/upcoming" },
  ];

  const userMenu = [
    { name: "Create Event", path: "/createEvent" },
    { name: "Manage Events", path: "/manage" },
    { name: "Joined Events", path: "/joined" },
  ];

  return (
    <nav className="fixed top-0 left-0 w-full z-50 backdrop-blur-lg shadow-lg border-b border-green-200 bg-white/70 dark:bg-gray-900/70 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <span className="text-2xl md:text-3xl font-extrabold text-green-700 dark:text-green-400 transition-all">
              🌿 EcoMotion
            </span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-6">
            {menuItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={`nav-link ${
                  location.pathname === item.path ? "active-link" : ""
                }`}
              >
                {item.name}
                <motion.span
                  layoutId="underline"
                  className="absolute left-0 -bottom-0.5 h-0.5 bg-green-600 rounded-full"
                  animate={{
                    width: location.pathname === item.path ? "100%" : "0%",
                  }}
                  transition={{ duration: 0.3 }}
                />
              </Link>
            ))}
          </div>

          {/* Right side */}
          <div className="flex items-center space-x-4">
            {!user ? (
              <Link
                to="/login"
                className="bg-gradient-to-r from-green-400 to-green-600 hover:from-green-500 hover:to-green-700 text-white px-5 py-2 rounded-xl shadow-md hover:shadow-lg transition-all font-semibold"
              >
                Login
              </Link>
            ) : (
              <div className="relative">
                <motion.img
                  src={user.photoURL}
                  title={user.displayName}
                  alt={user.displayName}
                  className="w-11 h-11 rounded-full cursor-pointer border-2 border-green-400 hover:border-green-600 shadow-md"
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  whileHover={{ scale: 1.1 }}
                />
                <AnimatePresence>
                  {dropdownOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-xl shadow-xl py-2 border border-green-200 dark:border-gray-700"
                    >
                      <p className="px-4 py-2 text-gray-700 dark:text-gray-200 font-semibold border-b border-green-100 dark:border-gray-700">
                        {user.displayName}
                      </p>
                      {userMenu.map((item) => (
                        <Link
                          key={item.name}
                          to={item.path}
                          className={`block px-4 py-2 rounded-md transition-all ${
                            location.pathname === item.path
                              ? "active-link"
                              : "text-gray-700 hover:bg-green-100 dark:text-gray-200 dark:hover:bg-gray-700"
                          }`}
                        >
                          {item.name}
                        </Link>
                      ))}
                      <div className="flex justify-between px-4 py-2 text-gray-700 dark:text-gray-200">
                        <p>Theme</p>
                        <input
                          onChange={(e) => handelTheme(e.target.checked)}
                          type="checkbox"
                          defaultChecked
                          className="toggle"
                        />
                      </div>
                      <button
                        onClick={handleLogout}
                        className="w-full text-left px-4 py-2 text-red-600 hover:bg-red-100 dark:hover:bg-red-800 rounded-md transition-all"
                      >
                        Logout
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )}

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="text-gray-700 dark:text-gray-200 focus:outline-none text-2xl"
              >
                {menuOpen ? "✕" : "☰"}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white/90 dark:bg-gray-900/90 backdrop-blur-lg px-6 py-4 border-t border-green-200 dark:border-gray-700 space-y-2"
          >
            {menuItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                onClick={() => setMenuOpen(false)}
                className={`block py-2 rounded-md transition-all ${
                  location.pathname === item.path
                    ? "active-link"
                    : "text-gray-700 hover:text-green-600 dark:text-gray-200 dark:hover:text-green-400"
                }`}
              >
                {item.name}
              </Link>
            ))}
            {user &&
              userMenu.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  onClick={() => setMenuOpen(false)}
                  className={`block py-2 rounded-md transition-all ${
                    location.pathname === item.path
                      ? "active-link"
                      : "text-gray-700 hover:text-green-600 dark:text-gray-200 dark:hover:text-green-400"
                  }`}
                >
                  {item.name}
                </Link>
              ))}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
