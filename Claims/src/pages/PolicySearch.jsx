import React, { useState, useEffect } from 'react';
import {
  TextField,
  CircularProgress,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import api from '../utils/api';

export default function PolicySearchPage() {
  const [policyNumber, setPolicyNumber] = useState('');
  const [policyType, setPolicyType] = useState('');
  const [insured, setInsured] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [policies, setPolicies] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [total, setTotal] = useState(0);
  const [sortBy, setsortBy] = useState("issuedAt");
  const [order, setOrder] = useState("desc");

  // Store NORMALIZED policy object
  const [policyResponse, setPolicyResponse] = useState(null);

  const navigate = useNavigate();

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
     SEARCH POLICY (API)
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

      // Normalize API response
      const normalizedPolicy = {
        ...payload.policy,
        contact: payload.contact,
        account: payload.account,
        vehicle: payload.vehicle || [],
        driver: payload.driver || [],
      };

      // Persist normalized policy
      sessionStorage.setItem(
        'selectedPolicyForClaim',
        JSON.stringify(normalizedPolicy)
      );

      navigate('/Claim/CreateClaim', {
        state: {
          policy: normalizedPolicy,
          ...normalizedPolicy,
        },
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

  const totalPages = Math.ceil(total / rowsPerPage);

  return (
    <div style={{ padding: "16px 18px", background: "#eef2f5", minHeight: "100%", color: "#2d3e52" }}>
      <div style={{ maxWidth: 1200 }}>
        {/* Search panel */}
        <div style={{ border: "1px solid #d7dbe2", background: "#fff", marginBottom: 14 }}>
          <div style={{ background: "#f3f6f9", padding: "7px 12px", borderBottom: "1px solid #d7dbe2", fontSize: 11, fontWeight: 700, color: "#2e3e4c", textTransform: "uppercase", letterSpacing: 0.5 }}>
            Search Policy
          </div>
          <div style={{ padding: "12px 16px" }}>
            <div style={{ display: "flex", gap: 12, flexWrap: "wrap", alignItems: "flex-end" }}>
              <TextField
                label="Policy number"
                value={policyNumber}
                onChange={(e) => setPolicyNumber(e.target.value)}
                size="small"
                onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
              />
              <TextField
                label="Insured"
                value={insured}
                onChange={(e) => setInsured(e.target.value)}
                size="small"
                onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
              />
              <TextField
                label="Policy Type"
                value={policyType}
                onChange={(e) => setPolicyType(e.target.value)}
                size="small"
                onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
              />
              <button
                onClick={handleReset}
                disabled={loading}
                style={{ border: "1px solid #d7dbe2", background: "#fff", padding: "5px 12px", fontSize: 12, cursor: "pointer", height: 36 }}
              >
                Reset
              </button>
              <button
                onClick={handleSearch}
                disabled={loading}
                style={{ background: "#1f5fa6", color: "#fff", border: "none", padding: "5px 14px", fontSize: 12, fontWeight: 600, cursor: "pointer", height: 36, display: "flex", alignItems: "center", gap: 6 }}
              >
                {loading ? <CircularProgress size={14} color="inherit" /> : null}
                {loading ? "Searching..." : "Search"}
              </button>
            </div>

            {error && (
              <div style={{ color: "#c62828", fontSize: 12, marginTop: 8 }}>{error}</div>
            )}
          </div>
        </div>

        {/* Results table */}
        <div style={{ border: "1px solid #d7dbe2", background: "#fff", overflow: "auto", marginBottom: 8 }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 12 }}>
            <thead>
              <tr>
                <th style={{ background: "#f6f7f8", color: "#31475f", fontSize: 11, fontWeight: 700, padding: "8px 10px", borderBottom: "2px solid #d7dbe2", borderRight: "1px solid #e3e8ee", textAlign: "left" }}>
                  Select
                </th>
                {columns.map((column) => (
                  <th
                    key={column.id}
                    style={{ background: "#f6f7f8", color: "#31475f", fontSize: 11, fontWeight: 700, padding: "8px 10px", borderBottom: "2px solid #d7dbe2", borderRight: "1px solid #e3e8ee", textAlign: "left", cursor: column.sort ? "pointer" : "default" }}
                    onClick={() => column.sort && handleSort(column.id)}
                  >
                    {column.label}
                    {column.sort && sortBy === column.id && (order === "asc" ? " ↑" : " ↓")}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {policies.length === 0 ? (
                <tr>
                  <td colSpan={9} style={{ textAlign: "center", padding: "32px", color: "#6b7c93", fontSize: 12 }}>
                    No policies found.
                  </td>
                </tr>
              ) : (
                policies.map((p, index) => (
                  <tr key={index} style={{ background: index % 2 === 0 ? "#f8fafb" : "#fff" }}>
                    <td style={{ padding: "7px 10px", borderBottom: "1px solid #f0f0f0" }}>
                      <button
                        onClick={() => handleSelect(p.policyNumber)}
                        style={{ background: "#1f5fa6", color: "#fff", border: "none", padding: "3px 10px", fontSize: 11, fontWeight: 600, cursor: "pointer" }}
                      >
                        Select
                      </button>
                    </td>
                    <td style={{ padding: "7px 10px", borderBottom: "1px solid #f0f0f0" }}>{p.policyNumber}</td>
                    <td style={{ padding: "7px 10px", borderBottom: "1px solid #f0f0f0" }}>
                      {p.contact
                        ? `${p.contact.firstName || ''} ${p.contact.lastName || ''}`.trim()
                        : 'N/A'}
                    </td>
                    <td style={{ padding: "7px 10px", borderBottom: "1px solid #f0f0f0" }}>
                      {p.contact?.address || p.contact?.street || 'N/A'}
                    </td>
                    <td style={{ padding: "7px 10px", borderBottom: "1px solid #f0f0f0" }}>{p.contact?.city || 'N/A'}</td>
                    <td style={{ padding: "7px 10px", borderBottom: "1px solid #f0f0f0" }}>{p.contact?.state || 'N/A'}</td>
                    <td style={{ padding: "7px 10px", borderBottom: "1px solid #f0f0f0" }}>{p.productType || 'N/A'}</td>
                    <td style={{ padding: "7px 10px", borderBottom: "1px solid #f0f0f0" }}>
                      {p.effectiveDate ? new Date(p.effectiveDate).toLocaleDateString() : 'N/A'}
                    </td>
                    <td style={{ padding: "7px 10px", borderBottom: "1px solid #f0f0f0" }}>
                      {p.expiryDate ? new Date(p.expiryDate).toLocaleDateString() : 'N/A'}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination footer */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "flex-end", gap: 8, padding: "8px 0", fontSize: 12, color: "#2d3e52" }}>
          <span style={{ color: "#6b7c93" }}>Rows per page:</span>
          <select
            value={rowsPerPage}
            onChange={(e) => { setRowsPerPage(parseInt(e.target.value, 10)); setPage(0); }}
            style={{ border: "1px solid #d7dbe2", padding: "2px 6px", fontSize: 12, background: "#fff" }}
          >
            {[5, 10, 25, 50].map((n) => <option key={n} value={n}>{n}</option>)}
          </select>
          <span style={{ color: "#6b7c93", marginLeft: 8 }}>
            {total === 0 ? "0" : page * rowsPerPage + 1}–{Math.min((page + 1) * rowsPerPage, total)} of {total}
          </span>
          <button
            onClick={() => setPage((p) => Math.max(0, p - 1))}
            disabled={page === 0}
            style={{ border: "1px solid #d7dbe2", background: "#fff", padding: "2px 8px", fontSize: 12, cursor: page === 0 ? "default" : "pointer", color: page === 0 ? "#aaa" : "#2d3e52" }}
          >&#8592;</button>
          <button
            onClick={() => setPage((p) => Math.min(totalPages - 1, p + 1))}
            disabled={page >= totalPages - 1}
            style={{ border: "1px solid #d7dbe2", background: "#fff", padding: "2px 8px", fontSize: 12, cursor: page >= totalPages - 1 ? "default" : "pointer", color: page >= totalPages - 1 ? "#aaa" : "#2d3e52" }}
          >&#8594;</button>
        </div>
      </div>
    </div>
  );
}
