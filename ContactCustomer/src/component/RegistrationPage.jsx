import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import axios from 'axios';

const RegistrationPage = () => {
  const navigate = useNavigate();
  const [message, setMessage] = useState('');
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [showPopup, setShowPopup] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const navigateLoginPage = () => {
    navigate('/');
  };

  const validateForm = () => {
    let errors = {};
    if (!formData.email.trim()) {
      errors.email = 'Email is required';
    }
    if (!formData.password.trim()) {
      errors.password = 'Password is required';
    }
    if (formData.password !== formData.confirmPassword) {
      errors.confirmPassword = 'Passwords do not match';
    }
    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!validateForm()) return;
    
    axios.post(`http://10.192.190.148:5000/register`, formData)
      .then(response => {
        setMessage(response.data.message);
        setSubmitted(true);
        setShowPopup(true);
        setTimeout(() => {
          setShowPopup(false);
          navigateLoginPage();
        }, 2000);
        setFormData({
          email: '',
          password: '',
          confirmPassword: '',
        });
      })
      .catch(error => {
        setMessage(error.response ? error.response.data.message : 'An error occurred');
      });
  };

  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500">
      <div className="border-2 shadow-xl bg-white rounded-xl p-10 max-w-md w-full text-center">
        <h1 className="text-3xl font-bold text-gray-700 mb-6">Create an Account</h1>
        {submitted && showPopup && (
          <div className="bg-green-500 text-white p-4 rounded-lg mb-4">
            Registration successful! Redirecting...
          </div>
        )}
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            className="w-full p-3 rounded-lg border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-700"
            type="email"
            id="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
          />
          {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
          <input
            className="w-full p-3 rounded-lg border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-700"
            type="password"
            id="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
          />
          {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
          <input
            className="w-full p-3 rounded-lg border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-700"
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            placeholder="Confirm Password"
            value={formData.confirmPassword}
            onChange={handleChange}
          />
          {errors.confirmPassword && <p className="text-red-500 text-sm">{errors.confirmPassword}</p>}
          <button
            type="submit"
            className="w-full py-3 bg-purple-700 text-white rounded-lg hover:bg-purple-800 transition-all"
          >
            Register
          </button>
        </form>
        <p className="mt-4 text-red-500">{message}</p>
      </div>
    </div>
  );
};

export default RegistrationPage;
