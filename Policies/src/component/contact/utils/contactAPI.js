import api from "../../../utils/api";

// 🔍 Search contacts
export const searchContact = async ({ firstName, lastName, dateOfBirth }) => {
  const params = {};
  if (firstName) params.firstName = firstName;
  if (lastName) params.lastName = lastName;
  if (dateOfBirth) params.dateOfBirth = dateOfBirth;

  if (Object.keys(params).length === 0) {
    throw new Error("Please provide at least one search field");
  }

  const res = await api.get("/api/contacts", { params });
  return res.data;
};

// ➕ Create Contact
export const createContact = async (contactData) => {
  const res = await api.post("/api/contacts", contactData);
  return res.data;
};

// 📋 Get all contacts
export const getContact = async () => {
  const res = await api.get("/api/contacts/getContact");
  return res.data;
};

// ✏️ Update Contact
export const updateContact = async (id, updatedData) => {
  const res = await api.put(`/api/contacts/${id}`, updatedData);
  return res.data;
};

// ❌ Delete Contact
export const deleteContact = async (id) => {
  const res = await api.delete(`/api/contacts/${id}`);
  return res.data;
};
