import React, { useState } from 'react';

const ProfileManagement = () => {
  const [formData, setFormData] = useState({
    name: 'Magesh',
    email: 'test@test.com',
    phone: '78787998',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Profile updated:', formData);
  };

  return (
    <div className="flex justify-center items-center min-h-screen px-4">
      <div className="bg-gray-900 bg-opacity-90 shadow-lg rounded-xl p-10 max-w-lg w-full text-white">
        <h2 className="text-3xl font-bold text-center mb-6">Profile Management</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-lg font-medium mb-2">Name</label>
            <input
              type="text"
              name="name"
              placeholder="Enter your name"
              value={formData.name}
              onChange={handleChange}
              className="w-full p-3 rounded-md border border-gray-400 text-black focus:outline-none focus:ring-2 focus:ring-purple-500"
              required
            />
          </div>
          <div>
            <label className="block text-lg font-medium mb-2">Email</label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-3 rounded-md border border-gray-400 text-black focus:outline-none focus:ring-2 focus:ring-purple-500"
              required
            />
          </div>
          <div>
            <label className="block text-lg font-medium mb-2">Phone</label>
            <input
              type="tel"
              name="phone"
              placeholder="Enter mobile number"
              value={formData.phone}
              onChange={handleChange}
              className="w-full p-3 rounded-md border border-gray-400 text-black focus:outline-none focus:ring-2 focus:ring-purple-500"
              required
            />
          </div>
          <div className="flex justify-center">
            <button 
              type="submit" 
              className="w-full p-3 border-2 border-white rounded-md text-white bg-purple-600 hover:bg-white hover:text-black font-bold transition"
            >
              Update Profile
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProfileManagement;
