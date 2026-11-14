import React, { useEffect, useState } from "react";
import {
  TextField,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
} from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";

export default function CreateClaim() {
  const location = useLocation();
  const navigate = useNavigate();

  // Normalized policy object
  const [policy, setPolicy] = useState(null);
  const [lossDate, setLossDate] = useState("");
  const [error, setError] = useState("");
  const [claimType, setClaimType] = useState("Auto"); // Use default value - Auto

  /* =========================
     LOAD POLICY CONTEXT
     ========================= */
  useEffect(() => {
    if (location.state?.policy) {
      setPolicy(location.state.policy);
    } else {
      const saved = sessionStorage.getItem("selectedPolicyForClaim");
      if (saved) {
        setPolicy(JSON.parse(saved));
      }
    }
  }, [location.state]);

  const handleDateChange = (e, policy) => {
      const minDate = policy?.effectiveDate?.split("T")[0];
      const maxDate = policy?.expiryDate?.split("T")[0];
      const value = e;
      setLossDate(value);

       // Validate only if the value is non-empty
        if (value) {
          if (value < minDate || value > maxDate) {
            setError(`Date must be between ${minDate} and ${maxDate}`);
          } else {
            setError(""); // valid
          }
        } else {
          setError(""); // empty input
        }
  }

  /* =========================
     BASIC INFO
     ========================= */
  const handleNext = () => {
    if (!lossDate || !claimType) return;

    navigate("/Claim/basicinfo", {
      state: {
        policy,
        lossDate,
        claimType,
        contact,
        vehicles: policy.vehicle || [],
        drivers: policy.driver || [],
      },
    });
  };

  if (!policy) {
    return (
      <div style={{ padding: 16 }}>
        <span style={{ color: "red" }}>No policy selected. Please go back.</span>
      </div>
    );
  }

  const contact = policy.contact;

  return (
    <div style={{ padding: "16px 18px", background: "#eef2f5", minHeight: "100%", color: "#2d3e52" }}>
      <div style={{ maxWidth: 1100, background: "#fff", border: "1px solid #d7dbe2" }}>
        {/* Section header */}
        <div style={{ background: "#f3f6f9", padding: "7px 12px", borderBottom: "1px solid #d7dbe2", fontSize: 11, fontWeight: 700, color: "#2e3e4c", textTransform: "uppercase", letterSpacing: 0.5 }}>
          New Claim
        </div>

        <div style={{ padding: "14px 16px" }}>
          {/* ------------------- POLICY DETAILS TABLE ------------------- */}
          <div style={{ border: "1px solid #d7dbe2", marginBottom: 14, overflow: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 12 }}>
              <thead>
                <tr>
                  {["Policy #", "Insured", "Address", "City", "State", "ZIP Code", "Effective", "Expires"].map((h) => (
                    <th key={h} style={{ background: "#f6f7f8", color: "#31475f", fontSize: 11, fontWeight: 700, padding: "8px 10px", borderBottom: "2px solid #d7dbe2", borderRight: "1px solid #e3e8ee", textAlign: "left" }}>
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <tr style={{ background: "#f8fafb" }}>
                  <td style={{ padding: "7px 10px", borderBottom: "1px solid #f0f0f0" }}>{policy.policyNumber}</td>
                  <td style={{ padding: "7px 10px", borderBottom: "1px solid #f0f0f0" }}>
                    {contact ? `${contact.firstName || ""} ${contact.lastName || ""}`.trim() : "N/A"}
                  </td>
                  <td style={{ padding: "7px 10px", borderBottom: "1px solid #f0f0f0" }}>
                    {contact?.address || contact?.street || "N/A"}
                  </td>
                  <td style={{ padding: "7px 10px", borderBottom: "1px solid #f0f0f0" }}>{contact?.city || "N/A"}</td>
                  <td style={{ padding: "7px 10px", borderBottom: "1px solid #f0f0f0" }}>{contact?.state || "N/A"}</td>
                  <td style={{ padding: "7px 10px", borderBottom: "1px solid #f0f0f0" }}>{contact?.zipCode || "N/A"}</td>
                  <td style={{ padding: "7px 10px", borderBottom: "1px solid #f0f0f0" }}>
                    {policy.effectiveDate ? new Date(policy.effectiveDate).toLocaleDateString() : "N/A"}
                  </td>
                  <td style={{ padding: "7px 10px", borderBottom: "1px solid #f0f0f0" }}>
                    {policy.expiryDate ? new Date(policy.expiryDate).toLocaleDateString() : "N/A"}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div style={{ borderTop: "1px solid #d7dbe2", margin: "16px 0" }} />

          {/* ------------------- LOSS DATE ------------------- */}
          <div style={{ fontSize: 13, fontWeight: 700, color: "#2d3e52", marginBottom: 8 }}>
            Loss Date<span style={{ color: "red" }}> *</span>
          </div>

          <TextField
            type="date"
            value={lossDate}
            onChange={(e) => handleDateChange(e.target.value, policy)}
            required
            size="small"
            error={!!error}
            helperText={error}
            inputProps={{
              min: policy.effectiveDate.split("T")[0],
              max: policy.expiryDate.split("T")[0],
            }}
            sx={{ width: 250, mb: 3 }}
            InputLabelProps={{ shrink: true }}
          />

          {/* ------------------- CLAIM TYPE ------------------- */}
          <div style={{ fontSize: 13, fontWeight: 700, color: "#2d3e52", marginBottom: 8 }}>
            Type of Claim<span style={{ color: "red" }}> *</span>
          </div>

          <FormControl component="fieldset" sx={{ mb: 3 }}>
            <RadioGroup
              value={claimType}
              defaultValue="Auto"
              onChange={(e) => setClaimType(e.target.value)}
            >
              <FormControlLabel value="Auto" control={<Radio />} label="Auto" />
              <FormControlLabel
                value="Auto - Auto First and Final"
                control={<Radio />}
                label="Auto - Auto First and Final"
              />
              <FormControlLabel
                value="Auto - Quick Claim Auto"
                control={<Radio />}
                label="Auto - Quick Claim Auto"
              />
            </RadioGroup>
          </FormControl>

          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <button
              disabled={!lossDate || !claimType || !!error}
              onClick={handleNext}
              style={{ background: !lossDate || !claimType || !!error ? "#c0c8d0" : "#1f5fa6", color: "#fff", border: "none", padding: "6px 16px", fontSize: 12, fontWeight: 600, cursor: !lossDate || !claimType || !!error ? "default" : "pointer" }}
            >
              Next →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
