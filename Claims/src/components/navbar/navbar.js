import React from "react";
import { NavLink } from "react-router-dom";
import "./navbar.css";

export default function Navbar() {
  return (
    <header className="border-b-4 border-slate-600 bg-blue-500">
      <div className="max-w-full mx-auto">
        <div className="flex items-center px-3 lg:px-6 h-12">
          <div className="mr-4">
            <h1 className="font-semibold text-white">Expleosurance Claims</h1>
          </div>
          <nav className="flex items-center gap-8 flex-1 text-sm overflow-x-auto ml-16 text-slate-50">
            {/* <NavDropdown label="Desktop" /> */}
            <NavLink
              to="/Claim"
              className={({ isActive, isPending }) =>
                isPending ? "pending" : isActive ? "active" : ""
              }
            >
              Claim
            </NavLink>
            <NavLink
              to="/search"
              className={({ isActive, isPending }) =>
                isPending ? "pending" : isActive ? "active" : ""
              }
            >
              Search
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
