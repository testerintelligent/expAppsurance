import axios from "axios";

const API_BASE_URL = "http://10.192.190.158:5000/api/submissions";

// Create submission
export const createSubmission = async (data) => {
  const res = await axios.post(API_BASE_URL, data);
  return res.data.submission;
};

// Get submissions by account
export const getSubmissionsByAccount = async (accountId) => {
  const res = await axios.get(`${API_BASE_URL}/account/${accountId}`);
  return res.data;
};

// Update submission status
export const updateSubmissionStatus = async (submissionId, status) => {
  const res = await axios.patch(`${API_BASE_URL}/${submissionId}/status`, { submissionStatus: status });
  return res.data.submission;
};
