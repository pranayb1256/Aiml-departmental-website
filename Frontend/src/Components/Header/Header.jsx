import { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import { Button } from "@mui/material";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [facultyOpen, setFacultyOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);

  // Detect screen size changes to toggle dropdown behavior
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  let hoverTimeout;
  const handleMouseEnter = () => {
    clearTimeout(hoverTimeout); // Prevent hiding if quickly re-hovered
    setFacultyOpen(true);
  };
  const handleMouseLeave = () => {
    hoverTimeout = setTimeout(() => {
      setFacultyOpen(false);
    }, 300); // Keep dropdown visible for 300ms after hover-out
  };
  return (
    <header className="sticky z-50 top-0">
      <nav className="px-4 lg:px-6 py-2.5">
        <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <img
              src="https://res.cloudinary.com/dzydycrjo/image/upload/v1745004394/cvnwsfj2a6bwqvupvky8.jpg"
              className="mr-3 h-12"
              alt="Logo"
            />
          </Link>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden text-gray-700"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            ☰
          </button>

          {/* Navigation Links */}
          <div
            className={`${
              menuOpen ? "block" : "hidden"
            } lg:flex lg:w-auto lg:order-1`}
          >
            <ul className="flex flex-col lg:flex-row lg:space-x-8 mt-4 lg:mt-0 font-medium">
              <li>
                <NavLink
                  to="/"
                  className={({ isActive }) =>
                    `block py-2 pr-4 pl-3 ${
                      isActive ? "text-black-700" : "text-gray-700"
                    } border-b lg:border-0 hover:text-blue-700 lg:p-0`
                  }
                >
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/about"
                  className={({ isActive }) =>
                    `block py-2 pr-4 pl-3 ${
                      isActive ? "text-black-700" : "text-gray-700"
                    } border-b lg:border-0 hover:text-blue-700 lg:p-0`
                  }
                >
                  About
                </NavLink>
              </li>

              {/* Faculty Dropdown */}
              <li
                className={`relative ${isMobile ? "" : "group"}`}
                onMouseEnter={!isMobile ? handleMouseEnter : undefined}
                onMouseLeave={!isMobile ? handleMouseLeave : undefined}
                onClick={() => isMobile && setFacultyOpen(!facultyOpen)}
              >
                <button className="block w-full text-left py-2 pr-4 pl-3 text-gray-700 border-b lg:border-0 lg:p-0 lg:hover:text-blue-700">
                  Faculty {isMobile ? (facultyOpen ? "▲" : "▼") : "▼"}
                </button>
                <ul
                  className={`lg:absolute left-0 mt-2 w-48 bg-white shadow-md 
                transition-opacity duration-300 ease-in-out transform 
                ${
                  facultyOpen
                    ? "opacity-100 visible scale-100"
                    : "opacity-0 invisible scale-95"
                } 
                ${isMobile ? (facultyOpen ? "block" : "hidden") : ""}`}
                >
                  <li>
                    <NavLink
                      to="/HodDesk"
                      className="block py-2 pr-4 pl-3 hover:bg-gray-50"
                    >
                      HOD Desk
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/Teaching"
                      className="block py-2 pr-4 pl-3 hover:bg-gray-50"
                    >
                      Teaching Staff
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/NonTeaching"
                      className="block py-2 pr-4 pl-3 hover:bg-gray-50"
                    >
                      Non-Teaching Staff
                    </NavLink>
                  </li>
                </ul>
              </li>

              <li>
                <NavLink
                  to="/Club"
                  className="block py-2 pr-4 pl-3 text-gray-700 border-b lg:border-0 hover:text-blue-700 lg:p-0"
                >
                  Clubs
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/Event"
                  className="block py-2 pr-4 pl-3 text-gray-700 border-b lg:border-0 hover:text-blue-700 lg:p-0"
                >
                  Events
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/Academics"
                  className="block py-2 pr-4 pl-3 text-gray-700 border-b lg:border-0 hover:text-blue-700 lg:p-0"
                >
                  Academics
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/Placements"
                  className="block py-2 pr-4 pl-3 text-gray-700 border-b lg:border-0 hover:text-blue-700 lg:p-0"
                >
                  Placements & Career Opportunities
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/Contact"
                  className="block py-2 pr-4 pl-3 text-gray-700 border-b lg:border-0 hover:text-blue-700 lg:p-0"
                >
                  Contact Us
                </NavLink>
              </li>
              <NavLink
              className="block py-2 pr-4 pl-3 text-gray-700 border-b lg:border-0 hover:text-blue-700 lg:p-0" to="/login">
                Login
              </NavLink>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
}
