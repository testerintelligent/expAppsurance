import React from "react";
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  Divider,
  Chip,
  Button,
  Stack,
  Alert,
} from "@mui/material";
import { CheckCircle, ArrowBack, FileDownload } from "@mui/icons-material";

export default function PolicyIssuanceTableLayout() {
  const policy = {
    number: "POL123456789",
    type: "Comprehensive Vehicle Insurance",
    effectiveDate: "2025-10-07",
    expiryDate: "2026-10-06",
    policyholder: "TT QQ",
    accountNo: "ACC1759825933269292",
    issuedBy: "Agent #AGT1023",
    status: "Active",
    totalPremium: 50000,
    taxes: 5000,
    totalCost: 55000,
    paymentSchedule: "Yearly",
    billingMethod: "Direct Bill",
    paymentRef: "PAY987654321",
    issueDate: "2025-10-07 10:45 AM",
    coverages: [
      "Third-Party Liability",
      "Own Damage",
      "Comprehensive",
      "Vehicle Theft",
    ],
  };

  return (
    <Box sx={{ p: 4, bgcolor: "#f8fafc", minHeight: "100vh" }}>
      {/* Success Banner (No change) */}
      <Alert
        icon={<CheckCircle fontSize="inherit" />}
        severity="success"
        sx={{
          mb: 3,
          borderRadius: 2,
          fontWeight: 500,
          backgroundColor: "#d4edda",
          color: "#155724",
        }}
      >
        Policy Issued Successfully! Your insurance policy is now active. A
        confirmation email has been sent to your registered address.
      </Alert>

      {/* Title (No change) */}
      <Typography
        variant="h4"
        align="center"
        sx={{ mb: 4, fontWeight: 700, color: "#0d47a1" }}
      >
        Policy Issuance
      </Typography>

      {/* Policy Information (UPDATED) */}
      <Card sx={{ borderRadius: 3, boxShadow: 3, mb: 3 }}>
        <CardContent>
          <Typography variant="h6" fontWeight={600} gutterBottom>
            Policy Information
          </Typography>
          <Divider sx={{ mb: 2 }} />

          <Grid container spacing={2}>
            {/* Left Column */}
            <Grid item xs={12} sm={6}>
              <InfoRow label="Policy No." value={policy.number} />
              <InfoRow label="Account No." value={policy.accountNo} />
              <InfoRow label="Policyholder" value={policy.policyholder} />
              <InfoRow label="Policy Type" value={policy.type} />
            </Grid>

            {/* Right Column - REMOVED sx={{ textAlign: 'right' }} */}
            <Grid item xs={12} sm={6}>
              <InfoRow
                label="Status"
                value={
                  <Chip
                    label={policy.status}
                    color="success"
                    size="small"
                    sx={{ fontWeight: 600 }}
                  />
                }
                // REMOVED alignRight prop
              />
              <InfoRow label="Effective Date" value={policy.effectiveDate} />
              <InfoRow label="Expiry Date" value={policy.expiryDate} />
              <InfoRow label="Issued By" value={policy.issuedBy} />
              <InfoRow label="Issued Date" value={policy.issueDate} />
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      {/* Billing & Payment Details (UPDATED) */}
      <Card sx={{ borderRadius: 3, boxShadow: 3, mb: 3 }}>
        <CardContent>
          <Typography variant="h6" fontWeight={600} gutterBottom>
            Billing & Payment Details
          </Typography>
          <Divider sx={{ mb: 2 }} />

          <Grid container spacing={2}>
            {/* Left Column */}
            <Grid item xs={12} sm={6}>
              <InfoRow label="Total Premium" value={`₹${policy.totalPremium}`} />
              <InfoRow label="Taxes" value={`₹${policy.taxes}`} />
              <InfoRow label="Total Cost" value={`₹${policy.totalCost}`} />
            </Grid>

            {/* Right Column - REMOVED sx={{ textAlign: 'right' }} */}
            <Grid item xs={12} sm={6}>
              <InfoRow label="Payment Schedule" value={policy.paymentSchedule} /> 
              <InfoRow label="Billing Method" value={policy.billingMethod} /> 
              <InfoRow label="Payment Ref No" value={policy.paymentRef} /> 
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      {/* Coverages (No change) */}
      <Card sx={{ borderRadius: 3, boxShadow: 3 }}>
        <CardContent>
          <Typography variant="h6" fontWeight={600} gutterBottom>
            Coverages
          </Typography>
          <Divider sx={{ mb: 2 }} />
          <Stack direction="row" spacing={1} flexWrap="wrap">
            {policy.coverages.map((coverage) => (
              <Chip
                key={coverage}
                label={coverage}
                color="primary"
                variant="outlined"
                sx={{ borderRadius: 1, fontSize: "0.85rem" }}
              />
            ))}
          </Stack>
        </CardContent>
      </Card>

      {/* Action Buttons (No change) */}
      <Stack direction="row" justifyContent="center" spacing={2} sx={{ mt: 4 }}>
        <Button
          variant="outlined"
          startIcon={<ArrowBack />}
          sx={{ textTransform: "none" }}
        >
          Return to Dashboard
        </Button>
        <Button
          variant="contained"
          color="success"
          startIcon={<FileDownload />}
          sx={{ textTransform: "none" }}
        >
          Download Policy
        </Button>
      </Stack>
    </Box>
  );
}

// Helper for label–value pairs (UPDATED)
const InfoRow = ({ label, value }) => (
  <Box
    display="flex"
    justifyContent="space-between"
    alignItems="center"
    sx={{
      backgroundColor: "#f9f9f9",
      borderRadius: 1,
      px: 2,
      py: 1,
      mb: 1,
    }}
  >
    <Typography variant="body2" color="text.secondary">
      {label}
    </Typography>
    <Typography
      variant="body2"
      fontWeight={600}
      color="text.primary"
      sx={{ ml: 1 }}
    >
      {value}
    </Typography>
  </Box>
);