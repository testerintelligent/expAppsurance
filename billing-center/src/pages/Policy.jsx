import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { searchPolicy } from "./PolicyApi";

const PolicyDashboard = () => {
  const [policyNumber, setPolicyNumber] = useState("");
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const handleSearch = async () => {
    if (!policyNumber) {
      alert("Please enter a Policy Number");
      return;
    }

    setError(null);

    try {
      const result = await searchPolicy(policyNumber);

      console.log("Policy Result:", result);

      navigate(`/policy-summary/${result.policy.policyNumber}`, {
        state: { policy: result.policy },
      });
    } catch (err) {
      console.log("error", err.message);
      setError("Failed to fetch policy details");
    }
  };

  const handleChange = (e) => {
    setPolicyNumber(e.target.value.trim());
  };

  return (
    <div style={{ padding: "16px 18px", background: "#eef2f5", minHeight: "100%" }}>
      <div style={{ border: "1px solid #d7dbe2", background: "#fff", marginBottom: 16 }}>
        <div style={{ background: "#f3f6f9", padding: "7px 12px", borderBottom: "1px solid #d7dbe2", fontSize: 11, fontWeight: 700, color: "#2e3e4c", textTransform: "uppercase", letterSpacing: 0.5 }}>Search Policy</div>
        <div style={{ padding: "12px 14px", display: "flex", gap: 10, alignItems: "flex-end", flexWrap: "wrap" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 3 }}>
            <label style={{ fontSize: 11, color: "#6b7c93" }}>Policy Number</label>
            <input
              value={policyNumber}
              onChange={handleChange}
              placeholder="Enter policy number"
              style={{ border: "1px solid #d7dbe2", padding: "5px 8px", fontSize: 12, width: 220 }}
            />
          </div>
          <button onClick={handleSearch} style={{ background: "#1f5fa6", color: "#fff", border: "none", padding: "6px 16px", fontSize: 12, fontWeight: 600, cursor: "pointer" }}>
            Search
          </button>
        </div>
        {error && <div style={{ padding: "0 14px 10px", fontSize: 12, color: "#c62828" }}>{error}</div>}
      </div>
    </div>
  );
};

export default PolicyDashboard;
