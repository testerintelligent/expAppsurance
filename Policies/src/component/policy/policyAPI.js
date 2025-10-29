import axios from "axios";

const API_BASE_URL = "http://10.192.190.158:5000/api/policies";

export const createPolicy = async (policyData) => {
  try {
    const res = await axios.post(`${API_BASE_URL}/createPolicy`, policyData);
    return res.data;
  } catch (err) {
    console.error("Error creating policy:", err);
    throw err.response?.data || { message: "Error creating policy" };
  }
};
