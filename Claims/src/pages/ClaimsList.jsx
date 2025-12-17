import React, { useEffect, useState } from 'react';
import { Box, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button, Typography } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const api = axios.create({ baseURL: process.env.REACT_APP_API_URL || 'http://10.192.190.158:5000/api' });

export default function ClaimsList() {
  const [claims, setClaims] = useState([]);
  const navigate = useNavigate();

  const fetch = async () => {
    try {
      const res = await api.get('/claims');
      setClaims(res.data.claims || []);
    } catch (err) {
      console.error(err);
    }
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
    <Box p={3}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="h5">Claims</Typography>
        <Box>
          <Button variant="outlined" sx={{ mr: 2 }} onClick={fetch}>Refresh</Button>
          <Button variant="contained" onClick={() => navigate('/claims/create')}>Create Claim</Button>
        </Box>
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Claim #</TableCell>
              <TableCell>Policy #</TableCell>
              <TableCell>Claimant</TableCell>
              <TableCell>Date of Loss</TableCell>
              <TableCell>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {claims.map((c) => (
              <TableRow key={c._id}>
                <TableCell>{c.claimNumber}</TableCell>
                <TableCell>{c.policyNumber}</TableCell>
                <TableCell>{c.claimantName}</TableCell>
                <TableCell>{new Date(c.dateOfLoss).toLocaleDateString()}</TableCell>
                <TableCell>{c.status}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
