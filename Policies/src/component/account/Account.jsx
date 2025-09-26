import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Paper,
  Grid,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody
} from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import { searchAccountByContact, searchAccount } from "./accountAPI";

export default function Account() {
  const location = useLocation();
  const navigate = useNavigate();
  const [accountData, setAccountData] = useState(null);
  const [searchData, setSearchData] = useState({
    accountNo: "",
    firstName: "",
    lastName: "",
    dateOfBirth: ""
  });

  // Case 1: Navigated from Contact screen
  useEffect(() => {
    if (location.state?.account) {
      setAccountData(location.state.account);
    } else if (location.state?.contact) {
      // fallback: fetch account by contact if only contact is passed
      searchAccountByContact(location.state.contact._id).then(setAccountData);
    }
  }, [location.state]);

  // Input change
  const handleChange = (e) => {
    setSearchData({ ...searchData, [e.target.name]: e.target.value });
  };

  // Case 2: Search via Dashboard
  const handleSearch = async () => {
    try {
      const result = await searchAccount(searchData);
      setAccountData(result);
    } catch (err) {
      alert("Account not found");
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      {/* If user didn’t come from contact, show search form */}
      {!location.state?.contact && (
        <Paper sx={{ p: 3, mb: 3 }}>
          <Typography variant="h6">Search Account</Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Account No"
                name="accountNo"
                value={searchData.accountNo}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="First Name"
                name="firstName"
                value={searchData.firstName}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Last Name"
                name="lastName"
                value={searchData.lastName}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                type="date"
                fullWidth
                label="DOB"
                name="dateOfBirth"
                InputLabelProps={{ shrink: true }}
                value={searchData.dateOfBirth}
                onChange={handleChange}
              />
            </Grid>
          </Grid>
          <Button
            variant="contained"
            color="primary"
            onClick={handleSearch}
            sx={{ mt: 2 }}
          >
            Search
          </Button>
        </Paper>
      )}

      {/* Account Details */}
      {accountData && (
        <Paper sx={{ p: 4, borderRadius: 4, background: 'linear-gradient(135deg, #f8fafc 60%, #e0e7ef 100%)', boxShadow: 6 }}>
          <Typography variant="h4" fontWeight={700} color="#1976d2" gutterBottom>Account Information</Typography>
          <Grid container spacing={3}>
            {/* Contact Information on the left */}
            <Grid item xs={12} md={4}>
              <Box sx={{
                p: 3,
                borderRadius: 4,
                background: 'linear-gradient(135deg, #e3f0ff 60%, #f9fafb 100%)',
                boxShadow: 3,
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start',
                gap: 1.5
              }}>
                <Typography variant="h5" fontWeight={700} color="#1565c0" gutterBottom sx={{ mb: 2 }}>Contact Information</Typography>
                {location.state?.account?.customerId ? (
                  <>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                      <Typography><b>Name:</b> {location.state.account.customerId.firstName} {location.state.account.customerId.lastName}</Typography>
                      <Typography><b>Email:</b> {location.state.account.customerId.email}</Typography>
                      <Typography><b>Phone:</b> {location.state.account.customerId.phone}</Typography>
                      <Typography><b>DOB:</b> {location.state.account.customerId.dateOfBirth?.slice(0,10)}</Typography>
                      <Typography><b>City:</b> {location.state.account.customerId.city}</Typography>
                      <Typography><b>Zip Code:</b> {location.state.account.customerId.zipCode}</Typography>
                      <Typography><b>Address:</b> {location.state.account.customerId.address}</Typography>
                    </Box>
                  </>
                ) : accountData.customerId ? (
                  <>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                      <Typography><b>Name:</b> {accountData.customerId.firstName} {accountData.customerId.lastName}</Typography>
                      <Typography><b>Email:</b> {accountData.customerId.email}</Typography>
                      <Typography><b>Phone:</b> {accountData.customerId.phone}</Typography>
                      <Typography><b>DOB:</b> {accountData.customerId.dateOfBirth?.slice(0,10)}</Typography>
                      <Typography><b>City:</b> {accountData.customerId.city}</Typography>
                      <Typography><b>Zip Code:</b> {accountData.customerId.zipCode}</Typography>
                      <Typography><b>Address:</b> {accountData.customerId.address}</Typography>
                    </Box>
                  </>
                ) : (
                  <Typography>No contact information available.</Typography>
                )}
              </Box>
            </Grid>
            {/* Account Info and Policies on the right */}
            <Grid item xs={12} md={8} sx={{ position: 'relative' }}>
              <Grid container spacing={2} sx={{ mb: 2 }}>
                <Grid item xs={12} sm={6} md={6}><Box sx={{ bgcolor: '#e3f2fd', p: 2, borderRadius: 2 }}><Typography variant="subtitle2">Account ID</Typography><Typography fontWeight={600}>{accountData.accountId}</Typography></Box></Grid>
                <Grid item xs={12} sm={6} md={6}><Box sx={{ bgcolor: '#e8f5e9', p: 2, borderRadius: 2 }}><Typography variant="subtitle2">Status</Typography><Typography fontWeight={600}>{accountData.status}</Typography></Box></Grid>
                <Grid item xs={12} sm={6} md={6}><Box sx={{ bgcolor: '#fff3e0', p: 2, borderRadius: 2 }}><Typography variant="subtitle2">Account Type</Typography><Typography fontWeight={600}>{accountData.accountType}</Typography></Box></Grid>
                <Grid item xs={12} sm={6} md={6}><Box sx={{ bgcolor: '#f3e5f5', p: 2, borderRadius: 2 }}><Typography variant="subtitle2">Created At</Typography><Typography fontWeight={600}>{new Date(accountData.createdAt).toLocaleString()}</Typography></Box></Grid>
              </Grid>
              <Typography variant="h5" fontWeight={600} color="#2c3e50" sx={{ mt: 2, mb: 2 }}>Policies</Typography>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Policy ID</TableCell>
                    <TableCell>Type</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell>Premium</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {accountData.policies && accountData.policies.length > 0 ? (
                    accountData.policies.map((policy) => (
                      <TableRow key={policy._id}>
                        <TableCell>{policy.policyId}</TableCell>
                        <TableCell>{policy.policyType}</TableCell>
                        <TableCell>{policy.status}</TableCell>
                        <TableCell>{policy.premium}</TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={4} align="center">No policies found</TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
              {/* Create New Submission Button at right bottom */}
              <Box sx={{ position: 'absolute', right: 0, bottom: 0, m: 2 }}>
                <Button
                  variant="contained"
                  color="primary"
                  sx={{ fontWeight: 600, borderRadius: 2, minWidth: 220 }}
                  onClick={() => navigate('/new-submission', {
                    state: {
                      account: accountData,
                      contact: accountData.customerId
                    }
                  })}
                >
                  Create New Submission
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Paper>
      )}
    </Box>
  );
}
