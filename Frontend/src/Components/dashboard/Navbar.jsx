import React from "react";
import { Link, useNavigate } from "react-router-dom";
import useCheck from "../hooks/useCheck.js";
import Logout from "../auth/Logout.jsx";

const Navbar = () => {
  const navigate = useNavigate();
  const username = useCheck();
  return (
    <div>
      {username ? (
        <div>
          <nav className="bg-gray-800 p-4">
            <div className="container mx-auto flex items-center justify-between">
              <Link to="/" className="text-white font-bold text-xl">
                My Website
              </Link>

              <div className="flex items-center gap-3">
                <div className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                  <Logout/>
                </div>
              </div>
            </div>
          </nav>
        </div>
      ) : (
        <div>
          <nav className="bg-gray-800 p-4">
            <div className="container mx-auto flex items-center justify-between">
              <Link to="/" className="text-white font-bold text-xl">
                My Website
              </Link>

              <div className="flex items-center gap-3">
                <Link
                  to="/login"
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                  Login
                </Link>
                <Link
                  to="/"
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                  Sign Up
                </Link>
              </div>
            </div>
          </nav>
        </div>
      )}
    </div>
  );
};

export default Navbar;
