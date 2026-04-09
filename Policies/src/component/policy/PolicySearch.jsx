import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Box,
  Typography,
  TextField,
  CircularProgress,
  Grid,
  Button,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableContainer,
  TableBody,
  TablePagination,
  Stack,
} from "@mui/material";
import { Search as SearchIcon } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import MainCard from "../../layout/MainCard";
import "./policy.css";

const PolicySearch = () => {
  const [policyNumber, setPolicyNumber] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [policyDetails, setPolicyDetails] = useState([]);
  const [page, setPage] = useState(0); // current page
  const [rowsPerPage, setRowsPerPage] = useState(5); // rows per page
  const navigate = useNavigate();

  // Fetch policies data from the API
  useEffect(() => {
    const fetchPolicies = async () => {
      try {
        const response = await axios.get("http://10.192.190.158:5000/api/Policies/getPoliciesForDashboard");
        setPolicyDetails(response.data);
      } catch (error) {
        console.error("Error fetching policies:", error);
      }
    };
    fetchPolicies();
  }, []);


  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0); // reset to first page when changing rows per page
  };
  const handleSearch = async (policyNum) => {
    // Extract policy number if an object is passed (from table row click)
    const policyId = typeof policyNum === 'string' 
      ? policyNum 
      : policyNum?.policyNumber || policyNumber;

    if (!policyId) {
      alert("Please enter a Policy Number");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await axios.get(
        `http://10.192.190.158:5000/api/Policies/getPolicyByNumber/${policyId}`
      );

      const policyData = response.data.policy || response.data;

      if (!policyData) {
        setError("Policy not found");
        setLoading(false);
        return;
      }

      // Navigate to PolicySummary with policy data
      navigate(`/policy-summary/${policyId}`, { state: { policy: policyData } });

    } catch (err) {
      setError("Failed to fetch policy details");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ width: "100%", maxWidth: 1200 }}>
      <MainCard
        border={false}
        content={false}
        bgcolor="#4527a0"
        background="#4527a0"
      >
        <Box sx={{ p: 3 }}>
          <Typography 
            variant="h5" 
            sx={{ fontWeight: 700, mb: 3, color: "white" }}
          >
            Search Policy
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={10}>
              <TextField
                fullWidth
                label="Policy Number"
                name="Search by policy number"
                value={policyNumber}
                onChange={(e) => setPolicyNumber(e.target.value)}
                variant="outlined"
                sx={{
                  "& .MuiOutlinedInput-root": {
                    backgroundColor: "white",
                  },
                }}
              />
            </Grid>
            <Grid item xs={12} sm={2} sx={{ display: "flex", alignItems: "flex-end" }}>
              <Button
                variant="contained"
                onClick={handleSearch}
                fullWidth
                sx={{
                  backgroundColor: "#1565c0",
                  fontWeight: 600,
                  padding: "10px 16px",
                  "&:hover": {
                    backgroundColor: "#1e88e5",
                  },
                }}
              >
                Search
              </Button>
            </Grid>
          </Grid>

          {/* LOADER */}
          {loading && (
            <Box sx={{ textAlign: "center", marginTop: "20px" }}>
              <CircularProgress thickness={4} />
            </Box>
          )}

          {/* ERROR */}
          {error && (
            <Typography 
              sx={{ 
                marginTop: "20px", 
                textAlign: "center",
                color: "#d32f2f",
                fontWeight: 600,
              }}
            >
              {error}
            </Typography>
          )}
        </Box>
      </MainCard>

      {/* Search Result Table */}
      {policyDetails && policyDetails?.length > 0 && (
        <Box sx={{ mt: 4 }}>
          <Typography 
            variant="h6" 
            sx={{ fontWeight: 700, mb: 2, color: "#1e3a8a" }}
          >
            Available Policies
          </Typography>
          <TableContainer component={Paper} elevation={3} sx={{ borderRadius: "8px" }}>
            <Table>
              <TableHead>
                <TableRow sx={{ backgroundColor: "#4527a0" }}>
                  <TableCell
                    sx={{
                      color: "white",
                      backgroundColor: "#4527a0",
                      fontWeight: 700,
                      padding: "12px",
                      textAlign: "center",
                    }}
                  >
                    Select
                  </TableCell>
                  <TableCell
                    sx={{
                      color: "white",
                      backgroundColor: "#4527a0",
                      fontWeight: 700,
                      padding: "12px",
                    }}
                  >
                    Policy ID
                  </TableCell>
                  <TableCell
                    sx={{
                      color: "white",
                      backgroundColor: "#4527a0",
                      fontWeight: 700,
                      padding: "12px",
                    }}
                  >
                    Account Holder Name
                  </TableCell>
                  <TableCell
                    sx={{
                      color: "white",
                      backgroundColor: "#4527a0",
                      fontWeight: 700,
                      padding: "12px",
                    }}
                  >
                    Policy Type
                  </TableCell>
                  <TableCell
                    sx={{
                      color: "white",
                      backgroundColor: "#4527a0",
                      fontWeight: 700,
                      padding: "12px",
                      textAlign: "center",
                    }}
                  >
                    Status
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {policyDetails
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((policy, index) => (
                    <TableRow 
                      key={index}
                      sx={{
                        "&:hover": { backgroundColor: "#f5f5f5" },
                        borderBottom: "1px solid #e0e0e0",
                      }}
                    >
                      <TableCell sx={{ textAlign: "center", padding: "12px" }}>
                        <Button
                          variant="contained"
                          size="small"
                          onClick={() => handleSearch(policy.policyNumber)}
                          sx={{
                            backgroundColor: "#1565c0",
                            fontWeight: 600,
                            "&:hover": {
                              backgroundColor: "#1e88e5",
                            },
                          }}
                        >
                          Select
                        </Button>
                      </TableCell>
                      <TableCell sx={{ fontWeight: 600, padding: "12px" }}>
                        {policy.policyNumber}
                      </TableCell>
                      <TableCell sx={{ padding: "12px" }}>
                        {policy.accountHolderName}
                      </TableCell>
                      <TableCell sx={{ padding: "12px" }}>
                        {policy.policyType}
                      </TableCell>
                      <TableCell sx={{ textAlign: "center", padding: "12px" }}>
                        <Box
                          sx={{
                            display: "inline-block",
                            padding: "6px 12px",
                            borderRadius: "4px",
                            backgroundColor:
                              policy.status === "In Force"
                                ? "#e8f5e9"
                                : policy.status === "Under Review"
                                  ? "#fff3e0"
                                  : "#ffebee",
                            color:
                              policy.status === "In Force"
                                ? "#2e7d32"
                                : policy.status === "Under Review"
                                  ? "#f57c00"
                                  : "#c62828",
                            fontWeight: 600,
                            fontSize: "0.875rem",
                          }}
                        >
                          {policy.status}
                        </Box>
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
            {/* Pagination Controls */}
            <TablePagination
              component="div"
              count={policyDetails?.length}
              page={page}
              onPageChange={handleChangePage}
              rowsPerPage={rowsPerPage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              rowsPerPageOptions={[5, 10, 25]}
            />
          </TableContainer>
        </Box>
      )}
    </Box>
  );
};

export default PolicySearch;
