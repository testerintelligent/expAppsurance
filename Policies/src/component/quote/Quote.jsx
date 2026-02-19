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

  const [saveStatus, setSaveStatus] = useState("");
  const [loading, setLoading] = useState(false);

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

  const totalPremium = coverageOptions
    .filter((c) => coverages.includes(c.name))
    .reduce((sum, c) => sum + c.premium, 0);

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
    navigate("/vehicle", { state: { ...state, readOnly: false } });
  };

  const handlePayment = async () => {
    try {
      setLoading(true);
      const quoteData = {
        submissionId,
        contactId: contact?._id,
        accountId: state?.accountId,
        productSelected: productName,
        premiumAmount: totalPremium,
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
          totalPremium,
        },
      });
    } catch (err) {
      alert("Failed to create quote. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ maxWidth: 900, mx: "auto", mt: 4, p: 2 }}>
      {/* Header */}
      <InfoBar
        accountNumber={accountNumber}
        product={productName}
        contactName={`${contact.firstName || ""} ${contact.lastName || ""}`.trim()}
        submissionId={submissionId}
        effectiveDate={effectiveDate}
        expiryDate={expiryDate}
      />

      <Typography
        variant="h4"
        fontWeight={700}
        sx={{ mb: 4, color: "primary.main", textAlign: "center" }}
      >
        Quote Summary
      </Typography>

      <Stack spacing={3}>
        {/* Vehicle Card */}
        <Paper
  sx={{
    p: 3,
    borderRadius: 3,
    boxShadow: 3,
    backgroundColor: "#f9f9f9",
  }}
>
  <Typography variant="h6" fontWeight={600} sx={{ mb: 3 }}>
    Vehicle Information 🚗
  </Typography>

  <Stack spacing={2}>
    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
      <DirectionsCarIcon color="primary" />
      <Typography>
        <b>Model:</b> {vehicle.year} {vehicle.make} {vehicle.model || "N/A"}
      </Typography>
    </Box>

    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
      <ConfirmationNumberIcon color="primary" />
      <Typography>
        <b>License Plate:</b> {vehicle.licensePlate || "N/A"}
      </Typography>
    </Box>

    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
      <FingerprintIcon color="primary" />
      <Typography>
        <b>VIN:</b> {vehicle.vin || "N/A"}
      </Typography>
    </Box>

    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
      <MapIcon color="primary" />
      <Typography>
        <b>Registered State:</b> {vehicle.stateRegistered || "N/A"}
      </Typography>
    </Box>
  </Stack>
</Paper>

        {/* Contact Card */}
        <Paper
  sx={{
    p: 3,
    borderRadius: 3,
    boxShadow: 3,
    backgroundColor: "#f9f9f9",
  }}
>
  <Typography variant="h6" fontWeight={600} sx={{ mb: 3 }}>
    Driver & Contact Details 👤
  </Typography>

  <Stack spacing={2}>
    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
      <PersonIcon color="primary" />
      <Typography>
        <b>Name:</b> {contact.firstName} {contact.lastName}
      </Typography>
    </Box>

    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
      <EmailIcon color="primary" />
      <Typography>
        <b>Email:</b> {contact.email || "N/A"}
      </Typography>
    </Box>

    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
      <PhoneIcon color="primary" />
      <Typography>
        <b>Phone:</b> {contact.phone || "N/A"}
      </Typography>
    </Box>

    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
      <HomeIcon color="primary" />
      <Typography>
        <b>Address:</b> {contact.address || "N/A"}
      </Typography>
    </Box>

    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
      <BadgeIcon color="primary" />
      <Typography sx={{ display: "flex", alignItems: "center", gap: 1 }}>
        <b>License Type:</b>{" "}
        <Chip
          label={contact.licenseType || "N/A"}
          color="info"
          size="small"
        />
      </Typography>
    </Box>
  </Stack>
</Paper>

        {/* Coverages Card */}
        <Paper sx={{ p: 3, borderRadius: 3, boxShadow: 3 }}>
          <Typography variant="h6" fontWeight={600} sx={{ mb: 2 }}>
            Selected Coverages & Costs
          </Typography>
          <Stack spacing={2}>
            {coverages.map((cov) => {
              const coverage = coverageOptions.find((c) => c.name === cov);
              return (
                <Box
                  key={cov}
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    py: 1.5,
                    px: 2,
                    borderRadius: 2,
                    backgroundColor: "#f5f5f5",
                    boxShadow: 1,
                  }}
                >
                  <Stack direction="row" spacing={1} alignItems="center">
                    <Typography fontWeight={500}>{cov}</Typography>
                    {cov === "Third-Party Liability" && (
                      <Chip label="MANDATORY" size="small" color="error" />
                    )}
                    <Tooltip title={getCoverageTooltip(cov)} arrow>
                      <InfoIcon sx={{ fontSize: 16, cursor: "help" }} />
                    </Tooltip>
                  </Stack>
                  <Typography fontWeight={600}>
                    ₹{coverage?.premium.toLocaleString("en-IN")}
                  </Typography>
                </Box>
              );
            })}

            <Divider sx={{ my: 2 }} />
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                py: 2,
                borderTop: "2px solid #1976d2",
              }}
            >
              <Typography variant="h6" fontWeight={700}>
                Total Premium
              </Typography>
              <Typography variant="h4" fontWeight={700} color="primary.main">
                ₹{totalPremium.toLocaleString("en-IN")}
              </Typography>
            </Box>
          </Stack>
        </Paper>

        {/* Action Buttons */}
        <Stack spacing={2} sx={{ mt: 2 }}>
          <Button
            variant="contained"
            color="success"
            size="large"
            fullWidth
            onClick={handlePayment}
            disabled={loading || totalPremium === 0}
          >
            {loading ? "Processing..." : "Buy Policy Now"}
          </Button>
          <Button variant="outlined" color="primary" fullWidth onClick={handleEdit}>
            Edit Details
          </Button>
          <Button variant="text" color="primary" fullWidth onClick={handleSaveQuote}>
            Save & Email Quote
          </Button>

          {saveStatus && (
            <Typography
              variant="caption"
              color={saveStatus.includes("✅") ? "success.dark" : "error.main"}
              sx={{ mt: 1, textAlign: "center" }}
            >
              {saveStatus}
            </Typography>
          )}

          <Divider sx={{ my: 2 }} />
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ textAlign: "center" }}
          >
            This policy is issued for 12 months. Price guarantee valid for 7 days.
          </Typography>
        </Stack>
      </Stack>
    </Box>
  );
}
