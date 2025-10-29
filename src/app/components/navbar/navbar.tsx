"use client";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import React, { useState, useEffect, useRef } from "react";

// Child component for session-dependent rendering
const AuthSection = () => {
  const { data: session, status } = useSession();
  console.log("Session data in Navbar:", session);
  console.log("Session status in Navbar:", status);

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // -----------------------------------------------------------------
  // Click-outside handler
  // -----------------------------------------------------------------
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };

    if (isDropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isDropdownOpen]);

  const toggleDropdown = () => setIsDropdownOpen((v) => !v);

  if (status === "loading") return null;

  const handleSignOut = async () => {
    await signOut({ callbackUrl: "/auth/login" });
  };
  if (session) {
    return (
      <div ref={dropdownRef} className="relative">
        {/* // <button
        //   className="cursor-pointer py-1.5 px-3 text-center border rounded-md hover:bg-red-700 dark:text-white dark:bg-red-500 hidden lg:block"
        //   onClick={handleSignOut}
        //   aria-label="Sign out"
        // >
        //   Sign Out
        // </button> */}

        <button
          className="cursor-pointer flex text-sm bg-gray-800 rounded-full focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600 text-gray-300"
          id="user-menu-button"
          onClick={toggleDropdown}
          aria-expanded={isDropdownOpen}
          data-dropdown-toggle="user-dropdown"
          data-dropdown-placement="bottom"
          aria-haspopup="true"
        >
          <span className="sr-only">Open user menu</span>
          <Image
            className="w-10 h-10 rounded-full"
            src={
              session?.user?.image ||
              "https://flowbite.com/docs/images/people/profile-picture-5.jpg"
            } 
            alt="User avatar"
            width={32}
            height={32}
          />
        </button>

        {isDropdownOpen && (
          <div
            className="absolute mt-2 right-0 w-64 text-base list-none bg-white rounded-md shadow-md dark:bg-gray-800 ring-1 ring-black ring-opacity-5 focus:outline-none z-50"
            id="user-dropdown"
          >
            {/* User Info */}
            <div className="px-4 py-3 flex items-center space-x-3 bg-gray-900 rounded-t-lg">
              <Image
                className="w-10 h-10 rounded-full"
                src={
                  session?.user?.image ||
                  "https://flowbite.com/docs/images/people/profile-picture-5.jpg"
                } 
                alt="User avatar"
                width={40}
                height={40}
              />
              <div>
                <span className="block text-sm font-semibold text-white">
                  {session?.user?.name || "Jese Leos"}
                </span>
                <span className="block text-xs text-gray-400 truncate">
                  {session?.user?.email || "jese@flowbite.com"}
                </span>
              </div>

              {/* cross icon to close */}
              <button
                onClick={() => setIsDropdownOpen(false)}
                className="text-gray-400 hover:text-white"
              >
                <svg
                  className="mb-5 w-6 h-6 cursor-pointer"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            <ul className="py-2 space-y-2">
              <li>
                <Link
                  href="/profile"
                  className="flex items-center px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 dark:hover:text-white transition-colors"
                >
                  <svg
                    className="w-5 h-5 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  Your Profile
                </Link>
              </li>
              {/* <li>
                    <Link href="/favouriteitems" className="flex items-center px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 dark:hover:text-white transition-colors">
                      <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                      </svg>
                      Favourite items
                    </Link>
                  </li> */}
            </ul>

            {/* Settings */}
            <ul className="py-2 border-t border-gray-700">
              <li>
                <Link
                  href="/settings"
                  className="flex items-center px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 dark:hover:text-white transition-colors"
                >
                  <svg
                    className="w-5 h-5 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                  Settings
                </Link>
              </li>
            </ul>

            {/* Log Out */}
            <ul className="py-2 border-t border-gray-700">
              <li>
                <button
                  onClick={handleSignOut}
                  className="cursor-pointer flex items-center px-4 py-2 text-sm text-red-500 hover:bg-red-900 dark:hover:text-white transition-colors w-full text-left"
                >
                  <svg
                    className="w-5 h-5 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                    />
                  </svg>
                  Log out
                </button>
              </li>
            </ul>
          </div>
        )}
      </div>
    );
  }

  return (
    <>
      <Link href="/auth/login">
        <button
          className="cursor-pointer py-1.5 px-3 text-center border rounded-md hover:bg-indigo-700 dark:text-white dark:bg-indigo-600 hidden lg:block"
          aria-label="Log in"
        >
          Log in
        </button>
      </Link>
      <Link
        href="/auth/signup"
        className="py-1.5 px-3 text-center border dark:border-indigo-600 rounded-md hover:bg-gray-100 dark:text-indigo-700 hidden lg:inline-block"
        aria-label="Sign up"
      >
        Sign Up
      </Link>
    </>
  );
};

// Child component for mobile auth section
const MobileAuthSection = () => {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return null;
  }

  const handleSignOut = async () => {
    await signOut({ callbackUrl: "/auth/login" });
  };

  return (
    <>
      {session ? (
        <button
          className="w-[97.6%] h-11 block m-1 border-gray-300 border rounded-md hover:bg-red-700 dark:text-white dark:bg-red-500 px-4 py-3 mb-3 text-sm text-center font-semibold"
          onClick={handleSignOut}
          aria-label="Sign out"
        >
          Sign Out
        </button>
      ) : (
        <>
          <Link
            href="/auth/login"
            className="block m-1 border-gray-300 border rounded-md hover:bg-indigo-700 dark:text-white dark:bg-indigo-600 px-4 py-3 mb-3 text-sm text-center font-semibold"
            aria-label="Log in"
          >
            Log in
          </Link>
          <Link
            href="/auth/signup"
            className="block m-1 border rounded-md px-4 py-3 mb-2 text-xs text-center font-semibold border-gray-300 hover:bg-gray-600 dark:text-indigo-700"
            aria-label="Sign up"
          >
            Sign Up
          </Link>
        </>
      )}
    </>
  );
};

const Navbar = () => {
  const [isDarkMode, setIsDarkMode] = useState(false); // Default to false for SSR consistency
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Initialize dark mode only on client-side
  useEffect(() => {
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;
    setIsDarkMode(prefersDark);
    document.documentElement.classList.toggle("dark", prefersDark);
  }, []);

  const toggleTheme = () => {
    setIsDarkMode((prev) => {
      const newMode = !prev;
      document.documentElement.classList.toggle("dark", newMode);
      return newMode;
    });
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen((prev) => !prev);
  };

  return (
    <>
      <nav className="relative px-4 py-2 flex justify-between items-center bg-white dark:bg-white border-b-2 dark:border-gray-200 shadow-md">
        <Link href="/" className="text-3xl font-bold dark:text-indigo-600">
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
                  xmlSpace="preserve"
                >
                  <path d="M55.146,51.887L41.588,37.786c3.486-4.144,5.396-9.358,5.396-14.786c0-12.682-10.318-23-23-23s-23,10.318-23,23 s10.318,23,23,23c4.761,0,9.298-1.436,13.177-4.162l13.661,14.208c0.571,0.593,1.339,0.92,2.162,0.92 c0.779,0,1.518-0.297,2.079-0.837C56.255,54.982,56.293,53.08,55.146,51.887z M23.984,6c9.374,0,17,7.626,17,17s-7.626,17-17,17 s-17-7.626-17-17S14.61,6,23.984,6z" />
                </svg>
              </button>
            </div>
          </li>
        </ul>
        <div className="hidden lg:flex items-center space-x-4">
          <Link href="/cart">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="cursor-pointer w-10 h-10 text-indigo-700 p-1"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
              />
            </svg>
          </Link>
          <button
            id="theme-toggle"
            type="button"
            className="cursor-pointer py-1.5 px-3 text-center border border-indigo-700 rounded-md dark:bg-gray-600 hover:bg-gray-800 dark:text-gray-300"
            onClick={toggleTheme}
            aria-label="Toggle theme"
          >
            <svg
              id="theme-toggle-dark-icon"
              className={`w-5 h-6 ${isDarkMode ? "" : "hidden"}`}
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
            </svg>
            <svg
              id="theme-toggle-light-icon"
              className={`w-5 h-6 ${isDarkMode ? "hidden" : ""}`}
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
          <AuthSection />
        </div>
      </nav>

      {/* Mobile navbar */}
      <div
        className={`navbar-menu relative z-50 ${
          isMobileMenuOpen ? "" : "hidden"
        }`}
      >
        <div className="navbar-backdrop fixed inset-0 bg-gray-800 opacity-50" />
        <nav className="fixed bg-white dark:bg-gray-500 top-0 left-0 bottom-0 flex flex-col w-5/6 max-w-sm py-6 px-6 border-r overflow-y-auto">
          <div className="flex items-center mb-8">
            <Link
              href="/"
              className="mr-auto text-2xl font-bold dark:text-indigo-600"
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
                xmlSpace="preserve"
              >
                <path d="M55.146,51.887L41.588,37.786c3.486-4.144,5.396-9.358,5.396-14.786c0-12.682-10.318-23-23-23s-23,10.318-23,23 s10.318,23,23,23c4.761,0,9.298-1.436,13.177-4.162l13.661,14.208c0.571,0.593,1.339,0.92,2.162,0.92 c0.779,0,1.518-0.297,2.079-0.837C56.255,54.982,56.293,53.08,55.146,51.887z M23.984,6c9.374,0,17,7.626,17,17s-7.626,17-17,17 s-17-7.626-17-17S14.61,6,23.984,6z" />
              </svg>
            </button>
          </div>
          <div className="mt-auto">
            <div className="pt-6">
              <Link href="/cart">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-[97.6%] h-11 cursor-pointer mb-3 flex justify-center items-center py-1.5 px-3 m-1 text-center bg-gray-100 border border-gray-300 rounded-md text-black hover:bg-gray-100 dark:text-gray-300 dark:bg-gray-700 dark:hover:bg-gray-700"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
                  />
                </svg>
              </Link>
              <button
                id="theme-toggle-2"
                type="button"
                className="w-[97.6%] h-11 cursor-pointer mb-3 flex justify-center items-center py-1.5 px-3 m-1 text-center bg-gray-100 border border-gray-300 rounded-md text-black hover:bg-gray-100 dark:text-gray-300 dark:bg-gray-700 dark:hover:bg-gray-700"
                onClick={toggleTheme}
                aria-label="Toggle theme"
              >
                <svg
                  id="theme-toggle-dark-icon-2"
                  className={`w-6 h-6 ${isDarkMode ? "" : "hidden"}`}
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                </svg>
                <svg
                  id="theme-toggle-light-icon-2"
                  className={`w-6 h-6 ${isDarkMode ? "hidden" : ""}`}
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
              <MobileAuthSection />
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
