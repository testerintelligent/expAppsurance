import React, { useState } from "react";
import axios from "axios";
import {
  Box,
  TextField,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Button,
  Typography,
  Grid,
} from "@mui/material";

const MotorForm = () => {
  const [premium, setPremium] = useState(null);
  const [form, setForm] = useState({
    product: "PERSONAL_AUTO",
    policyDate: "2026-05-01",
    country: "",
    state: "",
    city: "",
    licenseType: "LMV",
    drivingExperience: 5,
    claimHistory: 1,
    vehicleAge: 3,
  });

  const calculatePremium = async () => {
    try {
      const base = "http://10.192.190.158:5000";

      const res = await axios.post(`${base}/api/pricing/calculate`, {
        product: "PERSONAL_AUTO",
        product: form.product,
        policyDate: form.policyDate,
        input: {
          country: form.country,
          state: form.state,
          city: form.city,
          licenseType: form.licenseType,
          drivingExperience: form.drivingExperience,
          claimHistory: form.claimHistory,
          vehicleAge: form.vehicleAge,
        },
      });
      setPremium(res.data);
      console.log("res", res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    let newValue;

    switch (name) {
      case "product":
      case "country":
      case "state":
      case "city":
      case "licenseType":
        // These are string fields
        newValue = value;
        break;

      case "drivingExperince":
      case "claimHistory":
      case "vehicleAge":
        // These are numeric fields
        newValue = value === "" ? "" : Number(value);
        break;

      case "policyDate":
        // For date, keep as string (or parse if needed)
        newValue = value;
        break;

      default:
        // Fallback: for checkboxes or any other input
        newValue = type === "checkbox" ? checked : value;
    }

    setForm((prev) => ({
      ...prev,
      [name]: newValue,
    }));
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "linear-gradient(to bottom, #0f172a, #374151, #000)",
      }}
    >
      <Box
        sx={{
          width: 550,
          p: 4,
          bgcolor: "white",
          borderRadius: 3,
          boxShadow: 3,
        }}
      >
        <Typography
          variant="subtitle1"
          align="center"
          sx={{
            mb: 2,
            fontWeight: "bold",
            color: "#2D0B4E",
          }}
        >
          Motor Insurance Premium Calculator
        </Typography>

        <Box
          display="flex"
          flexDirection="column"
          gap={2}
          sx={{
            maxHeight: "80vh", // 👈 limit height
            overflowY: "auto",
          }}
        >
          {/* Product */}
          <FormControl fullWidth>
            <InputLabel>Product</InputLabel>
            <Select
              name="product"
              value={form.product}
              onChange={handleChange}
              label="Product"
              size="small"
            >
              <MenuItem value="PERSONAL_AUTO">Personal Auto</MenuItem>
              <MenuItem value="COMMERCIAL_AUTO">Commercial Auto</MenuItem>
            </Select>
          </FormControl>
          {/* Policy Date */}
          <TextField
            label="Policy Date"
            type="date"
            name="policyDate"
            value={form.policyDate}
            onChange={handleChange}
            InputLabelProps={{ shrink: true }}
            fullWidth
            size="small"
          />
          {/* License */}
          <FormControl fullWidth>
            <InputLabel>License Type</InputLabel>
            <Select
              name="licenseType"
              value={form.licenseType}
              onChange={handleChange}
              label="License Type"
              size="small"
            >
              <MenuItem value="LMV">LMV</MenuItem>
              <MenuItem value="HMV">HMV</MenuItem>
              <MenuItem value="MCV">MCV</MenuItem>
            </Select>
          </FormControl>
          <FormControl fullWidth>
            <InputLabel>Country</InputLabel>
            <Select
              name="country"
              value={form.country}
              onChange={handleChange}
              label="Country"
              size="small"
            >
              <MenuItem value="">Select</MenuItem>
              <MenuItem value="United States">United States</MenuItem>
              <MenuItem value="Canada">Canada</MenuItem>
              <MenuItem value="India">India</MenuItem>
              <MenuItem value="United Kingdom">United Kingdom</MenuItem>
              <MenuItem value="Australia">Australia</MenuItem>
              <MenuItem value="Other">Other</MenuItem>
            </Select>
          </FormControl>
          <TextField
            label="State"
            name="state"
            value={form.state}
            onChange={handleChange}
            fullWidth
            size="small"
          />
          {/* City */}
          <TextField
            label="City"
            name="city"
            value={form.city}
            onChange={handleChange}
            fullWidth
            size="small"
          />
          {/* Driving Experience */}
          <TextField
            label="Driving Experience"
            type="number"
            name="drivingExperience"
            value={form.drivingExperience}
            onChange={handleChange}
            fullWidth
            size="small"
          />
          {/* Claim History */}
          <TextField
            label="Claim History"
            type="number"
            name="claimHistory"
            value={form.claimHistory}
            onChange={handleChange}
            fullWidth
            size="small"
          />
          <TextField
            label="Vehicle Age"
            type="number"
            name="vehicleAge"
            value={form.vehicleAge}
            onChange={handleChange}
            fullWidth
            size="small"
          />
          {/* Button */}
          <Button
            variant="contained"
            fullWidth
            sx={{
              mt: 2,
              background: "linear-gradient(to right, #D8B4FE, #2D0B4E)",
            }}
            onClick={calculatePremium}
          >
            Calculate Premium
          </Button>
          {premium && premium.success && (
            <Typography
              align="center"
              sx={{ mt: 2, fontWeight: "bold", color: "green" }}
            >
              Estimated Premium: ₹ {premium.premium.toFixed(2)}
            </Typography>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default MotorForm;
