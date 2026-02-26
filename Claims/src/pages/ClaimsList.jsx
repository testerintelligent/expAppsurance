import React, { useEffect, useState } from 'react';
import { Box, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button, Typography, Chip } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const api = axios.create({ baseURL: process.env.REACT_APP_API_URL || 'http://10.192.190.158:5000/api' });

export default function ClaimsList() {
  const [claims, setClaims] = useState([]);
  const navigate = useNavigate();

  const fetch = async () => {
    try {
      const res = await api.get('/claims/list');
      setClaims(res.data.claims || []);
    } catch (err) {
      console.error(err);
    }
  };

  const colorMap = {
    Open: 'success',
    Approved: 'success',
    Rejected: 'error',
    Closed: 'error'
  };

  useEffect(() => {
    fetch();
    const handler = (e) => {
      // when a claim is created elsewhere, refresh list
      fetch();
    };
    window.addEventListener('claimCreated', handler);
    return () => window.removeEventListener('claimCreated', handler);
  }, []);

  return (
    <Box p={4} sx={{ backgroundColor: '#f5f7fa', minHeight: '100vh' }}>
      {/* Header */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          mb: 3
        }}
      >
        <Typography variant="h5" fontWeight={600} color="black">
          Claims
        </Typography>

        <Box>
          <Button
            variant="outlined"
            sx={{ mr: 2, px: 3 }}
            onClick={fetch}
          >
            Refresh
          </Button>
          <Button
            variant="contained"
            sx={{ px: 3 }}
            onClick={() => navigate('/claims/create')}
          >
            Create Claim
          </Button>
        </Box>
      </Box>

      {/* Table */}
      <TableContainer
        component={Paper}
        elevation={3}
        sx={{
          borderRadius: 3,
          overflow: 'hidden',
          maxHeight: 600
        }}
      >
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              {["Claim ID", "Policy ID", "Insured", "Date of Loss", "Status"].map(
                (head) => (
                  <TableCell
                    key={head}
                    sx={{
                      fontWeight: 700,
                      backgroundColor: "#f4f6f8",
                      py: 2
                    }}
                  >
                    {head}
                  </TableCell>
                )
              )}
            </TableRow>
          </TableHead>

          <TableBody>
            {claims.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} align="center" sx={{ py: 6 }}>
                  <Typography color="text.secondary">
                    No claims found.
                  </Typography>
                </TableCell>
              </TableRow>
            ) : (
              claims.map((c, index) => (
                <TableRow
                >
                  <TableCell key={c.claimNumber}

                    hover
                    onClick={() => navigate(`/Claim/summary/${c.claimNumber}`)}
                    sx={{
                      py: 2,
                      cursor: "pointer",
                      backgroundColor: index % 2 === 0 ? "#ffffff" : "#fafafa",
                      transition: "all 0.2s ease",
                      "&:hover": {
                        backgroundColor: "#eef3ff",
                        transform: "scale(1.002)"
                      }
                    }}
                  >
                    <Typography fontWeight={400} color="primary">
                      {c.claimNumber}
                    </Typography>
                  </TableCell>

                  <TableCell sx={{ py: 2 }}>
                    {c.policyNumber}
                  </TableCell>

                  <TableCell sx={{ py: 2 }}>
                    {c.insured?.name}
                  </TableCell>

                  <TableCell sx={{ py: 2 }}>
                    {new Date(c.lossDate).toLocaleDateString("en-GB")}
                  </TableCell>

                  <TableCell sx={{ py: 2 }}>
                    <Chip
                      label={c.status}
                      size="small"
                      sx={{
                        fontWeight: 600,
                        borderRadius: "8px",
                        backgroundColor:
                          c.status === "Closed"
                            ? "#e6f4ea"
                            : c.status === "Rejected"
                              ? "#fdecea"
                              : c.status === "Open"
                                ? "#fff4e5"
                                : "#f0f0f0",
                        color:
                          c.status === "Closed"
                            ? "#2e7d32"
                            : c.status === "Rejected"
                              ? "#d32f2f"
                              : c.status === "Open"
                                ? "#ed6c02"
                                : "#555"
                      }}
                    />
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
