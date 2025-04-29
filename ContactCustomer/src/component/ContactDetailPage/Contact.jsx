import React, { useState } from 'react';
import { FaSearch } from 'react-icons/fa';

const Contact = () => {
  const [formData, setFormData] = useState({
    firstName: '', lastName: '', email: '', phone: '',
    street: '', city: '', state: '', zipCode: '',
    dateOfBirth: '', gender: '', addressType: '',
    organization: '', producerCode: ''
  });

  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState('');
  const [showSuggestions, setShowSuggestions] = useState({ org: false, prod: false });
  const [showModal, setShowModal] = useState(false);
  const [currentField, setCurrentField] = useState('');

  const allOrgOptions = ['Acme Corp', 'Globex Corporation', 'Initech', 'Umbrella Corp', 'Stark Industries', 'Wayne Enterprises'];
  const allProdOptions = ['PROD-1001', 'PROD-2002', 'PROD-3003', 'PROD-4004', 'PROD-5005'];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(fd => ({ ...fd, [name]: value }));

    if (name === 'organization') {
      setShowSuggestions(prev => ({ ...prev, org: true }));
    } else if (name === 'producerCode') {
      setShowSuggestions(prev => ({ ...prev, prod: true }));
    }
  };

  const selectSuggestion = (field, value) => {
    setFormData(fd => ({ ...fd, [field]: value }));
    setShowSuggestions(prev => ({ ...prev, [field === 'organization' ? 'org' : 'prod']: false }));
    setShowModal(false);  // Close modal after selection
  };

  const validate = () => {
    const errs = {};
    if (!formData.firstName) errs.firstName = 'Required';
    if (!formData.lastName) errs.lastName = 'Required';
    if (!formData.email) errs.email = 'Required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) errs.email = 'Invalid email';
    if (!formData.phone) errs.phone = 'Required';
    if (!formData.street) errs.street = 'Required';
    if (!formData.city) errs.city = 'Required';
    if (!formData.state) errs.state = 'Required';
    if (!formData.zipCode) errs.zipCode = 'Required';
    if (!formData.dateOfBirth) errs.dateOfBirth = 'Required';
    if (!formData.gender) errs.gender = 'Required';
    if (!formData.addressType) errs.addressType = 'Required';
    if (!formData.organization) errs.organization = 'Required';
    if (!formData.producerCode) errs.producerCode = 'Required';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      console.log('Form submitted:', formData);
      setMessage('Form submitted successfully!');
      setFormData({
        firstName: '', lastName: '', email: '', phone: '',
        street: '', city: '', state: '', zipCode: '',
        dateOfBirth: '', gender: '', addressType: '',
        organization: '', producerCode: ''
      });
      setErrors({});
    } else {
      setMessage('');
    }
  };

  const handleCancel = () => {
    setFormData({
      firstName: '', lastName: '', email: '', phone: '',
      street: '', city: '', state: '', zipCode: '',
      dateOfBirth: '', gender: '', addressType: '',
      organization: '', producerCode: ''
    });
    setErrors({});
    setMessage('');
    setShowSuggestions({ org: false, prod: false });
  };

  const handleSearch = (field) => {
    setCurrentField(field);
    setShowModal(true);
  };

  const filteredOrgSuggestions = allOrgOptions.filter(option =>
    option.toLowerCase().includes(formData.organization.toLowerCase()) &&
    option.toLowerCase() !== formData.organization.toLowerCase()
  );

  const filteredProdSuggestions = allProdOptions.filter(option =>
    option.toLowerCase().includes(formData.producerCode.toLowerCase()) &&
    option.toLowerCase() !== formData.producerCode.toLowerCase()
  );

  return (
    <div className="flex justify-center items-start py-10 bg-white-900 min-h-screen overflow-y-auto">
      <div className="bg-gray-800 bg-opacity-90 shadow-2xl rounded-xl p-8 w-full max-w-3xl text-white">
        <h2 className="text-3xl font-bold mb-6 text-center">Contact Details</h2>

        {/* Personal Information */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-2 text-left">Personal Information</h3>
          <div className="h-1 w-20 bg-blue-500 mb-4"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-left mb-1">First Name</label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                placeholder="John"
                className="w-full p-2 rounded bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.firstName && <span className="text-red-400 text-sm">{errors.firstName}</span>}
            </div>
            <div>
              <label className="block text-left mb-1">Last Name</label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                placeholder="Doe"
                className="w-full p-2 rounded bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.lastName && <span className="text-red-400 text-sm">{errors.lastName}</span>}
            </div>
            <div>
              <label className="block text-left mb-1">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="john.doe@example.com"
                className="w-full p-2 rounded bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.email && <span className="text-red-400 text-sm">{errors.email}</span>}
            </div>
            <div>
              <label className="block text-left mb-1">Phone</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="+1 234 567 890"
                className="w-full p-2 rounded bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.phone && <span className="text-red-400 text-sm">{errors.phone}</span>}
            </div>
            <div>
              <label className="block text-left mb-1">Date of Birth</label>
              <input
                type="date"
                name="dateOfBirth"
                value={formData.dateOfBirth}
                onChange={handleChange}
                className="w-full p-2 rounded bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.dateOfBirth && <span className="text-red-400 text-sm">{errors.dateOfBirth}</span>}
            </div>
            <div>
              <label className="block text-left mb-1">Gender</label>
              <div className="flex flex-col">
                {['Male', 'Female'].map((g) => (
                  <label key={g} className="flex items-center space-x-2 mb-1">
                    <input
                      type="radio"
                      name="gender"
                      value={g}
                      checked={formData.gender === g}
                      onChange={handleChange}
                      className="form-radio h-4 w-4 text-blue-600"
                    />
                    <span>{g}</span>
                  </label>
                ))}
              </div>
              {errors.gender && <span className="text-red-400 text-sm">{errors.gender}</span>}
            </div>
          </div>
        </div>

        {/* Address Details */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-2 text-left">Address Details</h3>
          <div className="h-1 w-20 bg-blue-500 mb-4"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-left mb-1">Address Type</label>
              <select
                name="addressType"
                value={formData.addressType}
                onChange={handleChange}
                className="w-full p-2 rounded bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select Type</option>
                <option value="Home">Home</option>
                <option value="Work">Work</option>
                <option value="Other">Other</option>
              </select>
              {errors.addressType && <span className="text-red-400 text-sm">{errors.addressType}</span>}
            </div>
            <div>
              <label className="block text-left mb-1">Street</label>
              <input
                type="text"
                name="street"
                value={formData.street}
                onChange={handleChange}
                placeholder="123 Main St"
                className="w-full p-2 rounded bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.street && <span className="text-red-400 text-sm">{errors.street}</span>}
            </div>
            <div>
              <label className="block text-left mb-1">City</label>
              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleChange}
                placeholder="City Name"
                className="w-full p-2 rounded bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.city && <span className="text-red-400 text-sm">{errors.city}</span>}
            </div>
            <div>
              <label className="block text-left mb-1">State</label>
              <input
                type="text"
                name="state"
                value={formData.state}
                onChange={handleChange}
                placeholder="State"
                className="w-full p-2 rounded bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.state && <span className="text-red-400 text-sm">{errors.state}</span>}
            </div>
            <div>
              <label className="block text-left mb-1">Zip Code</label>
              <input
                type="text"
                name="zipCode"
                value={formData.zipCode}
                onChange={handleChange}
                placeholder="ZIP"
                className="w-full p-2 rounded bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.zipCode && <span className="text-red-400 text-sm">{errors.zipCode}</span>}
            </div>
          </div>
        </div>

        {/* Organization & Producer Code */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-2 text-left">Organization & Producer Code</h3>
          <div className="h-1 w-20 bg-blue-500 mb-4"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-left mb-1">Organization</label>
              <div className="relative">
                <input
                  type="text"
                  name="organization"
                  value={formData.organization}
                  onChange={handleChange}
                  placeholder="Search Organization"
                  className="w-full p-2 rounded bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  type="button"
                  onClick={() => handleSearch('organization')}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-blue-600 text-white p-2 rounded"
                >
                  <FaSearch />
                </button>
                {errors.organization && <span className="text-red-400 text-sm">{errors.organization}</span>}
              </div>
            </div>
            <div>
              <label className="block text-left mb-1">Producer Code</label>
              <div className="relative">
                <input
                  type="text"
                  name="producerCode"
                  value={formData.producerCode}
                  onChange={handleChange}
                  placeholder="Search Producer Code"
                  className="w-full p-2 rounded bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  type="button"
                  onClick={() => handleSearch('producerCode')}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-blue-600 text-white p-2 rounded"
                >
                  <FaSearch />
                </button>
                {errors.producerCode && <span className="text-red-400 text-sm">{errors.producerCode}</span>}
              </div>
            </div>
          </div>
        </div>

        {/* Modal for Suggestions */}
        {showModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white text-black p-6 rounded-md max-w-md w-full">
              <h4 className="text-xl mb-4">Select {currentField === 'organization' ? 'Organization' : 'Producer Code'}</h4>
              <div className="max-h-48 overflow-y-auto">
                {(currentField === 'organization' ? filteredOrgSuggestions : filteredProdSuggestions).map((option) => (
                  <div
                    key={option}
                    onClick={() => selectSuggestion(currentField, option)}
                    className="cursor-pointer px-4 py-2 hover:bg-blue-500"
                  >
                    {option}
                  </div>
                ))}
              </div>
              <button
                onClick={() => setShowModal(false)}
                className="mt-4 w-full bg-red-500 text-white p-2 rounded"
              >
                Close
              </button>
            </div>
          </div>
        )}

        {/* Submit and Cancel */}
        <div className="flex justify-between mt-8">
          <button
            onClick={handleSubmit}
            className="bg-blue-500 py-2 px-4 rounded-md text-white hover:bg-blue-700"
          >
            Submit
          </button>
          <button
            onClick={handleCancel}
            className="bg-gray-500 py-2 px-4 rounded-md text-white hover:bg-red-600"
          >
            Cancel
          </button>
        </div>

        {message && <div className="mt-4 text-center text-green-500">{message}</div>}
      </div>
    </div>
  );
};

export default Contact;
