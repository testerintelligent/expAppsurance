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
  Table,
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
  const [error, setError] = useState(null);

  const handleSearch = async () => {
    if (!policyNumber) {
      alert("Please enter a Policy Number");
      return;
    }

    setError(null);

    try {
      const result = await searchPolicy(policyNumber);
      console.log("reusltPolicy", result); // now accountId is used
      setPolicyData(result);
    } catch (err) {
      setError("Failed to fetch policy details");
    }
  };

  const handleChange = (e) => {
    const { value } = e.target;
    setPolicyNumber(value.trim());
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

      {policyData?.account && policyData?.policy && (
        <div>
          <Typography variant="h6" sx={{ fontWeight: "bold", fontSize: 16 }}>
            Policy Details
          </Typography>
          <Paper sx={{ width: "100%", maxWidth: 1200, mx: "auto", mt: 2 }}>
            <Table>
              <TableHead>
                <TableRow
                  sx={{
                    "& th": {
                      fontWeight: "bold",
                    },
                  }}
                >
                  <TableCell>Customer Name</TableCell>
                  <TableCell>Policy Id</TableCell>
                  <TableCell>Policy Number</TableCell>
                  <TableCell>Product Type</TableCell>
                  <TableCell>Total Premium</TableCell>
                  <TableCell>Account Status</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell>
                    {policyData?.account?.accountHolderName ?? "-"}
                  </TableCell>
                  <TableCell>{policyData?.policy?.policyId ?? "-"}</TableCell>
                  <TableCell>
                    {policyData?.policy?.policyNumber ?? "-"}
                  </TableCell>
                  <TableCell>
                    {policyData?.policy?.productType ?? "-"}
                  </TableCell>
                  <TableCell>
                    {policyData?.policy?.totalPremium ?? "-"}
                  </TableCell>
                  <TableCell>{policyData?.account?.status ?? "-"}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </Paper>
        </div>
      )}
    </Box>
  );
};

export default Dashboard;
