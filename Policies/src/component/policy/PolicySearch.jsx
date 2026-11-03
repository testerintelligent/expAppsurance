import React, { useState, useEffect } from "react";
import api from "../../utils/api";
import {
  Box,
  Typography,
  TextField,
  CircularProgress,
  Grid,
  Button,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableContainer,
  TableBody,
  TablePagination,
  Stack,
} from "@mui/material";
import { Search as SearchIcon } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

const PolicySearch = () => {
  const [policyNumber, setPolicyNumber] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [policyDetails, setPolicyDetails] = useState([]);
  const [page, setPage] = useState(0); // current page
  const [rowsPerPage, setRowsPerPage] = useState(5); // rows per page
  const navigate = useNavigate();

  // Fetch policies data from the API
  useEffect(() => {
    const fetchPolicies = async () => {
      try {
        const response = await api.get("/api/Policies/getPoliciesForDashboard");
        setPolicyDetails(response.data);
      } catch (error) {
        console.error("Error fetching policies:", error);
      }
    };
    fetchPolicies();
  }, []);


  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0); // reset to first page when changing rows per page
  };
  const handleSearch = async (policyNum) => {
    // Extract policy number if an object is passed (from table row click)
    const policyId = typeof policyNum === 'string' 
      ? policyNum 
      : policyNum?.policyNumber || policyNumber;

    if (!policyId) {
      alert("Please enter a Policy Number");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await api.get(`/api/Policies/getPolicyByNumber/${policyId}`);

      const policyData = response.data.policy || response.data;

      if (!policyData) {
        setError("Policy not found");
        setLoading(false);
        return;
      }

      // Navigate to PolicySummary with policy data
      navigate(`/policy-summary/${policyId}`, { state: { policy: policyData } });

    } catch (err) {
      setError("Failed to fetch policy details");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div style={{ fontSize: 16, fontWeight: 700, color: "#2d3e52", marginBottom: 12 }}>
        Search Policy
      </div>

      {/* Search bar section */}
      <div style={{ border: "1px solid #d7dbe2", background: "#fff", marginBottom: 16 }}>
        <div style={{ background: "#f3f6f9", padding: "7px 12px", borderBottom: "1px solid #d7dbe2", fontSize: 11, fontWeight: 700, color: "#2e3e4c", textTransform: "uppercase", letterSpacing: 0.5 }}>
          Search
        </div>
        <div style={{ padding: "12px 14px", display: "flex", gap: 8, alignItems: "flex-end" }}>
          <div style={{ flex: 1 }}>
            <label style={{ fontSize: 11, color: "#5a6a7a", fontWeight: 600, display: "block", marginBottom: 3 }}>Policy Number</label>
            <input
              type="text"
              value={policyNumber}
              onChange={(e) => setPolicyNumber(e.target.value)}
              placeholder="Enter policy number..."
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
              style={{ width: "100%", border: "1px solid #c5ccd5", borderRadius: 2, padding: "5px 8px", fontSize: 12, color: "#2d3e52", outline: "none" }}
            />
          </div>
          <button onClick={handleSearch}
            style={{ background: "#1f5fa6", color: "#fff", border: "none", borderRadius: 2, padding: "6px 18px", fontSize: 12, fontWeight: 600, cursor: "pointer", whiteSpace: "nowrap" }}>
            Search
          </button>
        </div>
        {loading && <div style={{ padding: "8px 14px", fontSize: 12, color: "#4c5d72" }}>Searching…</div>}
        {error && <div style={{ padding: "8px 14px", fontSize: 12, color: "#c62828" }}>{error}</div>}
      </div>

      {/* Results table */}
      {policyDetails && policyDetails.length > 0 && (
        <div style={{ border: "1px solid #d7dbe2", background: "#fff" }}>
          <div style={{ background: "#f3f6f9", padding: "7px 12px", borderBottom: "1px solid #d7dbe2", fontSize: 11, fontWeight: 700, color: "#2e3e4c", textTransform: "uppercase", letterSpacing: 0.5, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span>Available Policies</span>
            <span style={{ fontWeight: 400, color: "#4c5d72", textTransform: "none" }}>{policyDetails.length} records</span>
          </div>

          <div style={{ overflow: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 12 }}>
              <thead>
                <tr>
                  {["", "Policy ID", "Account Holder Name", "Policy Type", "Status"].map((col) => (
                    <th key={col} style={{ padding: "8px 10px", background: "#f6f7f8", borderBottom: "2px solid #d7dbe2", borderRight: "1px solid #e3e8ee", textAlign: "left", fontWeight: 700, color: "#31475f", fontSize: 11 }}>
                      {col}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {policyDetails
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((policy, index) => (
                    <tr key={index} onClick={() => handleSearch(policy.policyNumber)}
                      style={{ background: index % 2 === 0 ? "#f8fafb" : "#fff", cursor: "pointer" }}>
                      <td style={{ padding: "7px 10px", borderRight: "1px solid #e3e8ee", borderBottom: "1px solid #e3e8ee" }}>
                        <button onClick={(e) => { e.stopPropagation(); handleSearch(policy.policyNumber); }}
                          style={{ background: "#1f5fa6", color: "#fff", border: "none", borderRadius: 2, padding: "3px 10px", fontSize: 11, cursor: "pointer" }}>
                          Select
                        </button>
                      </td>
                      <td style={{ padding: "7px 10px", borderRight: "1px solid #e3e8ee", borderBottom: "1px solid #e3e8ee", fontWeight: 600, color: "#1f5fa6" }}>
                        {policy.policyNumber}
                      </td>
                      <td style={{ padding: "7px 10px", borderRight: "1px solid #e3e8ee", borderBottom: "1px solid #e3e8ee" }}>
                        {policy.accountHolderName}
                      </td>
                      <td style={{ padding: "7px 10px", borderRight: "1px solid #e3e8ee", borderBottom: "1px solid #e3e8ee" }}>
                        {policy.policyType}
                      </td>
                      <td style={{ padding: "7px 10px", borderRight: "1px solid #e3e8ee", borderBottom: "1px solid #e3e8ee" }}>
                        <span style={{
                          display: "inline-block", padding: "2px 8px", borderRadius: 2, fontSize: 11, fontWeight: 600,
                          background: policy.status === "In Force" ? "#e8f5e9" : policy.status === "Under Review" ? "#fff3e0" : "#ffebee",
                          color: policy.status === "In Force" ? "#2b7a3e" : policy.status === "Under Review" ? "#b97d00" : "#c62828"
                        }}>
                          {policy.status}
                        </span>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>

          {/* Simple pagination footer */}
          <div style={{ padding: "8px 12px", borderTop: "1px solid #d7dbe2", background: "#f8fafb", display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: 12, color: "#4c5d72" }}>
            <span>{policyDetails.length} total records</span>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <span>Rows per page:</span>
              <select value={rowsPerPage} onChange={handleChangeRowsPerPage}
                style={{ border: "1px solid #c5ccd5", borderRadius: 2, padding: "2px 4px", fontSize: 12 }}>
                <option value={5}>5</option>
                <option value={10}>10</option>
                <option value={25}>25</option>
              </select>
              <button onClick={() => handleChangePage(null, page - 1)} disabled={page === 0}
                style={{ background: page === 0 ? "#f4f6f8" : "#fff", border: "1px solid #c5ccd5", borderRadius: 2, padding: "2px 8px", fontSize: 12, cursor: page === 0 ? "default" : "pointer", color: page === 0 ? "#a0aab4" : "#4e5d6d" }}>
                ‹
              </button>
              <span>Page {page + 1} of {Math.ceil(policyDetails.length / rowsPerPage)}</span>
              <button onClick={() => handleChangePage(null, page + 1)} disabled={(page + 1) * rowsPerPage >= policyDetails.length}
                style={{ background: (page + 1) * rowsPerPage >= policyDetails.length ? "#f4f6f8" : "#fff", border: "1px solid #c5ccd5", borderRadius: 2, padding: "2px 8px", fontSize: 12, cursor: (page + 1) * rowsPerPage >= policyDetails.length ? "default" : "pointer", color: (page + 1) * rowsPerPage >= policyDetails.length ? "#a0aab4" : "#4e5d6d" }}>
                ›
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PolicySearch;
