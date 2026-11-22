import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/navbar/navbar";
import Sidebar from "./sidebar";

// Same shell as the Policy app: top navbar, collapsible sidebar, content area.
const DashboardLayout = () => {
  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh", background: "#eef1f4" }}>
      <Navbar />

      <div style={{ display: "flex", flex: 1, minHeight: 0 }}>
        <Sidebar />

        <main style={{ flex: 1, minWidth: 0, overflow: "auto", background: "#eff3f6" }}>
          <div className="policy-screen-shell">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
