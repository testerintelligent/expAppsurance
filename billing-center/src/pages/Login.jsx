import React, { useState } from "react";
import { TextField, Button, Paper, Typography } from "@mui/material";
import axios from "axios";
import PublicLayout from "../layout/PublicLayout";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const navigate = useNavigate();
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:5000/api/register/login",
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
            onChange={handleChange}
          />
          <TextField
            label="Password"
            type="password"
            name="password"
            fullWidth
            onChange={handleChange}
          />
          <Button
            type="submit"
            variant="contained"
            className="bg-purple-800 hover:bg-purple-900"
          >
            Sign In
          </Button>
        </form>
      </Paper>
    </PublicLayout>
  );
}
