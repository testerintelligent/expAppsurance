import axios from "axios";

// ─── Shared axios instance ───────────────────────────────────────────────────
// All API modules import this instead of creating their own axios calls.
// The base URL is read from .env so a single change updates the entire app.

const BASE_URL =
  process.env.REACT_APP_API_URL || "http://10.192.190.158:5000";

const api = axios.create({ baseURL: BASE_URL });

// Attach JWT to every outgoing request
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Global 401 handler — clear bad token and redirect to login
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("token");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export const PRICING_BASE_URL =
  process.env.REACT_APP_PRICING_URL || "http://10.192.190.158:5001";

export default api;
