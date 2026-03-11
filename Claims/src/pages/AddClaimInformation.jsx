import React, { useState } from "react";
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  RadioGroup,
  FormControlLabel,
  Radio,
  FormControl,
  Select,
  MenuItem,
  InputLabel,
  Grid,
  Divider,
  Checkbox
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

  const insuredFullName = `${contact?.firstName || ""} ${contact?.lastName || ""
    }`.trim();


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
    <Box p={3}>
      <Paper elevation={3} sx={{ p: 3, maxWidth: 1200, margin: "0 auto" }}>
        <PolicyTitleBar 
        policyNumber = {policy?.policyNumber}
        insured = {insuredFullName}
        lossDate = {lossDate}
        status = 'Draft'
        ></PolicyTitleBar>

        {/* HEADER */}
                <Box display="flex" justifyContent="space-between" mb={3} mt={3}>
                  <Button variant="outlined" color="error">
                    Cancel
                  </Button>
        
                  <Box>
                    <Button variant="outlined" sx={{ mr: 2 }} onClick={() => navigate(-1)}>
                      ← Back
                    </Button>
                    <Button variant="contained" onClick={handleNext}>
                      Next →
                    </Button>
                  </Box>
                </Box>

        {/* ================= Header ================= */}
        <Typography variant="h6" align="left" sx={{ fontWeight: 600, mb: 2 }}>Add Claim Information</Typography>

        {/* LOSS DESCRIPTION */}
        <TextField
          label="Loss Description"
          fullWidth
          multiline
          rows={4}
          sx={{ mb: 2 }}
          value={lossDescription}
          placeholder="What Happened?"
          onChange={(e) => setLossDescription(e.target.value)}
        />

        {/* LOSS LOCATION */}
        <TextField
          label="Loss Location"
          fullWidth
          sx={{ mb: 2 }}
          value={lossLocation}
          onChange={(e) => setLossLocation(e.target.value)}
        />

        <FormControl fullWidth sx={{ mb: 2 }}>
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

        <Box display="flex" alignItems="center">
          <Checkbox
            checked={incidentOnly}
            onChange={(e) => setIncidentOnly(e.target.checked)}
          />
          <Typography>
            IncidentOnly
          </Typography>
        </Box>




        <Divider sx={{ my: 3 }} />

        {/* ================= Categorization ================= */}
        <Typography variant="h6" align="left" sx={{ fontWeight: 600, mb: 2 }}>Categorization</Typography>

        {/* FAULT RATING */}
        <FormControl fullWidth sx={{ mb: 2 }}>
          <InputLabel>Fault Rating</InputLabel>
          <Select
            label="Fault Rating"
            value={faultRating}
            onChange={(e) => setFaultRating(e.target.value)}
          >
            <MenuItem value="Other Party at fault">
              Other Party at fault
            </MenuItem>
            <MenuItem value="Insured fault">
              Insured fault
            </MenuItem>
            <MenuItem value="Fault unknown">
              Fault unknown
            </MenuItem>
            <MenuItem value="No fault">
              No fault
            </MenuItem>
          </Select>
        </FormControl>

        {/* FAULT RATING */}
        <FormControl fullWidth sx={{ mb: 2 }}>
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
        <Typography variant="subtitle1" align="left">Police Reported?</Typography>
        <RadioGroup
          row
          value={policeReported}
          onChange={(e) => setPoliceReported(e.target.value)}
        >
          <FormControlLabel value="yes" control={<Radio />} label="Yes" />
          <FormControlLabel value="no" control={<Radio />} label="No" />
        </RadioGroup>

        {/* ACTIONS */}
        <Box textAlign="right" mt={3}>
          <Button variant="contained" color='#ffp7eso' onClick={handleNext}>
            Next →
          </Button>
        </Box>
      </Paper>
    </Box>
  );
}
