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
import { useLocation, useNavigate } from "react-router-dom";

export default function PolicyIssuanceTableLayout() {
  const { state } = useLocation();
  const navigate = useNavigate();

  // Get policy from state
  const policy = state?.policy;
  const policyNumber = policy?.policyNumber || state?.policy?.policy?.policyNumber || "N/A";

  console.log("Policy Number:", policyNumber);  
  console.log("Policy data from state:", state);

  // If no policy object, use previous state info
  const submissionId = policy?.submissionId || state?.submissionId || "-";
  const accountNumber = policy?.accountId || state?.accountNumber || "-";
  const contact = state?.contact || {};
  const policyHolder = contact.firstName
    ? `${contact.firstName} ${contact.lastName}`
    : "-";

  const effectiveDate =
    policy?.effectiveDate || state?.effectiveDate || "N/A";
  const expiryDate = policy?.expiryDate || state?.expiryDate || "N/A";

  const totalPremium = policy?.totalPremium || state?.overallPremium || 0;
  const taxes = policy?.taxes || totalPremium * 0.18;
  const totalCost = policy?.totalCost || totalPremium + taxes;

  const paymentSchedule =
    policy?.paymentSchedule || state?.paymentSchedule || "Yearly";
  const billingMethod = policy?.billingMethod || state?.billingMethod || "Direct Bill";
  const paymentRef = policy?.paymentRef || `PAY-${Math.floor(Math.random() * 1000000)}`;
  const coverages = policy?.coverages || state?.coverages || [];

  if (!policy && !state) {
    return (
      <Box sx={{ p: 4 }}>
        <Alert severity="error">
          Policy details not found. Please complete payment first.
        </Alert>
        <Button
          variant="contained"
          sx={{ mt: 2 }}
          onClick={() => navigate("/payment", { state })}
        >
          Go Back to Payment
        </Button>
      </Box>
    );
  }

  return (
    <Box sx={{ p: 4, bgcolor: "#f8fafc", minHeight: "100vh" }}>
      {/* Success Banner */}
      <Alert
        icon={<CheckCircle fontSize="inherit" />}
        severity="success"
        sx={{ mb: 3, borderRadius: 2, fontWeight: 500, backgroundColor: "#d4edda", color: "#155724" }}
      >
        Policy Issued Successfully! Your insurance policy is now active. A
        confirmation email has been sent to your registered address.
      </Alert>

      {/* Title */}
      <Typography variant="h4" align="center" sx={{ mb: 4, fontWeight: 700, color: "#0d47a1" }}>
        Policy Issuance
      </Typography>

      {/* Policy Information */}
      <Card sx={{ borderRadius: 3, boxShadow: 3, mb: 3 }}>
        <CardContent>
          <Typography variant="h6" fontWeight={600} gutterBottom>
            Policy Information
          </Typography>
          <Divider sx={{ mb: 2 }} />

          <Grid container spacing={2}>
            {/* Left Column */}
            <Grid item xs={12} sm={6}>
              <InfoRow label="Submission No." value={submissionId} />
              <InfoRow label="Account No." value={accountNumber} />
              <InfoRow label="Policyholder" value={policyHolder} />
              <InfoRow label="Policy Type" value={policy?.productType || "Auto"} />
            </Grid>

            {/* Right Column */}
            <Grid item xs={12} sm={6}>
              <InfoRow
                label="Status"
                value={
                  <Chip
                    label={policy?.status || "Active"}
                    color={(policy?.status || "Active") === "Active" ? "success" : "warning"}
                    size="small"
                    sx={{ fontWeight: 600 }}
                  />
                }
              />
              <InfoRow label="Effective Date" value={new Date(effectiveDate).toLocaleDateString()} />
              <InfoRow label="Expiry Date" value={new Date(expiryDate).toLocaleDateString()} />
              <InfoRow label="Issued By" value="Agent #AGT1023" />
              <InfoRow label="Issued Date" value={policy?.issuedAt ? new Date(policy.issuedAt).toLocaleString() : new Date().toLocaleString()} />
            </Grid>
          </Grid>
        </CardContent>
      </Card>

       {/* Policy Number Display */}
      <Typography variant="h5" fontWeight={600} sx={{ mb: 3 }}>
        Policy Number: <span style={{ color: "#1976d2" }}>{policyNumber}</span>
      </Typography>

      {/* Billing & Payment Details */}
      <Card sx={{ borderRadius: 3, boxShadow: 3, mb: 3 }}>
        <CardContent>
          <Typography variant="h6" fontWeight={600} gutterBottom>
            Billing & Payment Details
          </Typography>
          <Divider sx={{ mb: 2 }} />

          <Grid container spacing={2}>
            {/* Left Column */}
            <Grid item xs={12} sm={6}>
              <InfoRow label="Total Premium" value={`₹${totalPremium}`} />
              <InfoRow label="Taxes" value={`₹${taxes}`} />
              <InfoRow label="Total Cost" value={`₹${totalCost}`} />
            </Grid>

            {/* Right Column */}
            <Grid item xs={12} sm={6}>
              <InfoRow label="Payment Schedule" value={paymentSchedule} />
              <InfoRow label="Billing Method" value={billingMethod} />
              <InfoRow label="Payment Ref No" value={paymentRef} />
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      {/* Coverages */}
      <Card sx={{ borderRadius: 3, boxShadow: 3 }}>
        <CardContent>
          <Typography variant="h6" fontWeight={600} gutterBottom>
            Coverages
          </Typography>
          <Divider sx={{ mb: 2 }} />
          <Stack direction="row" spacing={1} flexWrap="wrap">
            {coverages.map((coverage) => (
              <Chip key={coverage} label={coverage} color="primary" variant="outlined" sx={{ borderRadius: 1, fontSize: "0.85rem" }} />
            ))}
          </Stack>
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <Stack direction="row" justifyContent="center" spacing={2} sx={{ mt: 4 }}>
        <Button variant="outlined" startIcon={<ArrowBack />} sx={{ textTransform: "none" }} onClick={() => navigate("/")}>
          Return to Dashboard
        </Button>
        <Button variant="contained" color="success" startIcon={<FileDownload />} sx={{ textTransform: "none" }}>
          Download Policy
        </Button>
      </Stack>
    </Box>
  );
}

// Helper for label–value pairs
const InfoRow = ({ label, value }) => (
  <Box display="flex" justifyContent="space-between" alignItems="center" sx={{ backgroundColor: "#f9f9f9", borderRadius: 1, px: 2, py: 1, mb: 1 }}>
    <Typography variant="body2" color="text.secondary">{label}</Typography>
    <Typography variant="body2" fontWeight={600} color="text.primary" sx={{ ml: 1 }}>
      {value}
    </Typography>
  </Box>
);
