import api from "../../utils/api";

// ➕ Create a new Quote
export const createQuote = async (quoteData) => {
  try {
    const res = await api.post("/api/quotes/createQuote", quoteData);
    return res.data;
  } catch (err) {
    throw err.response?.data || { message: "Error creating quote" };
  }
};

// 🔍 Fetch all quotes for a submission
export const getQuotesBySubmission = async (submissionId) => {
  try {
    const res = await api.get(`/api/quotes/submission/${submissionId}`);
    return res.data;
  } catch (err) {
    throw err.response?.data || { message: "Error fetching quotes" };
  }
};
