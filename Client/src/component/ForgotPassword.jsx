import React, { useState } from 'react';
import axios from 'axios';
import "../style/ForgotPassword.css"

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState('');
  const [securityAnswer, setSecurityAnswer] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/forgot-password', {
        email,
        securityAnswer,
        newPassword,
      });
      setMessage(response.data);
    } catch (error) {
      setMessage('Error resetting password');
    }
  };

  return (
    <div className="forgot-password-page">
      <h1>Forgot Password</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label className='passLabel'>Email:</label>
          <input className='passInput' type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
        
        <div className="form-group">
          <label className='passLabel'>New Password:</label>
          <input className='passInput' type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} required />
        </div>
        <div className="form-group">
          <label className='passLabel'>Confirm Password:</label>
          <input className='passInput' type="text" value={securityAnswer} onChange={(e) => setSecurityAnswer(e.target.value)} required />
        </div>
        <button className='passButton' type="submit">Reset Password</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default ForgotPasswordPage;
