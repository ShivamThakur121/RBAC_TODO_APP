import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { user, logout } = useAuth();

  return (
    <nav className=" bg-green-950/5 backdrop-blur-sm">
      <div className="max-w-4xl mx-auto px-4 py-3 flex flex-col sm:flex-row justify-between items-center">
        <Link to="/" className="font-semibold text-indigo-200 text-[36px]">
          RBAC Todo
        </Link>

        <div className="flex items-center gap-4 flex-col sm:flex-row">
          {user && (
            <>
              <span className="text-[16px] text-indigo-100">
                {user.username} ({user.role})
              </span>

              <Link to="/" className="text-[18px] text-indigo-100 hover:underline">
                Dashboard
              </Link>

              {user.role === "admin" && (
                <Link to="/admin" className="text-[18px] text-indigo-100 hover:underline">
                  Admin
                </Link>
              )}

              <button
                className="text-[18px] text-red-600 hover:underline"
                onClick={logout}
              >
                Logout
              </button>
            </>
          )}

          {!user && (
            <>
              <Link to="/login" className="text-lg hover:underline text-blue-600">
                Login
              </Link>
              <Link to="/register" className="text-lg hover:underline text-blue-600">
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
