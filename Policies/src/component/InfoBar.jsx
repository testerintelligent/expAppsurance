import React from "react";
import { Box, Typography } from "@mui/material";
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';

export default function InfoBar({ accountNumber, policyNumber, expiryDate, testLabel = "Test 12" }) {
  return (
    <Box sx={{ display: "flex", alignItems: "center", background: "#444", color: "#fff", p: 2, borderRadius: 2, mb: 2 }}>
      <DirectionsCarIcon sx={{ fontSize: 32, mr: 1 }} />
      <Typography variant="h6" sx={{ fontWeight: 500, mr: 2 }}>Personal Auto</Typography>
      <Typography variant="subtitle1" sx={{ fontWeight: 700, mr: 2 }}>{testLabel}</Typography>
      <Typography variant="body1" sx={{ mr: 2 }}>
        Account # <span style={{ color: '#4FC3F7', fontWeight: 600 }}>{accountNumber}</span>
      </Typography>
      <Typography variant="body1" sx={{ fontWeight: 700, mr: 2 }}>
        Policy # {policyNumber}
      </Typography>
      <Typography variant="body1">
        In Force (Exp. {expiryDate})
      </Typography>
    </Box>
  );
}
