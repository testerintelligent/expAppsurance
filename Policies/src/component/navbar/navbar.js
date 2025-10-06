import React from "react";
import IconButton from "@mui/material/IconButton";
import Box from "@mui/material/Box";
import SaveIcon from "@mui/icons-material/Save";
import SettingsIcon from "@mui/icons-material/Settings";
import SearchIcon from "@mui/icons-material/Search";
import InputBase from "@mui/material/InputBase";
import { NavLink } from "react-router-dom";
import './navbar.css';

export default function Navbar() {
  
  return (
    <header className="border-b-4 border-slate-600 bg-blue-500">
      <div className="max-w-full mx-auto">
        <div className="flex items-center px-3 lg:px-6 h-12">
          <div className="mr-4">
            <p className="text-sm text-slate-50">
              ExpleoSurance <span className="text-slate-50">Policy</span>
            </p>
          </div>
          <nav className="flex items-center gap-8 flex-1 text-sm overflow-x-auto ml-16 text-slate-50">
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
