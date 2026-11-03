// PolicyIssuance.jsx
import React, { useEffect } from "react";
import {
  Box,
  Grid,
  Typography,
  Paper,
  Button,
  Divider,
  Alert,
} from "@mui/material";
import {
  CheckCircle,
  FileDownload,
  ArrowBack,
  Home as HomeIcon,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { COVERAGE_OPTIONS } from "../../constants/coverages";
import { useWorkflowState, clearWorkflowState } from "../../utils/workflowSession";

export default function PolicyIssuance() {
  const state = useWorkflowState();
  const navigate = useNavigate();

  // --- Prevent back navigation after policy issuance ---
  useEffect(() => {
    // Block browser back button
    const handlePopState = (event) => {
      event.preventDefault();
      navigate("/", { replace: true });
    };

    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, [navigate]);

  // --- Extract info ---
  const policy = state?.policy || {};
  const submissionId = policy.submissionId || state?.submissionId || "-";
  const accountNumber = policy.accountId || state?.accountNumber || "-";
  const contact = state?.contact || {};
  const policyHolder = contact.firstName
    ? `${contact.firstName} ${contact.lastName}`
    : "-";
  const policyNumber = policy.policyNumber || "N/A";
  const effectiveDate = policy.effectiveDate || state?.effectiveDate || "N/A";
  const expiryDate = policy.expiryDate || state?.expiryDate || "N/A";
  const coverages = policy.coverages || state?.coverages || [];

  // ----------- PREMIUM CALCULATION (from Quote screen data) -------------
  // Use premium values from state (passed from Quote/Payment) if available
  const basePremium = policy.basePremium || state?.basePremium || state?.totalPremium || 1500;
  const selectedCoveragesTotal = policy.selectedCoveragesTotal || state?.selectedCoveragesTotal || 0;
  const totalBeforeTax = basePremium + selectedCoveragesTotal;
  const totalTax = policy.taxAmount || state?.taxAmount || state?.taxes || Math.round(totalBeforeTax * 0.18);
  const totalCost = policy.totalCost || state?.totalCost || (totalBeforeTax + totalTax);

  const paymentSchedule =
    policy.paymentSchedule || state?.paymentSchedule || "Yearly";
  const billingMethod = policy.billingMethod || state?.billingMethod || "Direct Bill";
  const paymentRef =
    policy.paymentRef ||
    state?.paymentRef ||
    `PAY-${Math.floor(Math.random() * 1000000)}`;

  // --- Fallback if no data ---
  if (!policy && !state) {
    return (
      <Box sx={{ p: 4 }}>
        <Alert severity="error" sx={{ mb: 2 }}>
          Policy details not found. Please complete payment first.
        </Alert>
        <Button
          variant="contained"
          onClick={() => navigate("/payment", { state })}
        >
          Go Back to Payment
        </Button>
      </Box>
    );
  }

  // Reusable info row
  const InfoRow = ({ label, value }) => (
    <div style={{ display: "flex", justifyContent: "space-between", padding: "5px 0", borderBottom: "1px solid #f0f2f5", fontSize: 12 }}>
      <span style={{ color: "#5a6a7a" }}>{label}</span>
      <span style={{ fontWeight: 600, color: "#2d3e52" }}>{value}</span>
    </div>
  );

  return (
    <div>
      {/* Success alert */}
      <div style={{ border: "1px solid #c3e6cb", background: "#edf7ee", borderRadius: 2, padding: "8px 14px", marginBottom: 14, display: "flex", alignItems: "center", gap: 8, fontSize: 12, color: "#1e5228", fontWeight: 600 }}>
        <CheckCircle style={{ fontSize: 16, color: "#2b7a3e" }} />
        Policy Issued Successfully — confirmation sent to registered email.
      </div>

      <div style={{ fontSize: 16, fontWeight: 700, color: "#2d3e52", marginBottom: 12 }}>Policy Issuance Confirmation</div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
        {/* Policy Details */}
        <div style={{ border: "1px solid #d7dbe2", background: "#fff" }}>
          <div style={{ background: "#f3f6f9", padding: "7px 12px", borderBottom: "1px solid #d7dbe2", fontSize: 11, fontWeight: 700, color: "#2e3e4c", textTransform: "uppercase", letterSpacing: 0.5 }}>
            Policy Details
          </div>
          <div style={{ padding: "10px 14px" }}>
            <InfoRow label="Policy Number" value={policyNumber} />
            <InfoRow label="Submission ID" value={submissionId} />
            <InfoRow label="Account Number" value={accountNumber} />
            <InfoRow label="Policyholder" value={policyHolder} />
            <InfoRow label="Effective Date" value={effectiveDate} />
            <InfoRow label="Expiry Date" value={expiryDate} />
            <InfoRow label="Payment Schedule" value={paymentSchedule} />
            <InfoRow label="Billing Method" value={billingMethod} />
            <InfoRow label="Payment Ref" value={paymentRef} />
          </div>
        </div>

        {/* Premium Summary */}
        <div style={{ border: "1px solid #d7dbe2", background: "#fff" }}>
          <div style={{ background: "#f3f6f9", padding: "7px 12px", borderBottom: "1px solid #d7dbe2", fontSize: 11, fontWeight: 700, color: "#2e3e4c", textTransform: "uppercase", letterSpacing: 0.5 }}>
            Premium Summary
          </div>
          <div style={{ padding: "10px 14px" }}>
            <InfoRow label="Base Premium" value={`₹ ${basePremium.toLocaleString("en-IN")}`} />
            <InfoRow label="Coverages" value={`₹ ${selectedCoveragesTotal.toLocaleString("en-IN")}`} />
            <InfoRow label="Subtotal" value={`₹ ${totalBeforeTax.toLocaleString("en-IN")}`} />
            <InfoRow label="Taxes (18%)" value={`₹ ${totalTax.toLocaleString("en-IN")}`} />
            <div style={{ borderTop: "2px solid #d7dbe2", marginTop: 6, paddingTop: 8, display: "flex", justifyContent: "space-between", fontSize: 13 }}>
              <span style={{ fontWeight: 700, color: "#2d3e52" }}>Total Amount Payable</span>
              <span style={{ fontWeight: 800, color: "#2b7a3e", fontSize: 15 }}>₹ {totalCost.toLocaleString("en-IN")}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Coverages */}
      <div style={{ border: "1px solid #d7dbe2", background: "#fff", marginTop: 14 }}>
        <div style={{ background: "#f3f6f9", padding: "7px 12px", borderBottom: "1px solid #d7dbe2", fontSize: 11, fontWeight: 700, color: "#2e3e4c", textTransform: "uppercase", letterSpacing: 0.5 }}>
          Coverages Included
        </div>
        {coverages.length > 0 ? (
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
                  <tr key={idx} style={{ background: idx % 2 === 0 ? "#f8fafb" : "#fff" }}>
                    <td style={{ padding: "6px 12px", borderBottom: "1px solid #e3e8ee" }}>{cov}</td>
                    <td style={{ padding: "6px 12px", borderBottom: "1px solid #e3e8ee", textAlign: "right", fontWeight: 600, color: "#2b7a3e" }}>₹{coverage?.premium.toLocaleString("en-IN")}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        ) : (
          <div style={{ padding: "10px 14px", fontSize: 12, color: "#4c5d72" }}>No coverages selected</div>
        )}
      </div>

      {/* Actions */}
      <div style={{ marginTop: 16, paddingBottom: 16, display: "flex", justifyContent: "flex-end" }}>
        <Button variant="contained" color="success" startIcon={<HomeIcon />} onClick={() => { clearWorkflowState(); navigate("/", { replace: true }); }} size="small" sx={{ textTransform: "none" }}>
          Confirm & Close
        </Button>
      </div>
    </div>
  );
}
