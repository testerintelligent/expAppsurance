import api from "../../utils/api";

export const createPolicy = async (policyData) => {
  try {
    const res = await api.post("/api/policies/createPolicy", policyData);
    return res.data;
  } catch (err) {
    throw err.response?.data || { message: "Error creating policy" };
  }
};
