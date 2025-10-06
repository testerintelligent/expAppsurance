import React, { useState } from "react";
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
} from "@mui/material";

export default function Vehicle() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [tab, setTab] = useState(0);
  const coverageOptions = [
    "Third-Party Liability",
    "Own Damage",
    "Comprehensive",
    "Personal Accident Cover",
    "Zero Depreciation",
    "Vehicle theft"
  ];
  const [coverages, setCoverages] = useState([]);

  const handleCoverageChange = (coverage) => {
    setCoverages((prev) =>
      prev.includes(coverage)
        ? prev.filter((c) => c !== coverage)
        : [...prev, coverage]
    );
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

        {tab === 0 && (
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField label="Make" fullWidth sx={{ mb: 2 }} />
              <TextField label="Model" fullWidth sx={{ mb: 2 }} />
              <TextField label="Year" type="number" fullWidth sx={{ mb: 2 }} />
              <TextField label="VIN" fullWidth sx={{ mb: 2 }} />
              <TextField label="License Plate" fullWidth sx={{ mb: 2 }} />
              <TextField label="State Registered" fullWidth sx={{ mb: 2 }} />
            </Grid>
          </Grid>
        )}

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

        <Box sx={{ display: "flex", justifyContent: "space-between", mt: 4 }}>
          <Button
            variant="outlined"
            color="primary"
            onClick={() => navigate("/driver", { state })}
          >
            Back
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={() =>
              navigate("/quote", { state: { ...(state || {}), coverages } })
            }
          >
            Next
          </Button>
        </Box>
      </Paper>
    </Box>
  );
}
