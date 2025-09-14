import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

export default function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);

    // Get user data from localStorage if available
    const user = JSON.parse(localStorage.getItem("user") || "null");
    setUserData(user);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setIsLoggedIn(false);
    setUserData(null);
    window.location.href = "/login"; // redirect after logout
  };

  return (
    <div className="navbar bg-black absolute right-1/2 left-1/2 -translate-x-1/2 shadow-md z-100 text-white w-[90%] m-auto h-16 rounded-b-4xl pl-5">
      {/* Left side - Logo */}
      <div className="navbar-start">
        <Link to="/" className="text-xl font-bold text-blue-600">
          PURA
        </Link>
      </div>

      {/* Center - Navigation Links */}
      <div className="navbar-center hidden md:flex">
        <ul className="menu menu-horizontal px-1 gap-4">
          <li>
            <Link to="/" className="hover:text-blue-600">
              Home
            </Link>
          </li>
          <li>
            <Link to="/about" className="hover:text-blue-600">
              About
            </Link>
          </li>
          <li>
            <Link to="/services" className="hover:text-blue-600">
              Services
            </Link>
          </li>
          <li>
            <Link to="/contact" className="hover:text-blue-600">
              Contact
            </Link>
          </li>
          {isLoggedIn && (
            <li>
              <Link to="/rooms" className="hover:text-blue-600">
                Book Now
              </Link>
            </li>
          )}
        </ul>
      </div>

      {/* Right side - Auth & Actions */}
      <div className="navbar-end flex gap-4 items-center">
        {/* Mobile menu button */}
        <div className="dropdown dropdown-end md:hidden">
          <label tabIndex={0} className="btn btn-ghost btn-circle">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </label>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
          >
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
            <li>
              <Link to="/services">Services</Link>
            </li>
            <li>
              <Link to="/contact">Contact</Link>
            </li>
            {isLoggedIn && (
              <li>
                <Link to="/rooms">Book Now</Link>
              </li>
            )}
            {isLoggedIn ? (
              <>
                <li>
                  <Link to="/profile">Profile</Link>
                </li>
                <li>
                  <button onClick={handleLogout} className="text-red-500">
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <li>
                <Link to="/login">Login</Link>
              </li>
            )}
          </ul>
        </div>

        {/* Desktop Auth Section */}
        <div className="hidden md:flex items-center gap-4">
          {isLoggedIn ? (
            <>
              {/* Logout Button */}
              <button
                onClick={handleLogout}
                className="btn btn-primary hidden sm:inline-flex"
              >
                Logout
              </button>

              {/* Profile Button */}
              <Link to="/profile">
                <div className="btn btn-ghost btn-circle avatar">
                  <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white">
                    {userData?.username?.charAt(0)?.toUpperCase() ||
                      userData?.email?.charAt(0)?.toUpperCase() || (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-6 w-6"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                          />
                        </svg>
                      )}
                  </div>
                </div>
              </Link>
            </>
          ) : (
            <div className="flex items-center gap-4">
              <Link
                to="/login"
                className="hover:text-blue-600 transition-colors"
              >
                Login
              </Link>
              <Link to="/register" className="btn btn-outline btn-primary">
                Sign Up
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
