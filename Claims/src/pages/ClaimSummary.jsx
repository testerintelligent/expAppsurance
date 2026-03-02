import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Box,
  Paper,
  Typography,
  Divider,
  Grid,
  Button,
  CircularProgress,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";

export default function ClaimSummary() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [claim, setClaim] = useState(null);
  const [error, setError] = useState(null);

  
const api = axios.create({ baseURL: process.env.REACT_APP_API_URL || 'http://10.192.190.158:5000/api' });

  useEffect(() => {
    let mounted = true;
    const fetchClaim = async () => {
      try {
        const res = await api.get(`/claims/search/${id}`);
        const data = res.data?.claim || res.data;
        if (mounted) {
          setClaim(data);
          setLoading(false);
        }
      } catch (err) {
        console.error("Error fetching claim:", err);
        if (mounted) {
          setError(err?.response?.data?.message || err.message || "Failed to load claim");
          setLoading(false);
        }
      }
    };
    fetchClaim();
    return () => (mounted = false);
  }, [id]);

  if (loading) {
    return (
      <Box p={4} display="flex" justifyContent="center">
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box p={4}>
        <Paper sx={{ p: 3 }}>
          <Typography color="error">{error}</Typography>
          <Button sx={{ mt: 2 }} variant="contained" onClick={() => navigate(-1)}>
            Back
          </Button>
        </Paper>
      </Box>
    );
  }

  if (!claim) {
    return (
      <Box p={4}>
        <Typography>No claim found.</Typography>
        <Button sx={{ mt: 2 }} variant="contained" onClick={() => navigate(-1)}>
          Back
        </Button>
      </Box>
    );
  }

  return (
    <Box p={4}>
      <Paper sx={{ p: 3, maxWidth: 1100, margin: "0 auto" }}>
        <Grid container justifyContent="space-between" alignItems="center">
          <Grid item>
            <Typography variant="h5">Claim Summary</Typography>
            <Typography variant="subtitle2" color="text.secondary">
              Claim: {claim.claimNumber || claim._id}
            </Typography>
          </Grid>
          <Grid item>
            <Button variant="outlined" onClick={() => navigate(-1)}>
              Back
            </Button>
          </Grid>
        </Grid>

        <Divider sx={{ my: 2 }} />

        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <Typography><strong>Status:</strong> {claim.status}</Typography>
            <Typography><strong>Date Created:</strong> {new Date(claim.createdAt).toLocaleString()}</Typography>
            <Typography><strong>Date of Loss:</strong> {claim.dateOfLoss ? new Date(claim.dateOfLoss).toLocaleString() : '—'}</Typography>
          </Grid>

          <Grid item xs={12} sm={6}>
            <Typography><strong>Policy:</strong> {claim.policyNumber || (claim.policyId && claim.policyId.policyNumber) || '—'}</Typography>
            <Typography><strong>Account:</strong> {claim.accountId?.toString ? claim.accountId.toString() : ''}</Typography>
            <Typography><strong>Contact:</strong> {claim.claimantName || (claim.contactId && (claim.contactId.firstName || claim.contactId.name) ? `${claim.contactId.firstName || claim.contactId.name} ${claim.contactId.lastName || ''}` : '')}</Typography>
          </Grid>
        </Grid>

        <Divider sx={{ my: 2 }} />

        <Typography variant="h6">Loss Description</Typography>
        <Typography sx={{ mb: 2 }}>{claim.lossDescription || '—'}</Typography>

        <Typography variant="h6">Vehicles</Typography>
        {claim.vehicles && claim.vehicles.length > 0 ? (
          <List dense>
            {claim.vehicles.map((v, i) => (
              <ListItem key={i}>
                <ListItemText primary={`${v.makeModel || (v.make && `${v.make} ${v.model}`) || ''}`} secondary={`Plate: ${v.licensePlate || v.plate || ''}  |  Estimate: ${v.damageEstimate || ''}`} />
              </ListItem>
            ))}
          </List>
        ) : (
          <Typography>No vehicles recorded.</Typography>
        )}

        <Typography variant="h6">Witnesses</Typography>
        {claim.witnesses && claim.witnesses.length > 0 ? (
          <List dense>
            {claim.witnesses.map((w, i) => (
              <ListItem key={i}>
                <ListItemText primary={w.name} secondary={w.statement || ''} />
              </ListItem>
            ))}
          </List>
        ) : (
          <Typography>No witnesses recorded.</Typography>
        )}

        <Typography variant="h6">Officials</Typography>
        {claim.officials && claim.officials.length > 0 ? (
          <List dense>
            {claim.officials.map((o, i) => (
              <ListItem key={i}><ListItemText primary={`${o.agency || o.type || ''} - ${o.name || ''}`} secondary={o.reportNo || ''} /></ListItem>
            ))}
          </List>
        ) : (
          <Typography>No officials recorded.</Typography>
        )}

        <Typography variant="h6">Police Reports</Typography>
        {claim.policeReports && claim.policeReports.length > 0 ? (
          <List dense>
            {claim.policeReports.map((p, i) => (
              <ListItem key={i}><ListItemText primary={`${p.type || ''} - ${p.reportNo || p.document || ''}`} secondary={p.status || ''} /></ListItem>
            ))}
          </List>
        ) : (
          <Typography>No police reports recorded.</Typography>
        )}

        <Divider sx={{ my: 2 }} />

        <Box display="flex" justifyContent="flex-end">
          <Button variant="contained" onClick={() => navigate('/claims')}>
            Back to Claims
          </Button>
        </Box>
      </Paper>
    </Box>
  );
}
