import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const PolicyInitiation = () => {
  const [formData, setFormData] = useState({
    name: '',
    dob: '',
    email: '',
    phone: '',
    address: '',
    gender: '',
    existingPolicy: '',
    policyType: '',
    riskScore: 0,
    existingPolicyDetails: {
      policyNumber: '',
      policyTypeExisting: '',
      provider: '',
    },
    provider: '', // Added for the provider selection
    riders: {
      accidentalDeathRider: false,
      criticalIllnessRider: false,
      waiverOfPremiumRider: false,
    },
  });

  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();

  const validateCustomer = () => {
    const riskScore = Math.random() * 100; // Simulated risk score for the demo
    setFormData({ ...formData, riskScore });

    if (riskScore < 50) {
      setError('Customer risk too high!');
    } else if (!formData.policyType) {
      setError('Please select a policy type!');
    } else if (!formData.gender) {
      setError('Please select your gender!');
    } else {
      setError('');
      // Proceed to submit the form after validation
      handleSubmit();
    }
  };

  const handleSubmit = () => {
    axios.post('http://192.168.99.141:5000/newPolicyCustomer', formData)
      .then((response) => {
        console.log('Success:', response.data);
        setSuccessMessage('Your data has been submitted successfully!');
        navigate('/quateGeneration'); 
      })
      .catch((error) => {
        console.error('Error:', error);
        setError('There was an error submitting your data.');
      });
  };

  const handleExistingPolicyChange = (e) => {
    const value = e.target.value;
    setFormData((prevState) => ({
      ...prevState,
      existingPolicy: value,
      existingPolicyDetails: {
        policyNumber: '',
        policyTypeExisting: '',
        provider: '',
      },
    }));
  };

  const handleExistingPolicyDetailsChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      existingPolicyDetails: {
        ...prevState.existingPolicyDetails,
        [name]: value,
      },
    }));
  };

  const handleRiderChange = (e) => {
    const { name, checked } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      riders: {
        ...prevState.riders,
        [name]: checked,
      },
    }));
  };

  return (
    <div className="min-h-screen w-full items-center justify-center p-3" style={{ backgroundColor: '#6946C6' }}>
      <div className="bg-white ml-60 mr-80 mt-10 rounded-lg border-2 border-black ">
        <form onSubmit={(e) => { e.preventDefault(); validateCustomer(); }}>
          <div className='bg-[#6946C6] p-5 mb-6 rounded-t-md'>
            <h2 className="text-2xl font-bold text-white hover:text-black">Policy Initiation</h2>
          </div>
          <div className='p-6'>
            {/* Customer Name */}
            <div className="flex items-center mb-4">
              <label className="w-1/3 text-right pr-4">Customer Name:</label>
              <input
                type="text"
                name="name"
                placeholder="Customer Name"
                className="w-2/3 p-2 border"
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </div>

            {/* Date of Birth */}
            <div className="flex items-center mb-4">
              <label className="w-1/3 text-right pr-4">Date of Birth:</label>
              <input
                type="date"
                name="dob"
                className="w-2/3 p-2 border"
                onChange={(e) => setFormData({ ...formData, dob: e.target.value })}
              />
            </div>

            {/* Email */}
            <div className="flex items-center mb-4">
              <label className="w-1/3 text-right pr-4">Email:</label>
              <input
                type="email"
                name="email"
                placeholder="Email"
                className="w-2/3 p-2 border"
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
            </div>

            {/* Phone Number */}
            <div className="flex items-center mb-4">
              <label className="w-1/3 text-right pr-4">Phone Number:</label>
              <input
                type="tel"
                name="phone"
                placeholder="Phone Number"
                className="w-2/3 p-2 border"
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              />
            </div>

            {/* Address */}
            <div className="flex items-center mb-4">
              <label className="w-1/3 text-right pr-4">Address:</label>
              <textarea
                name="address"
                placeholder="Address"
                className="w-2/3 p-2 border"
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
              ></textarea>
            </div>

            {/* Gender */}
            <div className="flex items-center mb-4">
              <label className="w-1/3 text-right pr-4">Gender:</label>
              <select
                name="gender"
                className="w-2/3 p-2 border"
                onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
              >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>

            {/* Existing Policy */}
            <div className="flex items-center mb-4">
              <label className="w-1/3 text-right pr-4">Existing Policy:</label>
              <div className="w-2/3 flex gap-4 items-center">
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="existingPolicy"
                    value="Yes"
                    className="mr-2"
                    onChange={handleExistingPolicyChange}
                  />
                  Yes
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="existingPolicy"
                    value="No"
                    className="mr-2"
                    onChange={handleExistingPolicyChange}
                  />
                  No
                </label>
              </div>
            </div>

            {/* Existing Policy Details */}
            {formData.existingPolicy === 'Yes' && (
              <div>
                <div className="flex items-center mb-4">
                  <label className="w-1/3 text-right pr-4">Policy Number:</label>
                  <input
                    type="text"
                    name="policyNumber"
                    value={formData.existingPolicyDetails.policyNumber}
                    className="w-2/3 p-2 border"
                    onChange={handleExistingPolicyDetailsChange}
                  />
                </div>

                <div className="flex items-center mb-4">
                  <label className="w-1/3 text-right pr-4">Existing Policy Type:</label>
                  <select
                    name="policyTypeExisting"
                    value={formData.existingPolicyDetails.policyTypeExisting}
                    className="w-2/3 p-2 border"
                    onChange={handleExistingPolicyDetailsChange}
                  >
                    <option value="">Select Policy Type</option>
                    <option value="Life">Life</option>
                    <option value="Health">Health</option>
                    <option value="Auto">Auto</option>
                    <option value="Home">Home</option>
                  </select>
                </div>

                <div className="flex items-center mb-4">
                  <label className="w-1/3 text-right pr-4">Provider:</label>
                  <input
                    type="text"
                    name="provider"
                    value={formData.existingPolicyDetails.provider}
                    className="w-2/3 p-2 border"
                    onChange={handleExistingPolicyDetailsChange}
                  />
                </div>
              </div>
            )}

            {/* Policy Type */}
            <div className="flex items-center mb-4">
              <label className="w-1/3 text-right pr-4">Policy Type:</label>
              <select
                name="policyType"
                className="w-2/3 p-2 border"
                onChange={(e) => setFormData({ ...formData, policyType: e.target.value })}
              >
                <option value="">Select Policy Type</option>
                <option value="Life">Life</option>
                <option value="Health">Health</option>
                <option value="Auto">Auto</option>
                <option value="Home">Home</option>
              </select>
            </div>

            {/* Provider */}
            <div className="flex items-center mb-4">
              <label className="w-1/3 text-right pr-4">Provider:</label>
              <input
                type="text"
                name="provider"
                value={formData.provider}
                className="w-2/3 p-2 border"
                onChange={(e) => setFormData({ ...formData, provider: e.target.value })}
              />
            </div>

            {/* Riders */}
            <div className="flex flex-col mb-4">
              <div className="flex items-center">
                <label className="w-1/3 text-right pr-4">Add Riders:</label>
                <div className="w-2/3 space-y-2">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      name="accidentalDeathRider"
                      checked={formData.riders.accidentalDeathRider}
                      onChange={handleRiderChange}
                    />
                    Accidental Death Rider
                  </label>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      name="criticalIllnessRider"
                      checked={formData.riders.criticalIllnessRider}
                      onChange={handleRiderChange}
                    />
                    Critical Illness Rider
                  </label>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      name="waiverOfPremiumRider"
                      checked={formData.riders.waiverOfPremiumRider}
                      onChange={handleRiderChange}
                    />
                    Waiver of Premium Rider
                  </label>
                </div>
              </div>
            </div>

            {/* Error Message */}
            {error && <p style={{ color: 'red' }} className="text-center mb-4">{error}</p>}

            {/* Success Message */}
            {successMessage && <p style={{ color: 'green' }} className="text-center mb-4">{successMessage}</p>}

            {/* Submit Button */}
            <div className="flex justify-center">
              <button
                type="submit"
                className="bg-[#6946C6] border-2 border-black text-white px-4 py-2 rounded hover:bg-white hover:text-black"
              >
                Validate and Proceed
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PolicyInitiation;
