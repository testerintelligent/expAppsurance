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
import { useDispatch, useSelector } from "react-redux";
import { calculatePremium, updateForm } from "../redux/premiumcalSlice";

const MotorForm = () => {
  const dispatch = useDispatch();
  const { form, premium, loading } = useSelector((state) => state.premium);

  const handleChange = (e) => {
    const { name, value } = e.target;

    let newValue =
      name === "drivingExperience" ||
      name === "claimHistory" ||
      name === "vehicleAge"
        ? Number(value)
        : value;
    dispatch(updateForm({ name, value, newValue }));
  };

  const handleSubmit = () => {
    dispatch(calculatePremium(form));
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
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading ? "Calculating..." : "Calculate Premium"}
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
