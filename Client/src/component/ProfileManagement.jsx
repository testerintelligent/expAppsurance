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
    // Handle profile update logic
    console.log('Profile updated:', formData);
  };

  return (
    <div style={{ backgroundColor: '#6946C6' }}>
      <div className="min-h-screen w-full bg-customPurple flex flex-col items-center p-6">
        <h2 className="text-white text-2xl font-bold mb-6">Profile Management</h2>
        <div className="bg-white p-4 border-2 border-black rounded-md">
          <form onSubmit={handleSubmit} className="w-full max-w-md">
            <div className="mb-4 flex items-center">
              <label className="block text-black w-1/3">Name</label>
              <input
                type="text"
                name="name"
                placeholder='Enter you name'
                value={formData.name}
                onChange={handleChange}
                className="w-2/3 p-2 mt-2 border border-black rounded"
              />
            </div>
            <div className="mb-4 flex items-center">
              <label className="block text-black w-1/3">Email</label>
              <input
                type="email"
                name="email"
                placeholder='Enter your email'
                value={formData.email}
                onChange={handleChange}
                className="w-2/3 p-2 mt-2 border border-black rounded"
              />
            </div>
            <div className="mb-4 flex items-center">
              <label className="block text-black w-1/3">Phone</label>
              <input
                type="tel"
                name="phone"
                placeholder='Enter mobile number'
                value={formData.phone}
                onChange={handleChange}
                className="w-2/3 p-2 mt-2 border border-black rounded"
              />
            </div>
            <div className="flex justify-center">
              <button
                type="submit"
                className="bg-[#6946C6] text-white border-2 border-black px-4 py-2 rounded hover:bg-white hover:text-black"
              >
                Update Profile
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProfileManagement;
