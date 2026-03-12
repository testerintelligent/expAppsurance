// components/RequireAuth.jsx
import React from "react";
import { Navigate } from "react-router-dom";

export default function RequireAuth({ children }) {
  const token = localStorage.getItem("token"); // or from context/store

  if (!token) {
    // Not logged in, redirect to login
    return <Navigate to="/login" replace />;
  }

  // Logged in, allow access
  return children;
}
