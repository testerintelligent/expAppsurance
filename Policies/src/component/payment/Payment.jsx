import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
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
  Stepper,
  Step,
  StepLabel,
  Dialog,
  DialogTitle,
  DialogActions,
  Button as MuiButton
} from "@mui/material";
import { ArrowBack, Payment as PaymentIcon } from "@mui/icons-material";
import { createPolicy } from "../policy/policyAPI";
import { createInvoice } from "../policy/invoiceApi";
import "./payment.css";
import { COVERAGE_OPTIONS } from "../../constants/coverages";
import { useWorkflowState } from "../../utils/workflowSession";

export default function Payment() {
  const state = useWorkflowState();
  const navigate = useNavigate();
  const [showConfirm, setShowConfirm] = useState(false);

  // --- Extract info from previous screens ---
  const {
    submissionId = "",
    accountId = "",
    accountNumber = "",
    contact = {},
    vehicleData = {},
    coverages = [],
    effectiveDate = "",
    expiryDate = "",
    quoteId = "",
    quoteNumber = "",
    basePremium = 0,
    selectedCoveragesTotal = 0,
    taxAmount = 0,
    totalPremium: totalPremiumFromQuote = 0,
  } = state || {};

  const [billingMethod, setBillingMethod] = useState("Direct Bill");
  const [paymentSchedule, setPaymentSchedule] = useState("Yearly");
  const [accountDetails, setAccountDetails] = useState({
    bankName: "",
    accountNo: "",
    accountHolder: "",
  });

  // Use premium values from Quote screen if available, otherwise calculate
  const base = basePremium || 1500;
  const coverageTotal = selectedCoveragesTotal || 0;
  const totalBeforeTax = base + coverageTotal;
  const totalTax = taxAmount || Math.round(totalBeforeTax * 0.18);
  const totalCost = totalBeforeTax + totalTax;

  const policyHolder = `${contact.firstName || ""} ${contact.lastName || ""}`;

  const getScheduleRows = () => {
    let periods = 1;
    if (paymentSchedule === "Monthly") periods = 12;
    else if (paymentSchedule === "Quarterly") periods = 4;
    else if (paymentSchedule === "Half Yearly") periods = 2;
    const premiumPer = (totalBeforeTax / periods).toFixed(2);
    const taxesPer = (totalTax / periods).toFixed(2);
    const totalPer = (totalCost / periods).toFixed(2);
    return Array.from({ length: periods }, (_, i) => ({
      period: i + 1,
      premium: premiumPer,
      taxes: taxesPer,
      total: totalPer,
    }));
  };

  const handleBindPolicy = async () => {
    try {
      const policyNumber = `POL-${Date.now()}`;
      const paymentRef = `PAY-${Math.floor(Math.random() * 1000000)}`;

      const policyData = {
        submissionId,
        accountId,
        contactId: contact._id ? contact._id : undefined,
        vehicleData,
        quoteId,
        quoteNumber,
        coverages,
        effectiveDate,
        expiryDate,
        totalPremium: totalBeforeTax,
        taxes: totalTax,
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

      const invoiceData = {
        policyNumber: policyData.policyNumber,
        productType: policyData.productType,
        effectiveDate: policyData.effectiveDate,
        expiryDate: policyData.expiryDate,
        totalCost: policyData.totalCost,
        totalPremium: policyData.totalPremium,
        status: "Pending",
      };

      const invoiceCreationData = await createInvoice(invoiceData);
      console.log("invoiceCreationData", invoiceCreationData);

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

  const handleConfirmYes = () => {
    setShowConfirm(false);
    handleBindPolicy();
  };

  const handleConfirmNo = () => {
    setShowConfirm(false);
  };

  return (
    <div>
      {/* Stepper */}
      <Stepper activeStep={1} alternativeLabel sx={{ mb: 3, background: "transparent", border: "none", boxShadow: "none" }}>
        {["Quote", "Payment", "Confirmation"].map((label) => (
          <Step key={label}><StepLabel>{label}</StepLabel></Step>
        ))}
      </Stepper>

      <div style={{ fontSize: 16, fontWeight: 700, color: "#2d3e52", marginBottom: 12 }}>Payment & Billing</div>

      {/* Info bar */}
      <div style={{ border: "1px solid #d7dbe2", background: "#f8fafb", marginBottom: 14, padding: "8px 14px", display: "flex", gap: 32, fontSize: 12, flexWrap: "wrap" }}>
        <span><span style={{ color: "#5a6a7a" }}>Submission: </span><strong>{submissionId}</strong></span>
        <span><span style={{ color: "#5a6a7a" }}>Account: </span><strong>{accountNumber}</strong></span>
        <span><span style={{ color: "#5a6a7a" }}>Policyholder: </span><strong>{policyHolder}</strong></span>
        <span><span style={{ color: "#5a6a7a" }}>Effective: </span><strong>{effectiveDate}</strong></span>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
        {/* Left: Policy Summary */}
        <div style={{ border: "1px solid #d7dbe2", background: "#fff" }}>
          <div style={{ background: "#f3f6f9", padding: "7px 12px", borderBottom: "1px solid #d7dbe2", fontSize: 11, fontWeight: 700, color: "#2e3e4c", textTransform: "uppercase", letterSpacing: 0.5 }}>
            Policy Summary
          </div>
          <div style={{ padding: "10px 14px" }}>
            {[
              { label: "Submission No", value: submissionId },
              { label: "Account No", value: accountNumber },
              { label: "Policyholder", value: policyHolder },
              { label: "Effective Date", value: effectiveDate },
              { label: "Expiry Date", value: expiryDate },
            ].map((row) => (
              <div key={row.label} style={{ display: "flex", justifyContent: "space-between", padding: "5px 0", borderBottom: "1px solid #f0f2f5", fontSize: 12 }}>
                <span style={{ color: "#5a6a7a" }}>{row.label}</span>
                <span style={{ fontWeight: 600, color: "#2d3e52" }}>{row.value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Premium Summary */}
        <div style={{ border: "1px solid #d7dbe2", background: "#fff" }}>
          <div style={{ background: "#f3f6f9", padding: "7px 12px", borderBottom: "1px solid #d7dbe2", fontSize: 11, fontWeight: 700, color: "#2e3e4c", textTransform: "uppercase", letterSpacing: 0.5 }}>
            Premium Summary
          </div>
          <div style={{ padding: "10px 14px" }}>
            {[
              { label: "Base Premium", value: `₹${base.toLocaleString("en-IN")}` },
              { label: "Coverages", value: `₹${coverageTotal.toLocaleString("en-IN")}` },
              { label: "Subtotal", value: `₹${totalBeforeTax.toLocaleString("en-IN")}` },
              { label: "Taxes (18%)", value: `₹${totalTax.toLocaleString("en-IN")}` },
            ].map((row) => (
              <div key={row.label} style={{ display: "flex", justifyContent: "space-between", padding: "5px 0", borderBottom: "1px solid #f0f2f5", fontSize: 12 }}>
                <span style={{ color: "#5a6a7a" }}>{row.label}</span>
                <span style={{ fontWeight: 600, color: "#2d3e52" }}>{row.value}</span>
              </div>
            ))}
            <div style={{ display: "flex", justifyContent: "space-between", padding: "8px 0 4px", borderTop: "2px solid #d7dbe2", marginTop: 4, fontSize: 13 }}>
              <span style={{ fontWeight: 700, color: "#2d3e52" }}>Total Cost</span>
              <span style={{ fontWeight: 800, color: "#2b7a3e", fontSize: 15 }}>₹{totalCost.toLocaleString("en-IN")}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Coverages */}
      <div style={{ border: "1px solid #d7dbe2", background: "#fff", marginTop: 14 }}>
        <div style={{ background: "#f3f6f9", padding: "7px 12px", borderBottom: "1px solid #d7dbe2", fontSize: 11, fontWeight: 700, color: "#2e3e4c", textTransform: "uppercase", letterSpacing: 0.5 }}>
          Selected Coverages
        </div>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 12 }}>
          <thead>
            <tr>
              <th style={{ padding: "7px 12px", background: "#f6f7f8", borderBottom: "1px solid #d7dbe2", textAlign: "left", fontSize: 11, fontWeight: 700, color: "#31475f" }}>Coverage</th>
              <th style={{ padding: "7px 12px", background: "#f6f7f8", borderBottom: "1px solid #d7dbe2", textAlign: "right", fontSize: 11, fontWeight: 700, color: "#31475f", width: 120 }}>Premium</th>
            </tr>
          </thead>
          <tbody>
            {coverages.map((cov, idx) => {
              const coverage = COVERAGE_OPTIONS.find((c) => c.name === cov);
              return (
                <tr key={cov} style={{ background: idx % 2 === 0 ? "#f8fafb" : "#fff" }}>
                  <td style={{ padding: "6px 12px", borderBottom: "1px solid #e3e8ee" }}>{cov}</td>
                  <td style={{ padding: "6px 12px", borderBottom: "1px solid #e3e8ee", textAlign: "right", color: "#2b7a3e", fontWeight: 600 }}>₹{coverage?.premium.toLocaleString("en-IN")}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Billing Preferences */}
      <div style={{ border: "1px solid #d7dbe2", background: "#fff", marginTop: 14 }}>
        <div style={{ background: "#f3f6f9", padding: "7px 12px", borderBottom: "1px solid #d7dbe2", fontSize: 11, fontWeight: 700, color: "#2e3e4c", textTransform: "uppercase", letterSpacing: 0.5 }}>
          Billing Preferences
        </div>
        <div style={{ padding: "12px 14px" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px 20px" }}>
            <FormControl fullWidth size="small">
              <InputLabel>Billing Method</InputLabel>
              <Select value={billingMethod} label="Billing Method" onChange={(e) => setBillingMethod(e.target.value)}>
                <MenuItem value="Direct Bill">Direct Bill</MenuItem>
                <MenuItem value="Direct Account Debit">Direct Account Debit</MenuItem>
              </Select>
            </FormControl>
            <FormControl fullWidth size="small">
              <InputLabel>Payment Schedule</InputLabel>
              <Select value={paymentSchedule} label="Payment Schedule" onChange={(e) => setPaymentSchedule(e.target.value)}>
                <MenuItem value="Monthly">Monthly</MenuItem>
                <MenuItem value="Quarterly">Quarterly</MenuItem>
                <MenuItem value="Half Yearly">Half Yearly</MenuItem>
                <MenuItem value="Yearly">Yearly</MenuItem>
              </Select>
            </FormControl>
          </div>

          {billingMethod === "Direct Account Debit" && (
            <div style={{ marginTop: 14, padding: "10px 14px", border: "1px solid #d7dbe2", background: "#f8fafb" }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: "#2e3e4c", marginBottom: 10, textTransform: "uppercase", letterSpacing: 0.5 }}>Account Details</div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "10px 16px" }}>
                <TextField size="small" label="Bank Name" fullWidth value={accountDetails.bankName}
                  onChange={(e) => setAccountDetails({ ...accountDetails, bankName: e.target.value })} />
                <TextField size="small" label="Account No" fullWidth value={accountDetails.accountNo}
                  onChange={(e) => setAccountDetails({ ...accountDetails, accountNo: e.target.value })} />
                <TextField size="small" label="Account Holder" fullWidth value={accountDetails.accountHolder}
                  onChange={(e) => setAccountDetails({ ...accountDetails, accountHolder: e.target.value })} />
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Payment Schedule Table */}
      <div style={{ border: "1px solid #d7dbe2", background: "#fff", marginTop: 14 }}>
        <div style={{ background: "#f3f6f9", padding: "7px 12px", borderBottom: "1px solid #d7dbe2", fontSize: 11, fontWeight: 700, color: "#2e3e4c", textTransform: "uppercase", letterSpacing: 0.5 }}>
          Payment Schedule
        </div>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 12 }}>
          <thead>
            <tr>
              {["Period", "Premium (₹)", "Taxes (₹)", "Total (₹)"].map((col) => (
                <th key={col} style={{ padding: "7px 12px", background: "#f6f7f8", borderBottom: "1px solid #d7dbe2", borderRight: "1px solid #e3e8ee", textAlign: "left", fontSize: 11, fontWeight: 700, color: "#31475f" }}>
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {getScheduleRows().map((row) => (
              <tr key={row.period} style={{ background: row.period % 2 !== 0 ? "#f8fafb" : "#fff" }}>
                <td style={{ padding: "6px 12px", borderBottom: "1px solid #e3e8ee", borderRight: "1px solid #e3e8ee" }}>{row.period}</td>
                <td style={{ padding: "6px 12px", borderBottom: "1px solid #e3e8ee", borderRight: "1px solid #e3e8ee" }}>{row.premium}</td>
                <td style={{ padding: "6px 12px", borderBottom: "1px solid #e3e8ee", borderRight: "1px solid #e3e8ee" }}>{row.taxes}</td>
                <td style={{ padding: "6px 12px", borderBottom: "1px solid #e3e8ee", borderRight: "1px solid #e3e8ee", fontWeight: 600 }}>{row.total}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div style={{ padding: "8px 14px", borderTop: "2px solid #d7dbe2", background: "#f8fafb", display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: 13 }}>
          <span style={{ color: "#4c5d72" }}>Total Amount Payable</span>
          <strong style={{ color: "#2b7a3e", fontSize: 14 }}>₹{totalCost.toLocaleString("en-IN")}</strong>
        </div>
      </div>

      {/* Bottom Buttons */}
      <div style={{ marginTop: 16, paddingBottom: 16, display: "flex", justifyContent: "flex-end", gap: 8 }}>
        <Button variant="outlined" startIcon={<ArrowBack />} onClick={() => navigate(-1)} size="small">
          Back
        </Button>
        <Button variant="contained" color="success" size="small" onClick={() => setShowConfirm(true)}>
          Bind Policy
        </Button>
      </div>

      <Dialog open={showConfirm} onClose={handleConfirmNo}>
        <DialogTitle>Confirm Policy Issuance</DialogTitle>
        <DialogActions>
          <MuiButton onClick={handleConfirmNo} color="secondary" size="small">No</MuiButton>
          <MuiButton onClick={handleConfirmYes} color="success" variant="contained" size="small">Yes, Issue Policy</MuiButton>
        </DialogActions>
      </Dialog>
    </div>
  );
}
