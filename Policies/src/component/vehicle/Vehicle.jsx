import React, { useState, useEffect } from "react";
import InfoBar from "../InfoBar";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Box,
  Typography,
  Paper,
  Tabs,
  Tab,
  Grid,
  TextField,
  Button,
  Snackbar,
  Alert
} from "@mui/material";

export default function Vehicle() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [tab, setTab] = useState(0);
  const [errorOpen, setErrorOpen] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const coverageOptions = [
    "Third-Party Liability",
    "Own Damage",
    "Comprehensive",
    "Personal Accident Cover",
    "Zero Depreciation",
    "Vehicle theft"
  ];

  // Vehicle form data
  const [vehicleData, setVehicleData] = useState({
    make: "",
    model: "",
    year: "",
    vin: "",
    licensePlate: "",
    stateRegistered: ""
  });

  // Selected coverages
  const [coverages, setCoverages] = useState([]);

  // ✅ Preselect Third-Party Liability
  useEffect(() => {
    if (!coverages.includes("Third-Party Liability")) {
      setCoverages(["Third-Party Liability"]);
    }
  }, []);

  // Handle coverage selection
  const handleCoverageChange = (coverage) => {
    if (coverage === "Third-Party Liability") return; // prevent deselect
    setCoverages((prev) =>
      prev.includes(coverage)
        ? prev.filter((c) => c !== coverage)
        : [...prev, coverage]
    );
  };

  // ✅ Validate mandatory fields before Next
  const handleNext = () => {
    // Validate Vehicle Info
    const requiredVehicleFields = [
      { key: "make", label: "Make" },
      { key: "model", label: "Model" },
      { key: "year", label: "Year" },
      { key: "vin", label: "VIN" },
      { key: "licensePlate", label: "License Plate" },
      { key: "stateRegistered", label: "State Registered" }
    ];

    for (let field of requiredVehicleFields) {
      if (!vehicleData[field.key] || String(vehicleData[field.key]).trim() === "") {
        setErrorMsg(`${field.label} is required`);
        setErrorOpen(true);
        setTab(0); // switch to Vehicle Info tab
        return;
      }
    }

    // Validate Coverages
    if (!coverages.includes("Third-Party Liability")) {
      setErrorMsg("Third-Party Liability coverage is mandatory");
      setErrorOpen(true);
      setTab(1); // switch to Coverages tab
      return;
    }

    // Navigate to next page with vehicle data and coverages
    navigate("/quote", {
      state: { ...(state || {}), vehicleData, coverages }
    });
  };

  return (
    <Box sx={{ maxWidth: 900, mx: "auto", mt: 4 }}>
      <InfoBar
        accountNumber={state?.accountNumber || "6431739974"}
        policyNumber={state?.policyNumber || "0923090878"}
        expiryDate={state?.expiryDate || "04/06/2026"}
      />

      <Typography variant="h4" fontWeight={700} sx={{ mb: 3 }}>
        Vehicle Details
      </Typography>

      <Paper sx={{ p: 4, borderRadius: 4 }}>
        <Tabs value={tab} onChange={(_, v) => setTab(v)} sx={{ mb: 3 }}>
          <Tab label="Vehicle Information" />
          <Tab label="Coverages" />
        </Tabs>

        {/* --- Vehicle Info Tab --- */}
        {tab === 0 && (
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Make"
                fullWidth
                sx={{ mb: 2 }}
                value={vehicleData.make}
                onChange={(e) => setVehicleData({ ...vehicleData, make: e.target.value })}
              />
              <TextField
                label="Model"
                fullWidth
                sx={{ mb: 2 }}
                value={vehicleData.model}
                onChange={(e) => setVehicleData({ ...vehicleData, model: e.target.value })}
              />
              <TextField
                label="Year"
                type="number"
                fullWidth
                sx={{ mb: 2 }}
                value={vehicleData.year}
                onChange={(e) => setVehicleData({ ...vehicleData, year: e.target.value })}
              />
              <TextField
                label="VIN"
                fullWidth
                sx={{ mb: 2 }}
                value={vehicleData.vin}
                onChange={(e) => setVehicleData({ ...vehicleData, vin: e.target.value })}
              />
              <TextField
                label="License Plate"
                fullWidth
                sx={{ mb: 2 }}
                value={vehicleData.licensePlate}
                onChange={(e) => setVehicleData({ ...vehicleData, licensePlate: e.target.value })}
              />
              <TextField
                label="State Registered"
                fullWidth
                sx={{ mb: 2 }}
                value={vehicleData.stateRegistered}
                onChange={(e) => setVehicleData({ ...vehicleData, stateRegistered: e.target.value })}
              />
            </Grid>
          </Grid>
        )}

        {/* --- Coverages Tab --- */}
        {tab === 1 && (
          <Box>
            <Typography variant="subtitle1" fontWeight={600} sx={{ mb: 2 }}>
              Select Coverages
            </Typography>
            <Grid container spacing={2}>
              {coverageOptions.map((cov) => (
                <Grid item xs={12} sm={6} md={4} key={cov}>
                  <Button
                    variant={coverages.includes(cov) ? "contained" : "outlined"}
                    color={coverages.includes(cov) ? "primary" : "inherit"}
                    fullWidth
                    sx={{ mb: 2, textAlign: "left" }}
                    onClick={() => handleCoverageChange(cov)}
                    disabled={cov === "Third-Party Liability"} // mandatory coverage
                  >
                    {cov}
                  </Button>
                </Grid>
              ))}
            </Grid>

            <Box sx={{ mt: 3 }}>
              {coverages.length > 0 ? (
                <>
                  <Typography>Selected Coverages:</Typography>
                  <ul>
                    {coverages.map((cov) => (
                      <li key={cov}>{cov}</li>
                    ))}
                  </ul>
                </>
              ) : (
                <Typography>No coverages selected yet.</Typography>
              )}
            </Box>
          </Box>
        )}

        {/* --- Navigation Buttons --- */}
        <Box sx={{ display: "flex", justifyContent: "space-between", mt: 4 }}>
          <Button
            variant="outlined"
            color="primary"
            onClick={() => navigate("/driver", { state })}
          >
            Back
          </Button>
          <Button variant="contained" color="primary" onClick={handleNext}>
            Next
          </Button>
        </Box>
      </Paper>

      {/* --- Snackbar for errors --- */}
      <Snackbar
        open={errorOpen}
        autoHideDuration={4000}
        onClose={() => setErrorOpen(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={() => setErrorOpen(false)}
          severity="error"
          sx={{ width: "100%" }}
        >
          {errorMsg}
        </Alert>
      </Snackbar>
    </Box>
  );
}
