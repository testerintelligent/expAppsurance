import axios from "axios";

const API_BASE_URL = "http://localhost:5000/api/billing";

export const createInvoice = async (invoiceData) => {
  try {
    const res = await axios.post(`${API_BASE_URL}/createInvoice`, invoiceData);
    return res.data;
  } catch (error) {
    console.error("Error:", error.response?.data || error.message);
  }
};
