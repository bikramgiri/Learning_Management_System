'use client';
import Link from 'next/link';
import { useState, useEffect } from 'react';

const Navbar = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    setIsDarkMode(prefersDark);
    document.documentElement.classList.toggle('dark', prefersDark);
  }, []);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle('dark', !isDarkMode);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <>
      <nav className="relative px-4 py-2 flex justify-between items-center bg-white dark:bg-white border-b-2 dark:border-gray-200">
        <Link href='/' className="text-3xl font-bold dark:text-indigo-600">
          Learning <span className="dark:text-gray-800">Hub</span>
        </Link>
        <div className="lg:hidden">
          <button
            className="cursor-pointer navbar-burger flex items-center text-violet-600 dark:text-gray-500 p-1"
            id="navbar_burger"
            onClick={toggleMobileMenu}
            aria-label="Toggle mobile menu"
          >
            <svg
              className="cursor-pointer block h-6 w-6 fill-current"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <title>Hamburger menu</title>
              <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
            </svg>
          </button>
        </div>
        <ul className="hidden absolute top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2 lg:mx-auto lg:flex lg:items-center lg:w-auto lg:space-x-6">
          <li>
            <div className="relative mx-auto text-gray-600">
              <input
                className="border border-gray-300 placeholder-current h-10 px-5 pr-60 rounded-lg text-sm focus:outline-none dark:bg-white dark:border-gray-400 dark:text-gray-500"
                type="search"
                name="search"
                placeholder="Search"
              />
              <button
                type="submit"
                className="absolute right-0 top-0 mt-3 mr-4"
                aria-label="Search"
              >
                <svg
                  className="cursor-pointer text-gray-600 dark:text-gray-500 h-4 w-4 fill-current"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 56.966 56.966"
                  // style={{ enableBackground: 'new 0 0 56.966 56.966' }}
                  xmlSpace="preserve"
                >
                  <path d="M55.146,51.887L41.588,37.786c3.486-4.144,5.396-9.358,5.396-14.786c0-12.682-10.318-23-23-23s-23,10.318-23,23 s10.318,23,23,23c4.761,0,9.298-1.436,13.177-4.162l13.661,14.208c0.571,0.593,1.339,0.92,2.162,0.92 c0.779,0,1.518-0.297,2.079-0.837C56.255,54.982,56.293,53.08,55.146,51.887z M23.984,6c9.374,0,17,7.626,17,17s-7.626,17-17,17 s-17-7.626-17-17S14.61,6,23.984,6z" />
                </svg>
              </button>
            </div>
          </li>
        </ul>
        <div className="hidden lg:flex">
          <a href="#">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5"
            stroke="currentColor" className="cursor-pointer w-10 h-10 text-indigo-700 p-1 mr-4">
            <path strokeLinecap="round" strokeLinejoin="round"
              d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
            </svg>
          </a>
          <button
            id="theme-toggle"
            type="button"
            className="cursor-pointer lg:inline-block lg:ml-auto py-1.5 px-3 m-1 text-center border border-indigo-700 rounded-md dark:bg-gray-700 hover:bg-gray-800 dark:text-indigeo-700"
            onClick={toggleTheme}
            aria-label="Toggle theme"
          >
            <svg
              id="theme-toggle-dark-icon"
              className={`w-5 h-6 ${isDarkMode ? '' : 'hidden'}`}
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
            </svg>
            <svg
              id="theme-toggle-light-icon"
              className={`w-5 h-6 ${isDarkMode ? 'hidden' : ''}`}
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
                fillRule="evenodd"
                clipRule="evenodd"
              />
            </svg>
          </button>
          <a href="/login">
            <button
              className="cursor-pointer py-1.5 px-3 m-1 text-center border rounded-md hover:bg-indigo-700 dark:text-white dark:bg-indigo-600 hidden lg:block"
            >
              Log in
            </button>
          </a>
          <a
              className="py-1.5 px-3 m-1 text-center border dark:border-indigo-600 rounded-md hover:bg-gray-100 dark:text-indigo-700 hidden lg:inline-block"
              href="#"
            >
              Sign Up
          </a>
        </div>
      </nav>

      {/* Mobile navbar */}
      <div className={`navbar-menu relative z-50 ${isMobileMenuOpen ? '' : 'hidden'}`}>
        <div className="navbar-backdrop fixed inset-0 bg-gray-00 opacity-50" />
        <nav className="fixed bg-white dark:bg-gray-500 top-0 left-0 bottom-0 flex flex-col w-5/6 max-w-sm py-6 px-6 border-r overflow-y-auto">
          <div className="flex items-center mb-8">
            <Link
              className="mr-auto text-2xl font-bold dark:text-indigo-600"
              href="/"
            >
              Learning <span className="dark:text-gray-800">Hub</span>
            </Link>
            <button
              className="navbar-close"
              onClick={toggleMobileMenu}
              aria-label="Close mobile menu"
            >
              <svg
                className="h-6 w-6 text-gray-300 cursor-pointer hover:text-gray-700"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
          <div className="relative mx-auto text-gray-600">
            <input
              className="border-2 border-gray-300 bg-white h-10 px-5 pr-16 rounded-lg text-sm focus:outline-none dark:placeholder-gray-200 dark:bg-gray-500 dark:border-gray-50"
              type="search"
              name="search"
              placeholder="Search"
            />
            <button
              type="submit"
              className="absolute right-0 top-0 mt-3 mr-4"
              aria-label="Search"
            >
              <svg
                className="text-gray-600 cursor-pointer dark:text-gray-200 h-4 w-4 fill-current"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 56.966 56.966"
                // style={{ enableBackground: 'new 0 0 56.966 56.966' }}
                xmlSpace="preserve"
              >
                <path d="M55.146,51.887L41.588,37.786c3.486-4.144,5.396-9.358,5.396-14.786c0-12.682-10.318-23-23-23s-23,10.318-23,23 s10.318,23,23,23c4.761,0,9.298-1.436,13.177-4.162l13.661,14.208c0.571,0.593,1.339,0.92,2.162,0.92 c0.779,0,1.518-0.297,2.079-0.837C56.255,54.982,56.293,53.08,55.146,51.887z M23.984,6c9.374,0,17,7.626,17,17s-7.626,17-17,17 s-17-7.626-17-17S14.61,6,23.984,6z" />
              </svg>
            </button>
          </div>
          <div className="mt-auto">
            <div className="pt-6">
            <a href="#">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5"
                  stroke="currentColor" className="w-[97.6%] h-11 cursor-pointer mb-3 flex justify-center items-center py-1.5 px-3 m-1 text-center bg-gray-100 border border-gray-300 rounded-md text-black hover:bg-gray-100 dark:text-gray-300 dark:bg-gray-700 dark:hover:bg-gray-700">
                  <path strokeLinecap="round" strokeLinejoin="round"
                    d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
                </svg>
              </a>
              <button
                id="theme-toggle-2"
                type="button"
                className="w-[97.6%] h-11 cursor-pointer mb-3 flex justify-center items-center py-1.5 px-3 m-1 text-center bg-gray-100 border border-gray-300 rounded-md text-black hover:bg-gray-100 dark:text-gray-300 dark:bg-gray-700 dark:hover:bg-gray-700"
                onClick={toggleTheme}
                aria-label="Toggle theme"
              >
                <svg
                  id="theme-toggle-dark-icon-2"
                  className={`w-6 h-6 ${isDarkMode ? '' : 'hidden'}`}
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                </svg>
                <svg
                  id="theme-toggle-light-icon-2"
                  className={`w-6 h-6 ${isDarkMode ? 'hidden' : ''}`}
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
                    fillRule="evenodd"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
              <a
                className="block m-1 border-gray-300 border rounded-md hover:bg-indigo-700 dark:text-white dark:bg-indigo-600 px-4 py-3 mb-3 text-sm text-center font-semibold"
                href="#"
              >
                Log in
              </a>
              <a
                className="block m-1 border rounded-md px-4 py-3 mb-2 text-xs text-center font-semibold border-gray-300 hover:bg-gray-600"
                href="#"
              >
                Sign Up
              </a>
            </div>
            <p className="my-4 text-xs text-center text-gray-300">
              <span>Learning Hub © 2025</span>
            </p>
          </div>
        </nav>
      </div>
    </>
  );
};

export default Navbar;