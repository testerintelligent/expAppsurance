import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from 'uuid';


//User use valid Credentials to Enter the application
const LoginPage = () => {
  //Use uuid value as a session key
  const uuid = uuidv4();

  //navigate variables
  const navigate = useNavigate();

  //usestate variables
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  //Login page Methods
  const handleLogin = async () => {
    // Input validation for null values
    if (username === '' || password === '') {
      setError('Username and password are required');
      return; 
    }
    try {
      const response = await axios.post(`http://192.168.99.141:5000/home`, {
        username,
        password,
      });
      console.log('Response:', response);

      if (response.status === 200) {
        const sessionKey = uuid;
        console.log(uuid);
        sessionStorage.setItem('sessionKey', sessionKey);
        navigate('/Dashboard');
      }
    } catch (error) {
      setError('Invalid username or password');
    }

    // Clear input fields
    setUsername('');
    setPassword('');
  };

  return (
    <div className="flex  text-center justify-center  rounded-lg ">
      <div className="border-2 h-96 mt-32  w-120 m-9   border-black shadow-2xl bg-white rounded-lg">
        <div className="text-center  ">
        <h1 className="p-7 rounded-t-md font-text-lg font-black  justify-center text-white uppercase bg-[#6946C6] text-xl">Sign in</h1>
        </div>
       <div className="p-7">
        <div className=" text-center m-2 ">
          <input
            type="text"
            className="bg-white h-7 w-80  p-5  mt-3 rounded-md border-2  border-black text-black "
            id="username"
            name="username"
            placeholder="Email Address"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="text-center m-2">
          <input
            type="password"
            className=" bg-white h-7 w-80  p-5  mt-3 rounded-md border-2  border-black text-black "
            id="Password"
            name="Password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <button type="submit" className="m-2 border-2  h-7 w-20 text-center hover:text-black text-white bg-violet-600  hover:bg-white border-black rounded-lg " onClick={handleLogin}>
          Submit
        </button>
        <a href="/register" className="text-black">
          <h4 className="m-2 hover:text-slate-400 ">Register new account</h4>
        </a>
        <a href="/forgotPassword" className="text-black">
          <h4 className="hover:text-slate-400 pb-3">Forgot password ?</h4>
        </a>
      </div>
      </div>
      <div className="flex-col-reverse ">
        <h2 className=" justify-end text-white uppercase font-semibold hover:text-black text-4xl size-96 pt-4 pl-64">[Expleosurance]</h2>
      </div>
    </div>
  );
};

export default LoginPage;
