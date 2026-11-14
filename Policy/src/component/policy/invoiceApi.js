import api from "../../utils/api";

export const createInvoice = async (invoiceData) => {
  try {
    const res = await api.post("/api/billing/createInvoice", invoiceData);
    return res.data;
  } catch (error) {
    console.error("Error creating invoice:", error.response?.data || error.message);
    throw error;
  }
};
