import axios from "axios";

const API_URL = "http://10.192.190.158:5000/api/contacts"; // ✅ includes /api prefix

// 🔍 Search Contact with optional parameters
export const searchContact = async ({ firstName, lastName, dateOfBirth }) => {
  // Build params object only with filled values
  const params = {};
  if (firstName) params.firstName = firstName;
  if (lastName) params.lastName = lastName;
  if (dateOfBirth) params.dateOfBirth = dateOfBirth;

  if (Object.keys(params).length === 0) {
    throw new Error("Please provide at least one search field");
  }

  const res = await axios.get(API_URL, { params });
  return res.data;
};

// ➕ Create Contact
export const createContact = async (contactData) => {
  const res = await axios.post(API_URL, contactData);
  return res.data;
};

// ✏️ Update Contact
export const updateContact = async (id, updatedData) => {
  const res = await axios.put(`${API_URL}/${id}`, updatedData);
  return res.data;
};

// ❌ Delete Contact
export const deleteContact = async (id) => {
  const res = await axios.delete(`${API_URL}/${id}`);
  return res.data;
};
