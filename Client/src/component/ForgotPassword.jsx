import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [message, setMessage] = useState('');
  const [errors, setErrors] = useState({});
  const [showPopup, setShowPopup] = useState(false);
  const [showErrorPopup, setShowErrorPopup] = useState(false);
  const navigate = useNavigate();

  const validateForm = () => {
    let errors = {};
    if (!email.trim()) {
      errors.email = 'Email is required';
    }
    if (!newPassword.trim()) {
      errors.newPassword = 'New password is required';
    }
    if (newPassword !== confirmPassword) {
      errors.confirmPassword = 'Passwords do not match';
    }
    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      setShowErrorPopup(true);
      setTimeout(() => setShowErrorPopup(false), 2000);
      return;
    }

    try {
      const response = await axios.post('http://10.192.190.148:5000/forgot-password', {
        email,
        newPassword,
      });
      setMessage(response.data.message);
      setShowPopup(true);
      setTimeout(() => {
        setShowPopup(false);
        navigate('/');
      }, 2000);
    } catch (error) {
      setMessage('Error resetting password');
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500">
      <div className="border-2 shadow-xl bg-white rounded-xl p-10 max-w-md w-full text-center">
        <h1 className="text-3xl font-bold text-gray-700 mb-6">Forgot Password</h1>
        {showPopup && (
          <div className="bg-green-500 text-white p-4 rounded-lg mb-4">
            Password reset successful! Redirecting...
          </div>
        )}
        {showErrorPopup && (
          <div className="bg-red-500 text-white p-4 rounded-lg mb-4">
            Please fill in all required fields correctly!
          </div>
        )}
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            className="w-full p-3 rounded-lg border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
            type="email"
            placeholder="Enter your email here..."
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
          <input
            className="w-full p-3 rounded-lg border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
            type="password"
            placeholder="Enter your new password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
          {errors.newPassword && <p className="text-red-500 text-sm">{errors.newPassword}</p>}
          <input
            className="w-full p-3 rounded-lg border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
            type="password"
            placeholder="Confirm your new password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
          {errors.confirmPassword && <p className="text-red-500 text-sm">{errors.confirmPassword}</p>}
          <button
            className="w-full py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-all"
            type="submit"
          >
            Reset Password
          </button>
        </form>
        <p className="mt-4 text-red-500">{message}</p>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;