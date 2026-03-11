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

import PolicyTitleBar from "./PolicyTitleBar";


const styles = {
  container: {
    padding: 24,
    fontFamily: 'Inter, Arial, sans-serif',
    color: '#1f2937',
    maxWidth: 1400,
    margin: '0 auto',
  },

  header: {
    display: 'flex',
    alignItems: 'center',
    gap: 16,
    background: 'linear-gradient(90deg, #3b82f6, #2563eb)',
    color: '#fff',
    padding: '16px 24px',
    borderRadius: 8,
    marginBottom: 32,
    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
  },

  headerText: { fontWeight: 700, fontSize: 20 },
  headerSubText: { fontWeight: 400, color: 'rgba(255,255,255,0.8)', fontSize: 14 },
  statusBadge: {
    padding: '6px 14px',
    borderRadius: 999,
    color: '#fff',
    fontWeight: 600,
    fontSize: 12,
  },

  summaryTitle: {
    fontSize: 24,
    fontWeight: 700,
    marginBottom: 20,
    color: '#004b50',
    marginTop: 10
  },

  grid: {
    display: 'grid',
    gridTemplateColumns: '2fr 1fr',
    gap: 32,
  },

  section: {
    marginBottom: 32,
    background: '#ffffff',
    borderRadius: 12,
    padding: 20,
    boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
  },

  sectionTitle: {
    fontWeight: 700,
    fontSize: 16,
    borderBottom: '2px solid #e5e7eb',
    paddingBottom: 8,
    marginBottom: 16,
    color: '#004b50',
  },

  row: {
    display: 'grid',
    gridTemplateColumns: '180px 1fr',
    padding: '6px 0',
    fontSize: 14,
    alignItems: 'center',
  },

  label: { color: '#6b7280', fontSize: 14 },
  value: { fontWeight: 600, fontSize: 14 },

  link: {
    color: '#2563eb',
    cursor: 'pointer',
    textDecoration: 'underline',
  },

  money: {
    textAlign: 'right',
    fontWeight: 600,
    color: '#059669',
  },

  emphasizedMoney: {
    textAlign: 'right',
    fontWeight: 800,
    fontSize: 16,
    color: '#047857',
  },

  card: {
    background: '#f9fafb',
    borderRadius: 10,
    padding: 12,
    marginBottom: 12,
    boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
  },

  aside: {
    display: 'flex',
    flexDirection: 'column',
    gap: 20,
  },

  asideCard: {
    background: '#ffffff',
    borderRadius: 12,
    padding: 16,
    boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
  },

  colorbg: {
    background: '#805CE5',
  },

  button: {
    padding: '10px 16px',
    borderRadius: 8,
    fontWeight: 600,
    cursor: 'pointer',
    border: 'none',
  },

  primaryBtn: {
    backgroundColor: '#004b50', color: '#fff', "&:hover": {
      backgroundColor: "#00363a",
    }
  },
  secondaryBtn: {
    borderColor: "#004b50", color: '#004b50', "&:hover": {
      backgroundColor: "#00363a10",
      borderColor: "#00363a",
      color: "#00363a",
    }
  },
};

export default function ClaimSummary() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [claim, setClaim] = useState(null);
  const [error, setError] = useState(null);


  const api = axios.create({
    baseURL:
      process.env.REACT_APP_API_URL || "http://localhost:5000/api"
  });

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
        <Box>
          <PolicyTitleBar
            policyNumber={claim.policyNumber}
            claimNumber={claim.claimNumber}
            lossDate={claim.lossDate}
            status='Open'
          >
          </PolicyTitleBar>
        </Box>

        <div style={styles.summaryTitle}>Claim Summary</div>
        <div style={styles.grid}>
          {/* Left column */}
          <div>
            {/* Policy Dates & Term */}
            <div style={styles.section}>
              <div style={styles.sectionTitle}>Basics</div>
              <div style={styles.row}><div style={styles.label}>Loss Date</div><div style={styles.value}> {new Date(claim.lossDate).toLocaleDateString("en-GB")}</div></div>
              <div style={styles.row}><div style={styles.label}>Loss Type</div><div style={styles.value}>{claim.claimType}</div></div>
              <div style={styles.row}><div style={styles.label}>How Reported</div><div style={styles.value}> {claim.howReported}</div></div>
              <div style={styles.row}><div style={styles.label}>Reported By</div><div style={styles.value}>{claim.reportedBy}</div></div>
              <div style={styles.row}><div style={styles.label}>Relation To Insured</div><div style={styles.value}>{claim.relationToInsured}</div></div>
              <div style={styles.row}><div style={styles.label}>Incident Only ?</div><div style={styles.value}>{claim.incidentOnly ? 'Yes' : 'NO'}</div></div>


            </div>

            {/* Premium & Charges */}
            <div style={styles.section}>
              <div style={styles.sectionTitle}>Loss Details</div>

              <div style={{ ...styles.row, fontSize: 16 }}><div style={styles.label}>Loss Cause</div><div style={styles.value}>{claim.lossCause || 'None'}</div></div>
              <div style={{ ...styles.row, fontSize: 16 }}><div style={styles.label}>Loss Location</div><div style={styles.value}>{claim.lossLocation || 'None'}</div></div>
              <div style={{ ...styles.row, fontSize: 16 }}><div style={styles.label}>Loss Description</div><div style={styles.value}>{claim.lossDescription || 'None'}</div></div>
              <div style={styles.row}><div style={styles.label}>Notice Date</div><div style={styles.value}>{new Date(claim.dateOfNotice).toLocaleDateString("en-GB")}</div></div>
              <div style={{ height: 8 }} />
              <div style={{ ...styles.row, fontSize: 16 }}><div style={styles.label}>Fault Rating</div><div style={styles.value}>{claim.faultRating || 'None'}</div></div>
              <div style={styles.row}><div style={styles.label}>Weather Date</div><div style={styles.value}>{claim.weather}</div></div>

            </div>

            {/* Coverages */}
            <div style={styles.section}>
              <div style={styles.sectionTitle}>Policy</div>
              <div style={styles.row}><div style={styles.label}>Policy  Number</div><div style={styles.value}>{claim.policyId.policyNumber}</div></div>
              <div style={styles.row}><div style={styles.label}>Type </div><div style={styles.value}>{claim.policyId.productType}</div></div>
              <div style={styles.row}><div style={styles.label}>Effective Date </div><div style={styles.value}>{new Date(claim.policyId.effectiveDate).toLocaleDateString('en-GB')}</div></div>
              <div style={styles.row}><div style={styles.label}>Expiration Date Date </div><div style={styles.value}>{new Date(claim.policyId.expiryDate).toLocaleDateString('en-GB')}</div></div>

            </div>
          </div>

          {/* Right column / aside */}
          <aside style={styles.aside}>
            {/* Customer Info */}
            <div style={{ ...styles.asideCard, background: '#6846c6' }}>
              <div style={{ fontWeight: 700, marginBottom: 6 }}>Insured </div>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                <li style={styles.card}>
                  <div style={{ color: '#6b7280' }}>Name</div>
                  <div style={{ fontWeight: 600 }}>{claim.insured.name}</div>
                  <div style={{ color: '#6b7280', marginTop: 8 }}>Phone</div>
                  <div style={{ fontWeight: 600 }}>{claim.insured.phone}</div>
                  <div style={{ color: '#6b7280', marginTop: 8 }}>Contact</div>
                  <div style={{ fontWeight: 600 }}>{claim.insured.address}</div>
                </li>
              </ul>

            </div>

            {/* Vehicles */}
            <div style={{ ...styles.asideCard, ...styles.colorbg }}>
              <div style={{ fontWeight: 700, marginBottom: 8 }}>Vehicle(s)</div>
              {Array.isArray(claim.vehicles) && claim.vehicles.length > 0 ? (
                <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                  {claim.vehicles.map((v, i) => (
                    <li key={i} style={styles.card}>
                      <div style={{ fontWeight: 700 }}>{v.make} {v.model} <span style={{ color: '#6b7280', fontWeight: 500 }}>• {v.year}</span></div>
                      <div style={{ color: '#6b7280', fontSize: 13 }}>VIN: {v.vin}</div>
                      <div style={{ color: '#6b7280', fontSize: 13 }}>Reg: {v.licensePlate || 'N/A'}</div>
                    </li>
                  ))}
                </ul>
              ) : <div style={{ color: '#6b7280' }}>No vehicles recorded</div>}
            </div>

            {/* Vehicles */}
            <div style={{ ...styles.asideCard, ...styles.colorbg }}>
              <div style={{ fontWeight: 700, marginBottom: 8 }}>Driver(s)</div>
              {Array.isArray(claim.drivers) && claim.drivers.length > 0 ? (
                <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                  {claim.drivers.map((d, i) => (
                    <li key={i} style={styles.card}>
                      <div style={{ fontWeight: 700 }}>{d.firstName} {d.lastName}</div>
                      <div style={{ color: '#6b7280', fontSize: 13 }}>Contact: {d.email}</div>
                      <div style={{ color: '#6b7280', fontSize: 13 }}>License Type: {d.licenseType || 'N/A'}</div>
                    </li>
                  ))}
                </ul>
              ) : <div style={{ color: '#6b7280' }}>No Drivers recorded</div>}
            </div>

            {/* Quick Actions */}
            <div style={styles.asideCard}>
              <div style={{ fontWeight: 700, marginBottom: 8 }}>Quick Actions</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>             
                <Button variant="contained" onClick={() => navigate('/claims')}>
                  Back to claims
                </Button>
                <Button variant="outlined" onClick={() => navigate('/Claim')}>
                  Create a new claim
                </Button>
              </div>
            </div>
          </aside>
        </div>

      </Paper>
    </Box>
  );
}
