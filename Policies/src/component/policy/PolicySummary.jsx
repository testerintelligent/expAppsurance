// PolicySummary.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation, useParams, useNavigate } from 'react-router-dom';

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
    color: '#1e3a8a',
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
    color: '#1e3a8a',
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

  button: {
    padding: '10px 16px',
    borderRadius: 8,
    fontWeight: 600,
    cursor: 'pointer',
    border: 'none',
  },

  primaryBtn: { background: '#2563eb', color: '#fff' },
  secondaryBtn: { background: '#f3f4f6', color: '#6b7280' },
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
        const base = process.env.REACT_APP_API_URL || 'http://10.192.190.158:5000';
        const res = await axios.get(`${base}/api/policies/getPolicyByNumber/${policyNumber}`);
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
              background: policy.status === 'In Force' ? '#10b981' : '#6b7280',
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
            <div style={styles.sectionTitle}>Policy Dates & Term</div>
            <div style={styles.row}><div style={styles.label}>Effective</div><div style={styles.value}>{formatDate(policy.effectiveDate)}</div></div>
            <div style={styles.row}><div style={styles.label}>Expiry</div><div style={styles.value}>{formatDate(policy.expiryDate)}</div></div>
            <div style={styles.row}><div style={styles.label}>Payment Schedule</div><div style={styles.value}>{policy.paymentSchedule || '-'}</div></div>
          </div>

          {/* Premium & Charges */}
          <div style={styles.section}>
            <div style={styles.sectionTitle}>Premium & Charges</div>
            <div style={styles.row}><div style={styles.label}>Total Premium</div><div style={styles.money}>{formatCurrency(policy.totalPremium)}</div></div>
            <div style={styles.row}><div style={styles.label}>Taxes</div><div style={styles.money}>{formatCurrency(policy.taxes)}</div></div>
            <div style={{ height: 8 }} />
            <div style={{ ...styles.row, fontSize: 16 }}><div style={styles.label}>Total</div><div style={{ ...styles.value, ...styles.emphasizedMoney }}>{formatCurrency(policy.totalCost)}</div></div>
          </div>

          {/* Coverages */}
          <div style={styles.section}>
            <div style={styles.sectionTitle}>Coverages Included</div>
            {Array.isArray(policy.coverages) && policy.coverages.length > 0 ? (
              policy.coverages.map((c, i) => (
                <div key={i} style={styles.card}>{c}</div>
              ))
            ) : (
              <div style={{ color: '#6b7280' }}>No coverages listed</div>
            )}
          </div>
        </div>

        {/* Right column / aside */}
        <aside style={styles.aside}>
          {/* Customer Info */}
          <div style={styles.asideCard}>
            <div style={{ fontWeight: 700, marginBottom: 6 }}>Customer Info</div>
            <div style={{ color: '#6b7280' }}>Name</div>
            <div style={{ fontWeight: 600 }}>{policy.accountId?.accountHolderName || policy.accountHolderName || 'N/A'}</div>
            <div style={{ color: '#6b7280', marginTop: 8 }}>Account</div>
            <div style={{ fontWeight: 600 }}>{policy.accountId?.accountId || policy.accountNumber || 'N/A'}</div>
            <div style={{ color: '#6b7280', marginTop: 8 }}>Contact</div>
            <div style={{ fontWeight: 600 }}>{policy.contactId?.email || policy.contactId?.phone || 'N/A'}</div>
          </div>

          {/* Vehicles */}
          <div style={styles.asideCard}>
            <div style={{ fontWeight: 700, marginBottom: 8 }}>Vehicle(s)</div>
            {Array.isArray(policy.vehicle) && policy.vehicle.length > 0 ? (
              <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                {policy.vehicle.map((v, i) => (
                  <li key={i} style={styles.card}>
                    <div style={{ fontWeight: 700 }}>{v.make} {v.model} <span style={{ color: '#6b7280', fontWeight: 500 }}>• {v.year}</span></div>
                    <div style={{ color: '#6b7280', fontSize: 13 }}>VIN: {v.vin}</div>
                    <div style={{ color: '#6b7280', fontSize: 13 }}>Reg: {v.licensePlate || 'N/A'}</div>
                  </li>
                ))}
              </ul>
            ) : <div style={{ color: '#6b7280' }}>No vehicles recorded</div>}
          </div>

          {/* Quick Actions */}
          <div style={styles.asideCard}>
            <div style={{ fontWeight: 700, marginBottom: 8 }}>Quick Actions</div>
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
