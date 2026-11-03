// PolicySummary.jsx
import React, { useEffect, useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Chip
} from "@mui/material";
import api from '../../utils/api';
import { useLocation, useParams, useNavigate } from 'react-router-dom';

const styles = {
  container: { padding: 0, fontFamily: '"Segoe UI", Tahoma, Geneva, Verdana, sans-serif', color: "#1f2937", maxWidth: 1400, margin: "0 auto" },
  header: { display: "flex", alignItems: "center", gap: 16, background: "#f3f6f9", color: "#2e3e4c", padding: "10px 14px", borderBottom: "1px solid #d7dbe2", marginBottom: 16, border: "1px solid #d7dbe2" },
  headerText: { fontWeight: 700, fontSize: 14, color: "#2d3e52" },
  headerSubText: { fontWeight: 400, color: "#4c5d72", fontSize: 12 },
  statusBadge: { padding: "3px 10px", borderRadius: 2, fontWeight: 600, fontSize: 11 },
  summaryTitle: { fontSize: 15, fontWeight: 700, marginBottom: 12, color: "#2d3e52" },
  grid: { display: "grid", gridTemplateColumns: "2fr 1fr", gap: 14 },
  section: { marginBottom: 14, background: "#ffffff", border: "1px solid #d7dbe2" },
  sectionTitle: { fontWeight: 700, fontSize: 11, borderBottom: "1px solid #d7dbe2", padding: "7px 12px", color: "#2e3e4c", background: "#f3f6f9", textTransform: "uppercase", letterSpacing: 0.5 },
  row: { display: "flex", justifyContent: "space-between", padding: "5px 12px", borderBottom: "1px solid #f0f2f5", fontSize: 12, alignItems: "center" },
  label: { color: "#5a6a7a", fontSize: 12 },
  value: { fontWeight: 600, fontSize: 12, color: "#2d3e52" },
  link: { color: "#1f5fa6", cursor: "pointer", textDecoration: "underline", fontSize: 12 },
  money: { textAlign: "right", fontWeight: 600, color: "#2b7a3e", fontSize: 12 },
  emphasizedMoney: { textAlign: "right", fontWeight: 800, fontSize: 14, color: "#1f5fa6" },
  card: { background: "#f8fafb", border: "1px solid #e3e8ee", padding: "6px 10px", marginBottom: 4, fontSize: 12, color: "#3d5164" },
  aside: { display: "flex", flexDirection: "column", gap: 14 },
  asideCard: { background: "#ffffff", border: "1px solid #d7dbe2", padding: "10px 12px" },
  button: { padding: "5px 14px", borderRadius: 2, fontWeight: 600, cursor: "pointer", border: "none", fontSize: 12 },
  primaryBtn: { background: "#1f5fa6", color: "#fff" },
  secondaryBtn: { background: "#f4f6f8", color: "#6b7280", border: "1px solid #c5ccd5" },
};

const formatCurrency = (v) => {
  if (v == null) return '-';
  return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(v);
};

const formatDate = (d) => {
  if (!d) return '-';
  try {
    return new Date(d).toLocaleDateString();
  } catch {
    return '-';
  }
};

const columns = [
  { id: "claimNumber", label: "Claim ID" },
  { id: "policyNumber", label: "Policy ID" },
  { id: "insured", label: "Insured" },
  { id: "lossDate", label: "DOL" },
  { id: "status", label: "Status" },
];

const PolicySummary = () => {
  const location = useLocation();
  const { policyNumber } = useParams();
  const navigate = useNavigate();
  const [policy, setPolicy] = useState(location.state?.policy || null);
  const [loading, setLoading] = useState(!policy);
  const [error, setError] = useState(null);

  useEffect(() => {
    const hasDetails = policy && (policy.totalPremium || policy.coverages || policy.accountId);
    if (hasDetails) return;
    const fetchPolicy = async () => {
      setLoading(true);
      try {
        const res = await api.get(`/api/policies/getPolicyByNumber/${policyNumber}`);
        setPolicy(res.data.policy || res.data);
      } catch (err) {
        setError('Unable to fetch policy details');
      } finally {
        setLoading(false);
      }
    };
    if (policyNumber) fetchPolicy();
  }, [policyNumber, policy]);

  if (loading) return <div style={{ padding: 20 }}>Loading policy...</div>;
  if (error) return <div style={{ padding: 20, color: 'red' }}>{error}</div>;
  if (!policy) return <div style={{ padding: 20 }}>Policy not found</div>;

  return (
    <div style={styles.container}>
      {/* Header */}
      <div style={styles.header}>
        <div>
          <div style={styles.headerText}>
            {policy.policyNumber || '—'}{' '}
            <span style={styles.headerSubText}>{policy.productType || ''}</span>
          </div>
          <div style={styles.headerSubText}>Issued: {formatDate(policy.issuedAt)}</div>
        </div>
        <div style={{ marginLeft: 'auto' }}>
          <span
            style={{
              ...styles.statusBadge,
              background: policy.status === "In Force" ? "#2b7a3e" : "#6b7280",
              color: '#fff',
            }}
          >
            {policy.status || 'Unknown'}
          </span>
        </div>
      </div>

      <div style={styles.summaryTitle}>Policy Summary</div>

      <div style={styles.grid}>
        {/* Left column */}
        <div>
          {/* Policy Dates & Term */}
          <div style={styles.section}>
            <div style={styles.sectionTitle}>Policy Dates &amp; Term</div>
            <div style={styles.row}><div style={styles.label}>Effective</div><div style={styles.value}>{formatDate(policy.effectiveDate)}</div></div>
            <div style={styles.row}><div style={styles.label}>Expiry</div><div style={styles.value}>{formatDate(policy.expiryDate)}</div></div>
            <div style={styles.row}><div style={styles.label}>Payment Schedule</div><div style={styles.value}>{policy.paymentSchedule || '-'}</div></div>
          </div>

          {/* Premium & Charges */}
          <div style={styles.section}>
            <div style={styles.sectionTitle}>Premium &amp; Charges</div>
            <div style={styles.row}><div style={styles.label}>Base Premium</div><div style={styles.money}>{formatCurrency(policy.basePremium || policy.totalPremium || 0)}</div></div>
            <div style={styles.row}><div style={styles.label}>Coverages</div><div style={styles.money}>{formatCurrency(policy.selectedCoveragesTotal || 0)}</div></div>
            <div style={styles.row}><div style={styles.label}>Subtotal</div><div style={styles.money}>{formatCurrency((policy.basePremium || policy.totalPremium || 0) + (policy.selectedCoveragesTotal || 0))}</div></div>
            <div style={styles.row}><div style={styles.label}>Taxes (18%)</div><div style={styles.money}>{formatCurrency(policy.taxAmount || policy.taxes || 0)}</div></div>
            <div style={{ height: 8 }} />
            <div style={{ ...styles.row, fontSize: 16 }}><div style={styles.label}>Total</div><div style={{ ...styles.value, ...styles.emphasizedMoney }}>{formatCurrency(policy.totalCost)}</div></div>
          </div>

          {/* Coverages */}
          <div style={styles.section}>
            <div style={styles.sectionTitle}>Coverages Included</div>
            <div style={{ padding: "8px 12px" }}>
              {Array.isArray(policy.coverages) && policy.coverages.length > 0 ? (
                policy.coverages.map((c, i) => (
                  <div key={i} style={styles.card}>{c}</div>
                ))
              ) : (
                <div style={{ color: '#6b7280', fontSize: 12 }}>No coverages listed</div>
              )}
            </div>
          </div>

          {/* Claims */}
          <div style={styles.section}>
            <div style={styles.sectionTitle}>Claims</div>
            <TableContainer sx={{ maxHeight: 600 }}>
              <Table stickyHeader>
                <TableHead>
                  <TableRow>
                    {columns.map((column) => (
                      <TableCell
                        key={column.id}
                        sx={{ fontWeight: 700, backgroundColor: "#f6f7f8", fontSize: 11, color: "#31475f", padding: "8px 10px" }}>
                        {column.label}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>

                <TableBody>
                  {!policy.claims || policy.claims.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={5} align="center" sx={{ py: 6 }}>
                        <Typography color="text.secondary">
                          No claims found.
                        </Typography>
                      </TableCell>
                    </TableRow>
                  ) : (
                    policy.claims.map((c, index) => (
                      <TableRow
                        key={c._id}
                        hover
                      >
                        <TableCell sx={{ fontSize: 12, padding: "7px 10px" }}>
                          <Typography sx={{ fontSize: 12 }}>
                            <b>{c.claimNumber}</b>
                          </Typography>
                        </TableCell>
                        <TableCell sx={{ fontSize: 12, padding: "7px 10px" }}>{c.policyNumber}</TableCell>
                        <TableCell sx={{ fontSize: 12, padding: "7px 10px" }}>{c.insured?.name}</TableCell>
                        <TableCell sx={{ fontSize: 12, padding: "7px 10px" }}>
                          {new Date(c.lossDate).toLocaleDateString("en-GB")}
                        </TableCell>
                        <TableCell sx={{ fontSize: 12, padding: "7px 10px" }}>
                          <Chip
                            label={c.status}
                            size="small"
                            sx={{
                              fontWeight: 600,
                              borderRadius: "8px",
                            }}
                            color={
                              c.status === "Open"
                                ? "success"
                                : c.status === "Closed"
                                  ? "error"
                                  : c.status === "Draft"
                                    ? "warning"
                                    : "default"
                            }
                          />
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        </div>

        {/* Right column / aside */}
        <aside style={styles.aside}>
          {/* Customer Info */}
          <div style={styles.asideCard}>
            <div style={{ fontWeight: 700, marginBottom: 6, fontSize: 12, color: "#2d3e52" }}>Customer Info</div>
            <div style={{ color: '#5a6a7a', fontSize: 12 }}>Name</div>
            <div style={{ fontWeight: 600, fontSize: 12, color: "#2d3e52" }}>{policy.accountId?.accountHolderName || policy.accountHolderName || 'N/A'}</div>
            <div style={{ color: '#5a6a7a', marginTop: 8, fontSize: 12 }}>Account</div>
            <div style={{ fontWeight: 600, fontSize: 12, color: "#2d3e52" }}>{policy.accountId?.accountId || policy.accountNumber || 'N/A'}</div>
            <div style={{ color: '#5a6a7a', marginTop: 8, fontSize: 12 }}>Contact</div>
            <div style={{ fontWeight: 600, fontSize: 12, color: "#2d3e52" }}>{policy.contactId?.email || policy.contactId?.phone || 'N/A'}</div>
          </div>

          {/* Vehicles */}
          <div style={styles.asideCard}>
            <div style={{ fontWeight: 700, marginBottom: 8, fontSize: 12, color: "#2d3e52" }}>Vehicle(s)</div>
            {Array.isArray(policy.vehicle) && policy.vehicle.length > 0 ? (
              <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                {policy.vehicle.map((v, i) => (
                  <li key={i} style={styles.card}>
                    <div style={{ fontWeight: 700 }}>{v.make} {v.model} <span style={{ color: '#6b7280', fontWeight: 500 }}>• {v.year}</span></div>
                    <div style={{ color: '#6b7280', fontSize: 12 }}>VIN: {v.vin}</div>
                    <div style={{ color: '#6b7280', fontSize: 12 }}>Reg: {v.licensePlate || 'N/A'}</div>
                  </li>
                ))}
              </ul>
            ) : <div style={{ color: '#6b7280', fontSize: 12 }}>No vehicles recorded</div>}
          </div>

          {/* Quick Actions */}
          <div style={styles.asideCard}>
            <div style={{ fontWeight: 700, marginBottom: 8, fontSize: 12, color: "#2d3e52" }}>Quick Actions</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              <button style={{ ...styles.button, ...styles.secondaryBtn }} disabled>Make a Payment</button>
              <button style={{ ...styles.button, ...styles.secondaryBtn }} disabled>Email Policy</button>
              <button style={{ ...styles.button, ...styles.secondaryBtn }} disabled>Copy Policy Number</button>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default PolicySummary;
