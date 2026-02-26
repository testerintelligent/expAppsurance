import React, { useState } from 'react';
import axios from 'axios';
import {
  Box,
  Paper,
  TextField,
  Button,
  CircularProgress,
  Typography,
  Grid,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow
} from '@mui/material';

import SearchIcon from '@mui/icons-material/Search';
import { useNavigate } from 'react-router-dom';

// Axios instance
const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://10.192.190.158:5000/api',
  headers: { 'Content-Type': 'application/json' },
});

export default function PolicySearchPage() {
  const [policyNumber, setPolicyNumber] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // ✅ Store NORMALIZED policy object
  const [policyResponse, setPolicyResponse] = useState(null);

  const navigate = useNavigate();

  /* =========================
     🔍 SEARCH POLICY (API)
     ========================= */
  const handleSearch = async () => {
    if (!policyNumber) {
      setError('Please enter a policy number');
      return;
    }

    setLoading(true);
    setError(null);
    setPolicyResponse(null);

    try {
      const res = await api.get(
        `/policies/getPolicyByNumber/${encodeURIComponent(policyNumber)}`
      );

      if (!res.data || !res.data.policy) {
        setError('Policy not found');
        return;
      }

      const payload = res.data;

      // ✅ Normalize API response
      const normalizedPolicy = {
        ...payload.policy,
        contact: payload.contact,
        account: payload.account,
        vehicle: payload.vehicle || [],
        driver: payload.driver || [],
      };

      setPolicyResponse(normalizedPolicy);
    } catch (err) {
      console.error(err);
      setError(
        err?.response?.data?.message || 'Policy not found or server error'
      );
    } finally {
      setLoading(false);
    }
  };

  /* =========================
     ➡️ PROCEED TO CLAIM
     ========================= */
  const handleProceedToClaim = () => {
    if (!policyResponse) {
      setError('Select a policy first');
      return;
    }

    // ✅ Persist normalized policy
    sessionStorage.setItem(
      'selectedPolicyForClaim',
      JSON.stringify(policyResponse)
    );

    navigate('/Claim/CreateClaim', {
      state: { policy: policyResponse },
    });
  };

  // Aliases
  const policy = policyResponse;
  const contact = policyResponse?.contact;

  return (
    <Box p={4}>
      <Paper elevation={3} sx={{ p: 3, maxWidth: 920, margin: '0 auto' }}>
        <Typography variant="h5" gutterBottom>
          Find a Policy
        </Typography>
        <Typography variant="body2" color="text.secondary" gutterBottom>
          Enter a policy number to fetch policy and insured details.
        </Typography>
        <Grid container spacing={2} alignItems="center" justifyContent="center" sx={{ mt: 1 }}>
          <Grid item size={{ xs: 6, md: 8 }}>
            <TextField
              label="Search by policy number"
              value={policyNumber}
              onChange={(e) => setPolicyNumber(e.target.value)}
              fullWidth
              size="small"
              onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
            />
          </Grid>
          <Grid item size={{ xs: 6, md: 3 }}>
            <Button
              variant="contained"
              startIcon={
                loading ? <CircularProgress size={18} color="inherit" /> : <SearchIcon />
              }
              onClick={handleSearch}
              disabled={loading}

              sx={{
                backgroundColor: '#004b50',
                color: '#fff',
                '&:hover': {
                  backgroundColor: '#00363a',
                },
              }}
            >
              {loading ? 'Searching...' : 'Search Policy'}
            </Button>
          </Grid>
        </Grid>

        {error && (
          <Typography color="error" sx={{ mt: 2 }}>
            {error}
          </Typography>
        )}

        <Divider sx={{ my: 3 }} />

        {/* =========================
            📋 POLICY RESULT TABLE
           ========================= */}
        {policy ? (
          <Box>
            <TableContainer component={Paper} sx={{ mb: 2 }}>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell>Policy Number</TableCell>
                    <TableCell>Insured Name</TableCell>
                    <TableCell>Address</TableCell>
                    <TableCell>City</TableCell>
                    <TableCell>State</TableCell>
                    <TableCell>Product Type</TableCell>
                    <TableCell>Effective Date</TableCell>
                    <TableCell>Expiry Date</TableCell>
                  </TableRow>
                </TableHead>

                <TableBody>
                  <TableRow>
                    <TableCell>{policy.policyNumber}</TableCell>

                    <TableCell>
                      {contact
                        ? `${contact.firstName || ''} ${contact.lastName || ''
                          }`.trim()
                        : 'N/A'}
                    </TableCell>

                    <TableCell>
                      {contact?.address ||
                        contact?.street ||
                        'N/A'}
                    </TableCell>

                    <TableCell>{contact?.city || 'N/A'}</TableCell>
                    <TableCell>{contact?.state || 'N/A'}</TableCell>

                    <TableCell>{policy.productType || 'N/A'}</TableCell>

                    <TableCell>
                      {policy.effectiveDate
                        ? new Date(
                          policy.effectiveDate
                        ).toLocaleDateString()
                        : 'N/A'}
                    </TableCell>

                    <TableCell>
                      {policy.expiryDate
                        ? new Date(
                          policy.expiryDate
                        ).toLocaleDateString()
                        : 'N/A'}
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>

            <Box display="flex" justifyContent="flex-end">
              <Button variant="contained" onClick={handleProceedToClaim}>
                Create Claim
              </Button>
            </Box>
          </Box>
        ) : (
          <Typography variant="body2" color="text.secondary">
            No policy selected. Search above to fetch a policy.
          </Typography>
        )}
      </Paper>
    </Box>
  );
}
