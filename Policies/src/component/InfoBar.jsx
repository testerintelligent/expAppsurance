import React from "react";
import { Box, Typography, Grid } from "@mui/material";
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';

export default function InfoBar({
    accountNumber, 
    policyNumber, 
    expiryDate, 
    product, 
    contactName, 
    submissionId, 
    effectiveDate 
}) {
    // Helper to format dates for better display (e.g., D-M-Y) if needed, 
    // but we'll stick to the raw ISO string for now for consistency.
    const cleanId = (id) => id ? id.substring(0, 15) + '...' : 'N/A';

    return (
        <Box 
            sx={{ 
                background: "#212121", 
                color: "#E0E0E0", 
                p: 2.5,
                borderRadius: 3, 
                mb: 3, 
                boxShadow: '0 6px 15px rgba(0, 0, 0, 0.5)',
            }}
        >
            <Grid container spacing={2} alignItems="center">
                
                {/* 1. Product & Client - Primary Focus (Top Left) */}
                <Grid item xs={12} sm={6} sx={{ display: 'flex', alignItems: 'center', borderRight: { sm: '1px solid rgba(255, 255, 255, 0.1)' } }}>
                    
                    <DirectionsCarIcon sx={{ fontSize: 32, mr: 1.5, color: '#FFC107' }} />
                    
                    {/* Product Name (Largest Font) */}
                    <Box>
                        <Typography 
                            variant="h5" // Increased font size for product
                            sx={{ fontWeight: 700, color: '#FFFFFF', lineHeight: 1.2 }}
                        >
                            {product || "N/A"}
                        </Typography>
                        {/* Client Name (Directly below product) */}
                        <Typography 
                            variant="subtitle1" 
                            sx={{ fontWeight: 500, color: '#FFC107' }} // Use accent color
                        >
                            Client: {contactName || "N/A"}
                        </Typography>
                    </Box>
                </Grid>

                {/* 2. Key Identifiers - Grouped (Top Right) */}
                <Grid item xs={12} sm={6}>
                    <Grid container spacing={1} direction="column">
                        
                        {/* Submission ID */}
                        <Grid item>
                            <Typography variant="body2" sx={{ color: '#BDBDBD' }}>
                                SUBMISSION # 
                                <span style={{ fontWeight: 600, color: '#81D4FA', marginLeft: 8 }}>
                                    {submissionId || "N/A"}
                                </span>
                            </Typography>
                        </Grid>
                        
                        {/* Account Number */}
                        <Grid item>
                            <Typography variant="body2" sx={{ color: '#BDBDBD' }}>
                                ACCOUNT # 
                                <span style={{ fontWeight: 600, color: '#81D4FA', marginLeft: 16 }}>
                                    {accountNumber || "N/A"}
                                </span>
                            </Typography>
                        </Grid>

                        {/* Optional Policy Number */}
                        {policyNumber && policyNumber !== '-' && (
                            <Grid item>
                                <Typography variant="body2" sx={{ color: '#BDBDBD' }}>
                                    POLICY # 
                                    <span style={{ fontWeight: 600, color: '#F48FB1', marginLeft: 22 }}>
                                        {policyNumber}
                                    </span>
                                </Typography>
                            </Grid>
                        )}
                    </Grid>
                </Grid>
                
                {/* 3. Effective Dates - Separated and Emphasized (Bottom Full Width) */}
                <Grid item xs={12}>
                    <Box sx={{ 
                        pt: 1, 
                        borderTop: '1px dashed rgba(255, 255, 255, 0.15)', // Dotted line separator
                        display: 'flex', 
                        justifyContent: 'space-between',
                        flexWrap: 'wrap'
                    }}>
                        
                        {/* Effective Date (Green/Positive) */}
                        <Typography variant="body1" sx={{ fontWeight: 500, mr: 3 }}>
                            Effective: 
                            <span style={{ fontWeight: 700, color: '#A5D6A7', marginLeft: 4 }}>
                                {effectiveDate || "N/A"}
                            </span>
                        </Typography>
                        
                        {/* Expiry Date (Red/Caution) */}
                        {expiryDate && (
                            <Typography variant="body1" sx={{ fontWeight: 500 }}>
                                Expiration: 
                                <span style={{ fontWeight: 700, color: '#EF9A9A', marginLeft: 4 }}>
                                    {expiryDate}
                                </span>
                            </Typography>
                        )}
                    </Box>
                </Grid>
            </Grid>
        </Box>
    );
}