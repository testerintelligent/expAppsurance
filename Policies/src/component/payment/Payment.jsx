import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
  TextField,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Button,
  Paper,
  Chip,
  Stepper,
  Step,
  StepLabel,
} from "@mui/material";
import { ArrowBack, Payment as PaymentIcon } from "@mui/icons-material";
import { createPolicy } from "../policy/policyAPI";

// --- InfoBar Component (same style as Quote.jsx) ---
const InfoBar = ({ submissionId, accountNumber, policyHolder, effectiveDate }) => (
  <Paper
    elevation={1}
    sx={{
      p: 2,
      mb: 3,
      display: "flex",
      justifyContent: "space-between",
      borderRadius: 2,
      backgroundColor: "#e3f2fd",
    }}
  >
    <Typography variant="body2">
      Submission: <b>{submissionId || "-"}</b>
    </Typography>
    <Typography variant="body2">
      Account: <b>{accountNumber || "-"}</b>
    </Typography>
    <Typography variant="body2">
      Policyholder: <b>{policyHolder || "-"}</b>
    </Typography>
    <Typography variant="body2">
      Effective Date: <b>{effectiveDate || "-"}</b>
    </Typography>
  </Paper>
);

export default function Payment() {
  const { state } = useLocation();
  const navigate = useNavigate();

  // --- Extract all info from previous screens ---
  const {
    submissionId = "",
    accountId = "",
    accountNumber = "",
    contact = {},
    vehicleData = {},
    coverages = [],
    overallPremium = 0,
    effectiveDate = "",
    expiryDate = "",
    quoteId = "",
    quoteNumber = "",
  } = state || {};

  const [billingMethod, setBillingMethod] = useState("Direct Bill");
  const [paymentSchedule, setPaymentSchedule] = useState("Yearly");
  const [accountDetails, setAccountDetails] = useState({
    bankName: "",
    accountNo: "",
    accountHolder: "",
  });

  const taxes = overallPremium * 0.18;
  const totalCost = overallPremium + taxes;

  const policyHolder = `${contact.firstName || ""} ${contact.lastName || ""}`;

  const getScheduleRows = () => {
    let periods = 1;
    if (paymentSchedule === "Monthly") periods = 12;
    else if (paymentSchedule === "Quarterly") periods = 4;
    else if (paymentSchedule === "Half Yearly") periods = 2;
    const premiumPer = (overallPremium / periods).toFixed(2);
    const taxesPer = (taxes / periods).toFixed(2);
    const totalPer = (totalCost / periods).toFixed(2);
    return Array.from({ length: periods }, (_, i) => ({
      period: i + 1,
      premium: premiumPer,
      taxes: taxesPer,
      total: totalPer,
    }));
  };

  const handleConfirmPayment = async () => {
    try {
      const policyNumber = `POL-${Date.now()}`;
      const paymentRef = `PAY-${Math.floor(Math.random() * 1000000)}`;

      const policyData = {
        submissionId,
        accountId,
        contactId: contact._id || "",
        vehicleData,
        quoteId,
        quoteNumber,
        coverages,
        effectiveDate,
        expiryDate,
        totalPremium: overallPremium,
        taxes,
        totalCost,
        billingMethod,
        paymentSchedule,
        paymentRef,
        accountDetails,
        policyNumber,
        productType: "Auto",
      };

      console.log("Creating policy with data:", policyData);

      const newPolicy = await createPolicy(policyData);

      console.log("Policy created successfully:", newPolicy);
      navigate("/policy-issuance", {
        state: {
          ...state,
          policy: newPolicy,
          policyNumber: newPolicy.policyNumber,
          billingMethod,
          paymentSchedule,
          accountDetails,
        },
      });
    } catch (error) {
      console.error("Error creating policy:", error);
    }
  };

  return (
    <Box sx={{ maxWidth: 1100, mx: "auto", mt: 4, mb: 8 }}>
      {/* Stepper */}
      <Stepper activeStep={1} alternativeLabel sx={{ mb: 3 }}>
        {["Quote", "Payment", "Confirmation"].map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>

      {/* InfoBar */}
      <InfoBar
        submissionId={submissionId}
        accountNumber={accountNumber}
        policyHolder={policyHolder}
        effectiveDate={effectiveDate}
      />

      {/* Premium & Policy Summary */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} md={6}>
          <Card sx={{ borderRadius: 3, boxShadow: 4 }}>
            <CardContent>
              <Typography variant="h6" fontWeight={600} sx={{ mb: 2, borderBottom: "2px solid #1976d2", display: "inline-block" }}>
                Policy Summary
              </Typography>
              <Typography><b>Submission No:</b> {submissionId}</Typography>
              <Typography><b>Account No:</b> {accountNumber}</Typography>
              <Typography><b>Policyholder:</b> {policyHolder}</Typography>
              <Typography><b>Effective Date:</b> {effectiveDate}</Typography>
              <Typography><b>Expiry Date:</b> {expiryDate}</Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Card sx={{ borderRadius: 3, boxShadow: 4 }}>
            <CardContent>
              <Typography variant="h6" fontWeight={600} sx={{ mb: 2, borderBottom: "2px solid #2e7d32", display: "inline-block" }}>
                Premium Summary
              </Typography>
              <Typography><b>Total Premium:</b> ${overallPremium}</Typography>
              <Typography><b>Taxes:</b> ${taxes.toFixed(2)}</Typography>
              <Typography><b>Total Cost:</b> ${totalCost.toFixed(2)}</Typography>
              <Box sx={{ mt: 2 }}>
                <Chip label="Ready for Payment" color="success" variant="outlined" />
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Payment Section */}
      <Card sx={{ borderRadius: 3, boxShadow: 4, mb: 4 }}>
        <CardContent>
          <Typography variant="h6" fontWeight={600} sx={{ mb: 3, borderBottom: "2px solid #1976d2", display: "inline-block" }}>
            Billing Preferences
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel>Billing Method</InputLabel>
                <Select
                  value={billingMethod}
                  label="Billing Method"
                  onChange={(e) => setBillingMethod(e.target.value)}
                >
                  <MenuItem value="Direct Bill">Direct Bill</MenuItem>
                  <MenuItem value="Direct Account Debit">Direct Account Debit</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel>Payment Schedule</InputLabel>
                <Select
                  value={paymentSchedule}
                  label="Payment Schedule"
                  onChange={(e) => setPaymentSchedule(e.target.value)}
                >
                  <MenuItem value="Monthly">Monthly</MenuItem>
                  <MenuItem value="Quarterly">Quarterly</MenuItem>
                  <MenuItem value="Half Yearly">Half Yearly</MenuItem>
                  <MenuItem value="Yearly">Yearly</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            {billingMethod === "Direct Account Debit" && (
              <Grid item xs={12}>
                <Paper elevation={0} sx={{ p: 3, background: "#f9fafb", border: "1px solid #e0e0e0", borderRadius: 2 }}>
                  <Typography variant="subtitle1" fontWeight={600} sx={{ mb: 2 }}>Account Details</Typography>
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={4}>
                      <TextField
                        label="Bank Name"
                        fullWidth
                        value={accountDetails.bankName}
                        onChange={(e) => setAccountDetails({ ...accountDetails, bankName: e.target.value })}
                      />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                      <TextField
                        label="Account No"
                        fullWidth
                        value={accountDetails.accountNo}
                        onChange={(e) => setAccountDetails({ ...accountDetails, accountNo: e.target.value })}
                      />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                      <TextField
                        label="Account Holder Name"
                        fullWidth
                        value={accountDetails.accountHolder}
                        onChange={(e) => setAccountDetails({ ...accountDetails, accountHolder: e.target.value })}
                      />
                    </Grid>
                  </Grid>
                </Paper>
              </Grid>
            )}
          </Grid>
        </CardContent>
      </Card>

      {/* Payment Schedule Table */}
      <Card sx={{ borderRadius: 3, boxShadow: 4 }}>
        <CardContent>
          <Typography variant="h6" fontWeight={600} sx={{ mb: 2, borderBottom: "2px solid #1976d2", display: "inline-block" }}>
            Payment Schedule
          </Typography>

          <Table>
            <TableHead>
              <TableRow sx={{ backgroundColor: "#f5f5f5" }}>
                <TableCell>Period</TableCell>
                <TableCell>Premium ($)</TableCell>
                <TableCell>Taxes ($)</TableCell>
                <TableCell>Total Cost ($)</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {getScheduleRows().map((row) => (
                <TableRow key={row.period}>
                  <TableCell>{row.period}</TableCell>
                  <TableCell>{row.premium}</TableCell>
                  <TableCell>{row.taxes}</TableCell>
                  <TableCell>{row.total}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          <Box sx={{ bgcolor: "#e8f5e9", p: 2, borderRadius: 2, mt: 3, textAlign: "center" }}>
            <Typography variant="h6">
              Total Amount Payable: <span style={{ color: "#2e7d32", fontWeight: 700 }}>${totalCost.toFixed(2)}</span>
            </Typography>
          </Box>
        </CardContent>
      </Card>

      {/* Bottom Buttons */}
      <Box sx={{ display: "flex", justifyContent: "center", gap: 2, mt: 4 }}>
        <Button variant="outlined" color="primary" startIcon={<ArrowBack />} onClick={() => navigate(-1)}>
          Back
        </Button>
        <Button variant="contained" color="success" startIcon={<PaymentIcon />} onClick={handleConfirmPayment}>
          Confirm Payment
        </Button>
      </Box>
    </Box>
  );
}
