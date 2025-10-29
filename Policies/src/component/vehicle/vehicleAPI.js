import axios from "axios";

const API_BASE_URL = "http://10.192.190.158:5000/api/vehicles";

// ➕ Create vehicle for a submission
export const createVehicleForSubmission = async (submissionId, vehicleData) => {
  const res = await axios.post(`${API_BASE_URL}/createVehicle`, {
    submissionId,
    ...vehicleData,
  });
  return res.data;
};

// 🔍 Fetch all vehicles for a submission
export const getVehiclesBySubmission = async (submissionId) => {
  const res = await axios.get(`${API_BASE_URL}/submission/${submissionId}`);
  return res.data;
};

// ✏️ Update a vehicle
export const updateVehicle = async (vehicleId, updatedData) => {
  const res = await axios.put(`${API_BASE_URL}/${vehicleId}`, updatedData);
  return res.data;
};
