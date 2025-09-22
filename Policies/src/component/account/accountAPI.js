
import axios from "axios";
const API_URL = "http://localhost:5000/accounts";

// Create account for a contact
export const createAccountForContact = async (contact, accountType = 'Individual') => {
  // The backend expects customerId and accountType
  const res = await axios.post('http://localhost:5000/createAccount', {
    customerId: contact._id,
    accountType
  });
  return res.data.account || res.data; // handle both {account: ...} and direct object
};

// Fetch account using contactId (Contact → Account flow)
export const searchAccountByContact = async (contactId) => {
  const res = await axios.get(`${API_URL}/byContact/${contactId}`);
  return res.data;
};

// Search account via Account No + name + DOB (Dashboard flow)
export const searchAccount = async (params) => {
  const res = await axios.get(`${API_URL}/searchAccount`, { params });
  return res.data;
};
