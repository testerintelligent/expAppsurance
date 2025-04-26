import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Dashboard = () => {
  const [contacts, setContacts] = useState([]);
  const [filteredContacts, setFilteredContacts] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    try {
      const response = await axios.get('http://localhost:5000/getContact');
      setContacts(response.data);
      setFilteredContacts(response.data);
    } catch (error) {
      console.error('Error fetching contacts:', error);
    }
  };

  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();
    setSearch(value);
    const filtered = contacts.filter((contact) => {
      return (
        contact.firstName.toLowerCase().includes(value) ||
        contact.lastName.toLowerCase().includes(value) ||
        contact.email.toLowerCase().includes(value) ||
        (contact.customerId && contact.customerId.toLowerCase().includes(value))
      );
    });
    setFilteredContacts(filtered);
  };

  return (
    <div className="p-6 bg-gray-900 min-h-screen text-white">
      <h1 className="text-3xl font-bold mb-6 text-center">Contact Dashboard</h1>

      {/* Search Bar */}
      <div className="mb-6">
        <input
          type="text"
          value={search}
          onChange={handleSearch}
          placeholder="Search by name, email, or customer ID..."
          className="w-full p-3 rounded-md bg-gray-800 text-white border border-gray-600"
        />
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full table-auto border-collapse bg-gray-800 rounded-md">
          <thead>
            <tr className="bg-gray-700 text-left">
              <th className="p-3 border border-gray-600">Customer ID</th>
              <th className="p-3 border border-gray-600">Name</th>
              <th className="p-3 border border-gray-600">Email</th>
              <th className="p-3 border border-gray-600">Phone</th>
              <th className="p-3 border border-gray-600">Address</th>
              <th className="p-3 border border-gray-600">DOB</th>
              <th className="p-3 border border-gray-600">Created At</th>
            </tr>
          </thead>
          <tbody>
            {filteredContacts.map((contact) => (
              <tr key={contact._id} className="hover:bg-gray-700">
                <td className="p-3 border border-gray-600">{contact.customerId}</td>
                <td className="p-3 border border-gray-600">{contact.firstName} {contact.lastName}</td>
                <td className="p-3 border border-gray-600">{contact.email}</td>
                <td className="p-3 border border-gray-600">{contact.phone}</td>
                <td className="p-3 border border-gray-600">
                  {contact.address?.street}, {contact.address?.city}, {contact.address?.state} {contact.address?.zipCode}
                </td>
                <td className="p-3 border border-gray-600">
                  {contact.dateOfBirth ? new Date(contact.dateOfBirth).toLocaleDateString() : 'N/A'}
                </td>
                <td className="p-3 border border-gray-600">
                  {new Date(contact.createdAt).toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filteredContacts.length === 0 && (
          <p className="text-center text-gray-400 mt-4">No contacts found.</p>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
