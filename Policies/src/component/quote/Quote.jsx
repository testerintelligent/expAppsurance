import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { Box, Typography, Paper, Button } from "@mui/material";

export default function Quote() {   // ✅ Component function added
  const { state } = useLocation();
  const [saveStatus, setSaveStatus] = useState("");

  // Extract details from state
  const contact = state?.contact || {};
  const accountNumber = state?.accountNumber || "";
  const policyNumber = state?.policyNumber || "";
  const expiryDate = state?.expiryDate || "";
  const coverages = state?.coverages || [];

  // Default premium values for each coverage
  const coveragePremiums = {
    "Third-Party Liability": 1200,
    "Own Damage": 800,
    "Comprehensive": 1500,
    "Personal Accident Cover": 400,
    "Zero Depreciation": 600,
    "Vehicle theft": 900
  };

  // Calculate total premium
  const selectedPremiums = coverages.map(cov => coveragePremiums[cov] || 0);
  const overallPremium = selectedPremiums.reduce((sum, val) => sum + val, 0);

  // Policy period (example: 1 year)
  const effectiveDate = expiryDate ? (() => {
    const d = new Date(expiryDate);
    d.setFullYear(d.getFullYear() - 1);
    return d.toLocaleDateString();
  })() : "";

  const period = effectiveDate && expiryDate ? `${effectiveDate} - ${expiryDate}` : "";

  // Save quote to backend
  const handleSaveQuote = async () => {
    setSaveStatus("Saving...");
    try {
      const res = await fetch("/api/quotes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contact,
          accountNumber,
          policyNumber,
          effectiveDate,
          expiryDate,
          period,
          coverages,
          coveragePremiums: coverages.map(cov => ({ name: cov, premium: coveragePremiums[cov] || 0 })),
          overallPremium,
          vehicle: state?.vehicle || {},
          driver: state?.driver || {},
        })
      });

      if (res.ok) {
        setSaveStatus("Quote saved successfully!");
      } else {
        setSaveStatus("Failed to save quote.");
      }
    } catch (err) {
      setSaveStatus("Error saving quote.");
    }
  };

  return (
    <Box sx={{ maxWidth: 900, mx: "auto", mt: 4 }}>
      <Typography variant="h4" fontWeight={700} sx={{ mb: 3 }}>
        Quote Details
      </Typography>
      <Paper sx={{ p: 4, borderRadius: 4 }}>
        <Typography variant="h6" fontWeight={600} sx={{ mb: 2 }}>Policy Holder Information</Typography>
        <Box sx={{ mb: 2 }}>
          <Typography><b>Name:</b> {contact.firstName} {contact.lastName}</Typography>
          <Typography><b>Address:</b> {contact.address || "-"}</Typography>
          <Typography><b>Account #:</b> {accountNumber}</Typography>
          <Typography><b>Policy #:</b> {policyNumber}</Typography>
        </Box>

        <Typography variant="h6" fontWeight={600} sx={{ mb: 2 }}>Policy Details</Typography>
        <Box sx={{ mb: 2 }}>
          <Typography><b>Effective Date:</b> {effectiveDate}</Typography>
          <Typography><b>Expiry Date:</b> {expiryDate}</Typography>
          <Typography><b>Policy Period:</b> {period}</Typography>
        </Box>

        <Typography variant="h6" fontWeight={600} sx={{ mb: 2 }}>Selected Coverages & Premiums</Typography>
        <Box sx={{ mb: 2 }}>
          {coverages.length > 0 ? (
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr style={{ background: "#f5f5f5" }}>
                  <th style={{ textAlign: "left", padding: "8px" }}>Coverage</th>
                  <th style={{ textAlign: "right", padding: "8px" }}>Premium ($)</th>
                </tr>
              </thead>
              <tbody>
                {coverages.map((cov) => (
                  <tr key={cov}>
                    <td style={{ padding: "8px" }}>{cov}</td>
                    <td style={{ textAlign: "right", padding: "8px" }}>{coveragePremiums[cov] || 0}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <Typography>No coverages selected.</Typography>
          )}
        </Box>

        <Typography variant="h6" fontWeight={600} sx={{ mt: 2 }}>
          Overall Premium: ${overallPremium}
        </Typography>

        <Button
          variant="contained"
          color="primary"
          sx={{ mt: 3 }}
          onClick={handleSaveQuote}
        >
          Save Quote
        </Button>

        {saveStatus && <Typography sx={{ mt: 2 }}>{saveStatus}</Typography>}
      </Paper>
    </Box>
  );
}
