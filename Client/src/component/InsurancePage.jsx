import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../style/InsurancePage.css';
import Navbar from './NavBar';

const InsurancePage = () => {
  const [Message, setMessage] = useState('');
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const [insuranceData, setInsuranceData] = useState({
    Name: '',
    email: '',
    Address: '',
    DateOfBirth: '',
    PolicyType: '',
    SumInsured: '',
    Premium: '',
  });

  useEffect(() => {
    const sessionKey = sessionStorage.getItem('sessionKey');
    if (!sessionKey) {
      navigate('/');
    }
  }, [navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInsuranceData({
      ...insuranceData,
      [name]: value,
    });
  };

  const validateFields = () => {
    let errors = {};
    if (!insuranceData.Name.trim()) {
      errors.Name = '*Name is required';
    }
    if (!insuranceData.email.trim()) {
      errors.email = '*Email is required';
    } else if (!/\S+@\S+\.\S+/.test(insuranceData.email)) {
      errors.email = '*Email is invalid';
    }
    if (!insuranceData.Address.trim()) {
      errors.Address = '*Address is required';
    }
    if (!insuranceData.DateOfBirth) {
      errors.DateOfBirth = '*Date of Birth is required';
    }
    if (!insuranceData.PolicyType) {
      errors.PolicyType = '*Please select a Policy Type';
    }
    if (!insuranceData.SumInsured) {
      errors.SumInsured = '*Please select Sum Insured';
    }
    if (!insuranceData.Premium.trim()) {
      errors.Premium = '*Premium is required';
    } else if (isNaN(insuranceData.Premium) || parseFloat(insuranceData.Premium) <= 0) {
      errors.Premium = '*Premium must be a positive number';
    }
    setErrors(errors);
    return Object.keys(errors).length === 0; 
  };

  const handleInsurance = (event) => {
    event.preventDefault();
  
    if (validateFields()) {
      axios.post('http://192.168.99.141:5000/Dashboard', insuranceData)
        .then(response => {
          console.log(response.data);
          setMessage(response.data.message || 'Policy created successfully.');
          setInsuranceData({
            Name: '',
            email: '',
            Address: '',
            DateOfBirth: '',
            PolicyType: '',
            SumInsured: '',
            Premium: '',
          });
          navigate('/Dashboard');
        })
        .catch(error => {
          console.log("Error:", error);
          if (error.response && error.response.data.message) {
            setMessage(error.response.data.message);
          } else {
            setMessage('An error occurred. Please try again.');
          }
        });
    } else {
      console.log("Validation failed");
    }
  };

  const handleDashboardButton = () => {
    const sessionKey = sessionStorage.getItem('sessionKey');
    if (!sessionKey) {
      navigate('/Dashboard');
    }
   // navigate('/Dashboard');
  };

  return (
    <div className="insurance-page">
      <Navbar/>
      <h1>Insurance Policy Details</h1>
      <button className='insuranceDashboardButton' type="submit" onClick={handleDashboardButton}>Go to Dashboard</button>
      <form className="insurance-form" onSubmit={handleInsurance}>
        <button className='insuranceButton' type="submit">Submit</button>
      </form>
      {Message && <p>{Message}</p>}
    </div>
  );
};

export default InsurancePage;
