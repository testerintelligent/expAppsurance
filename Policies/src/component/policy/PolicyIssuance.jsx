// PolicyIssuance.jsx
import React from "react";
import {
  Box,
  Grid,
  Typography,
  Divider,
  Paper,
  Tooltip,
  Alert,
  Button,
} from "@mui/material";

import {
  AccountCircle,
  Assignment,
  CalendarMonth,
  MonetizationOn,
  Shield,
  Numbers,
  Payments,
  CheckCircle,
  FileDownload,
  ArrowBack,
} from "@mui/icons-material";

import { useLocation, useNavigate } from "react-router-dom";

export default function PolicyIssuance() {
  const { state } = useLocation();
  const navigate = useNavigate();

  // --- Preserve your original logic & fallbacks ---
  const policy = state?.policy;
  const policyNumber =
    policy?.policyNumber || state?.policy?.policy?.policyNumber || "N/A";

  const submissionId = policy?.submissionId || state?.submissionId || "-";
  const accountNumber = policy?.accountId || state?.accountNumber || "-";
  const contact = state?.contact || {};
  const policyHolder = contact.firstName
    ? `${contact.firstName} ${contact.lastName}`
    : "-";

  const effectiveDate = policy?.effectiveDate || state?.effectiveDate || "N/A";
  const expiryDate = policy?.expiryDate || state?.expiryDate || "N/A";

  const totalPremium = policy?.totalPremium || state?.overallPremium || 0;
  const taxes = policy?.taxes ?? totalPremium * 0.18;
  const totalCost = policy?.totalCost ?? totalPremium + taxes;

  const paymentSchedule =
    policy?.paymentSchedule || state?.paymentSchedule || "Yearly";
  const billingMethod = policy?.billingMethod || state?.billingMethod || "Direct Bill";
  const paymentRef =
    policy?.paymentRef || state?.paymentRef || `PAY-${Math.floor(Math.random() * 1000000)}`;
  const coverages = policy?.coverages || state?.coverages || [];

  // If nothing is passed, show fallback
  if (!policy && !state) {
    return (
      <Box sx={{ p: 4 }}>
        <Alert severity="error" sx={{ mb: 2 }}>
          Policy details not found. Please complete payment first.
        </Alert>
        <Button variant="contained" onClick={() => navigate("/payment", { state })}>
          Go Back to Payment
        </Button>
      </Box>
    );
  }

  // Reusable small info item with icon, label, value
  const InfoItem = ({ icon, label, value }) => (
    <Grid item xs={12} sm={6}>
      <Paper
        elevation={1}
        sx={{
          p: 1.2,
          borderRadius: 2,
          display: "flex",
          alignItems: "center",
          gap: 1.2,
          background: "#fff",
          transition: "transform 200ms ease, box-shadow 200ms ease",
          "&:hover": {
            transform: "translateY(-4px)",
            boxShadow: "0 8px 24px rgba(0,0,0,0.08)",
          },
        }}
      >
        <Tooltip title={label}>
          <Box sx={{ color: "#2f3a8f", display: "flex", alignItems: "center" }}>{icon}</Box>
        </Tooltip>

        <Box sx={{ minWidth: 0 }}>
          <Typography variant="caption" color="text.secondary" noWrap>
            {label}
          </Typography>
          <Typography variant="body1" fontWeight={700} sx={{ wordBreak: "break-word" }}>
            {value}
          </Typography>
        </Box>
      </Paper>
    </Grid>
  );

  return (
    <Box sx={{ width: "100%", maxWidth: 1200, mx: "auto", mt: 4, mb: 8, px: 2 }}>
      {/* Success banner */}
      <Alert
        icon={<CheckCircle fontSize="inherit" />}
        severity="success"
        sx={{
          mb: 3,
          borderRadius: 2,
          fontWeight: 600,
          backgroundColor: "#eaf7ea",
          color: "#155724",
          border: "1px solid #d4f2d8",
        }}
      >
        Policy Issued Successfully — policy is active. Confirmation was sent to the registered email.
      </Alert>

      {/* Header */}
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
        <Typography variant="h4" sx={{ fontWeight: 700, color: "#153e75" }}>
          Policy Issuance
        </Typography>

        <Box sx={{ display: "flex", gap: 1 }}>
          <Button
            variant="outlined"
            startIcon={<ArrowBack />}
            onClick={() => navigate("/")}
            sx={{ textTransform: "none" }}
          >
            Return to Dashboard
          </Button>

          <Button
            variant="contained"
            color="primary"
            startIcon={<FileDownload />}
            onClick={() => {
              // Placeholder for download action (implement as needed)
              alert(`Downloading policy ${policyNumber}`);
            }}
            sx={{ textTransform: "none" }}
          >
            Download Policy
          </Button>
        </Box>
      </Box>

      {/* Main Paper */}
      <Paper
        elevation={3}
        sx={{
          p: { xs: 2, md: 4 },
          borderRadius: 3,
          background: "#fbfdff",
          border: "1px solid #eef3fb",
        }}
      >
        {/* Top row: Policy Info (left) & Billing (right) with vertical divider */}
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", md: "1fr auto 1fr" },
            gap: 3,
            alignItems: "start",
          }}
        >
          {/* Left column */}
          <Box>
            <Typography variant="h6" fontWeight={700} sx={{ mb: 2, color: "#183d8b" }}>
              <Assignment sx={{ verticalAlign: "middle", mr: 1 }} />
              Policy Information
            </Typography>

            <Grid container spacing={2}>
              <InfoItem icon={<Numbers />} label="Submission No." value={submissionId} />
              <InfoItem icon={<AccountCircle />} label="Account No." value={accountNumber} />
              <InfoItem icon={<Shield />} label="Policyholder" value={policyHolder} />
              <InfoItem icon={<Assignment />} label="Policy Number" value={policyNumber} />
              <InfoItem icon={<CalendarMonth />} label="Effective Date" value={effectiveDate} />
              <InfoItem icon={<CalendarMonth />} label="Expiry Date" value={expiryDate} />
            </Grid>
          </Box>

          {/* Divider */}
          <Box
            sx={{
              display: { xs: "none", md: "flex" },
              alignItems: "stretch",
              justifyContent: "center",
            }}
          >
            <Divider orientation="vertical" flexItem sx={{ borderRightColor: "#e0e0e0", mx: 1 }} />
          </Box>

          {/* Right column */}
          <Box>
            <Typography variant="h6" fontWeight={700} sx={{ mb: 2, color: "#1b5e20" }}>
              <Payments sx={{ verticalAlign: "middle", mr: 1 }} />
              Billing & Payment Details
            </Typography>

            <Grid container spacing={2}>
              <InfoItem
                icon={<MonetizationOn />}
                label="Total Premium"
                value={`₹ ${Number(totalPremium).toLocaleString()}`}
              />
              <InfoItem
                icon={<MonetizationOn />}
                label="Taxes"
                value={`₹ ${Number(taxes).toFixed(2)}`}
              />
              <InfoItem
                icon={<MonetizationOn />}
                label="Total Cost"
                value={`₹ ${Number(totalCost).toFixed(2)}`}
              />
              <InfoItem icon={<CalendarMonth />} label="Payment Schedule" value={paymentSchedule} />
              <InfoItem icon={<Payments />} label="Billing Method" value={billingMethod} />
              <InfoItem icon={<Numbers />} label="Payment Ref No" value={paymentRef} />
            </Grid>
          </Box>
        </Box>

        {/* Coverages Section (Option C style: clean grid) */}
        <Box sx={{ mt: 4 }}>
          <Typography variant="h6" fontWeight={700} sx={{ mb: 2, color: "#6a1b9a" }}>
            <CheckCircle sx={{ verticalAlign: "middle", mr: 1 }} />
            Coverages Included
          </Typography>

          {coverages.length > 0 ? (
            <Grid container spacing={2}>
              {coverages.map((cov, idx) => (
                <Grid key={idx} item xs={12} sm={6} md={4} lg={3}>
                  <Paper
                    elevation={1}
                    sx={{
                      p: 2,
                      borderRadius: 2,
                      display: "flex",
                      gap: 1,
                      alignItems: "center",
                      transition: "transform 200ms ease, box-shadow 200ms ease, background 200ms ease",
                      cursor: "pointer",
                      background: "#ffffff",
                      "&:hover": {
                        transform: "translateY(-6px)",
                        boxShadow: "0 12px 30px rgba(18,38,88,0.08)",
                        background: "#f8f0ff",
                      },
                    }}
                  >
                    <Box sx={{ color: "#6a1b9a" }}>✔</Box>
                    <Typography fontWeight={600}>{cov}</Typography>
                  </Paper>
                </Grid>
              ))}
            </Grid>
          ) : (
            <Typography color="text.secondary">No coverages available</Typography>
          )}
        </Box>
      </Paper>

      {/* Footer summary & actions */}
      <Box sx={{ mt: 4, display: "flex", justifyContent: "space-between", gap: 2, flexWrap: "wrap" }}>
        <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
          <Typography variant="body2" color="text.secondary">
            Total Payable:
          </Typography>
          <Typography variant="h6" fontWeight={800} color="#1b5e20">
            ₹ {Number(totalCost).toFixed(2)}
          </Typography>
        </Box>

        <Box sx={{ display: "flex", gap: 2 }}>
          <Button variant="outlined" onClick={() => navigate(-1)} startIcon={<ArrowBack />} sx={{ textTransform: "none" }}>
            Back
          </Button>

          <Button
            variant="contained"
            color="success"
            onClick={() => {
              // existing behavior could be to navigate or download. Keep placeholder:
              alert("Confirm action or download as needed.");
            }}
            sx={{ textTransform: "none" }}
          >
            Confirm & Close
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
