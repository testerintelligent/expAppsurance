import React, { useState } from 'react';
import axios from 'axios';

const Contact = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    street: '',
    city: '',
    state: '',
    zipCode: '',
    dateOfBirth: '',
    gender: '',
  });

  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState('');

  const validateFields = () => {
    const errors = {};
    if (!formData.firstName.trim()) errors.firstName = '*First name is required';
    if (!formData.lastName.trim()) errors.lastName = '*Last name is required';
    if (!formData.email.trim()) errors.email = '*Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) errors.email = '*Email is invalid';
    if (!formData.phone.trim()) errors.phone = '*Phone number is required';
    if (!formData.street.trim()) errors.street = '*Street is required';
    if (!formData.city.trim()) errors.city = '*City is required';
    if (!formData.state.trim()) errors.state = '*State is required';
    if (!formData.zipCode.trim()) errors.zipCode = '*Zip code is required';
    if (!formData.dateOfBirth.trim()) errors.dateOfBirth = '*Date of birth is required';
    if (!formData.gender.trim()) errors.gender = '*Gender is required';

    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (validateFields()) {
      const payload = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        phone: formData.phone,
        address: {
          street: formData.street,
          city: formData.city,
          state: formData.state,
          zipCode: formData.zipCode,
        },
        dateOfBirth: formData.dateOfBirth,
        gender: formData.gender,
      };

      try {
        const response = await axios.post('http://10.192.190.148:5000/postContact', payload);
        setMessage(response.data.message || 'Contact details saved successfully.');
        alert('Contact created successfully.');
        handleCancel();
      } catch (error) {
        console.error('Error creating contact:', error.response?.data || error.message);
        alert('Error creating contact. Please try again.');
      }
    }
  };

  const handleCancel = () => {
    setFormData({
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      street: '',
      city: '',
      state: '',
      zipCode: '',
      dateOfBirth: '',
      gender: '',
    });
    setErrors({});
    setMessage('');
  };

  return (
    <div className='flex justify-center items-center min-h-screen'>
      <div className='bg-gray-900 bg-opacity-90 shadow-lg rounded-xl p-10 max-w-2xl w-full text-white'>
        <h2 className='text-3xl font-bold text-center mb-6'>Contact Details</h2>
        <form onSubmit={handleSubmit} className='space-y-4'>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
            {/* First Name */}
            <div className='flex flex-col space-y-2'>
              <label className='flex'>Enter your first name:</label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                placeholder="First Name"
                className="input-style"
              />
              {errors.firstName && <span className="text-red-500">{errors.firstName}</span>}
            </div>

            {/* Last Name */}
            <div className='flex flex-col space-y-2'>
              <label className='flex'>Enter your last name:</label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                placeholder="Last Name"
                className="input-style"
              />
              {errors.lastName && <span className="text-red-500">{errors.lastName}</span>}
            </div>

            {/* Email */}
            <div className='flex flex-col space-y-2'>
              <label className='flex'>Enter your email address:</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email"
                className="input-style"
              />
              {errors.email && <span className="text-red-500">{errors.email}</span>}
            </div>

            {/* Phone */}
            <div className='flex flex-col space-y-2'>
              <label className='flex'>Enter your phone number:</label>
              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Phone Number"
                className="input-style"
              />
              {errors.phone && <span className="text-red-500">{errors.phone}</span>}
            </div>


            {/* Address section title */}
            <h5 className='text-white text-2xl  col-span-2'>Enter your address details:</h5>

            {/* Street */}
            <div className='flex flex-col space-y-2'>
              <label className='flex'>Enter your street:</label>
              <input
                type="text"
                name="street"
                value={formData.street}
                onChange={handleChange}
                placeholder="Street"
                className="input-style"
              />
              {errors.street && <span className="text-red-500">{errors.street}</span>}
            </div>

            {/* City */}
            <div className='flex flex-col space-y-2'>
              <label className='flex'>Enter your city:</label>
              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleChange}
                placeholder="City"
                className="input-style"
              />
              {errors.city && <span className="text-red-500">{errors.city}</span>}
            </div>

            {/* State */}
            <div className='flex flex-col space-y-2'>
              <label className='flex'>Enter your state:</label>
              <input
                type="text"
                name="state"
                value={formData.state}
                onChange={handleChange}
                placeholder="State"
                className="input-style"
              />
              {errors.state && <span className="text-red-500">{errors.state}</span>}
            </div>

            {/* Zip Code */}
            <div className='flex flex-col space-y-2'>
              <label className='flex'>Enter your postal code:</label>
              <input
                type="text"
                name="zipCode"
                value={formData.zipCode}
                onChange={handleChange}
                placeholder="Postal Code"
                className="input-style"
              />
              {errors.zipCode && <span className="text-red-500">{errors.zipCode}</span>}
            </div>

            {/* Gender */}
            <div className='flex flex-col space-y-2'>
              <label className='flex'>Select your gender:</label>
              <select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                className="input-style text-black"
              >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
              {errors.gender && <span className="text-red-500">{errors.gender}</span>}
            </div>

            {/* Date of Birth */}
            <div className='flex flex-col space-y-2'>
              <label className='flex'>Enter your date of birth:</label>
              <input
                type="date"
                name="dateOfBirth"
                value={formData.dateOfBirth}
                onChange={handleChange}
                className="input-style"
              />
              {errors.dateOfBirth && <span className="text-red-500">{errors.dateOfBirth}</span>}
            </div>
          </div>

          <div className="flex justify-between mt-6">
            <button type="submit" className="bg-white text-black rounded-md p-2">Submit</button>
            <button type="button" onClick={handleCancel} className="bg-white text-black rounded-md p-2">Cancel</button>
          </div>

          {message && <p className="text-green-400 text-center mt-4">{message}</p>}
        </form>
      </div>
    </div>
  );
};

export default Contact;
