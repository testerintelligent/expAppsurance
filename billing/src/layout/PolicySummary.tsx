import {
  Box,
  Grid,
  Typography,
  Button,
  Divider,
  Paper,
  IconButton,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import { use } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const LabelValue = ({ label, value }: { label: string; value: string }) => (

  <Grid container spacing={1}>
    <Grid item xs={6}>
      <Typography variant="body2" color="text.secondary">
        {label}
      </Typography>
    </Grid>
    <Grid item xs={6}>
      <Typography variant="body2">{value}</Typography>
    </Grid>
  </Grid>
);

const PolicySummary = () => {

  const state = useLocation();
  const { policyId } = state.state || {};

  const navigate = useNavigate();

  const {activePage} = useSelector((state: any) => state.navigationReducer);
  
  return (
    <Paper elevation={0} sx={{ p: 2,height: '100vh',overflowY:'auto'}}>
      {/* Header */}
      <Typography variant="h6" fontWeight={500}>
        Policy Summary
      </Typography>

      <Divider sx={{ my: 1 }} />

      {/* Action Buttons */}
      <Box sx={{ display: "flex", gap: 1, mb: 1 }}>
        <Button variant="contained" size="small">
          Start Delinquency
        </Button>
        <Button variant="contained" size="small" onClick={() => navigate('/policydetails')}>
          Details
        </Button>
      </Box>

      {/* Overview + Notes */}
      <Grid container spacing={3}>
        {/* Overview */}
        <Grid item xs={12} md={8}>
          <Typography variant="subtitle1" fontWeight={600} mb={1}>
            Overview
          </Typography>

          <Grid container spacing={2}>
            <Grid item xs={6}>
              <LabelValue label="Insured" value="—" />
              <LabelValue label="Policy Lifetime" value="1 Year (12.12.2025)" />
              <LabelValue
                label="Effective Dates"
                value="12.12.25 - 12.12.26"
              />
              <LabelValue label="Cancellation Status" value="Open" />
              <LabelValue label="Delinquencies" value="0 in 12 months" />
              <LabelValue label="UW Company" value="—" />
            </Grid>

            <Grid item xs={6}>
              <LabelValue label="Currency" value="USD" />
              <LabelValue label="Billing Method" value="Direct Bill" />
              <LabelValue label="Send Invoices By" value="Email" />
              <LabelValue
                label="Default Payment Method"
                value="Responsive"
              />
              <LabelValue
                label="Payment Plan"
                value="Monthly 10% Down, 9 Max installments"
              />
            </Grid>
          </Grid>
        </Grid>

        {/* Notes */}
        <Grid item xs={12} md={4}>
          <Box
            sx={{
              borderLeft: "1px solid #e0e0e0",
              pl: 2,
              height: "100%",
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
              <Typography variant="subtitle1" fontWeight={600}>
                Notes
              </Typography>
              <IconButton size="small">
                <AddIcon />
              </IconButton>
            </Box>

            <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
              <InfoOutlinedIcon fontSize="small" color="info" />
              <Typography variant="body2" color="text.secondary">
                There are no notes on this policy.
              </Typography>
            </Box>
          </Box>
        </Grid>
      </Grid>

      {/* Financials */}
      <Divider sx={{ my: 2 }} />

      <Typography variant="subtitle1" fontWeight={600} mb={1}>
        Financials
      </Typography>

      <Box sx={{ display: "flex", gap: 1, alignItems: "center", mb: 1 }}>
        <InfoOutlinedIcon fontSize="small" color="info" />
        <Typography variant="body2">
          This policy is paid at the account level.
        </Typography>
      </Box>

      <Grid container spacing={3}>
        {/* Legend */}
        <Grid item xs={12} md={6}>
          {[
            "Unbilled: $0.00",
            "Paid: $0.00",
            "Written Off: $0.00",
            "Billed: $0.00",
            "Past Due: $0.00",
          ].map((item) => (
            <Typography key={item} variant="body2">
              • {item}
            </Typography>
          ))}
        </Grid>

        {/* Equity */}
        <Grid item xs={12} md={3}>
          <Typography variant="subtitle2" fontWeight={600}>
            Equity
          </Typography>
          <LabelValue label="Policy Equity" value="0" />
          <LabelValue label="Equity Percent" value="—" />
          <LabelValue label="Paid Through" value="12.12.26" />
        </Grid>

        {/* Unapplied Fund */}
        <Grid item xs={12} md={3}>
          <Typography variant="subtitle2" fontWeight={600}>
            Unapplied Fund
          </Typography>
          <LabelValue label="Default Unapplied" value="0" />
        </Grid>
      </Grid>

      <Divider sx={{ my: 1 }} />

      <Typography variant="body2">
        <b>Policy Value:</b> 0
      </Typography>
    </Paper>
  );
};

export default PolicySummary;
