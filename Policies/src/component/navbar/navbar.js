import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import './navbar.css';

export default function Navbar() {
  const navigate = useNavigate();

  return (
    <header className="border-b-4 border-slate-600 bg-blue-500 relative">
      <div className="max-w-full mx-auto">
        <div className="flex items-center px-3 lg:px-6 h-12">
          <div className="mr-4">
            <h1 className="font-semibold text-white" onClick={() => navigate("/")}>Expleosurance Policy</h1>
          </div>
          <nav className="flex items-center gap-8 flex-1 text-sm ml-16 text-slate-50 overflow-visible">
            {/* <NavDropdown label="Desktop" /> */}
            <NavLink
              to="/account"
              className={({ isActive, isPending }) =>
                isPending ? "pending" : isActive ? "active" : ""
              }
            >
              Account
            </NavLink>
            <NavLink
              to="/policy"
              className={({ isActive, isPending }) =>
                isPending ? "pending" : isActive ? "active" : ""
              }
            >
              Policy
            </NavLink>
            <NavLink
              to="/contact"
              className={({ isActive, isPending }) =>
                isPending ? "pending" : isActive ? "active" : ""
              }
            >
              Contact
            </NavLink>
            <NavLink
              to="/admin"
              className={({ isActive, isPending }) =>
                isPending ? "pending" : isActive ? "active" : ""
              }
            >
              Administration
            </NavLink>
          </nav>
        </div>
      </div>
    </header>
  );
}
