import React, { useState } from "react";
import axios from "axios";
import { Box, Typography, InputBase, IconButton, CircularProgress, Card, CardContent, Grid, Button } from "@mui/material";
import { Search as SearchIcon } from "@mui/icons-material";

const PolicySearch = () => {
  const [policyNumber, setPolicyNumber] = useState("");
  const [policyData, setPolicyData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Handle Policy Number input change
  const handleInputChange = (e) => {
    setPolicyNumber(e.target.value);
  };

  // Fetch policy details by Policy Number
  const handleSearch = async () => {
    if (!policyNumber) {
      alert("Please enter a Policy Number");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await axios.get(`http://10.192.190.158:5000/api/Policies/getPolicyByNumber/${policyNumber}`);
      setPolicyData(response.data);  // Update policy data on the same screen
      setLoading(false);
    } catch (err) {
      setError("Failed to fetch policy details");
      setLoading(false);
    }
  };

  return (
    <Box sx={{ padding: "30px", maxWidth: "900px", margin: "0 auto" }}>
      <Typography variant="h4" fontWeight="bold" sx={{ marginBottom: "20px", textAlign: "center" }}>
        Policy Search
      </Typography>

      {/* Search Input */}
      <Box sx={{ display: "flex", alignItems: "center", marginBottom: "30px", borderRadius: "50px", backgroundColor: "#f0f0f0", padding: "10px" }}>
        <InputBase
          placeholder="Enter Policy Number"
          value={policyNumber}
          onChange={handleInputChange}
          sx={{
            flex: 1,
            paddingLeft: "15px",
            fontSize: "16px",
            border: "none",
            borderRadius: "50px",
            backgroundColor: "#fff",
          }}
        />
        <IconButton onClick={handleSearch} sx={{ padding: "10px", borderRadius: "50%" }}>
          <SearchIcon color="primary" />
        </IconButton>
      </Box>

      {/* Loading Indicator */}
      {loading && (
        <Box sx={{ textAlign: "center", marginBottom: "20px" }}>
          <CircularProgress />
        </Box>
      )}

      {/* Error Message */}
      {error && (
        <Typography color="error" sx={{ marginTop: "20px", textAlign: "center" }}>
          {error}
        </Typography>
      )}

      {/* Displaying fetched policy data */}
      {policyData && (
        <Box sx={{ marginTop: "40px" }}>
          {/* Policy Information */}
          <Card sx={{ marginBottom: "20px", boxShadow: 3 }}>
            <CardContent>
              <Typography variant="h6" fontWeight="bold" sx={{ marginBottom: "10px" }}>
                Policy Information
              </Typography>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                  <Typography variant="body1"><strong>Policy Number:</strong> {policyData.policy.policyNumber}</Typography>
                  <Typography variant="body1"><strong>Policy Type:</strong> {policyData.policy.productType}</Typography>
                  <Typography variant="body1"><strong>Effective Date:</strong> {new Date(policyData.policy.effectiveDate).toLocaleDateString()}</Typography>
                  <Typography variant="body1"><strong>Expiry Date:</strong> {new Date(policyData.policy.expiryDate).toLocaleDateString()}</Typography>
                  <Typography variant="body1"><strong>Status:</strong> {policyData.policy.status}</Typography>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <Typography variant="h6" fontWeight="bold" sx={{ marginBottom: "10px" }}>
                    Account Details:
                  </Typography>
                  <Typography variant="body1"><strong>Account Number:</strong> {policyData.account.accountId}</Typography>
                  <Typography variant="body1"><strong>Account Holder:</strong> {policyData.account.accountHolderName}</Typography>
                </Grid>
              </Grid>
            </CardContent>
          </Card>

          {/* Billing & Payment Details */}
          <Card sx={{ marginBottom: "20px", boxShadow: 3 }}>
            <CardContent>
              <Typography variant="h6" fontWeight="bold" sx={{ marginBottom: "10px" }}>
                Billing & Payment Details
              </Typography>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                  <Typography variant="body1"><strong>Total Premium:</strong> ₹{policyData.policy.totalPremium}</Typography>
                  <Typography variant="body1"><strong>Taxes:</strong> ₹{policyData.policy.taxes}</Typography>
                  <Typography variant="body1"><strong>Total Cost:</strong> ₹{policyData.policy.totalCost}</Typography>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <Typography variant="body1"><strong>Payment Schedule:</strong> {policyData.policy.paymentSchedule}</Typography>
                  <Typography variant="body1"><strong>Billing Method:</strong> {policyData.policy.billingMethod}</Typography>
                  <Typography variant="body1"><strong>Payment Ref No:</strong> {policyData.policy.paymentRef}</Typography>
                </Grid>
              </Grid>
            </CardContent>
          </Card>

          {/* Coverages */}
          <Card sx={{ marginBottom: "20px", boxShadow: 3 }}>
            <CardContent>
              <Typography variant="h6" fontWeight="bold" sx={{ marginBottom: "10px" }}>
                Coverages
              </Typography>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  {policyData.policy.coverages && policyData.policy.coverages.length > 0 ? (
                    policyData.policy.coverages.map((coverage, index) => (
                      <Typography variant="body1" key={index}><strong>{coverage}</strong></Typography>
                    ))
                  ) : (
                    <Typography variant="body1">No coverages available</Typography>
                  )}
                </Grid>
              </Grid>
            </CardContent>
          </Card>

          {/* Optional: Button to search for another policy */}
          <Box sx={{ textAlign: "center", marginTop: "30px" }}>
            <Button variant="contained" onClick={() => window.location.reload()} color="primary">
              Search Another Policy
            </Button>
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default PolicySearch;
