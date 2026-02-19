import React, { useState, useMemo } from "react";
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
  Alert,
  MenuItem,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Checkbox,
  FormControlLabel,
  Tooltip,
  IconButton,
} from "@mui/material";

import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import { createVehicleForSubmission } from "./vehicleAPI";

export default function Vehicle() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const contact = state?.contact || {};

  const [tab, setTab] = useState(0);
  const [errorOpen, setErrorOpen] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  // Dropdown Options
  const makeOptions = ["Toyota", "Honda", "Ford", "BMW", "Hyundai"];

  const modelOptions = {
    Toyota: ["Corolla", "Camry", "RAV4"],
    Honda: ["Civic", "Accord", "CR-V"],
    Ford: ["F-150", "Escape", "Explorer"],
    BMW: ["X3", "X5", "3 Series"],
    Hyundai: ["Elantra", "Tucson", "Santa Fe"],
  };

  const yearOptions = Array.from({ length: 25 }, (_, i) => 2026 - i);

  const stateOptions = [
    "Tamil Nadu",
    "Karnataka",
    "Kerala",
    "Andhra Pradesh",
    "Maharashtra",
  ];

 const coverageOptions = [
  {
    name: "Third-Party Liability",
    description:
      "Covers damages or injuries caused to a third party by your vehicle. Mandatory by law.",
    premium: 120,
  },
  {
    name: "Own Damage",
    description:
      "Covers repair or replacement costs for damage to your own vehicle.",
    premium: 250,
  },
  {
    name: "Comprehensive",
    description:
      "Provides combined protection including third-party liability and own damage.",
    premium: 400,
  },
  {
    name: "Personal Accident Cover",
    description:
      "Covers medical expenses or compensation in case of injury or death of the driver.",
    premium: 80,
  },
  {
    name: "Zero Depreciation",
    description:
      "Allows full claim without deducting depreciation on replaced parts.",
    premium: 150,
  },
  {
    name: "Vehicle theft",
    description:
      "Provides coverage if your vehicle is stolen or declared a total loss.",
    premium: 110,
  },
];

 const [coverages, setCoverages] = useState([
  "Third-Party Liability",
]);

// 3️⃣ THEN calculate totalPremium
const totalPremium = coverageOptions
  .filter((c) => coverages.includes(c.name))
  .reduce((sum, c) => sum + c.premium, 0);

  // Vehicle form data
  const [vehicleData, setVehicleData] = useState({
    make: "",
    model: "",
    year: "",
    vin: "",
    licensePlate: "",
    stateRegistered: "",
  });

  const handleCoverageChange = (coverage) => {
    if (coverage === "Third-Party Liability") return;

    setCoverages((prev) =>
      prev.includes(coverage)
        ? prev.filter((c) => c !== coverage)
        : [...prev, coverage]
    );
  };

  const validateForm = () => {
    const requiredFields = [
      { key: "make", label: "Make" },
      { key: "model", label: "Model" },
      { key: "year", label: "Year" },
      { key: "vin", label: "VIN" },
      { key: "licensePlate", label: "License Plate" },
      { key: "stateRegistered", label: "State Registered" },
    ];

    for (let field of requiredFields) {
      if (!vehicleData[field.key]?.toString().trim()) {
        setErrorMsg(
          `${field.label} is required in the Vehicle Information tab.`
        );
        return false;
      }
    }

    if (coverages.length === 0) {
      setErrorMsg(
        "At least one coverage (Third-Party Liability) must be selected."
      );
      return false;
    }

    return true;
  };

  const handleNext = async () => {
    try {
      if (!validateForm()) {
        setErrorOpen(true);
        return;
      }

      const submissionId = state?.submissionId;

      if (!submissionId) {
        setErrorMsg("Missing submission ID");
        setErrorOpen(true);
        return;
      }

      const payload = {
        ...vehicleData,
        coverages,
      };

      await createVehicleForSubmission(submissionId, payload);

      navigate("/quote", {
        state: {
          ...state,
          vehicleData,
          coverages,
        },
      });
    } catch (err) {
      console.error("Error creating vehicle:", err);
      setErrorMsg("Failed to create vehicle. Please try again.");
      setErrorOpen(true);
    }
  };

  return (
    <Box sx={{ maxWidth: 1200, mx: "auto", mt: 4 }}>
      <InfoBar
        accountNumber={state?.accountNumber || "-"}
        product={state?.productName || "-"}
        contactName={`${contact.firstName || ""} ${
          contact.lastName || ""
        }`.trim()}
        submissionId={state?.submissionId || "-"}
        effectiveDate={state?.effectiveDate || "-"}
        expiryDate={state?.expiryDate || "-"}
      />

      <Typography variant="h4" fontWeight={700} sx={{ mb: 3 }}>
        Vehicle Details
      </Typography>

      <Paper sx={{ p: 4, borderRadius: 4 }}>
        <Tabs value={tab} onChange={(_, v) => setTab(v)} sx={{ mb: 3 }}>
          <Tab label="Vehicle Information" />
          <Tab label="Coverages" />
        </Tabs>

        {/* Vehicle Information Tab */}
        {/* ================= VEHICLE INFORMATION TAB ================= */}
{tab === 0 && (
  <Box>
    <Grid container spacing={4}>
      
      {/* Vehicle Specifications */}
      <Grid item xs={12} md={6}>
        <Paper
          elevation={2}
          sx={{ p: 3, borderRadius: 3 }}
        >
          <Typography
            variant="h6"
            fontWeight={600}
            sx={{ mb: 3 }}
          >
            Vehicle Specifications
          </Typography>

          {/* Make */}
          <TextField
            select
            label="Make"
            fullWidth
            sx={{ mb: 3 }}
            value={vehicleData.make}
            onChange={(e) =>
              setVehicleData({
                ...vehicleData,
                make: e.target.value,
                model: "",
              })
            }
          >
            {makeOptions.map((make) => (
              <MenuItem key={make} value={make}>
                {make}
              </MenuItem>
            ))}
          </TextField>

          {/* Model */}
          <TextField
            select
            label="Model"
            fullWidth
            sx={{ mb: 3 }}
            value={vehicleData.model}
            onChange={(e) =>
              setVehicleData({
                ...vehicleData,
                model: e.target.value,
              })
            }
            disabled={!vehicleData.make}
          >
            {(modelOptions[vehicleData.make] || []).map(
              (model) => (
                <MenuItem key={model} value={model}>
                  {model}
                </MenuItem>
              )
            )}
          </TextField>

          {/* Year */}
          <TextField
            select
            label="Year"
            fullWidth
            value={vehicleData.year}
            onChange={(e) =>
              setVehicleData({
                ...vehicleData,
                year: e.target.value,
              })
            }
          >
            {yearOptions.map((year) => (
              <MenuItem key={year} value={year}>
                {year}
              </MenuItem>
            ))}
          </TextField>
        </Paper>
      </Grid>

      {/* Registration Details */}
      <Grid item xs={12} md={6}>
        <Paper
          elevation={2}
          sx={{ p: 3, borderRadius: 3 }}
        >
          <Typography
            variant="h6"
            fontWeight={600}
            sx={{ mb: 3 }}
          >
            Registration Details
          </Typography>

          {/* VIN */}
          <TextField
            label="VIN"
            fullWidth
            sx={{ mb: 3 }}
            value={vehicleData.vin}
            onChange={(e) =>
              setVehicleData({
                ...vehicleData,
                vin: e.target.value,
              })
            }
          />

          {/* License Plate */}
          <TextField
            label="License Plate"
            fullWidth
            sx={{ mb: 3 }}
            value={vehicleData.licensePlate}
            onChange={(e) =>
              setVehicleData({
                ...vehicleData,
                licensePlate: e.target.value,
              })
            }
          />

          {/* State Registered */}
          <TextField
            select
            label="State Registered"
            fullWidth
            value={vehicleData.stateRegistered}
            onChange={(e) =>
              setVehicleData({
                ...vehicleData,
                stateRegistered: e.target.value,
              })
            }
          >
            {stateOptions.map((state) => (
              <MenuItem key={state} value={state}>
                {state}
              </MenuItem>
            ))}
          </TextField>
        </Paper>
      </Grid>
    </Grid>
  </Box>
)}

        {/* Coverages Tab */}
         {tab === 1 && (
  <Box>
    <Typography variant="h6" fontWeight={600} sx={{ mb: 3 }}>
      Select Coverages
    </Typography>

    {coverageOptions.map((cov) => {
      const isSelected = coverages.includes(cov.name);
      const isMandatory = cov.name === "Third-Party Liability";

      return (
        <Accordion
          key={cov.name}
          defaultExpanded={isMandatory}
          sx={{
            mb: 2,
            borderRadius: 2,
            border: isSelected
              ? "2px solid #1976d2"
              : "1px solid #e0e0e0",
            transition: "all 0.3s ease",
            boxShadow: isSelected
              ? "0 0 15px rgba(25, 118, 210, 0.4)"
              : "none",
            "&:before": { display: "none" },
          }}
        >
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                width: "100%",
              }}
            >
              <FormControlLabel
                control={
                  <Checkbox
                    checked={isSelected}
                    onChange={() =>
                      handleCoverageChange(cov.name)
                    }
                    disabled={isMandatory}
                  />
                }
                label={
                  <Box>
                    <Typography fontWeight={600}>
                      {cov.name}
                      {isMandatory && (
                        <Typography
                          component="span"
                          color="error"
                          sx={{ ml: 1, fontSize: 12 }}
                        >
                          (Mandatory)
                        </Typography>
                      )}
                    </Typography>

                    <Typography
                      variant="body2"
                      color="text.secondary"
                    >
                      ₹{cov.premium} / year
                    </Typography>
                  </Box>
                }
              />

              <Tooltip title={cov.description} arrow>
                <IconButton size="small">
                  <InfoOutlinedIcon fontSize="small" />
                </IconButton>
              </Tooltip>
            </Box>
          </AccordionSummary>

          <AccordionDetails>
            <Typography variant="body2" color="text.secondary">
              {cov.description}
            </Typography>
          </AccordionDetails>
        </Accordion>
      );
    })}

    {/* Premium Summary Card */}
    <Paper
      elevation={3}
      sx={{
        mt: 4,
        p: 3,
        borderRadius: 3,
        background: "linear-gradient(135deg, #1976d2, #42a5f5)",
        color: "white",
        transition: "all 0.3s ease",
      }}
    >
      <Typography variant="h6" fontWeight={600}>
        Total Premium
      </Typography>

      <Typography variant="h4" fontWeight={700} sx={{ mt: 1 }}>
        ₹{totalPremium.toLocaleString("en-IN")}
      </Typography>

      <Typography variant="body2" sx={{ mt: 1, opacity: 0.9 }}>
        Based on selected coverages
      </Typography>
    </Paper>
  </Box>
)}
        {/* Navigation */}
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

      {/* Snackbar */}
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
