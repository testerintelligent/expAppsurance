import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const PolicyInitiation = () => {
  const [formData, setFormData] = useState({
    name: '',
    dob: '',
    email: '',
    phone: '',
    address: '',
    gender: '',
    existingPolicy: false,
    policyType: '',
    riskScore: 0,
  });

  const [error, setError] = useState('');
  const navigate = useNavigate();

  const validateCustomer = () => {
    // Simulated risk validation logic
    const riskScore = Math.random() * 100; // Replace with real logic or API call
    setFormData({ ...formData, riskScore });

    if (riskScore < 50) {
      setError('Customer risk too high!');
    } else if (!formData.policyType) {
      setError('Please select a policy type!');
    } else if (!formData.gender) {
      setError('Please select your gender!');
    } else {
      setError('');
      navigate('/insurance', { state: { customerData: formData } });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    validateCustomer();
  };

  return (
    <div className='min-h-screen w-full  items-center justify-center p-3' style={{ backgroundColor: '#6946C6' }}>
    <div className="bg-white ml-60 mr-80 mt-10 rounded-lg border-2 border-black p-6">
      <form onSubmit={handleSubmit}>
        <h2 className="text-2xl font-bold mb-4">Policy Initiation</h2>
        
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
        onChange={(e) => setFormData({ ...formData, existingPolicy: e.target.value })}
      />
      Yes
    </label>
    <label className="flex items-center">
      <input
        type="radio"
        name="existingPolicy"
        value="No"
        className="mr-2"
        onChange={(e) => setFormData({ ...formData, existingPolicy: e.target.value })}
      />
      No
        </label>
        </div>
    </div>

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

        {/* Error Message */}
        {error && <p style={{ color: 'red' }} className="text-center mb-4">{error}</p>}

        {/* Submit Button */}
        <div className="flex justify-center">
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Validate and Proceed
          </button>
        </div>
      </form>
    </div>
    </div>
  );
};

export default PolicyInitiation;
