import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Box,
  Typography,
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
import "./payment.css";

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
  <Box sx={{ maxWidth: 1250, mx: "auto", py: 4 }}>

    {/* STEP PROGRESS */}
    <Stepper activeStep={1} alternativeLabel sx={{ mb: 4 }}>
      {["Quote", "Payment", "Confirmation"].map((label) => (
        <Step key={label}><StepLabel>{label}</StepLabel></Step>
      ))}
    </Stepper>

    {/* TOP INFO BAR */}
    <Paper
      elevation={0}
      sx={{
        p: 2,
        mb: 4,
        display: "flex",
        justifyContent: "space-between",
        background: "#eaf4ff",
        borderRadius: 2,
        border: "1px solid #d0e4ff",
        fontSize: "14px",
      }}
    >
      <Typography><b>Submission:</b> {submissionId}</Typography>
      <Typography><b>Account:</b> {accountNumber}</Typography>
      <Typography><b>Policyholder:</b> {policyHolder}</Typography>
      <Typography><b>Effective Date:</b> {effectiveDate}</Typography>
    </Paper>

    {/* ===========================================================
        1. POLICY & PREMIUM SUMMARY PANEL
    ============================================================ */}
    <Box
  sx={{
    width: "100%",
    p: 4,
    borderRadius: 4,
    background: "rgba(255,255,255,0.75)",
    backdropFilter: "blur(10px)",
    border: "1px solid #e0e0e0",
    mb: 4,
  }}
>
  <Box
    sx={{
      display: "grid",
      gridTemplateColumns: {
        xs: "1fr",              // Mobile - stacked
        md: "1fr auto 1fr",     // Desktop - divider layout
      },
      columnGap: 6,
      rowGap: 4,
      alignItems: "start",
    }}
  >
    {/* LEFT SECTION – POLICY SUMMARY */}
    <Box>
      <Typography
        variant="h6"
        sx={{
          mb: 3,
          fontWeight: 700,
          color: "#1565c0",
          letterSpacing: 0.4,
        }}
      >
        Policy Summary
      </Typography>

      <Box className="summary-row">
        <span>Submission No</span><strong>{submissionId}</strong>
      </Box>
      <Box className="summary-row">
        <span>Account No</span><strong>{accountNumber}</strong>
      </Box>
      <Box className="summary-row">
        <span>Policyholder</span><strong>{policyHolder}</strong>
      </Box>
      <Box className="summary-row">
        <span>Effective Date</span><strong>{effectiveDate}</strong>
      </Box>
      <Box className="summary-row">
        <span>Expiry Date</span><strong>{expiryDate}</strong>
      </Box>
    </Box>

    {/* VERTICAL DIVIDER (HIDDEN ON MOBILE) */}
    <Box
      sx={{
        width: "1px",
        height: "100%",
        backgroundColor: "#d0d0d0",
        display: { xs: "none", md: "block" },
      }}
    />

    {/* RIGHT SECTION – PREMIUM SUMMARY */}
    <Box>
      <Typography
        variant="h6"
        sx={{
          mb: 3,
          fontWeight: 700,
          color: "#2e7d32",
          letterSpacing: 0.4,
        }}
      >
        Premium Summary
      </Typography>

      <Box className="summary-row">
        <span>Total Premium</span><strong>${overallPremium}</strong>
      </Box>
      <Box className="summary-row">
        <span>Taxes</span><strong>${taxes.toFixed(2)}</strong>
      </Box>
      <Box className="summary-row">
        <span>Total Cost</span><strong>${totalCost.toFixed(2)}</strong>
      </Box>

      <Chip
        label="Ready for Payment"
        color="success"
        variant="outlined"
        sx={{
          mt: 3,
          fontWeight: 600,
          px: 2,
        }}
      />
    </Box>
  </Box>
</Box>

    {/* ===========================================================
        2. BILLING PREFERENCES SECTION
    ============================================================ */}
    <Box
      sx={{
        borderRadius: 4,
        p: 4,
        mb: 4,
        background: "#ffffff",
        border: "1px solid #e0e0e0",
      }}
    >
      <Typography
        variant="h6"
        fontWeight={700}
        sx={{
          mb: 3,
          borderLeft: "4px solid #1565c0",
          pl: 1.5,
        }}
      >
        Billing Preferences
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
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

        <Grid item xs={12} md={6}>
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
            <Paper
              elevation={0}
              sx={{
                p: 3,
                mt: 2,
                background: "#fafbfd",
                border: "1px solid #dfe6ee",
                borderRadius: 2,
              }}
            >
              <Typography variant="subtitle1" fontWeight={600} sx={{ mb: 2 }}>
                Account Details
              </Typography>

              <Grid container spacing={3}>
                <Grid item xs={12} md={4}>
                  <TextField
                    label="Bank Name"
                    fullWidth
                    value={accountDetails.bankName}
                    onChange={(e) => setAccountDetails({ ...accountDetails, bankName: e.target.value })}
                  />
                </Grid>

                <Grid item xs={12} md={4}>
                  <TextField
                    label="Account No"
                    fullWidth
                    value={accountDetails.accountNo}
                    onChange={(e) => setAccountDetails({ ...accountDetails, accountNo: e.target.value })}
                  />
                </Grid>

                <Grid item xs={12} md={4}>
                  <TextField
                    label="Account Holder"
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
    </Box>

    {/* ===========================================================
        3. PAYMENT SCHEDULE TABLE
    ============================================================ */}
    <Box
      sx={{
        borderRadius: 4,
        p: 4,
        background: "#ffffff",
        border: "1px solid #e0e0e0",
      }}
    >
      <Typography
        variant="h6"
        fontWeight={700}
        sx={{
          mb: 2,
          borderLeft: "4px solid #2e7d32",
          pl: 1.5,
        }}
      >
        Payment Schedule
      </Typography>

      <Table>
        <TableHead>
          <TableRow sx={{ background: "#f5f5f5" }}>
            <TableCell>Period</TableCell>
            <TableCell>Premium ($)</TableCell>
            <TableCell>Taxes ($)</TableCell>
            <TableCell>Total ($)</TableCell>
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

      <Box
        sx={{
          mt: 3,
          p: 2,
          textAlign: "center",
          background: "#e8f5e9",
          borderRadius: 2,
        }}
      >
        <Typography variant="h6">
          Total Amount Payable:{" "}
          <strong style={{ color: "#2e7d32" }}>${totalCost.toFixed(2)}</strong>
        </Typography>
      </Box>
    </Box>

    {/* BOTTOM BUTTONS */}
    <Box sx={{ mt: 5, display: "flex", justifyContent: "center", gap: 2 }}>
      <Button variant="outlined" startIcon={<ArrowBack />} onClick={() => navigate(-1)}>
        Back
      </Button>
      <Button
        variant="contained"
        color="success"
        startIcon={<PaymentIcon />}
        onClick={handleConfirmPayment}
      >
        Confirm Payment
      </Button>
    </Box>
  </Box>
);

}
