import React from "react";
import { NavLink, useLocation } from "react-router-dom";

const Sidebar = () => {
  const location = useLocation();

  const menuItems = [
    { label: "Activities", path: "/" },
    { label: "Accounts", path: "/account" },
    { label: "Submissions", path: "/new-submission" },
    { label: "Renewals", path: "/renewals" },
    { label: "Other Policy Transactions", path: "/transactions" },
  ];

  const policySummaryMenu = [
    { label: "Change Policy", path: "/policy-summary/change" },
    { label: "Reinstate Policy", path: "/policy-summary/reinstate" },
    { label: "Cancel Policy", path: "/policy-summary/cancel" },
  ];

  const navItems = location.pathname.startsWith("/policy-summary") ? policySummaryMenu : menuItems;

  return (
    <aside
      style={{
        width: 214,
        background: "#e9edf1",
        borderRight: "1px solid #d0d7de",
        display: "flex",
        flexDirection: "column",
        color: "#3d4c5d",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "12px 12px 8px",
          borderBottom: "1px solid #d0d7de",
          background: "#edf1f5",
          fontWeight: 700,
          fontSize: 12,
          color: "#2e3e4c",
        }}
      >
        
      </div>

      <div style={{ padding: "8px 0 0" }}>
        {navItems.map((item, index) => (
          <NavLink
            key={index}
            to={item.path}
            style={{ textDecoration: "none" }}
          >
            {({ isActive }) => (
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "8px 12px",
                  margin: "0 6px 2px",
                  borderRadius: 4,
                  background: isActive ? "#dbe5f0" : "transparent",
                  color: isActive ? "#1d3348" : "#3d5164",
                  fontSize: 12,
                  fontWeight: isActive ? 600 : 500,
                  borderLeft: isActive ? "3px solid #5f7ea4" : "3px solid transparent",
                }}
              >
                <span>{item.label}</span>
                {index === 0 && (
                  <span style={{ color: "#f0ad4e", fontSize: 14 }}>★</span>
                )}
              </div>
            )}
          </NavLink>
        ))}
      </div>

      <div style={{ marginTop: "auto", borderTop: "1px solid #d0d7de", padding: 8 }}>
        <div style={{ width: "100%", height: 10, background: "#dfe5eb", borderRadius: 3 }} />
      </div>
    </aside>
  );
};

export default Sidebar;