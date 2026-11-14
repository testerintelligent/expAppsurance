import api from "../../utils/api";

// ➕ Create account for a contact
export const createAccountForContact = async (contact, accountType = "Individual") => {
  const res = await api.post("/api/accounts/createAccount", {
    customerId: contact._id,
    accountType,
  });
  return res.data.account || res.data;
};

// 🔍 Fetch account using contactId
export const searchAccountByContact = async (contactId) => {
  const res = await api.get(`/api/accounts/byContact/${contactId}`);
  return res.data;
};

// 🔎 Search account by fields
export const searchAccount = async ({ accountNumber, firstName, lastName, dateOfBirth, organization, city, zipCode, country }) => {
  const res = await api.get("/api/accounts", {
    params: { accountNumber, firstName, lastName, dateOfBirth, organization, city, zipCode, country },
  });
  return res.data;
};
