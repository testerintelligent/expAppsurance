import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Typography,
  Button,
  Divider,
  Tooltip,
  Grid,
  Alert,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Snackbar,
} from "@mui/material";
import InfoIcon from "@mui/icons-material/InfoOutlined";
import InfoBar from "../InfoBar";
import { createQuote } from "./quoteAPI";
import { COVERAGE_OPTIONS } from "../../constants/coverages";
import { useWorkflowState } from "../../utils/workflowSession";
import PersonIcon from "@mui/icons-material/Person";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import HomeIcon from "@mui/icons-material/Home";
import BadgeIcon from "@mui/icons-material/Badge";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import ConfirmationNumberIcon from "@mui/icons-material/ConfirmationNumber";
import FingerprintIcon from "@mui/icons-material/Fingerprint";
import MapIcon from "@mui/icons-material/Map";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import SecurityIcon from "@mui/icons-material/Security";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import VerifiedIcon from "@mui/icons-material/Verified";

export default function Quote() {
  const state = useWorkflowState();
  const navigate = useNavigate();
  const contact = state?.contact || {};
  const vehicle = state?.vehicleData || {};
  const coverages = state?.coverages || [];
  const submissionId = state?.submissionId || "";
  const accountNumber = state?.accountNumber || "-";
  const productName = state?.productName || "Auto Insurance";
  const effectiveDate = state?.effectiveDate || "-";
  const expiryDate = state?.expiryDate || "-";
  const pricingData = state?.pricingData || {}; // Premium from pricing API

  const [saveStatus, setSaveStatus] = useState("");
  const [loading, setLoading] = useState(false);
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
  const [errorSnackbar, setErrorSnackbar] = useState({ open: false, message: "" });

  // Premium from API or default
  const basePremium = pricingData?.premium || 1500;
  
  // Calculate selected coverages total
  const selectedCoveragesTotal = COVERAGE_OPTIONS
    .filter((c) => coverages.includes(c.name))
    .reduce((sum, c) => sum + c.premium, 0);

  // Calculate total before tax
  const totalBeforeTax = basePremium + selectedCoveragesTotal;
  
  // Calculate tax (18%)
  const taxAmount = Math.round(totalBeforeTax * 0.18);
  
  // Calculate final total
  const finalTotal = totalBeforeTax + taxAmount;

  const getCoverageTooltip = (name) => {
    const cov = COVERAGE_OPTIONS.find((c) => c.name === name);
    return cov ? cov.description : "Coverage info not available";
  };

  const handleSaveQuote = async () => {
    setSaveStatus("Saving quote...");
    await new Promise((res) => setTimeout(res, 1200));
    const quoteRef =
      "Q" + Math.random().toString(36).substring(2, 9).toUpperCase();
    setSaveStatus(`✅ Quote saved! Reference ID: ${quoteRef}`);
  };

  const handleEdit = () => {
    setConfirmDialogOpen(true);
  };

  const handleConfirmEdit = () => {
    setConfirmDialogOpen(false);
    navigate("/vehicle", { state: { ...state, readOnly: false } });
  };

  const handleCancelEdit = () => {
    setConfirmDialogOpen(false);
  };

  const handlePayment = async () => {
    try {
      setLoading(true);
      const quoteData = {
        submissionId,
        contactId: contact?._id,
        accountId: state?.accountId,
        productSelected: productName,
        premiumAmount: finalTotal,
        basePremium,
        selectedCoveragesTotal,
        taxAmount,
        coverages,
        effectiveDate,
        expiryDate,
        vehicleData: vehicle,
      };

      const response = await createQuote(quoteData);

      navigate("/payment", {
        state: {
          ...state,
          quoteId: response?.quoteId || "",
          quoteNumber: response?.quoteNumber || "",
          totalPremium: finalTotal,
          basePremium,
          selectedCoveragesTotal,
          taxAmount,
          pricingData,
          vehicleData: vehicle,
          contact,
          coverages,
          submissionId,
          accountNumber,
          productName,
          effectiveDate,
          expiryDate,
        },
      });
    } catch (err) {
      console.error("Quote creation error:", err);
      const errorMessage = err?.message || err?.error || "Failed to create quote. Please try again.";
      setErrorSnackbar({ open: true, message: errorMessage });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <InfoBar
        accountNumber={accountNumber}
        product={productName}
        contactName={`${contact.firstName || ""} ${contact.lastName || ""}`.trim()}
        submissionId={submissionId}
        effectiveDate={effectiveDate}
        expiryDate={expiryDate}
      />

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
        <div style={{ fontSize: 16, fontWeight: 700, color: "#2d3e52" }}>Quote Summary</div>
        <div style={{ background: "#edf7ee", border: "1px solid #c3e6cb", borderRadius: 2, padding: "4px 12px", fontSize: 12, color: "#1e5228", fontWeight: 600 }}>
          ✓ Valid for 7 days
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 340px", gap: 14 }}>
        {/* LEFT column */}
        <div>
          {/* Policy Overview */}
          <div style={{ border: "1px solid #d7dbe2", background: "#fff", marginBottom: 14 }}>
            <div style={{ background: "#f3f6f9", padding: "7px 12px", borderBottom: "1px solid #d7dbe2", fontSize: 11, fontWeight: 700, color: "#2e3e4c", textTransform: "uppercase", letterSpacing: 0.5 }}>
              Policy Overview
            </div>
            <div style={{ padding: "10px 14px", display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: 10 }}>
              {[
                { label: "Effective Date", value: effectiveDate },
                { label: "Expiry Date", value: expiryDate },
                { label: "Policy Term", value: "12 Months" },
                { label: "Submission", value: submissionId ? submissionId.substring(0, 15) + (submissionId.length > 15 ? "…" : "") : "-" },
              ].map((item) => (
                <div key={item.label} style={{ borderRight: "1px solid #e3e8ee", paddingRight: 10, paddingLeft: 4 }}>
                  <div style={{ fontSize: 11, color: "#5a6a7a", marginBottom: 3 }}>{item.label}</div>
                  <div style={{ fontSize: 12, fontWeight: 600, color: "#2d3e52" }}>{item.value}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Vehicle Information */}
          <div style={{ border: "1px solid #d7dbe2", background: "#fff", marginBottom: 14 }}>
            <div style={{ background: "#f3f6f9", padding: "7px 12px", borderBottom: "1px solid #d7dbe2", fontSize: 11, fontWeight: 700, color: "#2e3e4c", textTransform: "uppercase", letterSpacing: 0.5 }}>
              Vehicle Information
            </div>
            <div style={{ padding: "10px 14px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
              {[
                { label: "Vehicle", value: `${vehicle.year || ""} ${vehicle.make || ""} ${vehicle.model || ""}`.trim() || "-" },
                { label: "License Plate", value: vehicle.licensePlate || "-" },
                { label: "VIN", value: vehicle.vin || "-" },
                { label: "Registered State", value: vehicle.stateRegistered || "-" },
              ].map((item) => (
                <div key={item.label} style={{ padding: "4px 0", borderBottom: "1px solid #f0f2f5" }}>
                  <div style={{ fontSize: 11, color: "#5a6a7a" }}>{item.label}</div>
                  <div style={{ fontSize: 12, fontWeight: 600, color: "#2d3e52" }}>{item.value}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Driver & Contact */}
          <div style={{ border: "1px solid #d7dbe2", background: "#fff", marginBottom: 14 }}>
            <div style={{ background: "#f3f6f9", padding: "7px 12px", borderBottom: "1px solid #d7dbe2", fontSize: 11, fontWeight: 700, color: "#2e3e4c", textTransform: "uppercase", letterSpacing: 0.5 }}>
              Driver & Contact Details
            </div>
            <div style={{ padding: "10px 14px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
              {[
                { label: "Full Name", value: `${contact.firstName || ""} ${contact.lastName || ""}`.trim() || "-" },
                { label: "License Type", value: contact.licenseType || "-" },
                { label: "Email", value: contact.email || "-" },
                { label: "Phone", value: contact.phone || "-" },
                { label: "Address", value: contact.address || "-" },
              ].map((item) => (
                <div key={item.label} style={{ padding: "4px 0", borderBottom: "1px solid #f0f2f5" }}>
                  <div style={{ fontSize: 11, color: "#5a6a7a" }}>{item.label}</div>
                  <div style={{ fontSize: 12, fontWeight: 600, color: "#2d3e52" }}>{item.value}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Selected Coverages */}
          <div style={{ border: "1px solid #d7dbe2", background: "#fff" }}>
            <div style={{ background: "#f3f6f9", padding: "7px 12px", borderBottom: "1px solid #d7dbe2", fontSize: 11, fontWeight: 700, color: "#2e3e4c", textTransform: "uppercase", letterSpacing: 0.5 }}>
              Selected Coverages
            </div>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 12 }}>
              <thead>
                <tr>
                  <th style={{ padding: "7px 12px", background: "#f6f7f8", borderBottom: "1px solid #d7dbe2", textAlign: "left", fontSize: 11, fontWeight: 700, color: "#31475f" }}>Coverage</th>
                  <th style={{ padding: "7px 12px", background: "#f6f7f8", borderBottom: "1px solid #d7dbe2", textAlign: "right", fontSize: 11, fontWeight: 700, color: "#31475f", width: 100 }}>Premium</th>
                </tr>
              </thead>
              <tbody>
                {coverages.map((cov, idx) => {
                  const coverage = COVERAGE_OPTIONS.find((c) => c.name === cov);
                  return (
                    <tr key={cov} style={{ background: idx % 2 === 0 ? "#f8fafb" : "#fff" }}>
                      <td style={{ padding: "7px 12px", borderBottom: "1px solid #e3e8ee" }}>
                        {cov}
                        {cov === "Third-Party Liability" && (
                          <span style={{ marginLeft: 6, fontSize: 10, color: "#c62828", fontWeight: 600 }}>MANDATORY</span>
                        )}
                      </td>
                      <td style={{ padding: "7px 12px", borderBottom: "1px solid #e3e8ee", textAlign: "right", fontWeight: 600, color: "#2b7a3e" }}>
                        ₹{coverage?.premium.toLocaleString("en-IN")}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* RIGHT column — Premium & Actions */}
        <div>
          {/* Premium Breakdown */}
          <div style={{ border: "1px solid #d7dbe2", background: "#fff", marginBottom: 14 }}>
            <div style={{ background: "#f3f6f9", padding: "7px 12px", borderBottom: "1px solid #d7dbe2", fontSize: 11, fontWeight: 700, color: "#2e3e4c", textTransform: "uppercase", letterSpacing: 0.5 }}>
              Premium Breakdown
            </div>
            <div style={{ padding: "10px 14px" }}>
              {[
                { label: "Base Premium", value: `₹${basePremium.toLocaleString("en-IN")}` },
                { label: "Coverages", value: `₹${selectedCoveragesTotal.toLocaleString("en-IN")}` },
                { label: "Subtotal", value: `₹${totalBeforeTax.toLocaleString("en-IN")}` },
                { label: "Tax (18% GST)", value: `₹${taxAmount.toLocaleString("en-IN")}` },
              ].map((item) => (
                <div key={item.label} style={{ display: "flex", justifyContent: "space-between", padding: "5px 0", borderBottom: "1px solid #f0f2f5", fontSize: 12 }}>
                  <span style={{ color: "#5a6a7a" }}>{item.label}</span>
                  <span style={{ fontWeight: 600, color: "#2d3e52" }}>{item.value}</span>
                </div>
              ))}
              <div style={{ display: "flex", justifyContent: "space-between", padding: "8px 0 4px", borderTop: "2px solid #d7dbe2", marginTop: 4, fontSize: 13 }}>
                <span style={{ fontWeight: 700, color: "#2d3e52" }}>Total Due</span>
                <span style={{ fontWeight: 800, color: "#1f5fa6", fontSize: 15 }}>₹{finalTotal.toLocaleString("en-IN")}</span>
              </div>
            </div>
          </div>

          {/* Action buttons */}
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            <button onClick={handlePayment} disabled={loading || finalTotal === 0}
              style={{ background: loading || finalTotal === 0 ? "#8aa8c8" : "#1f5fa6", color: "#fff", border: "none", borderRadius: 2, padding: "8px 14px", fontSize: 13, fontWeight: 700, cursor: loading || finalTotal === 0 ? "default" : "pointer", width: "100%" }}>
              {loading ? "Processing…" : "Buy Policy Now"}
            </button>
            <button onClick={handleEdit}
              style={{ background: "#f4f6f8", border: "1px solid #c5ccd5", borderRadius: 2, padding: "7px 14px", fontSize: 12, color: "#4e5d6d", cursor: "pointer", width: "100%", fontWeight: 600 }}>
              Edit Details
            </button>
          </div>

          {saveStatus && (
            <div style={{ marginTop: 10, padding: "6px 10px", background: "#edf7ee", border: "1px solid #c3e6cb", borderRadius: 2, fontSize: 12, color: "#1e5228" }}>
              {saveStatus}
            </div>
          )}
        </div>
      </div>

      {/* Edit confirmation dialog */}
      <Dialog open={confirmDialogOpen} onClose={handleCancelEdit} maxWidth="sm" fullWidth>
        <DialogTitle>Confirm Edit Details</DialogTitle>
        <DialogContent>
          <Typography variant="body2" sx={{ mb: 1, fontWeight: 500 }}>⚠️ Are you sure you want to edit your details?</Typography>
          <Typography variant="body2" color="text.secondary">
            Your current quote will be discarded and you'll return to vehicle details. A new quote will be required.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancelEdit} variant="outlined">Cancel</Button>
          <Button onClick={handleConfirmEdit} variant="contained">Yes, Edit Details</Button>
        </DialogActions>
      </Dialog>

      <Snackbar open={errorSnackbar.open} autoHideDuration={6000} onClose={() => setErrorSnackbar({ open: false, message: "" })} anchorOrigin={{ vertical: "top", horizontal: "right" }}>
        <Alert onClose={() => setErrorSnackbar({ open: false, message: "" })} severity="error" sx={{ width: "100%" }}>
          {errorSnackbar.message}
        </Alert>
      </Snackbar>
    </div>
  );
}
