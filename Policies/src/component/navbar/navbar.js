import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { logout } from "../../utils/logout";

export default function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const navItems = [
    { label: "Dashboard", to: "/" },
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
        background: "#4f3597",
        padding: "0 16px 0 12px",
        zIndex: 100,
      }}
    >
      {/* Left: Title */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 10,
          paddingRight: 20,
          minHeight: 40,
          cursor: "pointer",
        }}
        onClick={() => navigate("/")}
      >
        <span style={{ fontSize: 14, fontWeight: 700, color: "#fff", whiteSpace: "nowrap" }}>
          ExpleoSurance PolicyCenter
        </span>
      </div>

      {/* Center: Nav links */}
      <nav
        style={{
          display: "flex",
          alignItems: "center",
          gap: 4,
          flex: 1,
          marginLeft: 16,
          fontSize: 13,
          overflowX: "auto",
        }}
      >
        {navItems.map((item) => (
          <NavLink
            key={item.label}
            to={item.to}
            style={({ isActive }) => ({
              textDecoration: "none",
              color: isActive ? "#fff" : "rgba(255,255,255,0.8)",
              padding: "6px 12px",
              fontWeight: isActive ? 700 : 500,
              background: isActive ? "rgba(255,255,255,0.18)" : "transparent",
              borderBottom: isActive ? "2px solid #fff" : "2px solid transparent",
              whiteSpace: "nowrap",
              fontSize: 13,
            })}
          >
            {item.label}
          </NavLink>
        ))}
      </nav>

      {/* Right: Notification + Logout */}
      <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
        <div style={{ position: "relative", cursor: "pointer" }}>
          <NotificationsIcon style={{ color: "#fff", fontSize: 20 }} />
        </div>
        <button
          onClick={handleLogout}
          style={{
            background: "transparent",
            border: "none",
            color: "#fff",
            fontWeight: 600,
            cursor: "pointer",
            fontSize: 13,
            padding: "4px 0",
          }}
        >
          Logout
        </button>
      </div>
    </header>
  );
}
