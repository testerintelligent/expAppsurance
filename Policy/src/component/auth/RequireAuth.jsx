// components/RequireAuth.jsx
import React from "react";
import { Navigate } from "react-router-dom";

export default function RequireAuth({ children }) {
  const token = localStorage.getItem("token");

  // If no token at all, redirect to login
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // Decode the JWT payload to check expiry (no library needed)
  try {
    const payloadBase64 = token.split(".")[1];
    const payload = JSON.parse(atob(payloadBase64));
    const isExpired = payload.exp && payload.exp * 1000 < Date.now();
    if (isExpired) {
      localStorage.removeItem("token");
      return <Navigate to="/login" replace />;
    }
  } catch (_) {
    // Malformed token — treat as invalid
    localStorage.removeItem("token");
    return <Navigate to="/login" replace />;
  }

  // Logged in, allow access
  return children;
}
