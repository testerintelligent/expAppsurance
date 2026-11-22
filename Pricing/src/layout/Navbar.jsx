import { NavLink, useNavigate } from "react-router-dom";
import { SvgIcon } from "@mui/material";

// Inline Material "Notifications" icon: @mui/icons-material is not a dependency of this app.
const NotificationsIcon = (props) => (
  <SvgIcon {...props}>
    <path d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.89 2 2 2m6-6v-5c0-3.07-1.64-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.63 5.36 6 7.92 6 11v5l-2 2v1h16v-1z" />
  </SvgIcon>
);

const navItems = [{ label: "Rate Tables", to: "/" }];

export default function Navbar() {
  const navigate = useNavigate();

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
        <img
          src="/i.png?v=2"
          alt="EXurance logo"
          style={{ width: 32, height: 32, objectFit: "contain", background: "transparent" }}
        />
        <span
          style={{
            fontSize: 14,
            fontWeight: 700,
            color: "#fff",
            whiteSpace: "nowrap",
          }}
        >
          EXurance Pricing
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
            end
            style={({ isActive }) => ({
              textDecoration: "none",
              color: isActive ? "#fff" : "rgba(255,255,255,0.8)",
              padding: "6px 12px",
              fontWeight: isActive ? 700 : 500,
              background: isActive ? "rgba(255,255,255,0.18)" : "transparent",
              borderBottom: isActive
                ? "2px solid #fff"
                : "2px solid transparent",
              whiteSpace: "nowrap",
              fontSize: 13,
            })}
          >
            {item.label}
          </NavLink>
        ))}
      </nav>

      {/* Right: Notification */}
      <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
        <div style={{ position: "relative", cursor: "pointer" }}>
          <NotificationsIcon style={{ color: "#fff", fontSize: 20 }} />
        </div>
      </div>
    </header>
  );
}
