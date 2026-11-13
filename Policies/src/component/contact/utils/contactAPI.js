import api from "../../../utils/api";

// 🔍 Search contacts — supports Person fields (firstName/lastName/dateOfBirth)
// and Company fields (organization) plus location fields (city/state/zipCode/country)
export const searchContact = async ({ firstName, lastName, dateOfBirth, organization, city, state, zipCode, country }) => {
  const params = {};
  if (firstName)    params.firstName    = firstName;
  if (lastName)     params.lastName     = lastName;
  if (dateOfBirth)  params.dateOfBirth  = dateOfBirth;
  if (organization) params.organization = organization;
  if (city)         params.city         = city;
  if (state)        params.state        = state;
  if (zipCode)      params.zipCode      = zipCode;
  if (country)      params.country      = country;

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
