import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "./navbar.css";
import { logout } from "../../utils/logout";

export default function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const navItems = [
    { label: "Desktop", to: "/" },
    { label: "Account", to: "/account" },
    { label: "Policy", to: "/policy" },
    { label: "Contact", to: "/contact" },
    { label: "Search", to: "/policy" },
    { label: "Administration", to: "/admin" },
  ];

  return (
    <header
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        minHeight: 52,
        background: "#f3f3f5",
        borderBottom: "1px solid #d0d5db",
        boxShadow: "inset 0 -1px 0 #dadde2",
        padding: "0 12px 0 10px",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", flex: 1, minWidth: 0 }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            paddingRight: 18,
            borderRight: "1px solid #d8dbe0",
            minHeight: 40,
            color: "#2b3f59",
            fontWeight: 700,
          }}
        >
          <div
            style={{
              width: 18,
              height: 18,
              borderRadius: 4,
              background: "linear-gradient(135deg, #0b6ab7, #2ea3d8)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "white",
              fontSize: 11,
              fontWeight: 700,
            }}
          >
            E
          </div>
          <span
            style={{ fontSize: 13, cursor: "pointer" }}
            onClick={() => navigate("/")}
          >
            ExpleoSurance Policy
          </span>
        </div>

        <nav
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            flexWrap: "wrap",
            marginLeft: 18,
            fontSize: 12,
            color: "#4f5f6e",
          }}
        >
          {navItems.map((item) => (
            <NavLink
              key={item.label}
              to={item.to}
              style={({ isActive }) => ({
                textDecoration: "none",
                color: isActive ? "#1f3a5a" : "#3f5367",
                padding: "8px 10px",
                borderRadius: 4,
                fontWeight: isActive ? 600 : 500,
                background: isActive ? "#e8eef5" : "transparent",
              })}
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: 10, marginLeft: 16 }}>
        <div
          style={{
            width: 20,
            height: 20,
            borderRadius: 4,
            border: "1px solid #ccd3dc",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#4e5d6d",
            fontSize: 12,
          }}
        >
          ⏰
        </div>
        <button
          onClick={handleLogout}
          style={{
            background: "transparent",
            border: "none",
            color: "#3d5367",
            fontWeight: 600,
            cursor: "pointer",
            fontSize: 12,
          }}
        >
          Logout
        </button>
      </div>
    </header>
  );
}
