import api from "../../utils/api";

// ➕ Create driver for a submission
export const createDriverForSubmission = async (submissionId, driverData) => {
  const res = await api.post("/api/drivers/createDriver", {
    submissionId,
    ...driverData,
  });
  return res.data.driver || res.data;
};

// 🔍 Fetch drivers by submissionId
export const getDriversBySubmission = async (submissionId) => {
  const res = await api.get(`/api/drivers/submission/${submissionId}`);
  return Array.isArray(res.data) ? res.data : [];
};

// 🔍 Fetch drivers by accountId
export const getDriversByAccount = async (accountId) => {
  const res = await api.get(`/api/drivers/account/${accountId}`);
  return Array.isArray(res.data) ? res.data : [];
};

// 🔎 Get driver by ID
export const getDriverById = async (driverId) => {
  const res = await api.get(`/api/drivers/${driverId}`);
  return res.data;
};

// ✏️ Update driver
export const updateDriver = async (driverId, updatedData) => {
  const res = await api.put(`/api/drivers/${driverId}`, updatedData);
  return res.data;
};
