import axios from "axios";

const API_BASE_URL = "http://10.192.190.158:5000/api/drivers";

// ➕ Create driver for a submission
export const createDriverForSubmission = async (submissionId, driverData) => {
  // Backend expects submissionId and driver details

  const res = await axios.post(`${API_BASE_URL}/createDriver`, {
    submissionId,
    ...driverData,
  });
  console.log("response", res.data);
  return res.data.driver || res.data; // handle both {driver: ...} and direct object
};

// 🔍 Fetch drivers by submissionId
export const getDriversBySubmission = async (submissionId) => {
  const res = await axios.get(`${API_BASE_URL}/submission/${submissionId}`);
  // Returns array of drivers (empty array if none found)
  return Array.isArray(res.data) ? res.data : [];
};

// 🔍 Fetch drivers by accountId (for existing accounts)
export const getDriversByAccount = async (accountId) => {
  const res = await axios.get(`${API_BASE_URL}/account/${accountId}`);
  // Returns array of drivers (empty array if none found)
  return Array.isArray(res.data) ? res.data : [];
};

// 🔎 Search driver by driverId
export const getDriverById = async (driverId) => {
  const res = await axios.get(`${API_BASE_URL}/${driverId}`);
  return res.data;
};

// ✏️ Update driver details
export const updateDriver = async (driverId, updatedData) => {
  const res = await axios.put(`${API_BASE_URL}/${driverId}`, updatedData);
  return res.data;
};
