
import React, { useState, useEffect } from 'react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const closeDropdown = (event) => {
    if (!event.target.closest(".dropdown-container")) {
      setIsDropdownOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", closeDropdown);
    return () => {
      document.removeEventListener("click", closeDropdown);
    };
  }, []);

  return (
    <div>
      <nav className="relative bg-white flex items-center justify-between sm:h-10 py-10 px-4">
        <div className="flex items-center flex-1 md:absolute md:inset-y-0 md:left-0">
          <div className="flex items-center justify-between w-full md:w-auto">
            <a href="/" aria-label="Home">
              <span className="font-medium text-black hover:text-gray-900 transition duration-150 ease-in-out ml-5 text-2xl">Swissmote, Inc (EMS)</span>
            </a>
            <div className="-mr-2 flex items-center md:hidden">
              <button
                type="button"
                id="main-menu"
                aria-label="Main menu"
                aria-haspopup="true"
                onClick={toggleMenu}
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 focus:text-gray-500 transition duration-150 ease-in-out"
              >
                <svg stroke="currentColor" fill="none" viewBox="0 0 24 24" className="h-6 w-6">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  ></path>
                </svg>
              </button>
            </div>
          </div>
        </div>

        <div className="hidden md:flex md:space-x-10 md:mx-auto">
          <a href="/" className="font-tight text-black transition duration-150 ease-in-out">Home</a>
          <a href="/" className="font-tight text-black transition duration-150 ease-in-out">About</a>
          <a href="/" className="font-tight text-black transition duration-150 ease-in-out">Gallery</a>
          <a href="/" className="font-tight text-black transition duration-150 ease-in-out">Events</a>

        </div>

        <div className="md:flex md:items-center md:justify-end md:absolute md:inset-y-0 md:right-0 relative dropdown-container">
          <span className="inline-flex rounded-full shadow mr-4 relative">
            <button
              onClick={toggleDropdown}
              className="inline-flex items-center px-4 py-2 border border-transparent text-base leading-6 font-medium rounded-md text-white bg-blue-600 hover:bg-blue-500 focus:outline-none focus:border-blue-700 transition duration-150 ease-in-out"
            >
              Login
            </button>
            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-2 z-50">
                <a href="/login" className="block px-4 py-2 text-gray-800 hover:bg-gray-200">Login</a>
                <a href="/login" className="block px-4 py-2 text-gray-800 hover:bg-gray-200">Guest Login</a>
                <a href="/login" className="block px-4 py-2 text-gray-800 hover:bg-gray-200">Admin Login</a>
              </div>
            )}
          </span>
        </div>
      </nav>

      {isOpen && (
        <div className="md:hidden px-2 pt-2 pb-3 space-y-1 sm:px-3">
          <a href="/" className="block px-3 py-2 rounded-md text-base font-medium text-black hover:bg-gray-700 hover:text-white">Home</a>
          <a href="/" className="block px-3 py-2 rounded-md text-base font-medium text-black hover:bg-gray-700 hover:text-white">About</a>
          <a href="/" className="block px-3 py-2 rounded-md text-base font-medium text-black hover:bg-gray-700 hover:text-white">Gallery</a>
          <a href="/" className="block px-3 py-2 rounded-md text-base font-medium text-black hover:bg-gray-700 hover:text-white">Events</a>


        </div>
      )}
    </div>
  );
};

export default Navbar;
