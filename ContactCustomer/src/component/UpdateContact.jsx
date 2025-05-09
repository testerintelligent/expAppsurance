import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const UpdateContact = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [contact, setContact] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    axios.get(`http://http://10.192.190.148:5000/view/${id}`)
      .then((res) => {
        setContact(res.data.contact);
        setLoading(false);
      })
      .catch((err) => {
        setError('Error loading contact');
        setLoading(false);
      });
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setContact(prev => ({
      ...prev,
      [name]: value,
      address: {
        ...prev.address,
        [name]: value,
      }
    }));
  };

  const handleUpdate = () => {
    axios.put(`http://10.192.190.148:5000/updateContact/${id}`, contact)
      .then(() => {
        alert('Contact updated successfully');
        navigate('/Dashboard');
      })
      .catch(err => {
        alert('Update failed');
        console.error(err);
      });
  };

  if (loading) return <p>Loading...</p>;
  if (error || !contact) return <p>{error || 'Contact not found'}</p>;

  return (
    <div className="flex justify-center items-start py-10 bg-white-900 min-h-screen overflow-y-auto">
      <div className="bg-gray-800 bg-opacity-90 shadow-2xl rounded-xl p-8 w-full max-w-3xl h-max text-white">
        <h2 className="text-3xl font-bold mb-6 text-center">Update Contact</h2>

        {/* Personal Info */}
        <div className="mb-10">
          <h3 className="text-lg font-semibold mb-2 text-left">Personal Information</h3>
          <div className="h-1 w-20 bg-blue-500 mb-4"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input label="First Name" name="firstName" value={contact.firstName} onChange={handleChange} />
            <Input label="Last Name" name="lastName" value={contact.lastName} onChange={handleChange} />
            <Input label="Email" name="email" value={contact.email} onChange={handleChange} />
            <Input label="Phone" name="phone" value={contact.phone} onChange={handleChange} />
            <Input label="Date of Birth" name="dateOfBirth" type="date" value={contact.dateOfBirth?.split('T')[0]} onChange={handleChange} />
            <Input label="Gender" name="gender" value={contact.gender} onChange={handleChange} />
          </div>
        </div>

        {/* Address Info */}
        <div className="mb-10">
          <h3 className="text-lg font-semibold mb-2 text-left">Address Details</h3>
          <div className="h-1 w-20 bg-blue-500 mb-4"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input label="AddressType" name="AddressType" value={contact.address || ''} onChange={handleChange} />
            <Input label="Street" name="street" value={contact.street || ''} onChange={handleChange} />
            <Input label="City" name="city" value={contact.city || ''} onChange={handleChange} />
            <Input label="State" name="state" value={contact.state || ''} onChange={handleChange} />
            <Input label="Zip Code" name="zipCode" value={contact.zipCode || ''} onChange={handleChange} />
          </div>
        </div>

        {/* Org Info */}
        <div className="mb-10">
          <h3 className="text-lg font-semibold mb-2 text-left">Organization & Producer Code</h3>
          <div className="h-1 w-20 bg-blue-500 mb-4"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input label="Organization" name="organization" value={contact.organization} onChange={handleChange} />
            <Input label="Producer Code" name="producerCode" value={contact.producerCode} onChange={handleChange} />
          </div>
        </div>

        <div className="flex justify-between mt-8">
          <button
            onClick={() => navigate('/Dashboard')}
            className="bg-gray-500 py-2 px-4 rounded-md text-white hover:bg-gray-700"
          >
            Cancel
          </button>
          <button
            onClick={handleUpdate}
            className="bg-blue-600 py-2 px-6 rounded-md text-white hover:bg-blue-800"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

// Reusable input component
const Input = ({ label, name, value, onChange, type = 'text' }) => (
  <div>
    <label className="block text-left mb-1">{label}:</label>
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      className="w-full p-2 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
  </div>
);

export default UpdateContact;
