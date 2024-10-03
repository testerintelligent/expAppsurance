import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import axios from 'axios';



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
    <div className=' flex justify-center h-100vh w-100vh p-14'>
    <div className=" rounded-lg  uppercase   w-96 border-2 border-black bg-white ">
      
     
     <div className=' font-semibold bg-[#6946C6] h-16 pt-5 text-white rounded-t-md'>
     <h3 className=''>Create an Account</h3>
     </div>
       
        {submitted?(
          <div className="success-message"><h2>Registration successful!</h2>
           <button className='navLogin' onClick={navigateLoginPage}>Navigate to login Page
           </button>
         
          </div>
        ):(
          <form onSubmit={handleSubmit}>
            <div className='flex-col'>
              <div className='text-right '>
              <label className='p-3' htmlFor="">First Name:</label>   
              <input
            className='border-2 border-black m-2 rounded-md '
              type="text"
              id="firstName"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
            />
              </div >
            <div className='flex-col'>
            <label  className='p-3' htmlFor="lastName">Last Name:</label>
            <input
              className='border-2 border-black m-2 rounded-md '
              type="text"
              id="lastName"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
            />
            </div>
            <div className='flex-col'>
            <label className='p-3' htmlFor="email">Email:</label>
            <input
              className='border-2 border-black m-2 rounded-md '
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
            </div>
            <div className='flex-col'>
            <label className='p-3' htmlFor="Password">Password:</label>
            <input
              className='border-2 border-black m-2 rounded-md '
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
            />
            </div>
            <div className='flex-col'>
            <label className='p-3' htmlFor="confirmPassword">CheckPassword:</label>
            <input
              className='border-2 border-black m-2 rounded-md '
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
            />
            </div>
            <div className='flex-col'>
            <label className='p-3' htmlFor="startDate">startDate:</label>
            <input
            className='border-2 border-black m-2 rounded-md '
            type="Date"
            id="startDate"
            name="startDate"
            value={formData.startDate}
            onChange={handleChange}
          />
            </div>
            <div className='flex-col'>
            <label className='p-3' htmlFor="endDate">EndDate:</label>
            <input
            className='border-2 border-black m-2 rounded-md '
            type="Date"
            id="endDate"
            name="endDate"
            value={formData.endDate}
            onChange={handleChange}
          />
            </div>
            <div className='flex-col'>
            <label className='p-3' htmlFor="address">Address:</label>
            <input
            className='border-2 border-black m-2 rounded-md '
            type="text"
            id="address"
            name="address"
            value={formData.address}
            onChange={handleChange}
          />
            </div>
          <div className='flex-col'>
          <label className='p-3' htmlFor="phoneNumber">PhoneNumber:</label>
          <input
            className='border-2 border-black m-2 rounded-md '
            type="text"
            id="phoneNumber"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
          />
          </div>
          <div>
            
          </div>
            </div>
          
         <button type="submit" className=' mb-2 border-2 border-black p-2 rounded-md bg-violet-600 text-white hover:bg-white hover:text-black'>Register</button>
        </form>
       
      )}
       { <p>{message}
       </p>}
      </div>  
    </div>
   
  );
}

export default RegistrationPage;
