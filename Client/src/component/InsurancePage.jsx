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
    CurrentDate: new Date(),
    Name: '',
    email: '',
    Address: '',
    DateOfBirth: '',
    PolicyType: [], // Change to an array for multiple selections
    SumInsured: '',
    Premium: '',
    Gender: '', // Add Gender field
  });

  useEffect(() => {
    const sessionKey = sessionStorage.getItem('sessionKey');
    if (!sessionKey) {
      navigate('/');
    }
  }, [navigate]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === 'checkbox') {
      const updatedPolicyTypes = checked
        ? [...insuranceData.PolicyType, value]
        : insuranceData.PolicyType.filter(policy => policy !== value);
      setInsuranceData({ ...insuranceData, PolicyType: updatedPolicyTypes });
    } else if (name === 'Gender') {
      setInsuranceData({ ...insuranceData, [name]: value });
    } else {
      setInsuranceData({ ...insuranceData, [name]: value });
    }
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
    if (insuranceData.PolicyType.length === 0) {
      errors.PolicyType = '*Please select at least one Policy Type';
    }
    if (!insuranceData.SumInsured) {
      errors.SumInsured = '*Please select Sum Insured';
    }
    if (!insuranceData.Premium.trim()) {
      errors.Premium = '*Premium is required';
    } else if (isNaN(insuranceData.Premium) || parseFloat(insuranceData.Premium) <= 0) {
      errors.Premium = '*Premium must be a positive number';
    }
    if (!insuranceData.Gender) {
      errors.Gender = '*Gender is required';
    }
    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleInsurance = (event) => {
    event.preventDefault();
    if (validateFields()) {
      axios.post('http://192.168.99.141:5000/Dashboard', insuranceData)
        .then(response => {
          setMessage(response.data.message || 'Policy created successfully.');
          setInsuranceData({
            CurrentDate: '',
            Name: '',
            email: '',
            Address: '',
            DateOfBirth: '',
            PolicyType: [],
            SumInsured: '',
            Premium: '',
            Gender: '',
          });
          const sessionKey = sessionStorage.getItem('sessionKey');
          if (!sessionKey) {
            navigate('/Dashboard');
          }
        })
        .catch(error => {
          if (error.response && error.response.data.message) {
            setMessage(error.response.data.message);
          } else {
            setMessage('An error occurred. Please try again.');
          }
        });
    }
  };

  const handleDashboardButton = () => {
    const sessionKey = sessionStorage.getItem('sessionKey');
    if (sessionKey) {
      navigate('/Dashboard');
    } else {
      navigate('/');
    }
  };

  return (
    <div className="insurance-page">
      <Navbar />
      <h1>Insurance Policy Details</h1>
      <form  onSubmit={handleInsurance}>
        <div className="insurance-form">
        <div className='labels-fields'>
            <label className="insuranceLabel" htmlFor="Name">Name: </label>
            <label className="insuranceLabel" htmlFor="email">Email:  </label>
            <label className="insuranceLabel" htmlFor="Address">Address:  </label>
            <label className="insuranceLabel" htmlFor="DateOfBirth">Date of Birth:  </label>
            <label className="insuranceLabel">Gender:    </label>
            <label className="insuranceLabel">Policy Type:   </label>
            <label className="insuranceLabel" htmlFor="SumInsured">Sum Insured:  </label>
            <label className="insuranceLabel" htmlFor="Premium">Premium:  </label>

        </div>
        <div className='inputFields'>
        <div className="form-group">
           <input className='insuranceInput' type="text" id="Name" onChange={handleChange} name="Name" value={insuranceData.Name} />
          {errors.Name && <p className="error">{errors.Name}</p>}
        </div>
        <div className="form-group">
         <input className='insuranceInput' type="email" id="email" onChange={handleChange} name="email" value={insuranceData.email} />
         {errors.email && <p className="error">{errors.email}</p>}
        </div>
        <div className="form-group">
         <input className='insuranceInput' type="text" id="Address" onChange={handleChange} name="Address" value={insuranceData.Address} />
           {errors.Address && <p className="error">{errors.Address}</p>}
        </div>
        <div className="form-group">
         <input className='insuranceInput' onChange={handleChange} type="date" id="DateOfBirth" name="DateOfBirth" value={insuranceData.DateOfBirth} />
           {errors.DateOfBirth && <p className="error">{errors.DateOfBirth}</p>}
        </div>
        <div className="form-group-radio">
            <label className='inputRadio'>
              <input type="radio" className='inputRadiobutton' name="Gender" value="Male" onChange={handleChange} checked={insuranceData.Gender === 'Male'} />
              Male
            </label>
            <label className='inputRadio'>
              <input type="radio" className='inputRadiobutton' name="Gender" value="Female" onChange={handleChange} checked={insuranceData.Gender === 'Female'} />
              Female
            </label>
          {errors.Gender && <p className="error">{errors.Gender}</p>}
        </div>
        <div className="form-group-CheckBox">
            <label className='inputCheckBox'>
              <input type="checkbox" className='inputCheckBoxtext' name="PolicyType" value="Health Insurance " onChange={handleChange} checked={insuranceData.PolicyType.includes('Health Insurance ')} />
              Health Insurance
            </label >
            <label className='inputCheckBox'>
              <input type="checkbox" className='inputCheckBoxtext' name="PolicyType" value="Life Insurance " onChange={handleChange} checked={insuranceData.PolicyType.includes('Life Insurance ')} />
              Life Insurance
            </label>
            <label className='inputCheckBox'>
              <input type="checkbox" className='inputCheckBoxtext' name="PolicyType" value="Vehicle Insurance " onChange={handleChange} checked={insuranceData.PolicyType.includes('Vehicle Insurance ')} />
              Vehicle Insurance
            </label> 
          {errors.PolicyType && <p className="error">{errors.PolicyType}</p>}
        </div>
        <div className="form-group">
         <select onChange={handleChange} className="insuranceInput" name="SumInsured" value={insuranceData.SumInsured}>
            <option value="">Select Sum Insured</option>
            <option value="100000">1,00,000</option>
            <option value="300000">3,00,000</option>
            <option value="500000">5,00,000</option>
            <option value="1000000">10,00,000</option>
          </select>
          {errors.SumInsured && <p className="error">{errors.SumInsured}</p>}
        </div>
        <div className="form-group">
          <input className='insuranceInput' onChange={handleChange} type="number" id="Premium" step="0.01" name="Premium" value={insuranceData.Premium} />
         {errors.Premium && <p className="error">{errors.Premium}</p>}
        </div>
        </div>
        </div>
        <button className='insuranceButton' type="submit">Submit</button>
        <button className='insuranceDashboardButton' type="button" onClick={handleDashboardButton}>Go to Dashboard</button>
      </form>
      {Message && <p>{Message}</p>}
    </div>
  );
};

export default InsurancePage;
