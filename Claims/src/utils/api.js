import axios from "axios";

// Base URL comes from .env (REACT_APP_API_URL).
// For CRA the value is baked in at build time.
// The URL must include /api — e.g. http://10.192.190.158:5000/api
const BASE_URL =
  process.env.REACT_APP_API_URL || "http://10.192.190.158:5000/api";

const api = axios.create({ baseURL: BASE_URL });

// Attach JWT on every request
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// Global 401 handler — redirect to login
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

export default api;
