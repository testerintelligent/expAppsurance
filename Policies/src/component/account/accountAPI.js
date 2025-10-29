import axios from "axios";

const API_BASE_URL = "http://10.192.190.158:5000/api/accounts";

// ➕ Create account for a contact
export const createAccountForContact = async (contact, accountType = 'Individual') => {
  // Backend expects customerId and accountType
  const res = await axios.post(`${API_BASE_URL}/createAccount`, {
    customerId: contact._id,
    accountType
  });
  return res.data.account || res.data; // handle both {account: ...} and direct object
};

// 🔍 Fetch account using contactId (Contact → Account flow)
export const searchAccountByContact = async (contactId) => {
  const res = await axios.get(`${API_BASE_URL}/byContact/${contactId}`);
  return res.data;
};

// 🔎 Search account via Account No, First Name, or Last Name (Dashboard flow)
export const searchAccount = async ({ accountId, firstName, lastName, dateOfBirth }) => {
  const res = await axios.get(`${API_BASE_URL}`, {
    params: { accountId, firstName, lastName, dateOfBirth }
  });
  return res.data;
};
