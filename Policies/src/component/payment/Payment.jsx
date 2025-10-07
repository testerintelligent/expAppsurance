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

export default function Payment() {
  const { state } = useLocation();
  const navigate = useNavigate();

  const [billingMethod, setBillingMethod] = useState("Direct Bill");
  const [paymentSchedule, setPaymentSchedule] = useState("Yearly");
  const [accountDetails, setAccountDetails] = useState({
    bankName: "",
    accountNo: "",
    accountHolder: "",
  });

  // Premium summary
  const totalPremium = state?.overallPremium || 5000;
  const taxes = 500;
  const totalCost = totalPremium + taxes;

  // Policy info
  const policyNumber = state?.policyNumber || "";
  const effectiveDate = state?.effectiveDate || "";
  const accountNumber = state?.accountNumber || "";
  const policyHolder = state?.contact
    ? `${state.contact.firstName} ${state.contact.lastName}`
    : "";

  // Payment schedule calculation
  const getScheduleRows = () => {
    let periods = 1;
    if (paymentSchedule === "Monthly") periods = 12;
    else if (paymentSchedule === "Quarterly") periods = 4;
    else if (paymentSchedule === "Half Yearly") periods = 2;
    else if (paymentSchedule === "Yearly") periods = 1;
    const premiumPer = (totalPremium / periods).toFixed(2);
    const taxesPer = (taxes / periods).toFixed(2);
    const totalPer = (totalCost / periods).toFixed(2);
    return Array.from({ length: periods }, (_, i) => ({
      period: i + 1,
      premium: premiumPer,
      taxes: taxesPer,
      total: totalPer,
    }));
  };

  return (
    <Box sx={{ maxWidth: 1100, mx: "auto", mt: 4, mb: 8 }}>
      {/* Stepper - progress indicator */}
      <Stepper activeStep={1} alternativeLabel sx={{ mb: 4 }}>
        {["Quote", "Payment", "Confirmation"].map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>

      {/* Header */}
      <Typography
        variant="h4"
        fontWeight={700}
        align="center"
        sx={{
          mb: 4,
          color: "primary.main",
          letterSpacing: 0.5,
        }}
      >
        Payment Details
      </Typography>

      {/* Top Summary Section */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} md={6}>
          <Card sx={{ borderRadius: 3, boxShadow: 4, height: "100%" }}>
            <CardContent>
              <Typography
                variant="h6"
                fontWeight={600}
                sx={{
                  borderBottom: "2px solid #1976d2",
                  display: "inline-block",
                  mb: 2,
                  pb: 0.5,
                }}
              >
                Policy Information
              </Typography>
              <Box sx={{ display: "flex", flexDirection: "column", gap: 1.2 }}>
                <Typography><b>Policy No.:</b> {policyNumber || "-"}</Typography>
                <Typography><b>Effective Date:</b> {effectiveDate || "-"}</Typography>
                <Typography><b>Account No.:</b> {accountNumber || "-"}</Typography>
                <Typography><b>Policyholder:</b> {policyHolder || "-"}</Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Card sx={{ borderRadius: 3, boxShadow: 4, height: "100%" }}>
            <CardContent>
              <Typography
                variant="h6"
                fontWeight={600}
                sx={{
                  borderBottom: "2px solid #2e7d32",
                  display: "inline-block",
                  mb: 2,
                  pb: 0.5,
                }}
              >
                Premium Summary
              </Typography>
              <Box sx={{ display: "flex", flexDirection: "column", gap: 1.2 }}>
                <Typography><b>Total Premium:</b> ${totalPremium}</Typography>
                <Typography><b>Taxes:</b> ${taxes}</Typography>
                <Typography>
                  <b>Total Cost:</b>{" "}
                  <span style={{ color: "#2e7d32", fontWeight: 700 }}>
                    ${totalCost}
                  </span>
                </Typography>
              </Box>
              <Box sx={{ mt: 2 }}>
                <Chip
                  label="Ready for Payment"
                  color="success"
                  variant="outlined"
                />
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Billing Section */}
      <Card sx={{ mb: 4, borderRadius: 3, boxShadow: 4 }}>
        <CardContent>
          <Typography
            variant="h6"
            fontWeight={600}
            sx={{
              borderBottom: "2px solid #1976d2",
              display: "inline-block",
              mb: 3,
              pb: 0.5,
            }}
          >
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
                  <MenuItem value="Direct Account Debit">
                    Direct Account Debit
                  </MenuItem>
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
                <Paper
                  elevation={0}
                  sx={{
                    p: 3,
                    background: "#f9fafb",
                    border: "1px solid #e0e0e0",
                    borderRadius: 2,
                    mt: 2,
                  }}
                >
                  <Typography variant="subtitle1" fontWeight={600} sx={{ mb: 2 }}>
                    Account Details
                  </Typography>
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={4}>
                      <TextField
                        label="Bank Name"
                        fullWidth
                        value={accountDetails.bankName}
                        onChange={(e) =>
                          setAccountDetails({
                            ...accountDetails,
                            bankName: e.target.value,
                          })
                        }
                      />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                      <TextField
                        label="Account No"
                        fullWidth
                        value={accountDetails.accountNo}
                        onChange={(e) =>
                          setAccountDetails({
                            ...accountDetails,
                            accountNo: e.target.value,
                          })
                        }
                      />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                      <TextField
                        label="Account Holder Name"
                        fullWidth
                        value={accountDetails.accountHolder}
                        onChange={(e) =>
                          setAccountDetails({
                            ...accountDetails,
                            accountHolder: e.target.value,
                          })
                        }
                      />
                    </Grid>
                  </Grid>
                </Paper>
              </Grid>
            )}
          </Grid>
        </CardContent>
      </Card>

      {/* Payment Schedule Section */}
      <Card sx={{ borderRadius: 3, boxShadow: 4 }}>
        <CardContent>
          <Typography
            variant="h6"
            fontWeight={600}
            sx={{
              borderBottom: "2px solid #1976d2",
              display: "inline-block",
              mb: 2,
              pb: 0.5,
            }}
          >
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

          {/* Summary box */}
          <Box
            sx={{
              bgcolor: "#e8f5e9",
              p: 2,
              borderRadius: 2,
              mt: 3,
              textAlign: "center",
            }}
          >
            <Typography variant="h6">
              Total Amount Payable:{" "}
              <span style={{ color: "#2e7d32", fontWeight: 700 }}>
                ${totalCost}
              </span>
            </Typography>
          </Box>
        </CardContent>
      </Card>

      {/* Bottom Buttons */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          gap: 2,
          mt: 4,
        }}
      >
        <Button
          variant="outlined"
          color="primary"
          startIcon={<ArrowBack />}
          onClick={() => navigate(-1)}
        >
          Back
        </Button>
        <Button
          variant="contained"
          color="success"
          startIcon={<PaymentIcon />}
          onClick={() =>
            navigate("/policy-issuance", {
              state: {
                ...state,
                billingMethod,
                paymentSchedule,
                accountDetails,
              },
            })
          }
        >
          Confirm Payment
        </Button>
      </Box>
    </Box>
  );
}
