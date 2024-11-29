import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Logo from "../Logo/Logo";
import { Moon, Sun } from "lucide-react";

function Nav() {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const storedPreference = localStorage.getItem("darkMode") === "true";
    setDarkMode(storedPreference);

    if (storedPreference) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, []);

  const toggleDarkMode = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    localStorage.setItem("darkMode", newMode);

    if (newMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  return (
    <nav className="flex justify-between items-center px-4 py-3 bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-100 shadow-md">
      {/* Logo */}
      <div className="flex items-center">
        <Link
          to="/"
          className="flex items-center space-x-2"
        >
          <Logo />
        </Link>
      </div>

      {/* Links */}
      <div className="flex items-center space-x-4">
        <Link
          to="/sign_in"
          className="hover:text-blue-500 dark:hover:text-teal-400 transition"
        >
          Sign In
        </Link>
        <Link
          to="/sign_up"
          className="bg-gradient-to-r from-teal-400 to-blue-500 hover:from-pink-500 hover:to-orange-500 text-white font-medium px-4 py-2 rounded-md shadow-md transition"
        >
          Sign Up
        </Link>
        {/* Dark Mode Toggle */}
        <button
          onClick={toggleDarkMode}
          className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition"
          aria-label="Toggle Dark Mode"
        >
          {darkMode ? (
            <Sun className="w-5 h-5 text-yellow-400" />
          ) : (
            <Moon className="w-5 h-5 text-gray-500" />
          )}
        </button>
      </div>
    </nav>
  );
}

export default Nav;
