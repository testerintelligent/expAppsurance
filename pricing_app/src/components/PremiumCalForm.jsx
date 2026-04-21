import React from "react";

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
import { useNavigate } from "react-router-dom";
import {
  calculatePremium,
  updateForm,
  // setFormData,
} from "../redux/premiumCalSlice.js";

const MotorForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { form, loading } = useSelector((state) => state.premium);

  const handleChange = (e) => {
    const { name, value } = e.target;

    let newValue =
      name === "basePremium" ||
      name === "locationFactor" ||
      name === "vehicleAge"
        ? Number(value)
        : value;
    dispatch(updateForm({ name, value: newValue }));
  };

  const handleSubmit = async () => {
    await dispatch(calculatePremium(form));
    navigate("/");
  };

  return (
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
        <div className="p-1 flex flex-col gap-y-4">
          {/* Product */}
          <FormControl fullWidth>
            <InputLabel>Vehicle Type</InputLabel>
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

          <FormControl fullWidth>
            <InputLabel>Vehicle Age</InputLabel>
            <Select
              name="vehicleAge"
              value={form.vehicleAge}
              onChange={handleChange}
              label="Vehicle Age"
              size="small"
            >
              <MenuItem value="0-5">0-5</MenuItem>
              <MenuItem value="5-10">5-10</MenuItem>
              <MenuItem value="10-15">10-15</MenuItem>
              <MenuItem value="15-20">15-20</MenuItem>
              <MenuItem value="Greater than 20"> Greater than 20</MenuItem>
            </Select>
          </FormControl>

          <TextField
            label="Location"
            name="location"
            value={form.location}
            onChange={handleChange}
            fullWidth
            size="small"
          />

          <TextField
            label="Base Premium"
            type="number"
            name="basePremium"
            value={form.basePremium}
            onChange={handleChange}
            fullWidth
            size="small"
          />
          {/* Claim History */}
          <TextField
            label="Location Factor"
            type="number"
            name="locationFactor"
            value={form.locationFactor}
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
            {loading ? "Saving" : "Save"}
          </Button>
        </div>
      </Box>
    </Box>
  );
};

export default MotorForm;
