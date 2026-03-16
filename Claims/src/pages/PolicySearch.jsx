import React, { useState, useEffect } from 'react';
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
  TableRow,
  TablePagination,
  TableSortLabel
} from '@mui/material';

import SearchIcon from '@mui/icons-material/Search';
import { useNavigate } from 'react-router-dom';

// Axios instance
const api = axios.create({
  baseURL:
    process.env.REACT_APP_API_URL || "http://localhost:5000/api"
});
// const api = axios.create({
//   baseURL: process.env.REACT_APP_API_URL || 'http://10.192.190.158:5000/api',
//   headers: { 'Content-Type': 'application/json' },
// });

export default function PolicySearchPage() {
  const [policyNumber, setPolicyNumber] = useState('');
  const [policyType, setPolicyType] = useState('');
  const [insured, setInsured] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [policies, setPolicies] = useState([]);
  const [page, setPage] = useState(0); // MUI starts from 0
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [total, setTotal] = useState(0);
  const [sortBy, setsortBy] = useState("issuedAt");
  const [order, setOrder] = useState("desc");

  // ✅ Store NORMALIZED policy object
  const [policyResponse, setPolicyResponse] = useState(null);

  const navigate = useNavigate();

  const api = axios.create({
    baseURL:
      process.env.REACT_APP_API_URL || "http://localhost:5000/api",
  });

  /* =========================
     LIST POLICIES (API)
    ========================= */

  const fetchData = async () => {
    try {
      const res = await api.get("/policies/getPoliciesForClaims", {
        params: {
          page: page + 1,
          limit: rowsPerPage,
          sortBy: sortBy,
          order,
          policyNumber: policyNumber,
          policyType: policyType,
          insured: insured


        },
      })
      setPolicies(res.data.policies || []);
      setTotal(res.data.total || 0);
    } catch (err) {
      console.error(err)
    }
  }

  useEffect(() => {
    fetchData();
  }, [page, rowsPerPage, sortBy, order]);

  const handleSearch = () => {
    fetchData();
  }

  const handleReset = () => {
    setPolicyNumber('');
    setInsured('');
    setPolicyType('');
    fetchData();
  }


  const handleSort = (property) => {
    const isAsc = sortBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setsortBy(property);
  };

  const columns = [
    { id: "policyNumber", label: "Policy Number", sort: true },
    { id: "insured", label: "Insured Name", sort: true },
    { id: "contact.address", label: "Address", sort: true },
    { id: "contact.city", label: "City", sort: true },
    { id: "contact.street", label: "State", sort: true },
    { id: "productType", label: "Product Type", sort: true },
    { id: "effectiveDate", label: "Effective Date", sort: false },
    { id: "expiryDate", label: "Expiry Date", sort: false }
  ];

  /* =========================
     🔍 SEARCH POLICY (API)
     ========================= */
  const handleSelect = async (policyNumber) => {
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

      // ✅ Persist normalized policy
      sessionStorage.setItem(
        'selectedPolicyForClaim',
        JSON.stringify(normalizedPolicy)
      );

      navigate('/Claim/CreateClaim', {
        state: { policy: normalizedPolicy },
      });
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


  };

  // Aliases
  const policy = policyResponse;
  const contact = policyResponse?.contact;

  return (
    <Box p={4}>
      <Paper elevation={3} sx={{ p: 3, maxWidth: 1200, margin: "0 auto" }}>
        <Typography variant="h5" gutterBottom>
          Search Policy
        </Typography>

        <Grid container spacing={2} alignItems="center" justifyContent="center" sx={{ mt: 1 }}>
          <Grid item size={{ xs: 6, md: 3 }}>
            <TextField
              label="Policy number"
              value={policyNumber}
              onChange={(e) => setPolicyNumber(e.target.value)}
              fullWidth
              size="small"
              onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
            />
          </Grid>
          <Grid item size={{ xs: 6, md: 3 }}>
            <TextField
              label="Insured"
              value={insured}
              onChange={(e) => setInsured(e.target.value)}
              fullWidth
              size="small"
              onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
            />
          </Grid>
          <Grid item size={{ xs: 6, md: 3 }}>
            <TextField
              label="Policy Type"
              value={policyType}
              onChange={(e) => setPolicyType(e.target.value)}
              fullWidth
              size="small"
              onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
            />
          </Grid>
          <Grid item size={{ xs: 4, md: 1 }}>
            <Button
              variant="outlined"
              onClick={handleReset}
              disabled={loading}
            >
              Reset
            </Button>
          </Grid>
          <Grid item size={{ xs: 4, md: 2 }}>
            <Button
              variant="contained"
              startIcon={
                loading ? <CircularProgress size={18} color="inherit" /> : <SearchIcon />
              }
              onClick={handleSearch}
              disabled={loading}

            >
              {loading ? 'Searching...' : 'Search'}
            </Button>
          </Grid>
        </Grid>

        {error && (
          <Typography color="error" sx={{ mt: 2 }}>
            {error}
          </Typography>
        )}


        <Box sx={{ mt: 2 }}>
          <TableContainer component={Paper} sx={{ mb: 2 }}>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell>Select</TableCell>
                  {columns.map((column) => (
                    <TableCell
                      key={column.id}
                      sx={{ fontWeight: 700, backgroundColor: "#f4f6f8" }}                >
                      {column.sort ? (<TableSortLabel
                        active={sortBy === column.id}
                        direction={sortBy === column.id ? order : "asc"}
                        onClick={() => handleSort(column.id)}
                      >
                        {column.label}
                      </TableSortLabel>) : (column.label)}

                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>

              <TableBody>

                {policies.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={8} align="center" sx={{ py: 6 }}>
                      <Typography color="text.secondary">
                        No policies found.
                      </Typography>
                    </TableCell>
                  </TableRow>
                ) :
                  (
                    policies.map((p, index) => (
                      <TableRow key={index}>
                        <TableCell>
                          <Button                           
                            variant="contained"
                            onClick={() => handleSelect(p.policyNumber)}
                          >
                            Select
                          </Button></TableCell>
                        <TableCell>{p.policyNumber}</TableCell>

                        <TableCell>
                          {p.contact
                            ? `${p.contact.firstName || ''} ${p.contact.lastName || ''
                              }`.trim()
                            : 'N/A'}
                        </TableCell>

                        <TableCell>
                          {p.contact?.address ||
                            p.contact?.street ||
                            'N/A'}
                        </TableCell>

                        <TableCell>{p.contact?.city || 'N/A'}</TableCell>
                        <TableCell>{p.contact?.state || 'N/A'}</TableCell>

                        <TableCell>{p.productType || 'N/A'}</TableCell>

                        <TableCell>
                          {p.effectiveDate
                            ? new Date(
                              p.effectiveDate
                            ).toLocaleDateString()
                            : 'N/A'}
                        </TableCell>

                        <TableCell>
                          {p.expiryDate
                            ? new Date(
                              p.expiryDate
                            ).toLocaleDateString()
                            : 'N/A'}
                        </TableCell>
                      </TableRow>
                    ))
                  )}
              </TableBody>
            </Table>
          </TableContainer>

          {/* Pagination */}
          <TablePagination
            component="div"
            count={total}
            page={page}
            onPageChange={(e, newPage) => setPage(newPage)}
            rowsPerPage={rowsPerPage}
            onRowsPerPageChange={(e) => {
              setRowsPerPage(parseInt(e.target.value, 10));
              setPage(0);
            }}
            rowsPerPageOptions={[5, 10, 25, 50]}
          />
        </Box>
      </Paper>
    </Box>
  );
}
