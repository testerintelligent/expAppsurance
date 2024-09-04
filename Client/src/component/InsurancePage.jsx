import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../style/InsurancePage.css';

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

  console.log(insuranceData);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInsuranceData({
      ...insuranceData,
      [name]: value,
    });
  };

  // Validation function to check form fields
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
    return Object.keys(errors).length === 0; // Return true if no errors
  };

  const handleInsurance = (event) => {
    event.preventDefault();

   
    if (validateFields()) {
      axios.post('http://192.168.99.141:5000/Dashboard', insuranceData)
        .then(response => {
          console.log(response.data);
          setMessage(response.data.message);
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
        });
    } else {
      console.log("Validation failed");
    }
  };

  return (
    <div className="insurance-page">
      <h1>Insurance Policy Details</h1>
      <form className="insurance-form" onSubmit={handleInsurance}>
        <div className="form-group">
          <label className="insuranceLabel" htmlFor="Name">Name:</label>
          <input className='insuranceInput' type="text" id="Name" onChange={handleChange} name="Name" value={insuranceData.Name} />
          {errors.Name && <p className="error">{errors.Name}</p>}
        </div>
        <div className="form-group">
          <label className="insuranceLabel" htmlFor="email">Email:</label>
          <input className='insuranceInput' type="email" id="email" onChange={handleChange} name="email" value={insuranceData.email} />
          {errors.email && <p className="error">{errors.email}</p>}
        </div>

        <div className="form-group">
          <label className="insuranceLabel" htmlFor="Address">Address:</label>
          <input className='insuranceInput' type="text" id="Address" onChange={handleChange} name="Address" value={insuranceData.Address} />
          {errors.Address && <p className="error">{errors.Address}</p>}
        </div>

        <div className="form-group">
          <label className="insuranceLabel" htmlFor="DateOfBirth">Date of Birth:</label>
          <input className='insuranceInput' onChange={handleChange} type="date" id="DateOfBirth" name="DateOfBirth" value={insuranceData.DateOfBirth} />
          {errors.DateOfBirth && <p className="error">{errors.DateOfBirth}</p>}
        </div>

        <div className="form-group">
          <label className="insuranceLabel" htmlFor="PolicyType">Policy Type:</label>
          <select onChange={handleChange} className="insuranceInput" name="PolicyType" value={insuranceData.PolicyType}>
            <option value="">Select a policy</option>
            <option value="Health Insurance">Health Insurance</option>
            <option value="Life Insurance">Life Insurance</option>
            <option value="Vehicle Insurance">Vehicle Insurance</option>
          </select>
          {errors.PolicyType && <p className="error">{errors.PolicyType}</p>}
        </div>

        <div className="form-group">
          <label className="insuranceLabel" htmlFor="SumInsured">Sum Insured:</label>
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
          <label className="insuranceLabel" htmlFor="Premium">Premium:</label>
          <input className='insuranceInput' onChange={handleChange} type="number" id="Premium" step="0.01" name="Premium" value={insuranceData.Premium} />
          {errors.Premium && <p className="error">{errors.Premium}</p>}
        </div>
        {Message && <p>{Message}</p>}
        <button className='insuranceButton' type="submit">Submit</button>
      </form>
    </div>
  );
};

export default InsurancePage;
