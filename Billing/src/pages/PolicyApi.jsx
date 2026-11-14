import React from "react";
import axios from "axios";


export const searchPolicy = async (policyNumber) => {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_API_URL}/api/Policies/getPolicyByNumber/${policyNumber}`
    );

    return response.data;
  } catch (err) {
    console.log("showerr", err.message);
  }
};
