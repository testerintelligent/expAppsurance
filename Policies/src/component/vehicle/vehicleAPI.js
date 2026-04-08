import axios from "axios";

const API_BASE_URL = "http://10.192.190.158:5000/api/vehicles";
const API_PRICING_URL = "http://10.192.190.158:5001/api/pricing/calculate";

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

export const calculatePremium = async (vehicleData) => {
  try {
    const res = await axios.post(API_PRICING_URL, vehicleData);
    return res.data;
  } catch (error) {
    console.error("Error calculating premium:", error);
    throw error;
  }
};
