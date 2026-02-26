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
} from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";

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
  const [policeReported, setPoliceReported] = useState("no");
  const [faultRating, setFaultRating] = useState("Fault unknown");

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
      },
    });
  };

  /* ===============================
     UI
     =============================== */
  return (
    <Box p={3}>
      <Paper sx={{ p: 3, maxWidth: 900, margin: "0 auto" }}>
        {/* HEADER */}
        <Typography variant="h5" mb={2}>
          Loss Details
        </Typography>

        {/* CLAIM POLICY SUMMARY */}
        <Paper
          variant="outlined"
          sx={{ p: 2, mb: 3, backgroundColor: "#fafafa" }}
        >
          <Typography variant="subtitle1" fontWeight="bold">
            Claim Policy
          </Typography>

          <Grid container spacing={2} mt={1}>
            <Grid item xs={6}>
              <Typography variant="body2" color="text.secondary">
                Policy Number
              </Typography>
              <Typography>{policy?.policyNumber}</Typography>
            </Grid>

            <Grid item xs={6}>
              <Typography variant="body2" color="text.secondary">
                Policy Status
              </Typography>
              <Typography>
                {policy?.status || "In force"}
              </Typography>
            </Grid>
          </Grid>
        </Paper>

        <Divider sx={{ mb: 3 }} />

        {/* LOSS DESCRIPTION */}
        <TextField
          label="Loss Description"
          fullWidth
          multiline
          rows={4}
          sx={{ mb: 2 }}
          value={lossDescription}
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

        {/* POLICE REPORTED */}
        <Typography variant="subtitle1">Police Reported?</Typography>
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
          <Button variant="contained" color = '#ffp7eso' onClick={handleNext}>
            Next →
          </Button>
        </Box>
      </Paper>
    </Box>
  );
}
