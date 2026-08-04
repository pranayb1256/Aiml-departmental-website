import { useState, useEffect } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { Search, Menu, X, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import CommandPalette from "./CommandPalette";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [facultyOpen, setFacultyOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isCmdOpen, setIsCmdOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMenuOpen(false);
    setFacultyOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Clubs", path: "/Club" },
    { name: "Events", path: "/Event" },
    { name: "Showcase", path: "/Showcase" },
    { name: "Resources", path: "/Resources" },
    { name: "Verify", path: "/verify-certificate" },
    { name: "Academics", path: "/Academics" },
    { name: "Placements", path: "/Placements" },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled ? "bg-white/80 backdrop-blur-md shadow-sm border-b border-gray-200 py-2" : "bg-white border-b border-gray-100 py-4"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3">
            <img
              src="https://res.cloudinary.com/dzydycrjo/image/upload/v1745004394/cvnwsfj2a6bwqvupvky8.jpg"
              className="h-10 md:h-12 w-auto object-contain"
              alt="LTCE Logo"
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-2">
            {navLinks.map((link) => (
              <NavLink
                key={link.name}
                to={link.path}
                className={({ isActive }) =>
                  `relative px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    isActive
                      ? "text-blue-600"
                      : "text-gray-600 hover:text-blue-600 hover:bg-blue-50/50"
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    {link.name}
                    {isActive && (
                      <motion.div
                        layoutId="header-active-tab-light"
                        className="absolute bottom-0 left-3 right-3 h-0.5 bg-blue-600 rounded-t-full"
                      />
                    )}
                  </>
                )}
              </NavLink>
            ))}

            {/* Faculty Dropdown (Desktop) */}
            <div
              className="relative group px-3 py-2"
              onMouseEnter={() => setFacultyOpen(true)}
              onMouseLeave={() => setFacultyOpen(false)}
            >
              <button className="flex items-center gap-1 text-sm font-medium text-gray-600 hover:text-blue-600 transition-colors">
                Faculty
                <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${facultyOpen ? "rotate-180" : ""}`} />
              </button>
              <AnimatePresence>
                {facultyOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                    className="absolute top-full left-1/2 -translate-x-1/2 mt-1 w-48 bg-white border border-gray-100 rounded-xl shadow-xl overflow-hidden py-2"
                  >
                    <Link to="/HodDesk" className="block px-4 py-2 text-sm text-gray-700 hover:text-blue-600 hover:bg-gray-50 transition-colors">
                      HOD Desk
                    </Link>
                    <Link to="/Teaching" className="block px-4 py-2 text-sm text-gray-700 hover:text-blue-600 hover:bg-gray-50 transition-colors">
                      Teaching Staff
                    </Link>
                    <Link to="/NonTeaching" className="block px-4 py-2 text-sm text-gray-700 hover:text-blue-600 hover:bg-gray-50 transition-colors">
                      Non-Teaching Staff
                    </Link>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </nav>

          {/* Right Actions */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsCmdOpen(true)}
              className="hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-gray-50 hover:bg-gray-100 border border-gray-200 text-gray-500 hover:text-gray-700 transition-all"
            >
              <Search className="w-4 h-4" />
              <span className="text-sm">Search...</span>
              <kbd className="px-1.5 border border-gray-300 rounded text-[10px] font-mono text-gray-500 bg-white">
                ⌘K
              </kbd>
            </button>

            <Link
              to="/Contact"
              className="hidden lg:inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-sm transition-all"
            >
              Contact Us
            </Link>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="lg:hidden p-2 text-gray-600 hover:text-blue-600 transition-colors"
            >
              {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Navigation Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "100vh" }}
            exit={{ opacity: 0, height: 0 }}
            className="fixed inset-0 z-40 bg-white lg:hidden pt-24 pb-8 px-6 overflow-y-auto"
          >
            <nav className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <NavLink
                  key={link.name}
                  to={link.path}
                  className={({ isActive }) =>
                    `text-2xl font-semibold transition-colors ${
                      isActive ? "text-blue-600" : "text-gray-800 hover:text-blue-600"
                    }`
                  }
                >
                  {link.name}
                </NavLink>
              ))}
              <div className="h-px bg-gray-100 my-4" />
              <div className="flex flex-col gap-4">
                <span className="text-sm font-medium text-gray-400 uppercase tracking-widest">Faculty</span>
                <Link to="/HodDesk" className="text-xl font-medium text-gray-800 hover:text-blue-600">HOD Desk</Link>
                <Link to="/Teaching" className="text-xl font-medium text-gray-800 hover:text-blue-600">Teaching Staff</Link>
                <Link to="/NonTeaching" className="text-xl font-medium text-gray-800 hover:text-blue-600">Non-Teaching Staff</Link>
              </div>
              <div className="h-px bg-gray-100 my-4" />
              <Link
                to="/Contact"
                className="inline-flex items-center justify-center px-6 py-4 text-lg font-bold text-white bg-blue-600 rounded-xl shadow-md"
              >
                Contact Us
              </Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

      <CommandPalette isOpen={isCmdOpen} setIsOpen={setIsCmdOpen} />
    </>
  );
}
