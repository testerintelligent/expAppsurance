import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../style/InsurancePage.css';

const InsurancePage = () => {
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

  const handleInsurance = (event) => {
    event.preventDefault();
    axios.post('http://192.168.99.141:5000/Dashboard', insuranceData)
      .then(response => {
        console.log(response.data);
        // Optionally reset form after submission
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
  };

  return (
    <div className="insurance-page">
      <h1>Insurance Policy Details</h1>
      <form className="insurance-form" onSubmit={handleInsurance}>
        <div className="form-group">
          <label className="insuranceLabel" htmlFor="Name">Name:</label>
          <input className='insuranceInput' type="text" id="Name" onChange={handleChange} name="Name" value={insuranceData.Name} />
        </div>
        <div className="form-group">
          <label className="insuranceLabel" htmlFor="email">Email:</label>
          <input className='insuranceInput' type="email" id="email" onChange={handleChange} name="email" value={insuranceData.email} />
        </div>

        <div className="form-group">
          <label className="insuranceLabel" htmlFor="Address">Address:</label>
          <input className='insuranceInput' type="text" id="Address" onChange={handleChange} name="Address" value={insuranceData.Address} />
        </div>

        <div className="form-group">
          <label className="insuranceLabel" htmlFor="DateOfBirth">Date of Birth:</label>
          <input className='insuranceInput' onChange={handleChange} type="date" id="DateOfBirth" name="DateOfBirth" value={insuranceData.DateOfBirth} />
        </div>

        <div className="form-group">
          <label className="insuranceLabel" htmlFor="PolicyType">Policy Type:</label>
          <select onChange={handleChange} className="insuranceInput" name="PolicyType" value={insuranceData.PolicyType}>
            <option value="">Select a policy</option>
            <option value="Health Insurance">Health Insurance</option>
            <option value="Life Insurance">Life Insurance</option>
            <option value="Vehicle Insurance">Vehicle Insurance</option>
          </select>
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
        </div>

        <div className="form-group">
          <label className="insuranceLabel" htmlFor="Premium">Premium:</label>
          <input className='insuranceInput' onChange={handleChange} type="number" id="Premium" step="0.01" name="Premium" value={insuranceData.Premium} />
        </div>

        <button className='insuranceButton' type="submit">Submit</button>
      </form>
    </div>
  );
};

export default InsurancePage;
