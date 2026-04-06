import React, { useState } from "react";
import { TextField, Button, Paper, Typography } from "@mui/material";
import axios from "axios";
import PublicLayout from "../../layout/PublicLayout";
import { useNavigate, Link } from "react-router-dom";

export default function LoginPage() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const validateForm = () => {
    const newErrors = { email: "", password: "" };
    let isValid = true;

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
      isValid = false;
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "Invalid email format";
      isValid = false;
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = "Password is required";
      isValid = false;
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return; // stop if invalid
    try {
      const res = await axios.post(
        "http://10.192.190.158:5000/api/register/login",
        formData
      );
      const token = res.data;
      localStorage.setItem("token", token);
      navigate("/");
    } catch (err) {
      alert(err.response?.data || "Login failed");
    }
  };

  return (
    <PublicLayout>
      <Paper elevation={10} className="p-12 w-96 rounded-2xl">
        <Typography
          variant="h6"
          className="text-center font-bold text-purple-900 mb-8"
        >
          Welcome Back
        </Typography>
        <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
          <TextField
            label="Email"
            name="email"
            fullWidth
            value={formData.email}
            onChange={handleChange}
            error={!!errors.email}
            helperText={errors.email}
          />
          <TextField
            label="Password"
            type="password"
            name="password"
            fullWidth
            value={formData.password}
            onChange={handleChange}
            error={!!errors.password}
            helperText={errors.password}
          />
          <Button
            type="submit"
            variant="contained"
            className="bg-purple-800 hover:bg-purple-900"
          >
            Sign In
          </Button>
          <div className="text-center mt-4">
            <Typography variant="body2">
              Don’t have an account?{" "}
              <Link to="/signup" className="text-purple-800 font-bold">
                Sign Up
              </Link>
            </Typography>
          </div>
        </form>
      </Paper>
    </PublicLayout>
  );
}
