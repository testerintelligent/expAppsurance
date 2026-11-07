import React, { useState, useEffect, useMemo } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import VisibilityIcon from "@mui/icons-material/Visibility";

const ClaimDashboard = () => {
  const navigate = useNavigate();

  const [claimData, setClaimData] = useState([]);
  const [claimTotal, setClaimTotal] = useState([0]);
  const [filteredData, setFilteredData] = useState([]);
  const [sortOrder, setSortOrder] = useState("asc");
  const [sortedColumn, setSortedColumn] = useState("CurrentDate");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [summary, setSummary] = useState(null);

  useEffect(() => {
    const fetchClaims = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/api/claims/list`
        );
        console.log("response", response);
        setClaimData(response.data.claims);
        setClaimTotal(response.data.count);
        setFilteredData(response.data.claims);
      } catch (error) {
        console.error("Error fetching policies:", error);
      }
    };
    fetchClaims();
  }, []);

  // Compute summary counts when policies are fetched/updated
  useEffect(() => {
    if (!claimData || claimData.length === 0) {
      setSummary(null);
      return;
    }

    const summaryData = { totalClaims: claimTotal };

    // normalize status keys and compute counts
    const byStatus = claimData.reduce((acc, p) => {
      const s = (p.status || "").toString();
      acc[s] = (acc[s] || 0) + 1;
      return acc;
    }, {});

    summaryData["openClaims"] = byStatus["Open"] || byStatus["Open"] || 0;
    summaryData["closedClaims"] = byStatus["Closed"] || byStatus["Closed"] || 0;
    console.log(summaryData)
    setSummary(summaryData);
  }, [claimData]);

  const generateRandomNumber = () =>
    Math.floor(100000 + Math.random() * 900000);

  const sortData = (column) => {
    const order = sortOrder === "asc" ? 1 : -1;
    const sorted = [...filteredData].sort((a, b) => {
      const valA = a[column];
      const valB = b[column];
      if (typeof valA === "string" && typeof valB === "string") {
        return valA.localeCompare(valB) * order;
      } else if (typeof valA === "number" && typeof valB === "number") {
        return (valA - valB) * order;
      } else {
        return (new Date(valA) - new Date(valB)) * order;
      }
    });
    setFilteredData(sorted);
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    setSortedColumn(column);
  };

  // Table Column Config
  const columns = useMemo(
    () => [
      { key: "claimNumber", label: "Claim Number" },
      { key: "claimType", label: "claim Type" },
      { key: "name", label: "Name" },
      { key: "address", label: "Address" },
      { key: "lossDate", label: "Loss Date" },
      { key: "dateOfNotice", label: "Date Of Notice" },
      { key: "createdAt", label: "Created At" },
      { key: "policyNumber", label: "Policy Number" },
      { key: "status", label: "Status" },
    ],
    []
  );

  // Utility Functions
  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return isNaN(date.getTime())
      ? "Invalid Date"
      : `${String(date.getDate()).padStart(2, "0")}/${String(
        date.getMonth() + 1
      ).padStart(2, "0")}/${date.getFullYear()}`;
  };

  const totalPages = Math.ceil(filteredData.length / rowsPerPage);

  return (
    <div style={{ padding: "16px 18px 0", background: "#eef2f5", minHeight: "100%", color: "#2d3e52" }}>
      {/* Summary Stat Tiles */}
      <div style={{ display: "flex", gap: 12, marginBottom: 16, flexWrap: "wrap" }}>
        {[
          { label: "Total Claims", count: summary?.totalClaims || 0, accent: "#1f5fa6" },
          { label: "Open Claims", count: summary?.openClaims || 0, accent: "#2b7a3e" },
          { label: "Closed Claims", count: summary?.closedClaims || 0, accent: "#c62828" },
        ].map(({ label, count, accent }) => (
          <div key={label} style={{ background: "#fff", border: "1px solid #d7dbe2", borderLeft: `4px solid ${accent}`, padding: "12px 20px", minWidth: 150 }}>
            <div style={{ fontSize: 22, fontWeight: 700, color: "#1f2d3d" }}>{count}</div>
            <div style={{ fontSize: 11, color: "#6b7c93", marginTop: 2 }}>{label}</div>
          </div>
        ))}
      </div>

      {/* Data Table */}
      {filteredData.length > 0 ? (
        <div style={{ border: "1px solid #d7dbe2", background: "#fff", overflow: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 12 }}>
            <thead>
              <tr>
                <th style={{ background: "#f6f7f8", color: "#31475f", fontSize: 11, fontWeight: 700, padding: "8px 10px", borderBottom: "2px solid #d7dbe2", borderRight: "1px solid #e3e8ee", textAlign: "center" }}>
                  View
                </th>
                {columns.map((col) => (
                  <th
                    key={col.key}
                    style={{ background: "#f6f7f8", color: "#31475f", fontSize: 11, fontWeight: 700, padding: "8px 10px", borderBottom: "2px solid #d7dbe2", borderRight: "1px solid #e3e8ee", textAlign: "center", cursor: "pointer" }}
                    onClick={() => sortData(col.key)}
                  >
                    {col.label}{" "}
                    {sortedColumn === col.key && (sortOrder === "asc" ? "↑" : "↓")}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filteredData
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((claim, index) => (
                  <tr
                    key={claim._id || index}
                    style={{ background: index % 2 === 0 ? "#f8fafb" : "#fff" }}
                  >
                    <td style={{ padding: "7px 10px", textAlign: "center", borderBottom: "1px solid #f0f0f0" }}>
                      <VisibilityIcon
                        color="primary"
                        onClick={() => navigate(`/Claim/summary/${claim.claimNumber}`)}
                        style={{ cursor: "pointer", fontSize: 18 }}
                      />
                    </td>
                    <td style={{ padding: "7px 10px", textAlign: "center", borderBottom: "1px solid #f0f0f0" }}>{claim.claimNumber || "N/A"}</td>
                    <td style={{ padding: "7px 10px", textAlign: "center", borderBottom: "1px solid #f0f0f0" }}>{claim?.claimType || "N/A"}</td>
                    <td style={{ padding: "7px 10px", textAlign: "center", borderBottom: "1px solid #f0f0f0" }}>{claim.insured.name}</td>
                    <td style={{ padding: "7px 10px", textAlign: "center", borderBottom: "1px solid #f0f0f0" }}>{claim.insured.address}</td>
                    <td style={{ padding: "7px 10px", textAlign: "center", borderBottom: "1px solid #f0f0f0" }}>{formatDate(claim.lossDate)}</td>
                    <td style={{ padding: "7px 10px", textAlign: "center", borderBottom: "1px solid #f0f0f0" }}>{formatDate(claim.dateOfNotice)}</td>
                    <td style={{ padding: "7px 10px", textAlign: "center", borderBottom: "1px solid #f0f0f0" }}>{formatDate(claim.createdAt)}</td>
                    <td style={{ padding: "7px 10px", textAlign: "center", borderBottom: "1px solid #f0f0f0" }}>{claim.policyNumber}</td>
                    <td style={{ padding: "7px 10px", textAlign: "center", borderBottom: "1px solid #f0f0f0" }}>
                      <span style={{
                        background: claim.status === "Open" ? "#e8f5e9" : claim.status === "Closed" ? "#fce4e4" : "#e3f2fd",
                        color: claim.status === "Open" ? "#2b7a3e" : claim.status === "Closed" ? "#c62828" : "#1f5fa6",
                        padding: "2px 8px", fontSize: 11, fontWeight: 600
                      }}>{claim.status}</span>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>

          {/* Pagination footer */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "flex-end", gap: 8, padding: "8px 12px", borderTop: "1px solid #d7dbe2", fontSize: 12, color: "#2d3e52" }}>
            <span style={{ color: "#6b7c93" }}>
              Rows per page:
            </span>
            <select
              value={rowsPerPage}
              onChange={(e) => { setRowsPerPage(parseInt(e.target.value, 10)); setPage(0); }}
              style={{ border: "1px solid #d7dbe2", padding: "2px 6px", fontSize: 12, background: "#fff" }}
            >
              {[5, 10, 25].map((n) => <option key={n} value={n}>{n}</option>)}
            </select>
            <span style={{ color: "#6b7c93", marginLeft: 8 }}>
              {page * rowsPerPage + 1}–{Math.min((page + 1) * rowsPerPage, filteredData.length)} of {filteredData.length}
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
      ) : (
        <p style={{ textAlign: "center", color: "#7f8c8d", fontSize: "18px" }}>
          No claim data available
        </p>
      )}
    </div>
  );
};

export default ClaimDashboard;
