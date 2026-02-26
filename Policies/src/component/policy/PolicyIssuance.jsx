// PolicyIssuance.jsx
import React from "react";
import {
  Box,
  Grid,
  Typography,
  Paper,
  Button,
  Divider,
  Alert,
} from "@mui/material";
import {
  CheckCircle,
  FileDownload,
  ArrowBack,
} from "@mui/icons-material";
import { useLocation, useNavigate } from "react-router-dom";

export default function PolicyIssuance() {
  const { state } = useLocation();
  const navigate = useNavigate();

  // ---------------- COVERAGE OPTIONS ----------------
  const coverageOptions = [
    { name: "Third-Party Liability", premium: 120 },
    { name: "Own Damage", premium: 250 },
    { name: "Comprehensive", premium: 400 },
    { name: "Personal Accident Cover", premium: 80 },
    { name: "Zero Depreciation", premium: 150 },
    { name: "Vehicle theft", premium: 110 },
  ];

  // --- Extract info ---
  const policy = state?.policy || {};
  const submissionId = policy.submissionId || state?.submissionId || "-";
  const accountNumber = policy.accountId || state?.accountNumber || "-";
  const contact = state?.contact || {};
  const policyHolder = contact.firstName
    ? `${contact.firstName} ${contact.lastName}`
    : "-";
  const policyNumber = policy.policyNumber || "N/A";
  const effectiveDate = policy.effectiveDate || state?.effectiveDate || "N/A";
  const expiryDate = policy.expiryDate || state?.expiryDate || "N/A";
  const coverages = policy.coverages || state?.coverages || [];

  // ----------- PREMIUM CALCULATION -------------
  const totalPremium = coverageOptions
    .filter((c) => coverages.includes(c.name))
    .reduce((sum, c) => sum + c.premium, 0);

  const taxes = totalPremium * 0.18;
  const totalCost = totalPremium + taxes;

  const paymentSchedule =
    policy.paymentSchedule || state?.paymentSchedule || "Yearly";
  const billingMethod = policy.billingMethod || state?.billingMethod || "Direct Bill";
  const paymentRef =
    policy.paymentRef ||
    state?.paymentRef ||
    `PAY-${Math.floor(Math.random() * 1000000)}`;

  // --- Fallback if no data ---
  if (!policy && !state) {
    return (
      <Box sx={{ p: 4 }}>
        <Alert severity="error" sx={{ mb: 2 }}>
          Policy details not found. Please complete payment first.
        </Alert>
        <Button
          variant="contained"
          onClick={() => navigate("/payment", { state })}
        >
          Go Back to Payment
        </Button>
      </Box>
    );
  }

  // Reusable info row
  const InfoRow = ({ label, value }) => (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        mb: 1.5,
        px: 1,
      }}
    >
      <Typography color="text.secondary">{label}</Typography>
      <Typography fontWeight={700}>{value}</Typography>
    </Box>
  );

  return (
    <Box sx={{ maxWidth: 1200, mx: "auto", my: 4, px: 2 }}>
      {/* SUCCESS BANNER */}
      <Alert
        icon={<CheckCircle />}
        severity="success"
        sx={{
          mb: 4,
          borderRadius: 2,
          fontWeight: 600,
          backgroundColor: "#eaf7ea",
          color: "#155724",
          border: "1px solid #d4f2d8",
        }}
      >
        Policy Issued Successfully — confirmation sent to registered email.
      </Alert>

      {/* HEADER / POLICY SUMMARY */}
      <Paper sx={{ p: 3, mb: 4, borderRadius: 2, background: "#f0f8ff" }}>
        <Typography variant="h5" fontWeight={700} sx={{ mb: 2 }}>
          Policy Summary
        </Typography>
        <Divider sx={{ mb: 2 }} />

        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <InfoRow label="Policy Number" value={policyNumber} />
            <InfoRow label="Submission ID" value={submissionId} />
            <InfoRow label="Account Number" value={accountNumber} />
            <InfoRow label="Policyholder" value={policyHolder} />
          </Grid>
          <Grid item xs={12} md={6}>
            <InfoRow label="Effective Date" value={effectiveDate} />
            <InfoRow label="Expiry Date" value={expiryDate} />
            <InfoRow label="Payment Schedule" value={paymentSchedule} />
            <InfoRow label="Billing Method" value={billingMethod} />
            <InfoRow label="Payment Ref" value={paymentRef} />
          </Grid>
        </Grid>
      </Paper>

      {/* PREMIUM SUMMARY */}
      <Paper sx={{ p: 3, mb: 4, borderRadius: 2, background: "#f0fff4" }}>
        <Typography variant="h6" fontWeight={700} sx={{ mb: 2 }}>
          Premium Summary
        </Typography>
        <Divider sx={{ mb: 2 }} />
        <InfoRow label="Total Premium" value={`₹ ${totalPremium.toLocaleString("en-IN")}`} />
        <InfoRow label="Taxes (18%)" value={`₹ ${taxes.toFixed(2)}`} />
        <Divider sx={{ my: 1.5 }} />
        <InfoRow label="Total Amount Payable" value={`₹ ${totalCost.toLocaleString("en-IN")}`} />
      </Paper>

      {/* COVERAGES */}
      <Paper sx={{ p: 3, mb: 4, borderRadius: 2, background: "#fff0f5" }}>
        <Typography variant="h6" fontWeight={700} sx={{ mb: 2 }}>
          Coverages Included
        </Typography>
        <Grid container spacing={2}>
          {coverages.length > 0 ? (
            coverages.map((cov, idx) => {
              const coverage = coverageOptions.find((c) => c.name === cov);
              return (
                <Grid key={idx} item xs={12} sm={6} md={4}>
                  <Paper
                    elevation={1}
                    sx={{
                      p: 2,
                      borderRadius: 2,
                      background: "#fff",
                      display: "flex",
                      justifyContent: "space-between",
                    }}
                  >
                    <Typography>{cov}</Typography>
                    <Typography fontWeight={600}>
                      ₹{coverage?.premium.toLocaleString("en-IN")}
                    </Typography>
                  </Paper>
                </Grid>
              );
            })
          ) : (
            <Typography color="text.secondary">No coverages selected</Typography>
          )}
        </Grid>
      </Paper>

      {/* ACTION BUTTONS */}
      <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 2, flexWrap: "wrap" }}>
        <Button
          variant="outlined"
          startIcon={<ArrowBack />}
          onClick={() => navigate(-1)}
          sx={{ textTransform: "none" }}
        >
          Back
        </Button>
        <Button
          variant="contained"
          color="primary"
          startIcon={<FileDownload />}
          onClick={() => alert(`Downloading policy ${policyNumber}`)}
          sx={{ textTransform: "none" }}
        >
          Download Policy
        </Button>
        <Button
          variant="contained"
          color="success"
          onClick={() => alert("Policy confirmed and closed")}
          sx={{ textTransform: "none" }}
        >
          Confirm & Close
        </Button>
      </Box>
    </Box>
  );
}
