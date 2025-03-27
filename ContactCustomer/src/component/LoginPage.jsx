import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from 'uuid';


const LoginPage = () => {
 
  const uuid = uuidv4();
  const navigate = useNavigate();

  const [email, setemail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async () => {
    if (email === '' || password === '') {
      setError('email and password are required');
      return;
    }
    try {
      const response = await axios.post(`http://10.192.190.148:5000/home`, {
        email,
        password,
      });
      console.log('Response:', response);

      if (response && response.status === 200) {
        const sessionKey = uuid;
        console.log(uuid);
        sessionStorage.setItem('sessionKey', sessionKey);
        navigate('/Dashboard');
      }
    } catch (error) {
      setError('Invalid email or password');
      setemail('');
      setPassword('');
    }
    setemail('');
    setPassword('');
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500">
      <div className="border-2 shadow-xl bg-white rounded-xl p-10 max-w-md w-full text-center">
        <h1 className="text-3xl font-bold text-gray-700 mb-6">Sign In</h1>
        <div className="space-y-4">
          <input
            type="text"
            className="w-full p-3 rounded-lg border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
            id="email"
            name="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setemail(e.target.value)}
          />
          <input
            type="password"
            className="w-full p-3 rounded-lg border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
            id="Password"
            name="Password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {error && <p className="text-red-500">{error}</p>}
          <button
            type="submit"
            className="w-full py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-all"
            onClick={handleLogin}
          >
            Submit
          </button>
        </div>
        <div className="mt-4">
          <a href="/register" className="text-purple-700 hover:underline">Register new account</a>
        </div>
        <div className="mt-2">
          <a href="/forgotPassword" className="text-purple-700 hover:underline">Forgot password?</a>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
