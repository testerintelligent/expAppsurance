import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
const InsurancePage = () => {
  const [Message, setMessage] = useState('');
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const [selectedPolicy, setSelectedPolicy] = useState('');
  const [coverageOptions, setCoverageOptions] = useState([]);
  const [selectedCoverageOption, setSelectedCoverageOption] = useState('');

  const [insuranceData, setInsuranceData] = useState({
    CurrentDate: new Date().toISOString().split('T')[0],
    Name: '',
    email: '',
    Address: '',
    DateOfBirth: '',
    PolicyType: [],
    SumInsured: '',
    Premium: '',
    Gender: '',
    hasExistingPolicy: false, // ✅ Added this field
  });

  const coverageMapping = {
    Health: ['Hospitalization costs', 'Treatment Cost', 'Emergency Services', 'Laboratory Expenses', 'Prescription Drugs', 'Day-care procedures'],
    Life: ['Term', 'Endowment', 'Retirement', 'Money-Back'],
    Vehicle: ['Third-Party Liability', 'Comprehensive', 'Personal Vehicle Damage'],
  };

  useEffect(() => {
    const sessionKey = sessionStorage.getItem('sessionKey');
    if (!sessionKey) {
      navigate('/');
    }
  }, [navigate]);

  const handlePolicySelectChange = (event) => {
    const value = event.target.value;
    setSelectedPolicy(value);

    const updatedPolicyTypes = insuranceData.PolicyType.includes(value)
      ? insuranceData.PolicyType.filter((policy) => policy !== value)
      : [...insuranceData.PolicyType, value];

    setInsuranceData({ ...insuranceData, PolicyType: updatedPolicyTypes });
    setCoverageOptions(coverageMapping[value] || []);
  };

  const handleCoverageChange = (event) => {
    setSelectedCoverageOption(event.target.value);
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === 'checkbox') {
      if (name === 'hasExistingPolicy') {
        setInsuranceData({ ...insuranceData, hasExistingPolicy: checked }); // ✅ Fix for checkbox
      } else {
        const updatedPolicyTypes = checked
          ? [...insuranceData.PolicyType, value]
          : insuranceData.PolicyType.filter((policy) => policy !== value);
        setInsuranceData({ ...insuranceData, PolicyType: updatedPolicyTypes });
      }
    } else {
      setInsuranceData({ ...insuranceData, [name]: value });
    }
  };

  const validateFields = () => {
    let errors = {};
    if (!insuranceData.Name.trim()) errors.Name = '*Name is required';
    if (!insuranceData.email.trim()) {
      errors.email = '*Email is required';
    } else if (!/\S+@\S+\.\S+/.test(insuranceData.email)) {
      errors.email = '*Email is invalid';
    }
    if (!insuranceData.Address.trim()) errors.Address = '*Address is required';
    if (!insuranceData.DateOfBirth) errors.DateOfBirth = '*Date of Birth is required';
    if (insuranceData.PolicyType.length === 0) errors.PolicyType = '*Please select at least one Policy Type';
    if (!insuranceData.SumInsured) errors.SumInsured = '*Please enter Sum Insured';
    if (!insuranceData.Premium.trim()) {
      errors.Premium = '*Premium is required';
    } else if (isNaN(insuranceData.Premium) || parseFloat(insuranceData.Premium) <= 0) {
      errors.Premium = '*Premium must be a positive number';
    }
    if (!insuranceData.Gender) errors.Gender = '*Gender is required';

    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleInsurance = (event) => {
    event.preventDefault();
    if (validateFields()) {
      axios.post('http://10.192.190.148:5000/Dashboard', insuranceData)
        .then(response => {
          setMessage(response.data.message || 'Policy created successfully.');
          setInsuranceData({
            CurrentDate: new Date().toISOString().split('T')[0],
            Name: '',
            email: '',
            Address: '',
            DateOfBirth: '',
            PolicyType: [],
            SumInsured: '',
            Premium: '',
            Gender: '',
            hasExistingPolicy: false, // Reset after submission
          });
          navigate('/Dashboard');
        })
        .catch(error => {
          setMessage(error.response?.data?.message || 'An error occurred. Please try again.');
        });
    }
  };


  return (
    <div className='flex justify-center items-center min-h-screen'>
      <div className='bg-gray-900 bg-opacity-90 shadow-lg rounded-xl p-10 max-w-2xl w-full text-white'>
        <h2 className='text-3xl font-bold text-center mb-6'>Insurance Policy Details</h2>
        <form onSubmit={handleInsurance} className='space-y-4'>
          <input type="text" name="Name" value={insuranceData.Name} onChange={handleChange} placeholder="Name" className="input-field" />
          {errors.Name && <p className="error">{errors.Name}</p>}

          <input type="email" name="email" value={insuranceData.email} onChange={handleChange} placeholder="Email ID" className="input-field" />
          {errors.email && <p className="error">{errors.email}</p>}

          <input type="text" name="Address" value={insuranceData.Address} onChange={handleChange} placeholder="Address" className="input-field" />
          {errors.Address && <p className="error">{errors.Address}</p>}

          <input type="date" name="DateOfBirth" value={insuranceData.DateOfBirth} onChange={handleChange} className="input-field" />
          {errors.DateOfBirth && <p className="error">{errors.DateOfBirth}</p>}

          <div className="flex items-center space-x-4">
  <span className="font-medium">Gender:</span>
  <label className="flex items-center space-x-1">
    <input type="radio" name="Gender" value="Male" onChange={handleChange} checked={insuranceData.Gender === 'Male'} />
    <span>Male</span>
  </label>
  <label className="flex items-center space-x-1">
    <input type="radio" name="Gender" value="Female" onChange={handleChange} checked={insuranceData.Gender === 'Female'} />
    <span>Female</span>
  </label>
</div>
{errors.Gender && <p className="error">{errors.Gender}</p>}



          <select onChange={handlePolicySelectChange} name="PolicyType" value={selectedPolicy} className="w-full p-3 rounded-lg bg-gray-700 border border-gray-500 text-white">
          
            <option value="">-- Select Policy Type --</option>
            {Object.keys(coverageMapping).map(type => (
              <option key={type} value={type}>{type} Insurance</option>
            ))}
          </select>
          {errors.PolicyType && <p className="error">{errors.PolicyType}</p>}

          <select onChange={(e) => setSelectedCoverageOption(e.target.value)} name="Coverage" value={selectedCoverageOption} className="w-full p-3 rounded-lg bg-gray-700 border border-gray-500 text-white" disabled={!coverageOptions.length}>
            <option value="">-- Select Coverage --</option>
            {coverageOptions.map(option => <option key={option} value={option}>{option}</option>)}
          </select>

          <input type="number" name="SumInsured" value={insuranceData.SumInsured} onChange={handleChange} placeholder="Sum Insured" className="input-field" />
          {errors.SumInsured && <p className="error">{errors.SumInsured}</p>}

          <input type="number" name="Premium" value={insuranceData.Premium} onChange={handleChange} placeholder="Premium" className="input-field" />
          {errors.Premium && <p className="error">{errors.Premium}</p>}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', width: '100%' }}>
  {/* Message above the buttons */}
  <label style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
    <input type="checkbox" name="hasExistingPolicy" checked={insuranceData.hasExistingPolicy} onChange={handleChange} />
    Do you have an existing policy?
  </label>

  {/* Buttons aligned: Submit on left, Cancel on right */}
  <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
    <button type="submit" className="btn-primary">Submit</button>
    <button type="button" className="btn-secondary">Cancel</button>
  </div>
</div>

        </form>
      </div>
    </div>
  );
};

export default InsurancePage;