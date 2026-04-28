import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Box,
  Typography,
  Paper,
  Button,
  Divider,
  Stack,
  Chip,
  Tooltip,
  Grid,
  Card,
  CardContent,
  CardHeader,
  Alert,
  Container,
  Paper as MuiPaper,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Snackbar,
} from "@mui/material";
import InfoIcon from "@mui/icons-material/InfoOutlined";
import InfoBar from "../InfoBar";
import { createQuote } from "./quoteAPI";
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
  const { state } = useLocation();
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

  const coverageOptions = [
    {
      name: "Third-Party Liability",
      description:
        "Covers damages or injuries caused to a third party by your vehicle. Mandatory by law.",
      premium: 120,
    },
    {
      name: "Own Damage",
      description:
        "Covers repair or replacement costs for damage to your own vehicle.",
      premium: 250,
    },
    {
      name: "Comprehensive",
      description:
        "Provides combined protection including third-party liability and own damage.",
      premium: 400,
    },
    {
      name: "Personal Accident Cover",
      description:
        "Covers medical expenses or compensation in case of injury or death of the driver.",
      premium: 80,
    },
    {
      name: "Zero Depreciation",
      description:
        "Allows full claim without deducting depreciation on replaced parts.",
      premium: 150,
    },
    {
      name: "Vehicle theft",
      description:
        "Provides coverage if your vehicle is stolen or declared a total loss.",
      premium: 110,
    },
  ];

  // Premium from API or default
  const basePremium = pricingData?.premium || 1500;
  
  // Calculate selected coverages total
  const selectedCoveragesTotal = coverageOptions
    .filter((c) => coverages.includes(c.name))
    .reduce((sum, c) => sum + c.premium, 0);

  // Calculate total before tax
  const totalBeforeTax = basePremium + selectedCoveragesTotal;
  
  // Calculate tax (18%)
  const taxAmount = Math.round(totalBeforeTax * 0.18);
  
  // Calculate final total
  const finalTotal = totalBeforeTax + taxAmount;

  const getCoverageTooltip = (name) => {
    const cov = coverageOptions.find((c) => c.name === name);
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
    <Container maxWidth="xl" sx={{ background: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)", minHeight: "100vh", py: 4 }}>
      {/* Header */}
      <InfoBar
        accountNumber={accountNumber}
        product={productName}
        contactName={`${contact.firstName || ""} ${contact.lastName || ""}`.trim()}
        submissionId={submissionId}
        effectiveDate={effectiveDate}
        expiryDate={expiryDate}
      />

      {/* Title Section */}
      <Stack spacing={1} sx={{ textAlign: "center", mb: 4, mt: 2 }}>
        <Typography variant="h3" fontWeight={800} sx={{ color: "#1976d2" }}>
          Your Quote is Ready ✓
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ fontSize: 16 }}>
          Review your personalized insurance quote below
        </Typography>
      </Stack>

      {/* Success Alert */}
      <Alert severity="success" sx={{ mb: 3, borderRadius: 2 }}>
        <Typography fontWeight={600}>
          🎉 Your quote is valid for 7 days. Complete your purchase to lock in this price.
        </Typography>
      </Alert>

      <Grid container spacing={3}>
        {/* Left Column - Details */}
        <Grid item xs={12} lg={8}>
          <Stack spacing={3}>
            {/* Policy Overview Card */}
            <Card sx={{ borderRadius: 3, boxShadow: 4, overflow: "hidden" }}>
              <CardHeader
                title="📋 Policy Overview"
                titleTypographyProps={{ variant: "h6", fontWeight: 700 }}
                sx={{ background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)", color: "white", p: 3 }}
              />
              <CardContent sx={{ p: 3 }}>
                <Grid container spacing={2}>
                  {[
                    { label: "Effective Date", value: effectiveDate },
                    { label: "Expiry Date", value: expiryDate },
                    { label: "Policy Term", value: "12 Months" },
                    { label: "Submission", value: submissionId },
                  ].map((item) => (
                    <Grid item xs={6} sm={3} key={item.label}>
                      <Stack spacing={0.5} sx={{ textAlign: "center" }}>
                        <Typography variant="body2" color="text.secondary">
                          {item.label}
                        </Typography>
                        <Typography variant="h6" fontWeight={700}>
                          {item.value}
                        </Typography>
                      </Stack>
                    </Grid>
                  ))}
                </Grid>
              </CardContent>
            </Card>

            {/* Vehicle Information Card */}
            <Card sx={{ borderRadius: 3, boxShadow: 3, overflow: "hidden" }}>
              <CardHeader
                avatar={<DirectionsCarIcon sx={{ fontSize: 28, color: "white" }} />}
                title="Vehicle Information"
                titleTypographyProps={{ variant: "h6", fontWeight: 700 }}
                sx={{ background: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)", color: "white", p: 2.5 }}
              />
              <CardContent sx={{ p: 3 }}>
                <Grid container spacing={2}>
                  {[
                    { icon: DirectionsCarIcon, label: "Vehicle Model", value: `${vehicle.year} ${vehicle.make} ${vehicle.model}` },
                    { icon: ConfirmationNumberIcon, label: "License Plate", value: vehicle.licensePlate },
                    { icon: FingerprintIcon, label: "VIN", value: vehicle.vin },
                    { icon: MapIcon, label: "Registered State", value: vehicle.stateRegistered },
                  ].map((item) => (
                    <Grid item xs={12} sm={6} key={item.label}>
                      <Stack direction="row" spacing={2}>
                        <item.icon color="primary" sx={{ mt: 0.5, flexShrink: 0 }} />
                        <Stack spacing={0.3}>
                          <Typography variant="body2" color="text.secondary">
                            {item.label}
                          </Typography>
                          <Typography variant="body1" fontWeight={600}>
                            {item.value}
                          </Typography>
                        </Stack>
                      </Stack>
                    </Grid>
                  ))}
                </Grid>
              </CardContent>
            </Card>

            {/* Driver & Contact Information Card */}
            <Card sx={{ borderRadius: 3, boxShadow: 3, overflow: "hidden" }}>
              <CardHeader
                avatar={<PersonIcon sx={{ fontSize: 28, color: "white" }} />}
                title="Driver & Contact Details"
                titleTypographyProps={{ variant: "h6", fontWeight: 700 }}
                sx={{ background: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)", color: "white", p: 2.5 }}
              />
              <CardContent sx={{ p: 3 }}>
                <Grid container spacing={2}>
                  {[
                    { icon: PersonIcon, label: "Full Name", value: `${contact.firstName} ${contact.lastName}`, isChip: false },
                    { icon: BadgeIcon, label: "License Type", value: contact.licenseType, isChip: true },
                    { icon: EmailIcon, label: "Email", value: contact.email, isChip: false },
                    { icon: PhoneIcon, label: "Phone", value: contact.phone, isChip: false },
                  ].map((item) => (
                    <Grid item xs={12} sm={6} key={item.label}>
                      <Stack direction="row" spacing={2}>
                        <item.icon color="primary" sx={{ mt: 0.5, flexShrink: 0 }} />
                        <Stack spacing={0.3} sx={{ flex: 1 }}>
                          <Typography variant="body2" color="text.secondary">
                            {item.label}
                          </Typography>
                          {item.isChip ? (
                            <Chip label={item.value} color="primary" variant="outlined" size="small" />
                          ) : (
                            <Typography variant="body1" fontWeight={600}>
                              {item.value}
                            </Typography>
                          )}
                        </Stack>
                      </Stack>
                    </Grid>
                  ))}
                  <Grid item xs={12}>
                    <Stack direction="row" spacing={2}>
                      <HomeIcon color="primary" sx={{ mt: 0.5, flexShrink: 0 }} />
                      <Stack spacing={0.3} sx={{ flex: 1 }}>
                        <Typography variant="body2" color="text.secondary">
                          Address
                        </Typography>
                        <Typography variant="body1" fontWeight={600}>
                          {contact.address}
                        </Typography>
                      </Stack>
                    </Stack>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>

            {/* Coverages Selected Card */}
            <Card sx={{ borderRadius: 3, boxShadow: 3, overflow: "hidden" }}>
              <CardHeader
                avatar={<CheckCircleIcon sx={{ fontSize: 28, color: "white" }} />}
                title="Selected Coverages"
                titleTypographyProps={{ variant: "h6", fontWeight: 700 }}
                sx={{ background: "linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)", color: "white", p: 2.5 }}
              />
              <CardContent sx={{ p: 3 }}>
                <Stack spacing={1.5}>
                  {coverages.map((cov) => {
                    const coverage = coverageOptions.find((c) => c.name === cov);
                    return (
                      <Paper
                        key={cov}
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          p: 1.5,
                          borderRadius: 1.5,
                          backgroundColor: "#f0f9f7",
                          border: "1px solid #e0f2f1",
                        }}
                      >
                        <Stack direction="row" spacing={1} sx={{ alignItems: "center", flex: 1 }}>
                          <VerifiedIcon sx={{ color: "#43e97b", fontSize: 20, flexShrink: 0 }} />
                          <Stack spacing={0.3}>
                            <Typography fontWeight={600} sx={{ fontSize: 14 }}>
                              {cov}
                            </Typography>
                            {cov === "Third-Party Liability" && (
                              <Typography variant="caption" color="error">
                                ⚠ MANDATORY
                              </Typography>
                            )}
                          </Stack>
                        </Stack>
                        <Typography fontWeight={700} color="primary" sx={{ fontSize: 15 }}>
                          ₹{coverage?.premium.toLocaleString("en-IN")}
                        </Typography>
                      </Paper>
                    );
                  })}
                </Stack>
              </CardContent>
            </Card>
          </Stack>
        </Grid>

        {/* Right Column - Premium Breakdown & CTA */}
        <Grid item xs={12} lg={4}>
          <Stack spacing={3}>
            {/* Premium Breakdown Card */}
            <Card sx={{ borderRadius: 3, boxShadow: 4, overflow: "hidden" }}>
              <CardHeader
                avatar={<LocalOfferIcon sx={{ fontSize: 28, color: "white" }} />}
                title="Premium Breakdown"
                titleTypographyProps={{ variant: "h6", fontWeight: 700 }}
                sx={{ background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)", color: "white", p: 2.5 }}
              />
              <CardContent sx={{ p: 3 }}>
                <Stack spacing={2}>
                  <Stack direction="row" justifyContent="space-between" sx={{ pb: 1 }}>
                    <Typography fontWeight={500} color="text.secondary">
                      Base Premium
                    </Typography>
                    <Typography fontWeight={700}>₹{basePremium.toLocaleString("en-IN")}</Typography>
                  </Stack>

                  <Stack direction="row" justifyContent="space-between" sx={{ pb: 1 }}>
                    <Typography fontWeight={500} color="text.secondary">
                      Coverages
                    </Typography>
                    <Typography fontWeight={700}>₹{selectedCoveragesTotal.toLocaleString("en-IN")}</Typography>
                  </Stack>

                  <Divider />

                  <Stack direction="row" justifyContent="space-between" sx={{ py: 1 }}>
                    <Typography fontWeight={600}>Subtotal</Typography>
                    <Typography fontWeight={700}>₹{totalBeforeTax.toLocaleString("en-IN")}</Typography>
                  </Stack>

                  <Stack direction="row" justifyContent="space-between" sx={{ py: 1 }}>
                    <Typography fontWeight={500} color="text.secondary">
                      Tax (18% GST)
                    </Typography>
                    <Typography fontWeight={700}>₹{taxAmount.toLocaleString("en-IN")}</Typography>
                  </Stack>

                  <Divider sx={{ borderWidth: 2 }} />

                  <Paper
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      py: 2,
                      px: 1.5,
                      backgroundColor: "#f0f7ff",
                      borderRadius: 1,
                      border: "2px solid #667eea",
                    }}
                  >
                    <Typography variant="h6" fontWeight={700}>
                      Total Due
                    </Typography>
                    <Typography variant="h5" fontWeight={800} color="primary">
                      ₹{finalTotal.toLocaleString("en-IN")}
                    </Typography>
                  </Paper>
                </Stack>
              </CardContent>
            </Card>

            {/* Action Buttons */}
            <Stack spacing={2}>
              <Button
                variant="contained"
                size="large"
                fullWidth
                onClick={handlePayment}
                disabled={loading || finalTotal === 0}
                sx={{
                  py: 1.8,
                  background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                  fontSize: 16,
                  fontWeight: 700,
                }}
              >
                {loading ? "Processing..." : "Buy Policy Now"}
              </Button>
              <Button
                variant="outlined"
                size="large"
                fullWidth
                onClick={handleEdit}
                sx={{ py: 1.5, fontSize: 14, fontWeight: 600 }}
              >
                Edit Details
              </Button>
            </Stack>
          </Stack>
        </Grid>
      </Grid>

      {/* Confirmation Dialog for Edit Details */}
      <Dialog
        open={confirmDialogOpen}
        onClose={handleCancelEdit}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          sx: { borderRadius: 2, boxShadow: 6 },
        }}
      >
        <DialogTitle
          sx={{
            fontSize: 18,
            fontWeight: 700,
            background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
            color: "white",
            pb: 2,
          }}
        >
          Confirm Edit Details
        </DialogTitle>
        <DialogContent sx={{ pt: 3 }}>
          <Typography variant="body1" sx={{ mb: 2, fontWeight: 500 }}>
            ⚠️ Are you sure you want to edit your details?
          </Typography>
          <Typography variant="body2" color="text.secondary">
            If you proceed, your current quote will be discarded and you'll be taken back to the vehicle details screen. You'll need to generate a new quote after making changes.
          </Typography>
        </DialogContent>
        <DialogActions sx={{ p: 2.5, gap: 1.5 }}>
          <Button
            onClick={handleCancelEdit}
            variant="outlined"
            sx={{ fontWeight: 600 }}
          >
            Cancel
          </Button>
          <Button
            onClick={handleConfirmEdit}
            variant="contained"
            sx={{
              background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
              fontWeight: 600,
            }}
          >
            Yes, Edit Details
          </Button>
        </DialogActions>
      </Dialog>

      {/* Error Snackbar */}
      <Snackbar
        open={errorSnackbar.open}
        autoHideDuration={6000}
        onClose={() => setErrorSnackbar({ open: false, message: "" })}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert
          onClose={() => setErrorSnackbar({ open: false, message: "" })}
          severity="error"
          sx={{ width: "100%" }}
        >
          {errorSnackbar.message}
        </Alert>
      </Snackbar>
    </Container>
  );
}
