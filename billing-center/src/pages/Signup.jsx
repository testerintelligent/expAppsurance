import React, { useState } from "react";
import { TextField, Button, Paper, Typography } from "@mui/material";
import axios from "axios";
import PublicLayout from "../layout/PublicLayout";
import { useNavigate } from "react-router-dom";

export default function SignupPage() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
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
          variant="h4"
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
          />
          <TextField
            label="Email"
            name="email"
            variant="outlined"
            fullWidth
            onChange={handleChange}
          />
          <TextField
            label="Password"
            name="password"
            type="password"
            variant="outlined"
            fullWidth
            onChange={handleChange}
          />
          <Button
            type="submit"
            variant="contained"
            className="bg-purple-800 hover:bg-purple-900"
          >
            Sign Up
          </Button>
        </form>
      </Paper>
    </PublicLayout>
  );
}
