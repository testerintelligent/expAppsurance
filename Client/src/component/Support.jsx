import React, { useState } from 'react';

const Support = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle the submission logic
    console.log('Support Request Submitted:', formData);
  };

  return (
    <div style={{ backgroundColor: '#6946C6' }}>
    <div className="ml-24  bg-customPurple flex flex-col items-center p-6">
      <h2 className="text-white text-3xl font-bold mb-6">Support</h2>

      <div className="w-full max-w-4xl bg-white p-6 rounded shadow">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">Contact Us</h3>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full p-2 mt-2 border border-gray-300 rounded"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-2 mt-2 border border-gray-300 rounded"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700">Message</label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              className="w-full p-2 mt-2 border border-gray-300 rounded"
            />
          </div>

          <div className="flex justify-center">
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Submit
            </button>
          </div>
        </form>

        <h3 className="text-xl font-semibold text-gray-800 mt-8 mb-4">FAQs</h3>
        <div className="space-y-4">
          <div className="p-4 bg-gray-100 rounded shadow">
            <h4 className="font-bold text-gray-800">How do I contact support?</h4>
            <p className="text-gray-600">You can contact us by filling out the contact form above.</p>
          </div>

          <div className="p-4 bg-gray-100 rounded shadow">
            <h4 className="font-bold text-gray-800">What is your response time?</h4>
            <p className="text-gray-600">We aim to respond within 24 hours on business days.</p>
          </div>

          <div className="p-4 bg-gray-100 rounded shadow">
            <h4 className="font-bold text-gray-800">How do I update my profile information?</h4>
            <p className="text-gray-600">You can update your profile information through the Profile Management page.</p>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
};

export default Support;
