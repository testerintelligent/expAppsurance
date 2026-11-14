import { NavLink, useNavigate } from "react-router-dom";

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
          alt="ExpleoSurance logo"
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
          ExpleoSurance PricingCenter
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
    </header>
  );
}
