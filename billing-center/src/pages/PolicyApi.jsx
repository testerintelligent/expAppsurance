import React from "react";
import axios from "axios";

// const API_BASE_URL = "http://10.192.190.158:5000/api/accounts";

export const searchPolicy = async (policyNumber) => {
  try {
    const response = await axios.get(
      `http://10.192.190.158:5000/api/Policies/getPolicyByNumber/${policyNumber}`
    );

    return response.data;
  } catch (err) {
    console.log("Failed to fetch policy details");
  }
};
