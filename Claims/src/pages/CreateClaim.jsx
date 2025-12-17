import React, { useEffect, useState } from "react";
import {
  Box,
  Paper,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  Button,
  Divider,
} from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";

export default function CreateClaim() {
  const location = useLocation();
  const navigate = useNavigate();

  // ✅ Normalized policy object
  const [policy, setPolicy] = useState(null);

  const [lossDate, setLossDate] = useState("");
  const [claimType, setClaimType] = useState("");

  /* =========================
     🔄 LOAD POLICY CONTEXT
     ========================= */
  useEffect(() => {
    if (location.state?.policy) {
      setPolicy(location.state.policy);
    } else {
      const saved = sessionStorage.getItem("selectedPolicyForClaim");
      if (saved) {
        setPolicy(JSON.parse(saved));
      }
    }
  }, [location.state]);

  /* =========================
     ➡️ NEXT: BASIC INFO
     ========================= */
  const handleNext = () => {
    if (!lossDate || !claimType) return;

    navigate("/Claim/basicinfo", {
      state: {
        policy, // ✅ normalized policy
        lossDate,
        claimType,
      },
    });
  };

  if (!policy) {
    return (
      <Box p={3}>
        <Typography color="error">
          No policy selected. Please go back.
        </Typography>
      </Box>
    );
  }

  const contact = policy.contact;

  return (
    <Box p={3}>
      <Paper elevation={3} sx={{ p: 3, maxWidth: 1100, margin: "0 auto" }}>
        <Typography variant="h5" gutterBottom>
          New Claim
        </Typography>

        {/* ------------------- POLICY DETAILS TABLE ------------------- */}
        <TableContainer component={Paper} sx={{ mb: 3 }}>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>Policy #</TableCell>
                <TableCell>Insured</TableCell>
                <TableCell>Address</TableCell>
                <TableCell>City</TableCell>
                <TableCell>State</TableCell>
                <TableCell>ZIP Code</TableCell>
                <TableCell>Effective</TableCell>
                <TableCell>Expires</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              <TableRow>
                <TableCell>{policy.policyNumber}</TableCell>

                <TableCell>
                  {contact
                    ? `${contact.firstName || ""} ${contact.lastName || ""}`.trim()
                    : "N/A"}
                </TableCell>

                <TableCell>
                  {contact?.address || contact?.street || "N/A"}
                </TableCell>

                <TableCell>{contact?.city || "N/A"}</TableCell>
                <TableCell>{contact?.state || "N/A"}</TableCell>
                <TableCell>{contact?.zipCode || "N/A"}</TableCell>

                <TableCell>
                  {policy.effectiveDate
                    ? new Date(policy.effectiveDate).toLocaleDateString()
                    : "N/A"}
                </TableCell>

                <TableCell>
                  {policy.expiryDate
                    ? new Date(policy.expiryDate).toLocaleDateString()
                    : "N/A"}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>

        <Divider sx={{ my: 3 }} />

        {/* ------------------- LOSS DATE ------------------- */}
        <Typography variant="h6">
          Loss Date<span style={{ color: "red" }}> *</span>
        </Typography>

        <TextField
          type="date"
          value={lossDate}
          onChange={(e) => setLossDate(e.target.value)}
          required
          sx={{ width: 250, mb: 3 }}
          InputLabelProps={{ shrink: true }}
        />

        {/* ------------------- CLAIM TYPE ------------------- */}
        <Typography variant="h6">
          Type of Claim<span style={{ color: "red" }}> *</span>
        </Typography>

        <FormControl component="fieldset" sx={{ mb: 3 }}>
          <RadioGroup
            value={claimType}
            onChange={(e) => setClaimType(e.target.value)}
          >
            <FormControlLabel value="Auto" control={<Radio />} label="Auto" />
            <FormControlLabel
              value="Auto - Auto First and Final"
              control={<Radio />}
              label="Auto - Auto First and Final"
            />
            <FormControlLabel
              value="Auto - Quick Claim Auto"
              control={<Radio />}
              label="Auto - Quick Claim Auto"
            />
          </RadioGroup>
        </FormControl>

        <Box display="flex" justifyContent="flex-end">
          <Button
            variant="contained"
            disabled={!lossDate || !claimType}
            onClick={handleNext}
          >
            Next →
          </Button>
        </Box>
      </Paper>
    </Box>
  );
}
