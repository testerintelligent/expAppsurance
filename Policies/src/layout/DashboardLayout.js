import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../component/navbar/navbar";
import Sidebar from "./sidebar";

const DashboardLayout = () => {
  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh", background: "#eef1f4" }}>
      <Navbar />

      <div style={{ display: "flex", flex: 1, minHeight: 0 }}>
        <Sidebar />

        <main style={{ flex: 1, overflow: "auto", background: "#eff3f6" }}>
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
