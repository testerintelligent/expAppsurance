import axios from "axios";

const API_BASE_URL = "http://10.192.190.158:5000/api/quotes";

// ➕ Create a new Quote for a submission
export const createQuote = async (quoteData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/createQuote`, quoteData);
    return response.data;
  } catch (err) {
    console.error("Error creating quote:", err);
    throw err.response?.data || { message: "Error creating quote" };
  }
};

// 🔍 Fetch all quotes for a submission
export const getQuotesBySubmission = async (submissionId) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/submission/${submissionId}`);
    return response.data;
  } catch (err) {
    console.error("Error fetching quotes:", err);
    throw err.response?.data || { message: "Error fetching quotes" };
  }
};
