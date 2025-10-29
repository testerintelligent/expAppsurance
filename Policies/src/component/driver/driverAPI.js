import axios from "axios";

const API_BASE_URL = "http://10.192.190.158:5000/api/drivers";

// ➕ Create driver for a submission
export const createDriverForSubmission = async (submissionId, driverData) => {
  // Backend expects submissionId and driver details
  const res = await axios.post(`${API_BASE_URL}/createDriver`, {
    submissionId,
    ...driverData
  });
  return res.data.driver || res.data; // handle both {driver: ...} and direct object
};

// 🔍 Fetch drivers by submissionId
export const getDriversBySubmission = async (submissionId) => {
  const res = await axios.get(`${API_BASE_URL}/submission/${submissionId}`);
  return res.data;
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
