import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const api = axios.create({
  baseURL:
    `${process.env.REACT_APP_API_URL || "http://localhost:5000"}/api`,
});

export default function ClaimsList() {
  const [claims, setClaims] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [total, setTotal] = useState(0);
  const [orderBy, setOrderBy] = useState("createdAt");
  const [order, setOrder] = useState("desc");

  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      const res = await api.get("/claims/list", {
        params: {
          page: page + 1,
          limit: rowsPerPage,
          sortBy: orderBy,
          order,
        },
      });

      setClaims(res.data.claims || []);
      setTotal(res.data.total || 0);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchData();
  }, [page, rowsPerPage, orderBy, order]);

  // Sorting handler
  const handleSort = (property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const columns = [
    { id: "claimNumber", label: "Claim ID" },
    { id: "policyNumber", label: "Policy ID" },
    { id: "insured", label: "Insured" },
    { id: "lossDate", label: "Date of Loss" },
    { id: "status", label: "Status" },
  ];

  const totalPages = Math.ceil(total / rowsPerPage);

  return (
    <div style={{ padding: "16px 18px", background: "#eef2f5", minHeight: "100%", color: "#2d3e52" }}>
      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
        <div style={{ fontSize: 16, fontWeight: 700, color: "#2d3e52" }}>Claims</div>
        <div style={{ display: "flex", gap: 8 }}>
          <button onClick={fetchData} style={{ border: "1px solid #d7dbe2", background: "#fff", padding: "5px 12px", fontSize: 12, cursor: "pointer" }}>Refresh</button>
          <button onClick={() => navigate("/claims/create")} style={{ background: "#1f5fa6", color: "#fff", border: "none", padding: "5px 14px", fontSize: 12, fontWeight: 600, cursor: "pointer" }}>+ Create Claim</button>
        </div>
      </div>

      {/* Table */}
      <div style={{ border: "1px solid #d7dbe2", background: "#fff" }}>
        <div style={{ overflow: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 12 }}>
            <thead>
              <tr>
                {columns.map((column) => (
                  <th
                    key={column.id}
                    style={{ background: "#f6f7f8", color: "#31475f", fontSize: 11, fontWeight: 700, padding: "8px 10px", borderBottom: "2px solid #d7dbe2", borderRight: "1px solid #e3e8ee", textAlign: "left", cursor: "pointer" }}
                    onClick={() => handleSort(column.id)}
                  >
                    {column.label}{" "}
                    {orderBy === column.id && (order === "asc" ? "↑" : "↓")}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {claims.length === 0 ? (
                <tr>
                  <td colSpan={5} style={{ textAlign: "center", padding: "32px", color: "#6b7c93", fontSize: 12 }}>
                    No claims found.
                  </td>
                </tr>
              ) : (
                claims.map((c, index) => (
                  <tr key={c._id} style={{ background: index % 2 === 0 ? "#f8fafb" : "#fff" }}>
                    <td
                      style={{ padding: "7px 10px", borderBottom: "1px solid #f0f0f0", cursor: "pointer", color: "#1f5fa6", fontWeight: 600 }}
                      onClick={() => navigate(`/Claim/summary/${c.claimNumber}`)}
                    >
                      {c.claimNumber}
                    </td>
                    <td style={{ padding: "7px 10px", borderBottom: "1px solid #f0f0f0" }}>{c.policyNumber}</td>
                    <td style={{ padding: "7px 10px", borderBottom: "1px solid #f0f0f0" }}>{c.insured?.name}</td>
                    <td style={{ padding: "7px 10px", borderBottom: "1px solid #f0f0f0" }}>
                      {new Date(c.lossDate).toLocaleDateString("en-GB")}
                    </td>
                    <td style={{ padding: "7px 10px", borderBottom: "1px solid #f0f0f0" }}>
                      <span style={{
                        background: c.status === "Open" ? "#e8f5e9" : c.status === "Closed" ? "#fce4e4" : "#fff8e1",
                        color: c.status === "Open" ? "#2b7a3e" : c.status === "Closed" ? "#c62828" : "#b97d00",
                        padding: "2px 8px", fontSize: 11, fontWeight: 600
                      }}>{c.status}</span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination footer */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "flex-end", gap: 8, padding: "8px 12px", borderTop: "1px solid #d7dbe2", fontSize: 12, color: "#2d3e52" }}>
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
