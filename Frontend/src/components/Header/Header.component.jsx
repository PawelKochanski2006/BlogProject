import React, { useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { isAuthenticated, logout, user } = useAuth();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isDropdownOpen && !event.target.closest('.user-menu')) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [isDropdownOpen]);

  const handleLogout = async (e) => {
    e.preventDefault();
    if (window.confirm('Czy na pewno chcesz się wylogować?')) {
      logout();
      setIsDropdownOpen(false);
    }
  };

  const getNavLinks = () => {
    const baseLinks = [
      { path: '/', label: 'Strona główna' },
      { path: '/gallery', label: 'Galeria' },
    ];

    return baseLinks;
  };

  const navLinks = getNavLinks();

  const UserMenu = () => (
    <div className="user-menu relative">
      <button
        onClick={(e) => {
          e.stopPropagation();
          setIsDropdownOpen(!isDropdownOpen);
        }}
        className="flex items-center space-x-1 hover:text-blue-400"
      >
        <span>Cześć, {user?.username || 'Użytkowniku'}</span>
        <i className={`fas fa-chevron-${isDropdownOpen ? 'up' : 'down'}`}></i>
      </button>

      {isDropdownOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50">
          <button
            onClick={handleLogout}
            className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-100"
          >
            Wyloguj się
          </button>
        </div>
      )}
    </div>
  );

  return (
    <header className="bg-gray-800 text-white shadow-md">
      <div className="container mx-auto flex items-center justify-between py-4 px-6 md:pb-0.128 md:pt-6">
        {/* Logo */}
        <div className="text-2xl font-bold">
          <Link to="/">TERRA LIVING</Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          {navLinks.map(({ path, label }) => (
            <NavLink
              key={path}
              to={path}
              className={({ isActive }) =>
                `hover:underline transition ${isActive ? 'text-blue-400 font-semibold' : ''}`
              }
              end
            >
              {label}
            </NavLink>
          ))}
          {isAuthenticated ? (
            <UserMenu />
          ) : (
            <NavLink
              to="/login"
              className={({ isActive }) =>
                `hover:underline transition ${isActive ? 'text-blue-400 font-semibold' : ''}`
              }
            >
              Zaloguj się
            </NavLink>
          )}
        </nav>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden text-2xl focus:outline-none"
          onClick={() => setIsMenuOpen(prev => !prev)}
          aria-expanded={isMenuOpen}
          aria-label="Toggle menu"
        >
          <i className={`fas ${isMenuOpen ? 'fa-times' : 'fa-bars'}`}></i>
        </button>
      </div>

      {/* Mobile Navigation */}
      <div
        className={`md:hidden bg-gray-800 text-white space-y-2 px-4 py-4 transition-transform duration-300 ease-in-out ${
          isMenuOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0 overflow-hidden'
        }`}
      >
        {navLinks.map(({ path, label }) => (
          <NavLink
            key={path}
            to={path}
            onClick={() => setIsMenuOpen(false)}
            className={({ isActive }) =>
              `block px-4 py-2 rounded hover:bg-gray-700 ${
                isActive ? 'bg-gray-700 text-blue-400 font-semibold' : ''
              }`
            }
            end
          >
            {label}
          </NavLink>
        ))}
        {isAuthenticated ? (
          <div className="px-4 py-2">
            <div className="font-semibold mb-2">Cześć, {user?.username || 'Użytkowniku'}</div>
            <button
              onClick={handleLogout}
              className="w-full text-left py-2 px-4 rounded hover:bg-gray-700"
            >
              Wyloguj się
            </button>
          </div>
        ) : (
          <NavLink
            to="/login"
            onClick={() => setIsMenuOpen(false)}
            className={({ isActive }) =>
              `block px-4 py-2 rounded hover:bg-gray-700 ${
                isActive ? 'bg-gray-700 text-blue-400 font-semibold' : ''
              }`
            }
          >
            Zaloguj się
          </NavLink>
        )}
      </div>
    </header>
  );
};

export default Header;
