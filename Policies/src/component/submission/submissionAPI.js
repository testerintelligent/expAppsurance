import api from "../../utils/api";

// Create submission
export const createSubmission = async (data) => {
  const res = await api.post("/api/submissions", data);
  return res.data.submission;
};

// Get submissions by account
export const getSubmissionsByAccount = async (accountId) => {
  const res = await api.get(`/api/submissions/account/${accountId}`);
  return res.data;
};

// Update submission status
export const updateSubmissionStatus = async (submissionId, status) => {
  const res = await api.patch(`/api/submissions/${submissionId}/status`, {
    submissionStatus: status,
  });
  return res.data.submission;
};
