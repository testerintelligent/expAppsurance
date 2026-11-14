import { Box, Typography } from "@mui/material";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";

const PolicyTitleBar = ({ policyNumber, claimNumber, insured, lossDate, status }) => {
  const formatDate = (d) => {
    if (!d) return "—";
    try { return new Date(d).toLocaleDateString("en-GB"); } catch { return "—"; }
  };

  return (
    <div style={{
      display: "flex",
      alignItems: "stretch",
      background: "#fff",
      border: "1px solid #d7dbe2",
      borderLeft: "4px solid #1f5fa6",
      marginBottom: 16,
      fontSize: 12,
      color: "#2d3e52",
      minHeight: 48,
      flexWrap: "wrap",
    }}>
      {/* Icon + Policy/Claim ID */}
      <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "8px 16px", borderRight: "1px solid #d7dbe2" }}>
        <DirectionsCarIcon style={{ fontSize: 18, color: "#1f5fa6" }} />
        <div>
          {claimNumber && (
            <div style={{ fontWeight: 700, fontSize: 13, color: "#1f2d3d", lineHeight: 1.3 }}>
              Claim: <span style={{ color: "#1f5fa6" }}>{claimNumber}</span>
            </div>
          )}
          <div style={{ color: "#6b7c93", fontSize: 11, lineHeight: 1.3 }}>
            Policy: <span style={{ color: "#1f5fa6", fontWeight: 600 }}>{policyNumber || "—"}</span>
          </div>
        </div>
      </div>

      {/* Insured */}
      {insured && (
        <div style={{ display: "flex", alignItems: "center", padding: "8px 16px", borderRight: "1px solid #d7dbe2", gap: 6, fontSize: 12 }}>
          <span style={{ color: "#6b7c93" }}>Insured:</span>
          <span style={{ fontWeight: 600, color: "#1f2d3d" }}>{insured}</span>
        </div>
      )}

      {/* Loss Date */}
      {lossDate && (
        <div style={{ display: "flex", alignItems: "center", padding: "8px 16px", borderRight: "1px solid #d7dbe2", gap: 6, fontSize: 12 }}>
          <span style={{ color: "#6b7c93" }}>Date of Loss:</span>
          <span style={{ fontWeight: 600, color: "#1f2d3d" }}>{formatDate(lossDate)}</span>
        </div>
      )}

      {/* Status — push to right */}
      <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", padding: "8px 16px", background: "#f8fafb", borderLeft: "1px solid #d7dbe2" }}>
        <span style={{
          background: status === "Open" || status === "Active" ? "#e8f5e9" : status === "Closed" ? "#fce4e4" : "#e3f2fd",
          color: status === "Open" || status === "Active" ? "#2b7a3e" : status === "Closed" ? "#c62828" : "#1f5fa6",
          padding: "2px 10px", fontSize: 11, fontWeight: 700
        }}>{status || "Draft"}</span>
      </div>
    </div>
  );
};

export default PolicyTitleBar;
