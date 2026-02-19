import React, { useState } from "react";
import axios from "axios";
import {
  Box,
  Typography,
  InputBase,
  IconButton,
  CircularProgress,
  Tooltip,
} from "@mui/material";
import { Search as SearchIcon } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import "./policy.css";

const PolicySearch = () => {
  const [policyNumber, setPolicyNumber] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setPolicyNumber(e.target.value);
  };

  const handleSearch = async () => {
    if (!policyNumber) {
      alert("Please enter a Policy Number");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await axios.get(
        `http://10.192.190.158:5000/api/Policies/getPolicyByNumber/${policyNumber}`
      );

      const policyData = response.data.policy || response.data;

      if (!policyData) {
        setError("Policy not found");
        setLoading(false);
        return;
      }

      // Navigate to PolicySummary with policy data
      navigate(`/policy-summary/${policyNumber}`, { state: { policy: policyData } });

    } catch (err) {
      setError("Failed to fetch policy details");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box className="policy-search-wrapper">
      {/* HEADER */}
      <Typography className="policy-search-header" variant="h4" fontWeight="800">
        🔍 Find Your Policy
      </Typography>

      {/* SEARCH BAR */}
      <Box className="search-input-box">
        <InputBase
          placeholder="Enter Policy Number..."
          value={policyNumber}
          onChange={handleInputChange}
          className="search-input-field"
        />
        <Tooltip title="Search Policy">
          <IconButton onClick={handleSearch} className="search-button">
            <SearchIcon sx={{ color: "#fff" }} />
          </IconButton>
        </Tooltip>
      </Box>

      {/* LOADER */}
      {loading && (
        <Box sx={{ textAlign: "center", marginTop: "20px" }}>
          <CircularProgress thickness={4} />
        </Box>
      )}

      {/* ERROR */}
      {error && (
        <Typography color="error" sx={{ marginTop: "20px", textAlign: "center" }}>
          {error}
        </Typography>
      )}
    </Box>
  );
};

export default PolicySearch;
