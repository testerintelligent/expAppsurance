import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


const ForgotPasswordPage = () => {
  const [email, setEmail] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate=useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setMessage('New password and confirm password do not match.');
      return;
    }

    try {
      const response = await axios.post('http://192.168.99.141:5000/forgot-password', {
        email,
        newPassword,
      });
      setMessage(response.data.message);
    } catch (error) {
      setMessage('Error resetting password');
    }
    navigate('/');
  };

  return (
    <div className="bg-[#6946C6] p-7 flex ">
       
      <div className='  h-90 w-96  border-2  border-black rounded-lg bg-white'>
        <div className='bg-[#6946C6] h-12 rounded-t-md '>
        <h1 className='font-semibold uppercase pt-3 text-white'>Forgot Password</h1>
        </div>
     
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label className='passLabel pl-6'>Email:</label>
          <input
            className='p-2 border-2 ml-6 border-black w-72 rounded-md h-10 mr-2'
            type="email"
            placeholder='Enter your email here...'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label className='passLabel pl-6'>New Password:</label>
          <input
            className='p-2 border-2 ml-6 border-black w-72 rounded-md h-10  mr-2 '
            type="password"
            placeholder='Enter your new password'
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label className='passLabel pl-6'>Confirm Password:</label>
          <input
            className='p-2 border-2 ml-6 border-black w-72 rounded-md h-10  mr-2'
            type="password"
            placeholder='Confirm your new password'
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>
        <button className='border-2 bg-white border-black p-3 rounded-md text-black hover:bg-[#6946C6] hover:text-white mt-2 mb-2' type="submit">Reset Password</button>
      </form>
      {message && <p>{message}</p>}
      </div>
      <div className=" lg:pl-96">
        <h2 className=" text-white uppercase font-semibold hover:text-black sm:text-4xl size-96 mr-7 pr-10">[Expleosurance]</h2>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
