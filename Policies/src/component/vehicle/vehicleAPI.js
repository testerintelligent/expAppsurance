import api, { PRICING_BASE_URL } from "../../utils/api";
import axios from "axios";

// ➕ Create vehicle for a submission
export const createVehicleForSubmission = async (submissionId, vehicleData) => {
  const res = await api.post("/api/vehicles/createVehicle", {
    submissionId,
    ...vehicleData,
  });
  return res.data;
};

// 🔍 Fetch all vehicles for a submission
export const getVehiclesBySubmission = async (submissionId) => {
  const res = await api.get(`/api/vehicles/submission/${submissionId}`);
  return res.data;
};

// ✏️ Update a vehicle
export const updateVehicle = async (vehicleId, updatedData) => {
  const res = await api.put(`/api/vehicles/${vehicleId}`, updatedData);
  return res.data;
};

// 💲 Calculate premium (separate pricing service on port 5001)
export const calculatePremium = async (vehicleData) => {
  const res = await axios.post(
    `${PRICING_BASE_URL}/api/pricing/calculate`,
    vehicleData
  );
  return res.data;
};
