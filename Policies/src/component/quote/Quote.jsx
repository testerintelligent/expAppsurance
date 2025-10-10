import React, { useState, useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { 
  Box, Typography, Paper, Button, Grid, Divider, Tooltip, Chip, Stack
} from "@mui/material"; 
import InfoIcon from "@mui/icons-material/InfoOutlined";

// Placeholder for InfoBar component
const InfoBar = ({ accountNumber, policyNumber, expiryDate }) => (
  <Paper elevation={1} sx={{ p: 2, mb: 3, display: 'flex', justifyContent: 'space-between', borderRadius: 2, backgroundColor: '#e3f2fd' }}>
    <Typography variant="body2">Account: <b>{accountNumber}</b></Typography>
    <Typography variant="body2">Policy: <b>{policyNumber}</b></Typography>
    <Typography variant="body2">Expires: <b>{expiryDate}</b></Typography>
  </Paper>
);


export default function Quote() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [saveStatus, setSaveStatus] = useState("");

  const contact = state?.contact || {};    
  const vehicle = state?.vehicleData || {};  
  const coverages = state?.coverages || [];  

  const accountNumber = state?.accountNumber || "6431739974"; 
  const policyNumber = state?.policyNumber || "0923090878"; 
  const expiryDate = state?.expiryDate || "04/06/2026"; 
  
  // --- Premium Calculation Logic ---
  const coveragePremiums = {
    "Third-Party Liability": 1200,
    "Own Damage": 800,
    "Comprehensive": 1500,
    "Personal Accident Cover": 400,
    "Zero Depreciation": 600,
    "Vehicle theft": 900,
  };

  const overallPremiumBase = useMemo(() => 
    coverages.reduce((sum, cov) => sum + (coveragePremiums[cov] || 0), 0)
  , [coverages]);
  
  // Custom adjustments for clarity and transparency
  const taxAndFees = 50; 
  const discount = 100;

  // Final total
  const overallPremium = overallPremiumBase + taxAndFees - discount;

  // Policy period calculation
  const { effectiveDate, policyExpiryDate } = useMemo(() => {
    const dateParts = expiryDate.split('/');
    if (dateParts.length !== 3) return { effectiveDate: "N/A", policyExpiryDate: "N/A", period: "N/A" };
    
    const expDate = new Date(dateParts[2], dateParts[1] - 1, dateParts[0]);
    const effDate = new Date(expDate);
    effDate.setFullYear(expDate.getFullYear() - 1);

    const format = (d) => d.toLocaleDateString('en-US', { year: 'numeric', month: '2-digit', day: '2-digit' });

    return {
      effectiveDate: format(effDate),
      policyExpiryDate: format(expDate),
    };
  }, [expiryDate]);
  // --- End Premium Calculation Logic ---

  // --- Helper Functions ---
  const getCoverageTooltip = (cov) => {
    switch(cov) {
      case "Zero Depreciation": return "Full claim payout without deduction for vehicle wear and tear.";
      case "Comprehensive": return "Covers damage to your vehicle, third-party liability, and theft.";
      case "Third-Party Liability": return "Mandatory coverage for damages/injuries you cause to others.";
      case "Own Damage": return "Covers damage caused to your own vehicle in an accident.";
      default: return `A summary of the benefits for ${cov}.`;
    }
  }

  // --- Action Handlers ---
  const handleSaveQuote = async () => {
    setSaveStatus("Saving quote to your account...");
    await new Promise(resolve => setTimeout(resolve, 1500)); 
    const quoteRef = "Q"+Math.random().toString(36).substring(2, 9).toUpperCase(); 
    setSaveStatus(`✅ Quote saved successfully! Reference ID: ${quoteRef}`);
  };

  const handleEdit = () => {
    navigate("/vehicle", { state: { ...state, readOnly: false } });
  };
  
  const handlePayment = () => {
    navigate("/payment", { state: { ...state, overallPremium } });
  };


  return (
    <Box sx={{ maxWidth: 1200, mx: "auto", mt: 4, p: 2 }}>
      <InfoBar accountNumber={accountNumber} policyNumber={policyNumber} expiryDate={expiryDate} />
      
      <Typography variant="h4" fontWeight={700} sx={{ mb: 4, color: 'primary.main' }}>
        Quote Summary
      </Typography>

      <Grid container spacing={4}>
        
        {/* === LEFT COLUMN: Stacked Details (6/12 grid) === */}
        <Grid item xs={12} md={6}>
          
          {/* OPTION 1: Stack Layout for simple vertical organization */}
          <Stack spacing={4}> 
            
            {/* 1. Vehicle Information Card */}
            <Paper sx={{ p: 4, borderRadius: 4, boxShadow: 3 }}>
                <Typography variant="h5" fontWeight={600} sx={{ mb: 2, color: 'text.primary' }}>
                    Vehicle Information 🚗
                </Typography>
                {/* Use Stack for internal vertical line-by-line spacing */}
                <Stack spacing={1}> 
                    <Typography><b>Model:</b> {vehicle.year} {vehicle.make} {vehicle.model}</Typography>
                    <Typography><b>License Plate:</b> {vehicle.licensePlate || "N/A"}</Typography>
                    <Typography><b>VIN:</b> {vehicle.vin || "N/A"}</Typography>
                    <Typography><b>Registered State:</b> {vehicle.stateRegistered || "N/A"}</Typography>
                </Stack>
            </Paper>

            {/* 2. Driver & Contact Details Card */}
            <Paper sx={{ p: 4, borderRadius: 4, boxShadow: 3 }}>
                <Typography variant="h5" fontWeight={600} sx={{ mb: 2, color: 'text.primary' }}>
                    Driver & Contact Details 👤
                </Typography>
                <Stack spacing={1}>
                    <Typography><b>Name:</b> {contact.firstName} {contact.lastName}</Typography>
                    <Typography><b>Date of Birth:</b> {contact.dateOfBirth || "N/A"}</Typography>
                    <Typography><b>Email:</b> {contact.email || "N/A"}</Typography>
                    <Typography><b>Phone:</b> {contact.phone || "N/A"}</Typography>
                    <Typography><b>Address:</b> {contact.address}, {contact.city}, {contact.zipCode}</Typography>
                    <Typography><b>License Type:</b> {contact.licenseType || "N/A"}</Typography>
                    <Typography><b>Driving Experience:</b> {contact.drivingExperience || "N/A"} Years</Typography>
                </Stack>
            </Paper>

            {/* 3. Coverage Breakdown Card */}
            <Paper sx={{ p: 4, borderRadius: 4, boxShadow: 3 }}>
                <Typography variant="h5" fontWeight={600} sx={{ mb: 2, color: 'text.primary' }}>
                    Selected Coverages & Costs
                </Typography>
                <Box sx={{ mt: 3 }}>
                {coverages.length > 0 ? (
                    <Box>
                    {/* Coverage Items */}
                    {coverages.map((cov) => (
                        <Box 
                        key={cov} 
                        sx={{ 
                            display: 'flex', 
                            justifyContent: 'space-between', 
                            alignItems: 'center',
                            py: 1.5, 
                            borderBottom: '1px solid #eee' 
                        }}
                        >
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <Typography fontWeight={500} color={cov === "Third-Party Liability" ? "error.dark" : "inherit"}>{cov}</Typography>
                            {cov === "Third-Party Liability" && <Chip label="MANDATORY" size="small" color="error" sx={{ml:1}}/>}
                            <Tooltip title={getCoverageTooltip(cov)} placement="right" arrow>
                            <InfoIcon sx={{ fontSize: 16, ml: 1, color: 'text.secondary', cursor: 'help' }} />
                            </Tooltip>
                        </Box>
                        <Typography fontWeight={600} color="text.primary">
                            ${(coveragePremiums[cov] || 0).toLocaleString('en-US')}
                        </Typography>
                        </Box>
                    ))}
                    
                    {/* Discount and Tax Lines for Transparency */}
                    <Divider sx={{ my: 1 }} />
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', py: 1 }}>
                        <Typography variant="body1" color="success.dark" fontWeight={500}>Safe Driving Discount</Typography>
                        <Typography variant="body1" color="success.dark" fontWeight={600}>${-discount.toLocaleString('en-US')}</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', py: 1, borderBottom: '1px dashed #ccc' }}>
                        <Typography variant="body1" color="text.secondary" fontWeight={500}>Taxes & Regulatory Fees</Typography>
                        <Typography variant="body1" color="text.secondary" fontWeight={600}>${taxAndFees.toLocaleString('en-US')}</Typography>
                    </Box>

                    {/* Final Total Premium */}
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', py: 2, mt: 1, borderTop: '2px solid #3f51b5' }}>
                        <Typography variant="h6">Total Calculated Premium</Typography>
                        <Typography variant="h6" fontWeight={700}>${overallPremium.toLocaleString('en-US')}</Typography>
                    </Box>
                    </Box>
                ) : (
                    <Typography color="error.main">
                    No coverages selected. Please use the "Edit Details" button to select coverage.
                    </Typography>
                )}
                </Box>
            </Paper>

          </Stack>
        </Grid>

        {/* === RIGHT COLUMN: Sticky Summary & CTA (6/12 grid) === */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ 
              p: 4, 
              borderRadius: 4, 
              position: 'sticky', 
              top: 20, 
              boxShadow: 6,
              backgroundColor: '#f5f5f5' 
            }}>
            
            {/* Final Quote Price */}
            <Typography variant="h5" fontWeight={700} color="text.secondary" sx={{ mb: 0, textAlign: 'center' }}>
              Your Final Quote
            </Typography>
            <Typography variant="h2" fontWeight={900} color="success.dark" sx={{ mb: 3, textAlign: 'center' }}>
              ${overallPremium.toLocaleString('en-US')}
            </Typography>

            <Divider sx={{ my: 2 }} />

            {/* Key Dates - Enhanced Clarity */}
            {/* CORRECTED LINE: Used colon for key:value pair inside sx object */}
            <Typography variant="body1" sx={{ mb: 1, fontWeight: 500, textAlign: 'center' }}>
              Policy Period (1 Year)
            </Typography>
            <Typography variant="subtitle1" color="text.secondary" sx={{ mb: 0, textAlign: 'center' }}>
              **Effective Date:** {effectiveDate}
            </Typography>
            <Typography variant="subtitle1" color="text.secondary" sx={{ mb: 2, textAlign: 'center' }}>
              **Expiration Date:** {policyExpiryDate}
            </Typography>
            
            <Divider sx={{ my: 2 }} />

            {/* Primary Action Button */}
            <Button 
              variant="contained" 
              color="success" 
              size="large" 
              fullWidth 
              onClick={handlePayment}
              sx={{ mb: 2, py: 1.5, '&:hover': { backgroundColor: '#388e3c' } }}
              disabled={overallPremium === 0}
            >
              <Typography variant="button" fontWeight={700}>
                Buy Policy Now
              </Typography>
            </Button>
            
            {/* Secondary Actions */}
            <Button 
              variant="outlined" 
              color="primary" 
              fullWidth 
              onClick={handleEdit}
              sx={{ mb: 1 }}
            >
              Edit Details
            </Button>
            <Button 
              variant="text" 
              color="primary" 
              fullWidth 
              onClick={handleSaveQuote}
            >
              Save & Email Quote
            </Button>

            {/* Save Status Feedback */}
            {saveStatus && 
              <Typography 
                variant="caption" 
                color={saveStatus.includes("saved") ? "success.dark" : "error.main"} 
                sx={{ mt: 2, display: 'block', textAlign: 'center' }}
              >
                {saveStatus}
              </Typography>
            }

            <Divider sx={{ my: 2 }} />

            <Typography variant="body2" color="text.secondary" sx={{ mt: 2, textAlign: 'center' }}>
              This policy is issued for 12 months. Price guarantee valid for 7 days.
            </Typography>
            
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}