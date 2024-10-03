import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import '../style/RegistrationPage.css'; 


const RegistrationPage = () => {
  
  const navigate = useNavigate();
  const [message, setMessage] = useState('');
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    startDate: '',
    endDate: '',
    address: '',
    phoneNumber: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const navigateLoginPage=()=>{
    navigate('/');
  }
  const handleSubmit=(event)=>{
    {<div>
      <h5>{message}</h5>
          </div>
  }
    event.preventDefault();
    axios.post('http://192.168.99.141:5000/register', formData)
      .then(response => {
        setMessage(response.data.message);
        setSubmitted(true);
        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          password: '',
          confirmPassword: '',
          startDate: '',
          endDate: '',
          address: '',
          phoneNumber: '',
       } );
      })
      .catch(error => {
        setMessage(error.response ? error.response.data.message : 'An error occurred');
      });
  };
    


  
  return (
    <div className=' flex justify-center'>
    <div className="p-7 rounded-t-lg  uppercase bg-violet-600 h-100%">
      
      <div className='bg-white rounded-md p-5 w-96'>
     <div className=' font-semibold'>
     <h3 className='registerTitle'>Create an Account</h3>
     </div>
       
        {submitted?(
          <div className="success-message"><h2>Registration successful!</h2>
           <button className='navLogin' onClick={navigateLoginPage}>Navigate to login Page
           </button>
         
          </div>
        ):(
          <form onSubmit={handleSubmit}>
          <div className="registerinput">
            <label htmlFor="firstName">First Name:</label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
            />
          </div>
          <div className="registerinput">
            <label htmlFor="lastName">Last Name:</label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
            />
            <div className="registerinput">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
          </div>
          <div className="registerinput">
          <label htmlFor="Password">Password:</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
            />
          </div>
          <div className="registerinput">
          <label htmlFor="confirmPassword">ConfirmPassword:</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
            />
          </div>
          <div className="registerinput">
          <label htmlFor="startDate">startDate:</label>
          <input
            type="Date"
            id="startDate"
            name="startDate"
            value={formData.startDate}
            onChange={handleChange}
          />
        </div>
        <div className="registerinput">
          <label htmlFor="endDate">EndDate:</label>
          <input
            type="Date"
            id="endDate"
            name="endDate"
            value={formData.endDate}
            onChange={handleChange}
          />
        </div>
        <div className="registerinput">
          <label htmlFor="address">Address:</label>
          <input
            type="text"
            id="address"
            name="address"
            value={formData.address}
            onChange={handleChange}
          />
        </div>
        <div className="registerinput">
          <label htmlFor="phoneNumber">PhoneNumber:</label>
          <input
            type="text"
            id="phoneNumber"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
          />
        </div>
          </div>
          <button type="submit" className='border-2 border-black p-2 rounded-md bg-violet-600 text-white hover:bg-white hover:text-black'>Register</button>
        </form>
       
      )}
       { <p>{message}
       </p>}
      </div>  
    </div>
    </div>
  );
}

export default RegistrationPage;
