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
} from "@mui/material";
import { Search as SearchIcon } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
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
    const policyId = policyNum || policyNumber;

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
      <Paper sx={{ p: 3 }}>

        <Typography variant="h6" sx={{ fontWeight: "bold", fontSize: 16 }}>
          Search Policy
        </Typography>
        <Grid container spacing={2}>
          <Grid item size={{ xs: 10, md: 10 }}>
            <TextField
              fullWidth
              label="Policy Number"
              name="Search by policy number"
              value={policyNumber}
              onChange={(e) => setPolicyNumber(e.target.value)}
            />
          </Grid>
          <Grid className="flex items-start">
            <Button
              variant="contained"
              onClick={handleSearch}
              className="self-center"
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
          <Typography color="error" sx={{ marginTop: "20px", textAlign: "center" }}>
            {error}
          </Typography>
        )}
        {/* Search Result Table */}
        {policyDetails && policyDetails?.length > 0 && (
          <TableContainer component={Paper} sx={{ mt: 3 }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Select</TableCell>
                  <TableCell>Policy ID</TableCell>
                  <TableCell>Account Holder Name</TableCell>
                  <TableCell>Policy Type</TableCell>
                  <TableCell>Status</TableCell>
                  {/* <TableCell>Zipcode</TableCell>
                      <TableCell>Address</TableCell> */}
                </TableRow>
              </TableHead>
              <TableBody>
                {policyDetails
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((policy, index) => (
                    <TableRow key={index}>
                      <TableCell>
                        <Button
                          variant="contained"
                          size="small"
                          onClick={() => handleSearch(policy.policyNumber)}
                        >
                          Select
                        </Button>
                      </TableCell>
                      <TableCell>{policy.policyNumber}</TableCell>
                      <TableCell>{policy.accountHolderName}</TableCell>
                      <TableCell>{policy.policyType}</TableCell>
                      <TableCell>{policy.status}</TableCell>
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
        )}
      </Paper>
    </Box>
  );
};

export default PolicySearch;
