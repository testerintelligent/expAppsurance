import React, { useEffect, useState } from "react";
import {
  Box,
  Paper,
  Typography,
  Button,
  FormControl,
  Select,
  MenuItem,
  InputLabel,
  TextField,
  RadioGroup,
  FormControlLabel,
  Radio,
  Grid,
  Checkbox,
  Divider,
} from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";

export default function BasicInformation() {
  const location = useLocation();
  const navigate = useNavigate();

  /* ===============================
     STATE
     =============================== */
  const [policy, setPolicy] = useState(null);
  const [lossDate, setLossDate] = useState("");
  const [claimType, setClaimType] = useState("");

  const [howReported, setHowReported] = useState("Phone");
  const [reportedName, setReportedName] = useState("");
  const [relation, setRelation] = useState("Self");
  const [dateOfNotice, setDateOfNotice] = useState(
    new Date().toISOString().substring(0, 10)
  );
  const [samePerson, setSamePerson] = useState("same");
  const [selectedVehicles, setSelectedVehicles] = useState([]);
  const [selectedDrivers, setSelectedDrivers] = useState([]);

  /* ===============================
     LOAD POLICY CONTEXT
     =============================== */
  useEffect(() => {
    if (location.state?.policy) {
      setPolicy(location.state.policy);
      setLossDate(location.state.lossDate || "");
      setClaimType(location.state.claimType || "");
    } else {
      const saved = sessionStorage.getItem("selectedPolicyForClaim");
      if (saved) {
        setPolicy(JSON.parse(saved));
      }
    }
  }, [location.state]);

  /* ===============================
     AUTO-FILL REPORTER (INSURED)
     =============================== */
  useEffect(() => {
    if (policy?.contact) {
      const first = policy.contact.firstName || "";
      const last = policy.contact.lastName || "";
      setReportedName(`${first} ${last}`.trim());
    }
  }, [policy]);

  /* ===============================
     EARLY RETURN
     =============================== */
  if (!policy) {
    return (
      <Box p={3}>
        <Typography color="error">
          No policy context found. Please go back.
        </Typography>
      </Box>
    );
  }

  const contact = policy.contact;
  const vehicles = policy.vehicle || [];
  const drivers = policy.driver || [];

  const insuredFullName = `${contact?.firstName || ""} ${
    contact?.lastName || ""
  }`.trim();

  const insuredAddress =
    contact?.address ||
    contact?.street ||
    `${contact?.city || ""}, ${contact?.state || ""} ${
      contact?.zipCode || ""
    }`;

  /* ===============================
     HANDLERS
     =============================== */
  const toggleVehicle = (id) => {
    setSelectedVehicles((prev) =>
      prev.includes(id) ? prev.filter((v) => v !== id) : [...prev, id]
    );
  };

  const toggleDriver = (id) => {
    setSelectedDrivers((prev) =>
      prev.includes(id) ? prev.filter((d) => d !== id) : [...prev, id]
    );
  };

  const handleNext = () => {
    navigate("/Claim/addClaimInfo", {
      state: {
        policy,
        lossDate,
        claimType,
        howReported,
        reportedName,
        relation,
        dateOfNotice,
        samePerson,
        selectedVehicles,
        selectedDrivers,
      },
    });
  };

  /* ===============================
     UI
     =============================== */
  return (
    <Box p={3}>
      <Paper elevation={3} sx={{ p: 3, maxWidth: 1200, margin: "0 auto" }}>
        {/* HEADER */}
        <Box display="flex" justifyContent="space-between" mb={3}>
          <Button variant="outlined" color="error">
            Cancel
          </Button>

          <Box>
            <Button variant="outlined" sx={{ mr: 2 }} onClick={() => navigate(-1)}>
              &lt; Back
            </Button>
            <Button variant="contained" onClick={handleNext}>
              Next &gt;
            </Button>
          </Box>
        </Box>

        {/* ================= REPORTED BY ================= */}
        <Typography variant="h6">Reported By</Typography>

        <Grid container spacing={3} mt={1}>
          <Grid item xs={12} sm={4}>
            <FormControl fullWidth>
              <InputLabel>How Reported</InputLabel>
              <Select
                label="How Reported"
                value={howReported}
                onChange={(e) => setHowReported(e.target.value)}
              >
                <MenuItem value="Phone">Phone</MenuItem>
                <MenuItem value="Email">Email</MenuItem>
                <MenuItem value="In Person">In Person</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={4}>
            <FormControl fullWidth>
              <InputLabel>Name</InputLabel>
              <Select
                label="Name"
                value={reportedName}
                onChange={(e) => setReportedName(e.target.value)}
              >
                <MenuItem value={insuredFullName}>{insuredFullName}</MenuItem>
                <MenuItem value="Other">Other</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={4}>
            <FormControl fullWidth>
              <InputLabel>Relation</InputLabel>
              <Select
                label="Relation"
                value={relation}
                onChange={(e) => setRelation(e.target.value)}
              >
                <MenuItem value="Self">Self</MenuItem>
                <MenuItem value="Spouse">Spouse</MenuItem>
                <MenuItem value="Child">Child</MenuItem>
                <MenuItem value="Agent">Agent</MenuItem>
                <MenuItem value="Other">Other</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>

        <Divider sx={{ my: 3 }} />

        {/* ================= INSURED ================= */}
        <Typography variant="h6">Insured</Typography>
        <Typography><strong>Name:</strong> {insuredFullName}</Typography>
        <Typography><strong>Address:</strong> {insuredAddress}</Typography>
        <Typography><strong>Phone:</strong> {contact?.phone || "N/A"}</Typography>

        <Divider sx={{ my: 3 }} />

        {/* ================= VEHICLES ================= */}
        <Typography variant="h6">Involved Vehicles</Typography>

        {vehicles.length > 0 ? (
          vehicles.map((v) => (
            <Box key={v._id} display="flex" alignItems="center">
              <Checkbox
                checked={selectedVehicles.includes(v._id)}
                onChange={() => toggleVehicle(v._id)}
              />
              <Typography>
                {v.year} {v.make} {v.model} ({v.licensePlate})
              </Typography>
            </Box>
          ))
        ) : (
          <Typography>No vehicles found.</Typography>
        )}

        <Divider sx={{ my: 3 }} />

        {/* ================= DRIVERS ================= */}
        <Typography variant="h6">Drivers</Typography>

        {drivers.length > 0 ? (
          drivers.map((d) => (
            <Box key={d._id} display="flex" alignItems="center">
              <Checkbox
                checked={selectedDrivers.includes(d._id)}
                onChange={() => toggleDriver(d._id)}
              />
              <Typography>
                {d.firstName} {d.lastName}
              </Typography>
            </Box>
          ))
        ) : (
          <Typography>No drivers found.</Typography>
        )}
      </Paper>
    </Box>
  );
}
