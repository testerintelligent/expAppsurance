import axios from "axios";

const API_URL = "http://localhost:5000/contacts"; // 👈 add `/api` if you prefixed in server.js

// 🔍 Search Contact
export const searchContact = async (firstName, lastName, dateOfBirth) => {
  const res = await axios.get(`${API_URL}/search`, {
    params: { firstName, lastName, dateOfBirth },
  });
  return res.data;
};

// ➕ Create Contact
export const createContact = async (contactData) => {
  const res = await axios.post(`http://localhost:5000/postContact`, contactData);
  return res.data;
};

// 📋 Get All Contacts
export const getAllContacts = async () => {
  const res = await axios.get(API_URL);
  return res.data;
};

// 🆔 Get Contact by ID
export const getContactById = async (id) => {
  const res = await axios.get(`${API_URL}/${id}`);
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
