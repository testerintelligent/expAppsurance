import React from "react";
import { Paper, Grid, Typography } from "@mui/material";

export default function InfoBar({
  product,
  contactName,
  submissionId,
  accountNumber,
  effectiveDate,
  expiryDate,
}) {
  return (
    <Paper sx={{ p: 2, mb: 4, borderRadius: 2 }}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6} md={2}>
          <Typography variant="subtitle2">Product</Typography>
          <Typography variant="body1">{product || "-"}</Typography>
        </Grid>
        <Grid item xs={12} sm={6} md={2}>
          <Typography variant="subtitle2">Contact Name</Typography>
          <Typography variant="body1">{contactName || "-"}</Typography>
        </Grid>
        <Grid item xs={12} sm={6} md={2}>
          <Typography variant="subtitle2">Submission No</Typography>
          <Typography variant="body1">{submissionId || "-"}</Typography>
        </Grid>
        <Grid item xs={12} sm={6} md={2}>
          <Typography variant="subtitle2">Account No</Typography>
          <Typography variant="body1">{accountNumber || "-"}</Typography>
        </Grid>
        <Grid item xs={12} sm={6} md={2}>
          <Typography variant="subtitle2">Effective Date</Typography>
          <Typography variant="body1">{effectiveDate || "-"}</Typography>
        </Grid>
        <Grid item xs={12} sm={6} md={2}>
          <Typography variant="subtitle2">Policy Expiry</Typography>
          <Typography variant="body1">{expiryDate || "-"}</Typography>
        </Grid>
      </Grid>
    </Paper>
  );
}
