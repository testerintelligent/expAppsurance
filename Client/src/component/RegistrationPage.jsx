import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import axios from 'axios';

// Register New User page
const RegistrationPage = () => {
  //navigate Variables
  const navigate = useNavigate();
  //Usestae variables
  const [message, setMessage] = useState('');
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [submitted, setSubmitted] = useState(false);

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

  const handleSubmit = (event) => {
    event.preventDefault();
    axios.post('http://192.168.99.141:5000/register', formData)
      .then(response => {
        setMessage(response.data.message);
        setSubmitted(true);
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
    <div className='p-32 flex' style={{ backgroundColor: '#6946C6' }}>
      <div className=" lg:pl-14">
        <h2 className=" text-white uppercase font-semibold hover:text-black sm:text-4xl size-96 ">[Expleosurance]</h2>
        </div>
      <div className='flex justify-center h-100vh w-100vh'>
        <div className="rounded-lg uppercase w-96 border-2 border-black bg-white">
          <div className='font-semibold bg-[#6946C6] h-16 pt-5 mb-4 text-white rounded-t-md'>
            <h3>Create an Account</h3>
          </div>

          {submitted ? (
            <div className="success-message">
              <h2>Registration successful!</h2>
              <button className='navLogin' onClick={navigateLoginPage}>
                Navigate to login Page
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 mr-5">
              <div className="flex items-center">
                <label className="w-1/3 text-right pr-4" htmlFor="email">Email:</label>
                <input
                  className="w-2/3 border-2 border-black rounded-md p-2"
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>

              <div className="flex items-center">
                <label className="w-1/3 text-right pr-4 pt-2" htmlFor="password">Password:</label>
                <input
                  className="w-2/3 border-2 border-black rounded-md pt-2 p-2"
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                />
              </div>

              <div className="flex items-center">
                <label className="w-1/3 text-right pr-4" htmlFor="confirmPassword">Confirm Password:</label>
                <input
                  className="w-2/3 border-2 border-black rounded-md p-2"
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                />
              </div>

              <div className="flex justify-center">
                <button
                  type="submit"
                  className="mb-3 border-2 border-black p-2 rounded-md bg-violet-600 text-white hover:bg-white hover:text-black"
                >
                  Register
                </button>
              </div>
            </form>
          )}

          <p>{message}</p>
        </div>
      </div>
    </div>
  );
};

export default RegistrationPage;
