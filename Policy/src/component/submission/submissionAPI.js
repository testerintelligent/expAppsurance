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

// Get available offerings
export const getOfferings = async () => {
  const res = await api.get("/api/offerings");
  return Array.isArray(res.data) ? res.data : [];
};

// Get qualification questions (with options)
export const getQualifications = async () => {
  const res = await api.get("/api/qualifications");
  return Array.isArray(res.data) ? res.data : [];
};

// Save selected offering (and qualification answers, keyed by question code) on a submission
export const updateSubmissionOffering = async (submissionId, offering, qualifications) => {
  const res = await api.patch(`/api/submissions/${submissionId}/offering`, {
    offering,
    qualifications,
  });
  return res.data.submission;
};
