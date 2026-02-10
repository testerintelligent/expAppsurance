import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation, useParams, useNavigate } from 'react-router-dom';

const styles = {
  container: {
    padding: 24,
    fontFamily: 'Inter, Arial, sans-serif',
    color: '#1f2937',
    maxWidth: 1400,
  },

  header: {
    display: 'flex',
    alignItems: 'center',
    gap: 16,
    background: '#4b5563',
    color: '#fff',
    padding: '12px 18px',
    borderRadius: 6,
    marginBottom: 24,
    fontSize: 14,
  },

  headerStrong: { fontWeight: 700 },

  summaryTitle: {
    fontSize: 22,
    fontWeight: 700,
    marginBottom: 12,
  },

  grid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: 32,
  },

  section: {
    marginBottom: 24,
  },

  sectionTitle: {
    fontWeight: 700,
    fontSize: 15,
    borderBottom: '1px solid #d1d5db',
    paddingBottom: 6,
    marginBottom: 10,
  },

  row: {
    display: 'grid',
    gridTemplateColumns: '200px 1fr',
    padding: '4px 0',
    fontSize: 14,
  },

  label: { color: '#6b7280' },
  value: { fontWeight: 500 },

  link: {
    color: '#2563eb',
    cursor: 'pointer',
    textDecoration: 'underline',
  },

  money: {
    textAlign: 'right',
    fontWeight: 600,
  },

  emphasizedMoney: {
    textAlign: 'right',
    fontWeight: 800,
    fontSize: 15,
  },
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
    // If we received a policy from navigation state, it may be partial (dashboard row).
    // Only skip fetching when the policy contains detailed fields we need (e.g. totalPremium or accountId).
    const hasDetails = policy && (policy.totalPremium || policy.coverages || policy.accountId);
    if (hasDetails) return; // already have detailed data from navigation state
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
      <div style={{ marginBottom: 12 }}>
        <button onClick={() => navigate(-1)} style={{ marginRight: 12 }}>Back</button>
        <button onClick={() => window.print()} style={{ marginRight: 8 }}>Print</button>
        <button onClick={() => alert('Download PDF - implement server-side PDF generation')}>Download PDF</button>
      </div>

      <div style={styles.header}>
        <div>
          <div style={{ fontWeight: 700, fontSize: 18 }}>{policy.policyNumber || '—'} <span style={{ color: '#d1d5db', fontWeight: 400 }}>· {policy.productType || ''}</span></div>
          <div style={{ color: '#d1d5db', marginTop: 6 }}>Issued: {formatDate(policy.issuedAt)}</div>
        </div>
        <div style={{ marginLeft: 'auto', display: 'flex', gap: 12, alignItems: 'center' }}>
          <div style={{ padding: '6px 10px', borderRadius: 999, background: policy.status === 'In Force' ? '#10b981' : '#6b7280', color: '#fff' }}>{policy.status || 'Unknown'}</div>
        </div>
      </div>

      <div style={styles.summaryTitle}>Policy Summary</div>

      <div style={styles.grid}>
        <div>
          <div style={styles.section}>
            <div style={styles.sectionTitle}>Policy Dates & Term</div>
            <div style={styles.row}><div style={styles.label}>Effective</div><div style={styles.value}>{formatDate(policy.effectiveDate)}</div></div>
            <div style={styles.row}><div style={styles.label}>Expiry</div><div style={styles.value}>{formatDate(policy.expiryDate)}</div></div>
            <div style={styles.row}><div style={styles.label}>Payment Schedule</div><div style={styles.value}>{policy.paymentSchedule || '-'}</div></div>
          </div>

          <div style={styles.section}>
            <div style={styles.sectionTitle}>Premium & Charges</div>
            <div style={styles.row}><div style={styles.label}>Total Premium</div><div style={styles.money}>{formatCurrency(policy.totalPremium)}</div></div>
            <div style={styles.row}><div style={styles.label}>Taxes</div><div style={styles.money}>{formatCurrency(policy.taxes)}</div></div>
            <div style={{ height: 8 }} />
            <div style={{ ...styles.row, fontSize: 16 }}><div style={styles.label}>Total</div><div style={{ ...styles.value, ...styles.emphasizedMoney }}>{formatCurrency(policy.totalCost)}</div></div>
          </div>

          <div style={styles.section}>
            <div style={styles.sectionTitle}>Billing & Payment</div>
            <div style={styles.row}><div style={styles.label}>Method</div><div style={styles.value}>{policy.billingMethod || '-'}</div></div>
            <div style={styles.row}><div style={styles.label}>Payment Ref</div><div style={styles.value}>{policy.paymentRef || '-'}</div></div>
            <div style={{ marginTop: 8 }}>
              <div style={styles.sectionTitle}>Coverages</div>
              <div>
                {Array.isArray(policy.coverages) && policy.coverages.length > 0 ? (
                  policy.coverages.map((c, i) => (
                    <div key={i} style={{ padding: 8, background: '#f8fafc', borderRadius: 8, marginBottom: 8 }}>{c}</div>
                  ))
                ) : (
                  <div style={{ color: '#6b7280' }}>No coverages listed</div>
                )}
              </div>
            </div>
          </div>
        </div>

        <aside>
          <div style={{ ...styles.section, padding: 12, background: '#fff', borderRadius: 8 }}>
            <div style={{ fontWeight: 700, marginBottom: 6 }}>Customer</div>
            <div style={{ color: '#6b7280', marginBottom: 4 }}>Name</div>
            <div style={{ fontWeight: 600 }}>{policy.accountId?.accountHolderName || policy.accountHolderName || 'N/A'}</div>
            <div style={{ color: '#6b7280', marginTop: 8 }}>Account</div>
            <div style={{ fontWeight: 600 }}>{policy.accountId?.accountId || policy.accountNumber || 'N/A'}</div>

            <div style={{ color: '#6b7280', marginTop: 8 }}>Contact</div>
            <div style={{ fontWeight: 600 }}>{policy.contactId?.email || policy.contactId?.phone || 'N/A'}</div>
          </div>

          <div style={{ ...styles.section, padding: 12, background: '#fff', borderRadius: 8, marginTop: 12 }}>
            <div style={{ fontWeight: 700, marginBottom: 6 }}>Vehicle(s)</div>
            {Array.isArray(policy.vehicle) && policy.vehicle.length > 0 ? (
              <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                {policy.vehicle.map((v, i) => (
                  <li key={i} style={{ padding: 8, borderRadius: 6, background: '#f8fafc', marginBottom: 8 }}>
                    <div style={{ fontWeight: 700 }}>{v.make} {v.model} <span style={{ color: '#6b7280', fontWeight: 500 }}>• {v.year}</span></div>
                    <div style={{ color: '#6b7280', fontSize: 13 }}>VIN: {v.vin}</div>
                    <div style={{ color: '#6b7280', fontSize: 13 }}>Reg: {v.licensePlate || 'N/A'}</div>
                  </li>
                ))}
              </ul>
            ) : (
              <div style={{ color: '#6b7280' }}>No vehicles recorded</div>
            )}
          </div>

          <div style={{ ...styles.section, padding: 12, background: '#fff', borderRadius: 8, marginTop: 12 }}>
            <div style={{ fontWeight: 700, marginBottom: 8 }}>Quick Actions</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              <button disabled style={{ padding: '8px 12px', borderRadius: 6, background: '#e5e7eb', color: '#9ca3af', border: 'none', cursor: 'not-allowed' }}>Make a Payment</button>
              <button disabled style={{ padding: '8px 12px', borderRadius: 6, border: '1px solid #e5e7eb', background: 'transparent', color: '#9ca3af', cursor: 'not-allowed' }}>Email Policy</button>
              <button disabled style={{ padding: '8px 12px', borderRadius: 6, border: '1px solid #e5e7eb', background: 'transparent', color: '#9ca3af', cursor: 'not-allowed' }}>Copy Policy Number</button>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default PolicySummary;
