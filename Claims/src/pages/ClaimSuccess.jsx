import React from "react";
import {
  Box,
  Typography,
  Paper,
  Grid,
  Divider,
  Button,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { useLocation, useNavigate } from "react-router-dom";

const InfoRow = ({ label, value }) => (
  <Box sx={{ display: "flex", mb: 1 }}>
    <Typography sx={{ minWidth: 180, fontWeight: 600, color: "gray" }}>
      {label}
    </Typography>
    <Typography>: {value}</Typography>
  </Box>
);

const SectionCard = ({ title, children }) => (
  <Paper sx={{ p: 3, borderRadius: 2, mb: 3 }} elevation={2}>
    <Typography variant="h6" sx={{ mb: 2, fontWeight: 700 }}>
      {title}
    </Typography>
    <Divider sx={{ mb: 2 }} />
    {children}
  </Paper>
);

export default function ClaimSuccess() {
  const { state } = useLocation();
  const navigate = useNavigate();

  if (!state?.claim) {
    return (
      <Box p={3}>
        <Typography color="error">
          Claim details not available.
        </Typography>
      </Box>
    );
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-GB");
  };

  const { claim, policy, lossDescription, lossLocation, lossCause, weather, faultRating, policeReported } = state;

  console.log("🚀 ClaimSuccess received claim data:", policy);
  return (
    <Box sx={{ p: 3, background: "#f5f7fb", minHeight: "100vh" }}>
      <Box maxWidth="1100px" mx="auto">
        
        {/* HEADER */}
        <Paper
          sx={{
            p: 3,
            mb: 3,
            borderRadius: 2,
            textAlign: "center",
            background: "#e8f5e9",
          }}
        >
          <CheckCircleIcon color="success" sx={{ fontSize: 50 }} />
          <Typography variant="h4" fontWeight={700}>
            Claim Created Successfully
          </Typography>
          <Typography variant="h6" sx={{ mt: 1 }}>
            Claim Number: <strong>{claim.claimNumber}</strong>
          </Typography>
        </Paper>

        {/*  POLICY INFO */}
        <SectionCard title="Policy Information">
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <InfoRow label="Policy Number" value={policy.policyNumber} />
              <InfoRow label="Policy Status" value={policy.status} />
            </Grid>
            <Grid item xs={12} md={6}>
              <InfoRow label="Product" value={policy.productType} />
            </Grid>
          </Grid>
        </SectionCard>

        {/* INSURED INFO */}
        <SectionCard title="Insured Information">
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <InfoRow label="Name" value={claim.insured.name} />
              <InfoRow label="Phone" value={claim.insured.phone} />
            </Grid>
            <Grid item xs={12} md={6}>
              <InfoRow label="Address" value={claim.insured.address} />
            </Grid>
          </Grid>
        </SectionCard>

        {/* FNOL */}
        <SectionCard title="Loss / FNOL Details">
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <InfoRow label="Loss Date" value={formatDate(claim.lossDate)} />
              <InfoRow label="Date of Notice" value={formatDate(claim.dateOfNotice)} />
              <InfoRow label="Claim Type" value={claim.claimType} />
            </Grid>
            <Grid item xs={12} md={6}>
              <InfoRow label="Reported By" value={claim.reportedBy} />
              <InfoRow label="How Reported" value={claim.howReported} />
            </Grid>
          </Grid>
        </SectionCard>

        {/* LOSS DESCRIPTION & DETAILS */}
        <SectionCard title="Loss Description & Details">
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <InfoRow label="Loss Description" value={lossDescription || "N/A"} />
              <InfoRow label="Loss Location" value={lossLocation || "N/A"} />
              <InfoRow label="Loss Cause" value={lossCause || "N/A"} />
            </Grid>
            <Grid item xs={12} md={6}>
              <InfoRow label="Weather Condition" value={weather || "N/A"} />
              <InfoRow label="Fault Rating" value={faultRating || "N/A"} />
              <InfoRow label="Police Reported" value={policeReported ? "Yes" : "No"} />
            </Grid>
          </Grid>
        </SectionCard>
        <SectionCard title="Vehicles Involved">
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <InfoRow label="Make" value={policy.vehicle[0].make || "N/A"} />
              <InfoRow label="Model" value={policy.vehicle[0].model || "N/A"} />
              <InfoRow label="Year" value={policy.vehicle[0].year || "N/A"} />
            </Grid>
            <Grid item xs={12} md={6}>
              <InfoRow label="License Plate" value={policy.vehicle[0].licensePlate || "N/A"} />
              <InfoRow label="State Registered" value={policy.vehicle[0].stateRegistered || "N/A"} />
              <InfoRow label="Vin" value={policy.vehicle[0].vin || "N/A"} />
            </Grid>
          </Grid>
        </SectionCard>

        {/* DRIVERS */}
        <SectionCard title="Drivers Involved">
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <InfoRow label="Driver Name" value={policy.driver[0].firstName || "N/A"} />
              <InfoRow label="License Date" value={formatDate(policy.driver[0].licenseDate )|| "N/A"} />
              <InfoRow label="License Type" value={policy.driver[0].licenseType || "N/A"} />
            </Grid>
            <Grid item xs={12} md={6}>
              <InfoRow label="Date of Birth" value={formatDate(policy.driver[0].dateOfBirth) || "N/A"} />
              <InfoRow label="Driving Experience" value={policy.driver[0].drivingExperience || "N/A"} />
              <InfoRow label="Country" value={policy.driver[0].country || "N/A"} />
            </Grid>
          </Grid>
        </SectionCard>

        {/* ACTION */}
        <Box textAlign="center" mt={3}>
          <Button
            variant="contained"
            size="large"
            onClick={() => navigate("/Claim")}
            sx={{ px: 5, py: 1.5, borderRadius: 2 }}
          >
            Back to Home
          </Button>
        </Box>
      </Box>
    </Box>
  );
}