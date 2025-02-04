import React, { useState } from 'react';
import axios from 'axios';
import '../style/Contact.css';

const Contact = () => {
  const [formData, setFormData] = useState({
    CurrentDate: new Date(), // Added like InsurancePage.js
    name: '',
    policyNumber: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
    phone: '',
    email: '',
    driverName: '',
    driverGender: '',
    driverAge: '',
    driverDob: '',
    driverRelation: '',
    driverOccupation: '',
    driverAddress: '',
    driverCity: '',
    driverState: '',
    driverPincode: '',
    driverPhone: '',
    driverEmail: '',
  });

  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState('');

  // Function to validate fields before submission (Same as InsurancePage.js)
  const validateFields = () => {
    let errors = {};

    if (!formData.name.trim()) {
      errors.name = '*Name is required';
    }
    if (!formData.email.trim()) {
      errors.email = '*Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = '*Email is invalid';
    }
    if (!formData.phone.trim()) {
      errors.phone = '*Phone number is required';
    }
    if (!formData.address.trim()) {
      errors.address = '*Address is required';
    }
    if (!formData.pincode.trim()) {
      errors.pincode = '*Pincode is required';
    }
    if (!formData.state.trim()) {
      errors.state = '*State is required';
    }

    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Function to handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Function to handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();

    if (validateFields()) { // Ensure validation before submission
      try {
        const response = await axios.post('http://192.168.99.141:5000/Dashboard', formData);
        setMessage(response.data.message || 'Policy created successfully.');
        alert('Policy created successfully.');
        handleCancel(); // Reset form after submission
      } catch (error) {
        console.error('Error creating policy:', error.response?.data || 'An error occurred. Please try again.');
        alert('Error creating policy. Please try again.');
      }
    }
  };

  // Function to reset form
  const handleCancel = () => {
    setFormData({
      CurrentDate: new Date(), // Reset like InsurancePage.js
      name: '',
      policyNumber: '',
      address: '',
      city: '',
      state: '',
      pincode: '',
      phone: '',
      email: '',
      driverName: '',
      driverGender: '',
      driverAge: '',
      driverDob: '',
      driverRelation: '',
      driverOccupation: '',
      driverAddress: '',
      driverCity: '',
      driverState: '',
      driverPincode: '',
      driverPhone: '',
      driverEmail: '',
    });
    setErrors({});
  };

  return (
    <div className='flex justify-center bg-gray-100 w-full h-auto py-10'>
      <div className='form-container'>
        <h2 className='text-2xl font-bold text-center mb-4'>Insurance Policy Details</h2>
        <form onSubmit={handleSubmit} className='space-y-4'>
          <div className='flex flex-wrap gap-4'>
            <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Full Name" className="input-field" />
            <input type="text" name="policyNumber" value={formData.policyNumber} onChange={handleChange} placeholder="Policy Number" className="input-field" />
            <input type="text" name="address" value={formData.address} onChange={handleChange} placeholder="Address" className="input-field" />
            <input type="text" name="city" value={formData.city} onChange={handleChange} placeholder="City" className="input-field" />
            <input type="text" name="state" value={formData.state} onChange={handleChange} placeholder="State" className="input-field" />
            <input type="text" name="pincode" value={formData.pincode} onChange={handleChange} placeholder="Pincode" className="input-field" />
            <input type="text" name="phone" value={formData.phone} onChange={handleChange} placeholder="Phone Number" className="input-field" />
            <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email ID" className="input-field" />

            {/* Driver Details */}
            <input type="text" name="driverName" value={formData.driverName} onChange={handleChange} placeholder="Driver Name" className="input-field" />
            <input type="text" name="driverGender" value={formData.driverGender} onChange={handleChange} placeholder="Driver Gender" className="input-field" />
            <input type="number" name="driverAge" value={formData.driverAge} onChange={handleChange} placeholder="Driver Age" className="input-field" />
            <input type="date" name="driverDob" value={formData.driverDob} onChange={handleChange} className="input-field" />
            <input type="text" name="driverRelation" value={formData.driverRelation} onChange={handleChange} placeholder="Driver Relation" className="input-field" />
            <input type="text" name="driverOccupation" value={formData.driverOccupation} onChange={handleChange} placeholder="Driver Occupation" className="input-field" />

          </div>

          <div className="flex justify-between">
            <button type='submit' className='btn-primary'>Submit</button>
            <button type='button' onClick={handleCancel} className='btn-secondary'>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Contact;
