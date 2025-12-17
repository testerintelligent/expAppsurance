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
import { useLocation, useNavigate } from "react-router-dom";

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

  const { claim } = state;

  return (
    <Box p={3}>
      <Paper elevation={3} sx={{ p: 4, maxWidth: 1100, margin: "0 auto" }}>
        {/* ---------------- HEADER ---------------- */}
        <Typography
          variant="h4"
          color="success.main"
          align="center"
          gutterBottom
        >
          Claim Created Successfully
        </Typography>

        <Typography variant="h6" align="center" gutterBottom>
          Claim Number: <strong>{claim.claimNumber}</strong>
        </Typography>

        <Divider sx={{ my: 3 }} />

        {/* ---------------- POLICY INFO ---------------- */}
        <Typography variant="h6">Policy Information</Typography>
        <Grid container spacing={2}>
          <Grid item xs={6}>Policy Number: {claim.policyNumber}</Grid>
          <Grid item xs={6}>Policy Status: {claim.policyStatus}</Grid>
          <Grid item xs={6}>Product: {claim.productType}</Grid>
        </Grid>

        <Divider sx={{ my: 2 }} />

        {/* ---------------- INSURED INFO ---------------- */}
        <Typography variant="h6">Insured Information</Typography>
        <Grid container spacing={2}>
          <Grid item xs={6}>Name: {claim.insured.name}</Grid>
          <Grid item xs={6}>Phone: {claim.insured.phone}</Grid>
          <Grid item xs={12}>Address: {claim.insured.address}</Grid>
        </Grid>

        <Divider sx={{ my: 2 }} />

        {/* ---------------- FNOL INFO ---------------- */}
        <Typography variant="h6">Loss / FNOL Details</Typography>
        <Grid container spacing={2}>
          <Grid item xs={6}>Loss Date: {claim.lossDate}</Grid>
          <Grid item xs={6}>Date of Notice: {claim.dateOfNotice}</Grid>
          <Grid item xs={6}>Claim Type: {claim.claimType}</Grid>
          <Grid item xs={6}>Reported By: {claim.reportedBy}</Grid>
          <Grid item xs={6}>How Reported: {claim.howReported}</Grid>
        </Grid>

        <Divider sx={{ my: 2 }} />

        {/* ---------------- VEHICLES ---------------- */}
        <Typography variant="h6">Vehicles Involved</Typography>
        <List dense>
          {claim.vehicles?.map((v, idx) => (
            <ListItem key={idx}>
              <ListItemText
                primary={`${v.year} ${v.make} ${v.model}`}
                secondary={`VIN: ${v.vin}`}
              />
            </ListItem>
          ))}
        </List>

        <Divider sx={{ my: 2 }} />

        {/* ---------------- DRIVERS ---------------- */}
        <Typography variant="h6">Drivers Involved</Typography>
        <List dense>
          {claim.drivers?.map((d, idx) => (
            <ListItem key={idx}>
              <ListItemText
                primary={`${d.firstName} ${d.lastName}`}
                secondary={`License: ${d.licenseType || "N/A"}`}
              />
            </ListItem>
          ))}
        </List>

        {/* ---------------- ACTIONS ---------------- */}
        <Divider sx={{ my: 3 }} />
        <Box display="flex" justifyContent="center">
          <Button
            variant="contained"
            size="large"
            onClick={() => navigate("/Claim")}
          >
            Back to Home
          </Button>
        </Box>
      </Paper>
    </Box>
  );
}
