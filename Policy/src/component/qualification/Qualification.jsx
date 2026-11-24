import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import InfoBar from "../InfoBar";
import { useWorkflowState } from "../../utils/workflowSession";
import { getQualifications, updateSubmissionOffering } from "../submission/submissionAPI";
import { Box, TextField, MenuItem, Button, Snackbar, Alert } from "@mui/material";

// Fallback qualification questions (used if the API call fails); mirrors Server/Models/Qualification.js
const YES_NO = ["Yes", "No"];
const DEFAULT_QUALIFICATIONS = [
  {
    code: "currentlyInsured",
    question: "Is the applicant currently insured?",
    options: ["Yes", "No - New Driver", "No - previous policy not renewed", "Not known"],
  },
  { code: "licenseCurrentlySuspended", question: "Is the applicant's license currently canceled or suspended?", options: YES_NO },
  { code: "licenseCanceledInPast", question: "Was the applicant's license canceled in the past?", options: YES_NO },
  { code: "trafficViolationInPast", question: "Has the driver had a traffic violation in the past?", options: YES_NO },
  { code: "coverageDeclinedInPast", question: "Was a policy or coverage declined in the past?", options: YES_NO },
];

// Step 2 of the Personal Auto flow: Offerings → Qualification → Driver → Vehicle → ...
export default function Qualification() {
  const state = useWorkflowState();
  const navigate = useNavigate();

  const [qualificationQuestions, setQualificationQuestions] = useState(DEFAULT_QUALIFICATIONS);
  const [qualifications, setQualifications] = useState(state?.qualifications || {});
  const [saving, setSaving] = useState(false);
  const [errorOpen, setErrorOpen] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  // Load qualification questions/options from the database (fall back to defaults)
  useEffect(() => {
    getQualifications()
      .then((list) => {
        const valid = list.filter((q) => q.code && q.options?.length);
        if (valid.length > 0) setQualificationQuestions(valid);
      })
      .catch((err) => console.error("Failed to load qualifications:", err));
  }, []);

  const showError = (msg) => {
    setErrorMsg(msg);
    setErrorOpen(true);
  };

  const handleBack = () => {
    navigate("/offerings", { state: { ...state, qualifications } });
  };

  const handleNext = async () => {
    if (!state?.submissionId) {
      showError("Submission ID missing. Please go back.");
      return;
    }
    if (!state?.offering) {
      showError("Offering Selection is required. Please go back.");
      return;
    }

    const unanswered = qualificationQuestions.find(
      (q) => q.required !== false && !qualifications[q.code]
    );
    if (unanswered) {
      showError(`Please answer: ${unanswered.question}`);
      return;
    }

    setSaving(true);
    try {
      await updateSubmissionOffering(state.submissionId, state.offering, qualifications);
      navigate("/driver", { state: { ...state, qualifications } });
    } catch (err) {
      showError(err.response?.data?.message || "Failed to save qualification");
    } finally {
      setSaving(false);
    }
  };

  return (
    <Box sx={{ maxWidth: 1100, mx: 0 }}>
      <InfoBar
        accountNumber={state?.accountNumber || "-"}
        product={state?.productName || "-"}
        contactName={state?.contactName || "-"}
        submissionId={state?.submissionId || "-"}
        effectiveDate={state?.effectiveDate || "-"}
        expiryDate={state?.expiryDate || "-"}
      />

      <div style={{ border: "1px solid #d7dbe2", background: "#fff", marginBottom: 14 }}>
        <div style={{ background: "#f3f6f9", padding: "7px 12px", borderBottom: "1px solid #d7dbe2", fontSize: 11, fontWeight: 700, color: "#2e3e4c", textTransform: "capitalize", letterSpacing: 0.5 }}>
          Qualification
        </div>
        <div style={{ padding: "12px 14px" }}>
          <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", sm: "max-content max-content" }, alignItems: "center", columnGap: 1.5, rowGap: 0, border: "none !important" }}>
            {qualificationQuestions.map((q) => (
              <React.Fragment key={q.code}>
                <label htmlFor={`qualification-${q.code}`} style={{ fontSize: 13, fontWeight: 400, color: "#2e3e4c" }}>
                  {q.question}
                  {q.required !== false && <span style={{ color: "#d32f2f" }}> *</span>}
                </label>
                <TextField
                  select
                  size="small"
                  id={`qualification-${q.code}`}
                  name={q.code}
                  value={qualifications[q.code] || ""}
                  onChange={(e) => setQualifications((prev) => ({ ...prev, [q.code]: e.target.value }))}
                  SelectProps={{ displayEmpty: true }}
                  sx={{ width: "fit-content", minWidth: 170, "& .MuiSelect-select": { py: 0.125, fontSize: 13 } }}
                >
                  <MenuItem value="" disabled>
                    <em>-- Select --</em>
                  </MenuItem>
                  {q.options.map((opt) => (
                    <MenuItem key={opt} value={opt}>
                      {opt}
                    </MenuItem>
                  ))}
                </TextField>
              </React.Fragment>
            ))}
          </Box>
        </div>
      </div>

      <Box sx={{ display: "flex", justifyContent: "space-between", mt: 2, pb: 2, border: "none !important" }}>
        <Button variant="text" size="small" disableElevation sx={{ border: "none", boxShadow: "none" }} onClick={handleBack}>Back</Button>
        <Button variant="contained" size="small" disableElevation sx={{ border: "none", boxShadow: "none" }} onClick={handleNext} disabled={saving}>Next</Button>
      </Box>

      <Snackbar open={errorOpen} autoHideDuration={4000} onClose={() => setErrorOpen(false)} anchorOrigin={{ vertical: "bottom", horizontal: "center" }}>
        <Alert onClose={() => setErrorOpen(false)} severity="error" sx={{ width: "100%" }}>{errorMsg}</Alert>
      </Snackbar>
    </Box>
  );
}
