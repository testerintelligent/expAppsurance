import React, { useEffect, useState, useMemo } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import VisibilityIcon from "@mui/icons-material/Visibility";

const BillingDashboard = () => {
  const [randomNumber] = useState(() =>
    Math.floor(100000 + Math.random() * 900000),
  );
  const [insuranceData, setInsuranceData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [sortOrder, setSortOrder] = useState("asc");
  const [sortedColumn, setSortedColumn] = useState("CurrentDate");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const navigate = useNavigate();

  // Fetch policies data from the API
  useEffect(() => {
    const fetchPolicies = async () => {
      try {
        const response = await axios.get(
          "http://10.192.190.158:5000/api/Policies/getPoliciesForDashboard",
        );
        setInsuranceData(response.data);
        setFilteredData(response.data);
      } catch (error) {
        console.error("Error fetching policies:", error);
      }
    };
    fetchPolicies();
  }, []);

  const summary = useMemo(() => {
    if (!insuranceData || insuranceData.length === 0) {
      return null;
    }

    const totals = { totalPolicies: insuranceData.length };

    const byStatus = insuranceData.reduce((acc, p) => {
      const s = (p.status || "").toString();
      acc[s] = (acc[s] || 0) + 1;
      return acc;
    }, {});

    totals["In Force"] = byStatus["In Force"] || byStatus["InForce"] || 0;
    totals.underReview =
      byStatus["Under Review"] ||
      byStatus["UnderReview"] ||
      byStatus["underReview"] ||
      0;
    totals.cancelled = byStatus["Cancelled"] || byStatus["cancelled"] || 0;

    return totals;
  }, [insuranceData]);

  // Utility Functions
  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return isNaN(date.getTime())
      ? "Invalid Date"
      : `${String(date.getDate()).padStart(2, "0")}/${String(
          date.getMonth() + 1,
        ).padStart(2, "0")}/${date.getFullYear()}`;
  };

  const generateRandomNumber = () => randomNumber;

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
      { key: "accountNumber", label: "Account Number" },
      { key: "accountHolderName", label: "Account Holder Name" },
      { key: "policyNumber", label: "Policy Number" },
      { key: "policyType", label: "Policy Type" },
      { key: "startDate", label: "Start Date" },
      { key: "endDate", label: "End Date" },
      { key: "status", label: "Status" },
    ],
    [],
  );

  return (
    <div style={{ padding: "16px 18px 0", background: "#eef2f5", minHeight: "100%" }}>
      {/* GW Stat Tiles */}
      <div style={{ display: "flex", gap: 12, marginBottom: 16, flexWrap: "wrap" }}>
        {[
          { label: "Total Policies", count: summary?.totalPolicies || 0, accent: "#1f5fa6" },
          { label: "In Force", count: summary?.["In Force"] || 0, accent: "#2b7a3e" },
          { label: "Under Review", count: summary?.underReview || 0, accent: "#b97d00" },
          { label: "Cancelled", count: summary?.cancelled || 0, accent: "#c62828" },
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
                <th style={{ padding: "8px 10px", background: "#f6f7f8", borderBottom: "2px solid #d7dbe2", borderRight: "1px solid #e3e8ee", textAlign: "left", fontSize: 11, fontWeight: 700, color: "#31475f", width: 60 }}>View</th>
                {columns.map((col) => (
                  <th key={col.key} onClick={() => sortData(col.key)} style={{ padding: "8px 10px", background: "#f6f7f8", borderBottom: "2px solid #d7dbe2", borderRight: "1px solid #e3e8ee", textAlign: "left", fontSize: 11, fontWeight: 700, color: "#31475f", cursor: "pointer" }}>
                    {col.label} {sortedColumn === col.key && (sortOrder === "asc" ? "↑" : "↓")}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filteredData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((insurance, index) => (
                <tr key={insurance._id || index} style={{ background: index % 2 === 0 ? "#f8fafb" : "#fff", cursor: insurance.policyNumber ? "pointer" : "default" }}
                  onClick={() => insurance.policyNumber && navigate(`/policy-summary/${insurance.policyNumber}`, { state: { policy: insurance } })}>
                  <td style={{ padding: "7px 10px", borderBottom: "1px solid #e3e8ee", borderRight: "1px solid #e3e8ee", textAlign: "center" }}>
                    {insurance.policyNumber
                      ? <VisibilityIcon sx={{ fontSize: 16, color: "#1f5fa6", cursor: "pointer" }} />
                      : <VisibilityIcon sx={{ fontSize: 16, color: "#ccc" }} />}
                  </td>
                  <td style={{ padding: "7px 10px", borderBottom: "1px solid #e3e8ee", borderRight: "1px solid #e3e8ee" }}>{insurance.accountNumber || "N/A"}</td>
                  <td style={{ padding: "7px 10px", borderBottom: "1px solid #e3e8ee", borderRight: "1px solid #e3e8ee" }}>{insurance?.accountHolderName || "N/A"}</td>
                  <td style={{ padding: "7px 10px", borderBottom: "1px solid #e3e8ee", borderRight: "1px solid #e3e8ee" }}>{insurance.policyNumber || generateRandomNumber()}</td>
                  <td style={{ padding: "7px 10px", borderBottom: "1px solid #e3e8ee", borderRight: "1px solid #e3e8ee" }}>{insurance.policyType}</td>
                  <td style={{ padding: "7px 10px", borderBottom: "1px solid #e3e8ee", borderRight: "1px solid #e3e8ee" }}>{formatDate(insurance.startDate)}</td>
                  <td style={{ padding: "7px 10px", borderBottom: "1px solid #e3e8ee", borderRight: "1px solid #e3e8ee" }}>{formatDate(insurance.endDate)}</td>
                  <td style={{ padding: "7px 10px", borderBottom: "1px solid #e3e8ee" }}>
                    <span style={{
                      background: insurance.status === "In Force" ? "#e8f5e9" : insurance.status === "Cancelled" ? "#fce4e4" : "#fff8e1",
                      color: insurance.status === "In Force" ? "#2b7a3e" : insurance.status === "Cancelled" ? "#c62828" : "#b97d00",
                      padding: "2px 8px", fontSize: 11, fontWeight: 600
                    }}>{insurance.status}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "flex-end", gap: 8, padding: "8px 12px", borderTop: "1px solid #d7dbe2", fontSize: 12 }}>
            <span style={{ color: "#6b7c93" }}>Rows per page:</span>
            <select value={rowsPerPage} onChange={(e) => { setRowsPerPage(parseInt(e.target.value)); setPage(0); }} style={{ border: "1px solid #d7dbe2", padding: "2px 4px", fontSize: 12 }}>
              {[5, 10, 25].map(n => <option key={n} value={n}>{n}</option>)}
            </select>
            <button onClick={() => setPage(p => Math.max(0, p - 1))} disabled={page === 0} style={{ border: "1px solid #d7dbe2", background: "#fff", padding: "2px 8px", fontSize: 12, cursor: "pointer" }}>‹</button>
            <span>Page {page + 1} of {Math.max(1, Math.ceil(filteredData.length / rowsPerPage))}</span>
            <button onClick={() => setPage(p => Math.min(Math.ceil(filteredData.length / rowsPerPage) - 1, p + 1))} disabled={page >= Math.ceil(filteredData.length / rowsPerPage) - 1} style={{ border: "1px solid #d7dbe2", background: "#fff", padding: "2px 8px", fontSize: 12, cursor: "pointer" }}>›</button>
          </div>
        </div>
      ) : (
        <p style={{ textAlign: "center", color: "#7f8c8d", fontSize: "18px" }}>
          No policy data available
        </p>
      )}
    </div>
  );
};

export default BillingDashboard;
