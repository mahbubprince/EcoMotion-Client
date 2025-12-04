
import { useContext, useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import { motion, AnimatePresence } from "framer-motion";
import { AuthContext } from "../provider/AuthContext";
import Swal from "sweetalert2";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const location = useLocation();
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "night");

  useEffect(() => {
    const html = document.querySelector("html");
    html.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  //  Toggle theme
  const handelTheme = (checked) => {
    setTheme(checked ? "night" : "winter");
  };

  //  Logout Handler
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

  //   Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  //  Menu items
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
      <title>Navbar</title>
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/*  Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <span className="text-2xl md:text-3xl font-extrabold text-green-700 dark:text-green-400 transition-all">
              🌿 EcoMotion
            </span>
          </Link>

          {/*  Desktop Menu */}
          <div className="hidden md:flex items-center space-x-6">
            {menuItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={`relative font-medium ${
                  location.pathname === item.path
                    ? "text-green-600 dark:text-green-400"
                    : "text-gray-700 hover:text-green-600 dark:text-gray-200 dark:hover:text-green-400"
                }`}
              >
                {item.name}
                {location.pathname === item.path && (
                  <motion.span
                    layoutId="underline"
                    className="absolute left-0 -bottom-0.5 h-0.5 bg-green-600 rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: "100%" }}
                    transition={{ duration: 0.3 }}
                  />
                )}
              </Link>
            ))}
          </div>

          {/*  Right side */}
          <div className="flex items-center space-x-4">
            {!user ? (
              <Link
                to="/login"
                className="bg-gradient-to-r from-green-400 to-green-600 hover:from-green-500 hover:to-green-700 text-white px-5 py-2 rounded-xl shadow-md hover:shadow-lg transition-all font-semibold"
              >
                Login
              </Link>
            ) : (
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="flex items-center gap-2 focus:outline-none"
                >
                  <motion.img
                    src={
                      user?.photoURL ||
                      "https://i.ibb.co/2NsfGNv/default-avatar.png"
                    }
                    title={user?.displayName || "User"}
                    alt={user?.displayName || "User"}
                    className="w-11 h-11 rounded-full border-2 border-green-400"
                  />

                  <motion.span
                    animate={{ rotate: dropdownOpen ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                    className="text-gray-700 dark:text-gray-200 text-xl"
                  >
                    ▼
                  </motion.span>
                </button>

                <AnimatePresence>
                  {dropdownOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -10, scale: 0.98 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -10, scale: 0.98 }}
                      transition={{ duration: 0.2 }}
                      className="absolute right-0 mt-3 w-56 bg-white/95 dark:bg-gray-800/90 
                                 backdrop-blur-md rounded-2xl shadow-2xl py-3 border border-green-100 
                                 dark:border-gray-700"
                    >
                      {/* User Info */}
                      <div className="px-4 pb-3 border-b border-green-100 dark:border-gray-700">
                        <p className="font-semibold text-gray-800 dark:text-gray-100">
                          {user.displayName}
                        </p>
                        <p className="text-sm text-gray-500 dark:text-gray-400 truncate">
                          {user.email}
                        </p>
                      </div>

                      {/* Menu Items */}
                      <div className="py-2">
                        {userMenu.map((item) => (
                          <Link
                            key={item.name}
                            to={item.path}
                            onClick={() => setDropdownOpen(false)}
                            className={`block px-5 py-2.5 text-sm font-medium rounded-md transition-all ${
                              location.pathname === item.path
                                ? "bg-green-100 text-green-700 dark:bg-green-800/50 dark:text-green-300"
                                : "text-gray-700 hover:bg-green-50 dark:text-gray-200 dark:hover:bg-gray-700"
                            }`}
                          >
                            {item.name}
                          </Link>
                        ))}
                      </div>

                      {/* Theme Toggle */}
                      <div className="flex items-center justify-between px-5 py-2 border-t border-green-100 dark:border-gray-700">
                        <span className="text-gray-700 dark:text-gray-200 text-sm">
                          Theme
                        </span>
                        <input
                          onChange={(e) => handelTheme(e.target.checked)}
                          type="checkbox"
                          checked={theme === "night"}
                          className="toggle toggle-success"
                        />
                      </div>

                      {/* Logout */}
                      <button
                        onClick={handleLogout}
                        className="w-full text-left px-5 py-2 text-sm text-red-600 hover:bg-red-100 
                                   dark:text-red-400 dark:hover:bg-red-900/50 rounded-b-xl transition-all"
                      >
                        Logout
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )}

            {/*  Mobile Menu Button */}
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

      {/*  Mobile Menu */}
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
                    ? "text-green-600 dark:text-green-400"
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
                      ? "text-green-600 dark:text-green-400"
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
