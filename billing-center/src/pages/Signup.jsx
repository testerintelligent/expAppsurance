import React, { useState } from "react";
import { TextField, Button, Paper, Typography } from "@mui/material";
import axios from "axios";
import PublicLayout from "../layout/PublicLayout";
import { useNavigate, Link } from "react-router-dom";

export default function SignupPage() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({
    username: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    const newErrors = { username: "", email: "", password: "" };
    let isValid = true;

    // Username: required, min 3 chars
    if (!formData.username.trim()) {
      newErrors.username = "Username is required";
      isValid = false;
    } else if (formData.username.trim().length < 3) {
      newErrors.username = "Username must be at least 3 characters";
      isValid = false;
    }

    // Email: required, basic regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
      isValid = false;
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "Email is invalid";
      isValid = false;
    }

    // Password: required, min 6 chars (example)
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    try {
      const res = await axios.post(
        "http://10.192.190.158:5000/api/register/signup",
        formData
      );
      const token = res.headers["x-auth-token"];
      localStorage.setItem("token", token);
      navigate("/");
    } catch (err) {
      alert(err.response?.data || "Signup failed");
    }
  };

  return (
    <PublicLayout>
      <Paper elevation={10} className="p-12 w-96 rounded-2xl">
        <Typography
          variant="h6"
          className="text-center font-bold text-purple-900 mb-8"
        >
          Create Account
        </Typography>
        <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
          <TextField
            label="Username"
            name="username"
            variant="outlined"
            fullWidth
            onChange={handleChange}
            value={formData.username}
            error={!!errors.username}
            helperText={errors.username}
          />
          <TextField
            label="Email"
            name="email"
            variant="outlined"
            fullWidth
            onChange={handleChange}
            value={formData.email}
            error={!!errors.email}
            helperText={errors.email}
          />
          <TextField
            label="Password"
            name="password"
            type="password"
            variant="outlined"
            fullWidth
            onChange={handleChange}
            value={formData.password}
            error={!!errors.password}
            helperText={errors.password}
          />
          <Button
            type="submit"
            variant="contained"
            className="!bg-violet-900 hover:bg-purple-900"
          >
            Sign Up
          </Button>
          <div className="text-center mt-4">
            <Typography variant="body2">
              Already have an account?{" "}
              <Link to="/login" className="text-purple-800 font-bold">
                Sign In
              </Link>
            </Typography>
          </div>
        </form>
      </Paper>
    </PublicLayout>
  );
}
