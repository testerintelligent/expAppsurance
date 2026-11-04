import React, { useEffect, useState, useMemo } from "react";
import api from "../../utils/api";
import { useNavigate } from "react-router-dom";

const demoActivityRows = [
  {
    id: "9623142123",
    dueDate: "Today",
    priority: "High",
    status: "Open",
    subject: "Contact AK Company was changed",
    accountHolder: "COMPANY",
    product: "Expleo",
    assignedBy: "California",
    state: "California",
  },
  {
    id: "1887559510",
    dueDate: "Today",
    priority: "High",
    status: "Open",
    subject: "Contact Anu v was changed",
    accountHolder: "Anu v",
    product: "Expleo",
    assignedBy: "California",
    state: "California",
  },
  {
    id: "1887559510",
    dueDate: "Today",
    priority: "High",
    status: "Open",
    subject: "Contact Anu v was changed",
    accountHolder: "Anu v",
    product: "Expleo",
    assignedBy: "California",
    state: "California",
  },
  {
    id: "548628540",
    dueDate: "Today",
    priority: "High",
    status: "Open",
    subject: "Contact Madhuri Test was changed",
    accountHolder: "Madhuri Test",
    product: "Expleo",
    assignedBy: "Alaska",
    state: "Alaska",
  },
  {
    id: "644325427",
    dueDate: "Today",
    priority: "High",
    status: "Open",
    subject: "Contact Lucky test_pc was changed",
    accountHolder: "Lucky",
    product: "Expleo",
    assignedBy: "New Jersey",
    state: "New Jersey",
  },
  {
    id: "644325427",
    dueDate: "Today",
    priority: "High",
    status: "Open",
    subject: "Contact Lucky test_pc was changed",
    accountHolder: "Lucky",
    product: "Expleo",
    assignedBy: "New Jersey",
    state: "New Jersey",
  },
  {
    id: "7505660728",
    dueDate: "Today",
    priority: "High",
    status: "Open",
    subject: "Contact Test RW changed",
    accountHolder: "Test PC",
    product: "Expleo",
    assignedBy: "Alaska",
    state: "Alaska",
  },
  {
    id: "7505660728",
    dueDate: "Today",
    priority: "High",
    status: "Open",
    subject: "Contact Test RW changed",
    accountHolder: "Test PC",
    product: "Expleo",
    assignedBy: "Alaska",
    state: "Alaska",
  },
  {
    id: "1846047100",
    dueDate: "Today",
    priority: "High",
    status: "Open",
    subject: "Contact john john was changed",
    accountHolder: "John John",
    product: "Expleo",
    assignedBy: "Wisconsin",
    state: "Wisconsin",
  },
  {
    id: "1846047100",
    dueDate: "Today",
    priority: "High",
    status: "Open",
    subject: "Contact john john was changed",
    accountHolder: "John John",
    product: "Expleo",
    assignedBy: "Wisconsin",
    state: "Wisconsin",
  },
];

const PolicyDashboard = () => {
  const [insuranceData, setInsuranceData] = useState([]);
  const [page, setPage] = useState(1);
  const rowsPerPage = 10;
  const navigate = useNavigate();

  const summary = useMemo(() => {
    if (!insuranceData.length) return null;
    const byStatus = insuranceData.reduce((acc, p) => {
      const s = (p.status || "").toString();
      acc[s] = (acc[s] || 0) + 1;
      return acc;
    }, {});
    return {
      total: insuranceData.length,
      inForce: byStatus["In Force"] || byStatus["InForce"] || 0,
      underReview: byStatus["Under Review"] || byStatus["UnderReview"] || byStatus["Pending"] || 0,
      cancelled: byStatus["Cancelled"] || byStatus["cancelled"] || 0,
    };
  }, [insuranceData]);

  useEffect(() => {
    const fetchPolicies = async () => {
      try {
        const response = await api.get("/api/Policies/getPoliciesForDashboard");
        setInsuranceData(response.data || []);
      } catch (error) {
        console.error("Error fetching policies:", error);
      }
    };

    fetchPolicies();
  }, []);

  const mappedRows = insuranceData.length
    ? insuranceData.map((policy, index) => ({
        id: policy.policyNumber || `POL-${index + 1}`,
        dueDate: policy.endDate
            ? new Date(policy.endDate).toLocaleDateString("en-GB").replace(/\//g, "-")
            : "Today",
        priority: "High",
        status: policy.status || "Open",
        subject: `Contact ${policy.accountHolderName || "Account"} was changed`,
        accountHolder: policy.accountHolderName || "N/A",
        product: policy.policyType || "Expleo",
        assignedBy: policy.accountNumber || "N/A",
        state: policy.status || "California",
      }))
    : demoActivityRows;

  const totalPages = Math.max(1, Math.ceil(mappedRows.length / rowsPerPage));
  const pageRows = mappedRows.slice((page - 1) * rowsPerPage, page * rowsPerPage);

  return (
    <div style={{ padding: "16px 18px 0", background: "#eef2f5", minHeight: "100%" }}>
      {/* Stat tiles */}
      {summary && (
        <div style={{ display: "flex", gap: 12, marginBottom: 16, flexWrap: "wrap" }}>
          {[
            { label: "Total Policies", count: summary.total,       accent: "#1f5fa6" },
            { label: "In Force",       count: summary.inForce,     accent: "#2b7a3e" },
            { label: "Under Review",   count: summary.underReview, accent: "#b97d00" },
            { label: "Cancelled",      count: summary.cancelled,   accent: "#c62828" },
          ].map(({ label, count, accent }) => (
            <div key={label} style={{
              background: "#fff", border: "1px solid #d7dbe2",
              borderLeft: `4px solid ${accent}`, padding: "12px 20px", minWidth: 150,
            }}>
              <div style={{ fontSize: 22, fontWeight: 700, color: "#1f2d3d" }}>{count}</div>
              <div style={{ fontSize: 11, color: "#6b7c93", marginTop: 2 }}>{label}</div>
            </div>
          ))}
        </div>
      )}

      <div
        style={{
          fontSize: 18,
          fontWeight: 700,
          color: "#2d3e52",
          marginBottom: 8,
          paddingLeft: 8,
        }}
      >
        My Activities
      </div>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 8,
          background: "#f3f4f6",
          border: "1px solid #d7dbe2",
          borderBottom: "none",
          padding: "8px 12px",
          fontSize: 12,
          color: "#4c5d72",
        }}
      >
        <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: 12 }}>
          <button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
            style={{ border: "1px solid #d7dbe2", background: "#fff", padding: "2px 8px", cursor: "pointer", fontSize: 12 }}
          >
            ‹
          </button>
          <span style={{ padding: "0 6px" }}>Page {page} of {totalPages}</span>
          <button
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}
            style={{ border: "1px solid #d7dbe2", background: "#fff", padding: "2px 8px", cursor: "pointer", fontSize: 12 }}
          >
            ›
          </button>
        </div>
      </div>

      <div style={{ overflow: "auto", border: "1px solid #d7dbe2", background: "#fff" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 12 }}>
          <thead>
            <tr style={{ background: "#f6f7f8", color: "#31475f" }}>
              {[
                "",
                "Due Date",
                "Priority",
                "Status",
                "Subject",
                "ID",
                "Account Hol.",
                "Product",
                "Assigned By",
                
              ].map((column) => (
                <th
                  key={column}
                  style={{
                    padding: "10px 8px",
                    borderBottom: "1px solid #d7dbe2",
                    borderRight: "1px solid #e3e8ee",
                    textAlign: "left",
                    fontWeight: 600,
                  }}
                >
                  {column}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {pageRows.map((row, index) => (
              <tr
                key={`${row.id}-${index}`}
                onClick={() => navigate(`/policy-summary/${row.id}`)}
                style={{
                  cursor: "pointer",
                  background: index % 2 === 0 ? "#f8fafb" : "#ffffff",
                }}
              >
                <td style={{ padding: "8px 8px", borderRight: "1px solid #e3e8ee", textAlign: "center" }}>
                  <input type="checkbox" style={{ accentColor: "#4a6781" }} />
                </td>
                <td style={{ padding: "8px 8px", borderRight: "1px solid #e3e8ee" }}>{row.dueDate}</td>
                <td style={{ padding: "8px 8px", borderRight: "1px solid #e3e8ee" }}>
                  <span style={{ color: "#b97d00", fontWeight: 600 }}>{row.priority}</span>
                </td>
                <td style={{ padding: "8px 8px", borderRight: "1px solid #e3e8ee" }}>
                  <span style={{ color: "#2b7a3e", fontWeight: 600 }}>{row.status}</span>
                </td>
                <td style={{ padding: "8px 8px", borderRight: "1px solid #e3e8ee" }}>{row.subject}</td>
                <td style={{ padding: "8px 8px", borderRight: "1px solid #e3e8ee" }}>{row.id}</td>
                <td style={{ padding: "8px 8px", borderRight: "1px solid #e3e8ee" }}>{row.accountHolder}</td>
                <td style={{ padding: "8px 8px", borderRight: "1px solid #e3e8ee" }}>{row.product}</td>
                <td style={{ padding: "8px 8px", borderRight: "1px solid #e3e8ee" }}>{row.assignedBy}</td>

              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PolicyDashboard;
