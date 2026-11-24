import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import InfoBar from "../InfoBar";
import { useWorkflowState } from "../../utils/workflowSession";
import { getOfferings } from "../submission/submissionAPI";
import { Box, TextField, MenuItem, Button, Snackbar, Alert } from "@mui/material";

const DEFAULT_OFFERINGS = ["Basic Program", "Standard Program", "Premium Program"];

// Step 1 of the Personal & Commercial Auto flows: Offerings → Qualification → Driver → Vehicle → ...
export default function Offerings() {
  const state = useWorkflowState();
  const navigate = useNavigate();

  const [offerings, setOfferings] = useState(DEFAULT_OFFERINGS);
  const [offering, setOffering] = useState(state?.offering || DEFAULT_OFFERINGS[0]);
  const [errorOpen, setErrorOpen] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  // Load offerings from the database (fall back to defaults on failure)
  useEffect(() => {
    getOfferings()
      .then((list) => {
        if (list.length > 0) setOfferings(list.map((o) => o.name));
      })
      .catch((err) => console.error("Failed to load offerings:", err));
  }, []);

  const handleNext = () => {
    if (!offering) {
      setErrorMsg("Offering Selection is required");
      setErrorOpen(true);
      return;
    }
    navigate("/qualification", { state: { ...state, offering } });
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
          Offerings
        </div>
        <div style={{ padding: "12px 14px" }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, border: "none !important" }}>
            <label htmlFor="offering-select" style={{ fontSize: 13, fontWeight: 400, color: "#2e3e4c", whiteSpace: "nowrap" }}>
              Offering Selection <span style={{ color: "#d32f2f" }}>*</span>
            </label>
            <TextField
              select
              size="small"
              id="offering-select"
              name="offering"
              value={offering}
              onChange={(e) => setOffering(e.target.value)}
              sx={{ width: "fit-content", minWidth: 170, "& .MuiSelect-select": { py: 0.125, fontSize: 13 } }}
            >
              {offerings.map((name) => (
                <MenuItem key={name} value={name}>
                  {name}
                </MenuItem>
              ))}
            </TextField>
          </Box>
        </div>
      </div>

      <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2, pb: 2, border: "none !important" }}>
        <Button variant="contained" size="small" disableElevation sx={{ border: "none", boxShadow: "none" }} onClick={handleNext}>Next</Button>
      </Box>

      <Snackbar open={errorOpen} autoHideDuration={4000} onClose={() => setErrorOpen(false)} anchorOrigin={{ vertical: "bottom", horizontal: "center" }}>
        <Alert onClose={() => setErrorOpen(false)} severity="error" sx={{ width: "100%" }}>{errorMsg}</Alert>
      </Snackbar>
    </Box>
  );
}
