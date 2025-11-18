import React, { useState } from "react";
import axios from "axios";
import {
  Box,
  Typography,
  InputBase,
  IconButton,
  CircularProgress,
  Card,
  CardContent,
  Grid,
  Button,
  Chip,
  Fade,
  Tooltip
} from "@mui/material";
import { Search as SearchIcon, Description, Payment, Shield } from "@mui/icons-material";
import "./policy.css";

const PolicySearch = () => {
  const [policyNumber, setPolicyNumber] = useState("");
  const [policyData, setPolicyData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleInputChange = (e) => {
    setPolicyNumber(e.target.value);
  };

  const handleSearch = async () => {
    if (!policyNumber) {
      alert("Please enter a Policy Number");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await axios.get(
        `http://10.192.190.158:5000/api/Policies/getPolicyByNumber/${policyNumber}`
      );
      setPolicyData(response.data);
      setLoading(false);
    } catch (err) {
      setError("Failed to fetch policy details");
      setLoading(false);
    }
  };

  return (
    <Box className="policy-search-wrapper">

      {/* HEADER */}
      <Typography className="policy-search-header" variant="h4" fontWeight="800">
        🔍 Find Your Policy
      </Typography>

      {/* HERO SEARCH BAR */}
      <Box className="search-input-box">
        <InputBase
          placeholder="Enter Policy Number..."
          value={policyNumber}
          onChange={handleInputChange}
          className="search-input-field"
        />
        <Tooltip title="Search Policy">
          <IconButton onClick={handleSearch} className="search-button">
            <SearchIcon sx={{ color: "#fff" }} />
          </IconButton>
        </Tooltip>
      </Box>

      {/* LOADER */}
      {loading && (
        <Box sx={{ textAlign: "center", marginTop: "20px" }}>
          <CircularProgress thickness={4} />
        </Box>
      )}

      {/* ERROR */}
      {error && (
        <Typography color="error" sx={{ marginTop: "20px", textAlign: "center" }}>
          {error}
        </Typography>
      )}

      {/* RESULT SECTION */}
      {policyData && (
        <Fade in={true} timeout={600}>
          <Box sx={{ marginTop: 4 }}>

            {/* POLICY INFORMATION */}
<Card className="policy-card">

  {/* Header */}
  <div className="card-header policy-info-header">
    <Description sx={{ color: "white" }} />
    <Typography variant="h6" className="card-header-title">
      Policy Information
    </Typography>
  </div>

  <CardContent>

    {/* Two-column layout with more spacing */}
    <Grid 
      container 
      spacing={4} 
      alignItems="flex-start"
    >

      {/* LEFT COLUMN */}
      <Grid item xs={12} md={6}>
        <div className="policy-row">
          <span className="policy-key">Policy Number</span>
          <span className="policy-value highlight">
            {policyData.policy.policyNumber}
          </span>
        </div>

        <div className="policy-row">
          <span className="policy-key">Policy Type</span>
          <span className="policy-value">{policyData.policy.productType}</span>
        </div>

        <div className="policy-row">
          <span className="policy-key">Effective Date</span>
          <span className="policy-value">
            {new Date(policyData.policy.effectiveDate).toLocaleDateString()}
          </span>
        </div>

        <div className="policy-row">
          <span className="policy-key">Expiry Date</span>
          <span className="policy-value">
            {new Date(policyData.policy.expiryDate).toLocaleDateString()}
          </span>
        </div>
      </Grid>

      {/* RIGHT COLUMN — aligned to the extreme right */}
      <Grid 
        item 
        xs={12} 
        md={6}
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",   // keeps rows left-aligned
          paddingLeft: { md: "40px" } // pushes away from column 1
        }}
      >

        <div className="policy-row">
          <span className="policy-key">Status</span>
          <Chip
            label={policyData.policy.status}
            color={policyData.policy.status === "Active" ? "success" : "warning"}
            className="status-chip"
          />
        </div>

        <div className="policy-row">
          <span className="policy-key">Account Number</span>
          <span className="policy-value">{policyData.account.accountId}</span>
        </div>

        <div className="policy-row">
          <span className="policy-key">Account Holder</span>
          <span className="policy-value">{policyData.account.accountHolderName}</span>
        </div>

      </Grid>

    </Grid>
  </CardContent>
</Card>


            {/* BILLING & PAYMENT */}
<Card className="policy-card">

  {/* Header */}
  <div className="card-header payment-header">
    <Payment sx={{ color: "white" }} />
    <Typography variant="h6" className="card-header-title">
      Billing & Payment Details
    </Typography>
  </div>

  <CardContent>

    {/* Two-column layout with added spacing */}
    <Grid 
      container 
      spacing={4}
      alignItems="flex-start"
    >

      {/* LEFT COLUMN */}
      <Grid item xs={12} md={6}>
        <div className="policy-row">
          <span className="policy-key">Total Premium</span>
          <span className="policy-value highlight-2">
            ₹{policyData.policy.totalPremium}
          </span>
        </div>

        <div className="policy-row">
          <span className="policy-key">Taxes</span>
          <span className="policy-value">
            ₹{policyData.policy.taxes}
          </span>
        </div>

        <div className="policy-row">
          <span className="policy-key">Total Cost</span>
          <span className="policy-value highlight-3">
            ₹{policyData.policy.totalCost}
          </span>
        </div>
      </Grid>

      {/* RIGHT COLUMN — spaced right */}
      <Grid 
        item 
        xs={12} 
        md={6}
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          paddingLeft: { md: "40px" } 
        }}
      >

        <div className="policy-row">
          <span className="policy-key">Payment Schedule</span>
          <Chip label={policyData.policy.paymentSchedule} color="info" />
        </div>

        <div className="policy-row">
          <span className="policy-key">Billing Method</span>
          <span className="policy-value">
            {policyData.policy.billingMethod}
          </span>
        </div>

        <div className="policy-row">
          <span className="policy-key">Payment Ref No</span>
          <span className="policy-value">
            {policyData.policy.paymentRef}
          </span>
        </div>

      </Grid>

    </Grid>
  </CardContent>
</Card>


            {/* COVERAGES */}
            <Card className="policy-card">
              <div className="card-header coverage-header">
                <Shield sx={{ color: "white" }} />
                <Typography variant="h6" className="card-header-title">
                  Coverages
                </Typography>
              </div>

              <CardContent>
                <Box className="coverage-chip-container">
                  {policyData.policy.coverages?.length > 0 ? (
                    policyData.policy.coverages.map((c, i) => (
                      <Chip key={i} label={c} variant="outlined" color="primary" />
                    ))
                  ) : (
                    <Typography>No coverages available</Typography>
                  )}
                </Box>
              </CardContent>
            </Card>

            {/* SEARCH AGAIN */}
            <Box className="search-action">
              <Button variant="contained" onClick={() => window.location.reload()}>
                Search Another Policy
              </Button>
            </Box>

          </Box>
        </Fade>
      )}
    </Box>
  );
};

export default PolicySearch;
