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
    console.log('Support Request Submitted:', formData);
  };

  return (
    <div className="flex justify-center items-center min-h-screen px-4">
      <div className="bg-gray-900 bg-opacity-90 shadow-lg rounded-xl p-8 max-w-3xl w-full text-white">
        <h2 className="text-3xl font-bold text-center mb-6">Support</h2>

        <div className="bg-gray-800 p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold text-white mb-4">Contact Us</h3>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-300 mb-1">Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="input-field w-full"
                  required
                />
              </div>

              <div>
                <label className="block text-gray-300 mb-1">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="input-field w-full"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-gray-300 mb-1">Message</label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                className="input-field w-full h-32 resize-none"
                required
              />
            </div>

            <div className="flex justify-center">
              <button
                type="submit"
                className="bg-purple-700 text-white px-6 py-2 rounded-lg hover:bg-purple-800 border border-white transition-all"
              >
                Submit
              </button>
            </div>
          </form>
        </div>

        <h3 className="text-xl font-semibold text-white mt-8 mb-4">FAQs</h3>
        <div className="space-y-4">
          <div className="p-4 bg-gray-800 rounded-lg shadow-md">
            <h4 className="font-bold text-white">How do I contact support?</h4>
            <p className="text-gray-300">You can contact us by filling out the contact form above.</p>
          </div>

          <div className="p-4 bg-gray-800 rounded-lg shadow-md">
            <h4 className="font-bold text-white">What is your response time?</h4>
            <p className="text-gray-300">We aim to respond within 24 hours on business days.</p>
          </div>

          <div className="p-4 bg-gray-800 rounded-lg shadow-md">
            <h4 className="font-bold text-white">How do I update my profile information?</h4>
            <p className="text-gray-300">You can update your profile information through the Profile Management page.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Support;
