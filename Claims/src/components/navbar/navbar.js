import React from "react";
import { NavLink } from "react-router-dom";
import "./navbar.css";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();
  return (
    <header className="border-b-4 border-slate-600 bg-color">
      <div className="max-w-full mx-auto">
        <div className="flex items-center px-3 lg:px-6 h-12">
          <div className="mr-4">
            <h1
              className="font-semibold text-white"
              onClick={() => navigate("/")}
            >
              Expleosurance Claims
            </h1>
          </div>
          <nav className="flex items-center gap-8 flex-1 text-sm overflow-x-auto ml-16 text-slate-50">
            {/* <NavDropdown label="Desktop" /> */}
            <NavLink
              to="/Claim"
              className={({ isActive, isPending }) =>
                isPending ? "pending" : isActive ? "nav-active" : ""
              }
            >
              Claim
            </NavLink>
            <NavLink
              to="/search"
              className={({ isActive, isPending }) =>
                isPending ? "pending" : isActive ? "nav-active" : ""
              }
            >
              Search
            </NavLink>
            <NavLink
              to="/contact"
              className={({ isActive, isPending }) =>
                isPending ? "pending" : isActive ? "nav-active" : ""
              }
            >
              Contact
            </NavLink>
            <NavLink
              to="/admin"
              className={({ isActive, isPending }) =>
                isPending ? "pending" : isActive ? "nav-active" : ""
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
