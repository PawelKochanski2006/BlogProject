import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    { path: "/", label: "Strona główna" },
    { path: "/blog", label: "Blog" },
    { path: "/gallery", label: "Galeria" },
  ];

  return (
    <header className="bg-gray-800 text-white shadow-md">
      <div className="container mx-auto flex items-center justify-between py-4 px-4">
        {/* Logo */}
        <div className="text-2xl font-bold">
          <Link to="/">TERRA LIVING</Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-6">
          {navLinks.map(({ path, label }) => (
            <NavLink
              key={path}
              to={path}
              className={({ isActive }) =>
                `hover:underline transition ${
                  isActive ? "text-blue-400 font-semibold" : ""
                }`
              }
              end
            >
              {label}
            </NavLink>
          ))}
        </nav>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden text-2xl focus:outline-none"
          onClick={() => setIsMenuOpen((prev) => !prev)}
          aria-expanded={isMenuOpen}
          aria-label="Toggle menu"
        >
          <i className={`fas ${isMenuOpen ? "fa-times" : "fa-bars"}`}></i>
        </button>
      </div>

      {/* Mobile Navigation */}
      <div
        className={`md:hidden bg-gray-800 text-white space-y-2 px-4 py-4 transition-transform duration-300 ease-in-out ${
          isMenuOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0 overflow-hidden"
        }`}
      >
        {navLinks.map(({ path, label }) => (
          <NavLink
            key={path}
            to={path}
            className={({ isActive }) =>
              `block px-4 py-2 rounded hover:bg-gray-700 ${
                isActive ? "bg-gray-700 text-blue-400 font-semibold" : ""
              }`
            }
            end
            onClick={() => setIsMenuOpen(false)}
          >
            {label}
          </NavLink>
        ))}
      </div>
    </header>
  );
};

export default Header;
