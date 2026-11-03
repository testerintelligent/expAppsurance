import React, { useState } from "react";
import {
  TextField,
  RadioGroup,
  FormControlLabel,
  Radio,
  FormControl,
  Select,
  MenuItem,
  InputLabel,
  Checkbox,
} from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import PolicyTitleBar from "./PolicyTitleBar";


export default function AddClaimInfo() {
  const { state } = useLocation();
  const navigate = useNavigate();

  const {
    policy,
    lossDate,
    claimType,
    selectedVehicles,
    selectedDrivers,
    reportedName,
    relation,
    howReported,
    dateOfNotice,
  } = state;

  /* ===============================
     STATE
     =============================== */
  const [lossDescription, setLossDescription] = useState("");
  const [lossLocation, setLossLocation] = useState("");
  const [lossCause, setLossCause] = useState("");
  const [policeReported, setPoliceReported] = useState("no");
  const [faultRating, setFaultRating] = useState("Fault unknown");
  const [weather, setWeather] = useState("None");
  const [incidentOnly, setIncidentOnly] = useState(false);

  const weatherOptions = ['None', 'Clear', 'Fog', 'Ice', 'Rain', 'Snow', 'Wind'];
  const lossCauseOptions = ['Animal', 'Collision', 'Damage in loading or unloading', 'Falling or moving object', 'Fire', 'Glass breakage', 'Rear-end collision', 'Rollover', 'Theft Audio or other parts', 'Theft of entire vechicle'];

  const contact = policy.contact;

  const insuredFullName = `${contact?.firstName || ""} ${contact?.lastName || ""}`.trim();

  /* ===============================
     HANDLERS
     =============================== */
  const handleNext = () => {
    navigate("/Claim/review", {
      state: {
        policy,
        lossDate,
        claimType,
        selectedVehicles,
        selectedDrivers,
        reportedName,
        relation,
        howReported,
        dateOfNotice,
        lossDescription,
        lossLocation,
        policeReported: policeReported === "yes",
        faultRating,
        weather,
        lossCause,
        incidentOnly
      },
    });
  };

  /* ===============================
     UI
     =============================== */
  return (
    <div style={{ padding: "16px 18px", background: "#eef2f5", minHeight: "100%", color: "#2d3e52" }}>
      <div style={{ maxWidth: 1200, background: "#fff", border: "1px solid #d7dbe2" }}>
        <div style={{ padding: "14px 16px" }}>
          <PolicyTitleBar
            policyNumber={policy?.policyNumber}
            insured={insuredFullName}
            lossDate={lossDate}
            status="Draft"
          />

          {/* Action buttons */}
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 16, marginTop: 8 }}>
            <button style={{ border: "1px solid #c62828", background: "#fff", color: "#c62828", padding: "5px 14px", fontSize: 12, cursor: "pointer" }}>
              Cancel
            </button>
            <div style={{ display: "flex", gap: 8 }}>
              <button onClick={() => navigate(-1)} style={{ border: "1px solid #d7dbe2", background: "#fff", color: "#2d3e52", padding: "5px 14px", fontSize: 12, cursor: "pointer" }}>
                ← Back
              </button>
              <button onClick={handleNext} style={{ background: "#1f5fa6", color: "#fff", border: "none", padding: "5px 14px", fontSize: 12, fontWeight: 600, cursor: "pointer" }}>
                Next →
              </button>
            </div>
          </div>

          {/* ================= Header ================= */}
          <div style={{ fontSize: 11, fontWeight: 700, color: "#2e3e4c", textTransform: "uppercase", letterSpacing: 0.5, background: "#f3f6f9", border: "1px solid #d7dbe2", borderLeft: "none", borderRight: "none", padding: "7px 12px", marginBottom: 14, marginTop: 16 }}>
            Add Claim Information
          </div>

          {/* LOSS DESCRIPTION */}
          <TextField
            label="Loss Description"
            fullWidth
            multiline
            rows={4}
            size="small"
            sx={{ mb: 2 }}
            value={lossDescription}
            placeholder="What Happened?"
            onChange={(e) => setLossDescription(e.target.value)}
          />

          {/* LOSS LOCATION */}
          <TextField
            label="Loss Location"
            fullWidth
            size="small"
            sx={{ mb: 2 }}
            value={lossLocation}
            onChange={(e) => setLossLocation(e.target.value)}
          />

          <FormControl fullWidth size="small" sx={{ mb: 2 }}>
            <InputLabel>Loss Cause</InputLabel>
            <Select
              label="Loss Cause"
              value={lossCause}
              onChange={(e) => setLossCause(e.target.value)}
            >
              {lossCauseOptions.map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <div style={{ display: "flex", alignItems: "center", marginBottom: 8 }}>
            <Checkbox
              checked={incidentOnly}
              onChange={(e) => setIncidentOnly(e.target.checked)}
              size="small"
            />
            <span style={{ fontSize: 12, color: "#2d3e52" }}>Incident Only</span>
          </div>

          <div style={{ borderTop: "1px solid #d7dbe2", margin: "14px 0" }} />

          {/* ================= Categorization ================= */}
          <div style={{ fontSize: 11, fontWeight: 700, color: "#2e3e4c", textTransform: "uppercase", letterSpacing: 0.5, background: "#f3f6f9", border: "1px solid #d7dbe2", borderLeft: "none", borderRight: "none", padding: "7px 12px", marginBottom: 14 }}>
            Categorization
          </div>

          {/* FAULT RATING */}
          <FormControl fullWidth size="small" sx={{ mb: 2 }}>
            <InputLabel>Fault Rating</InputLabel>
            <Select
              label="Fault Rating"
              value={faultRating}
              onChange={(e) => setFaultRating(e.target.value)}
            >
              <MenuItem value="Other Party at fault">Other Party at fault</MenuItem>
              <MenuItem value="Insured fault">Insured fault</MenuItem>
              <MenuItem value="Fault unknown">Fault unknown</MenuItem>
              <MenuItem value="No fault">No fault</MenuItem>
            </Select>
          </FormControl>

          {/* WEATHER */}
          <FormControl fullWidth size="small" sx={{ mb: 2 }}>
            <InputLabel>Weather</InputLabel>
            <Select
              label="Weather"
              value={weather}
              onChange={(e) => setWeather(e.target.value)}
            >
              {weatherOptions.map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          {/* POLICE REPORTED */}
          <div style={{ fontSize: 12, color: "#2d3e52", marginBottom: 4 }}>Police Reported?</div>
          <RadioGroup
            row
            value={policeReported}
            onChange={(e) => setPoliceReported(e.target.value)}
          >
            <FormControlLabel value="yes" control={<Radio size="small" />} label="Yes" />
            <FormControlLabel value="no" control={<Radio size="small" />} label="No" />
          </RadioGroup>

          {/* ACTIONS */}
          <div style={{ textAlign: "right", marginTop: 16 }}>
            <button onClick={handleNext} style={{ background: "#1f5fa6", color: "#fff", border: "none", padding: "6px 16px", fontSize: 12, fontWeight: 600, cursor: "pointer" }}>
              Next →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
