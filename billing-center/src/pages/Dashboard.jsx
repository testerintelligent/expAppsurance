import React, { useState } from "react";
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  RadioGroup,
  FormControlLabel,
  Radio,
  FormControl,
  Select,
  MenuItem,
  InputLabel,
  Grid,
  Divider,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@mui/material";
import { searchPolicy } from "./DashboardApi";
import { RestartAltOutlined } from "@mui/icons-material";

const Dashboard = () => {
  const [policyNumber, setPolicyNumber] = useState("");
  const [policyData, setPolicyData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSearch = async ({ policyNumber }) => {
    // if (!policyNumber) {
    //   alert("Please enter a Policy Number");
    //   return;
    // }

    // setLoading(true);
    // setError(null);

    try {
      const result = await searchPolicy(policyNumber);
      console.log("reusltPolicy", result.data); // now accountId is used
      setPolicyData(result.data);
      setLoading(false);
    } catch (err) {
      setError("Failed to fetch policy details");
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setPolicyNumber(e.target.value);
  };

  return (
    <Box sx={{ width: "100%", maxWidth: 1200, mx: "auto", mt: 2 }}>
      <Paper sx={{ p: 3, mb: 3 }}>
        <Typography
          variant="h6"
          sx={{ fontWeight: "bold", fontSize: 16, pb: 2 }}
        >
          Search Policy
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Policy No"
              name="policyNo"
              value={policyNumber}
              onChange={handleChange}
            />
          </Grid>
          <Grid>
            <Button
              variant="contained"
              color="primary"
              onClick={handleSearch}
              sx={{ mt: 2 }}
            >
              Search
            </Button>
          </Grid>
        </Grid>
      </Paper>

      {loading && (
        <Box sx={{ textAlign: "center", marginTop: "20px" }}>
          <CircularProgress thickness={4} />
        </Box>
      )}

      {error && (
        <Typography
          color="error"
          sx={{ marginTop: "20px", textAlign: "center" }}
        >
          {error}
        </Typography>
      )}
      {policyData && (
        <Paper sx={{ width: "100%", maxWidth: 1200, mx: "auto", mt: 2 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell></TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </Paper>
      )}
    </Box>
  );
};

export default Dashboard;
