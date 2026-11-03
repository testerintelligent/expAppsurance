import React from "react";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";

// ─── GW PolicyCenter-style workflow context bar ───────────────────────────────
// Shown at the top of every workflow screen (Driver → Vehicle → Quote → Payment).
// Replaces the old dark #212121 box with a flat, light, GW-consistent band.

export default function InfoBar({
  accountNumber,
  policyNumber,
  expiryDate,
  product,
  contactName,
  submissionId,
  effectiveDate,
}) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "stretch",
        background: "#fff",
        border: "1px solid #d7dbe2",
        borderLeft: "4px solid #1f5fa6",
        marginBottom: 16,
        fontSize: 12,
        color: "#2d3e52",
        minHeight: 52,
        flexWrap: "wrap",
      }}
    >
      {/* ── Product + Client ─────────────────────────────────────── */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 10,
          padding: "8px 16px",
          borderRight: "1px solid #d7dbe2",
          minWidth: 200,
        }}
      >
        <DirectionsCarIcon style={{ fontSize: 20, color: "#1f5fa6" }} />
        <div>
          <div
            style={{
              fontWeight: 700,
              fontSize: 13,
              color: "#1f2d3d",
              lineHeight: 1.3,
            }}
          >
            {product || "—"}
          </div>
          <div style={{ color: "#6b7c93", fontSize: 11, lineHeight: 1.3 }}>
            Client:{" "}
            <span style={{ color: "#2d3e52", fontWeight: 600 }}>
              {contactName || "—"}
            </span>
          </div>
        </div>
      </div>

      {/* ── Submission # + Account # (+ optional Policy #) ────────── */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "8px 16px",
          borderRight: "1px solid #d7dbe2",
          gap: 3,
        }}
      >
        <div style={{ color: "#6b7c93" }}>
          SUBMISSION #{" "}
          <span style={{ color: "#1f5fa6", fontWeight: 600 }}>
            {submissionId || "—"}
          </span>
        </div>
        <div style={{ color: "#6b7c93" }}>
          ACCOUNT #{" "}
          <span style={{ color: "#1f5fa6", fontWeight: 600 }}>
            {accountNumber || "—"}
          </span>
        </div>
        {policyNumber && policyNumber !== "-" && (
          <div style={{ color: "#6b7c93" }}>
            POLICY #{" "}
            <span style={{ color: "#1f5fa6", fontWeight: 600 }}>
              {policyNumber}
            </span>
          </div>
        )}
      </div>

      {/* ── Effective / Expiry dates — right-aligned ─────────────── */}
      <div
        style={{
          marginLeft: "auto",
          display: "flex",
          alignItems: "center",
          gap: 24,
          padding: "8px 20px",
          background: "#f8fafb",
          borderLeft: "1px solid #d7dbe2",
          flexShrink: 0,
        }}
      >
        <span>
          Effective:{" "}
          <span style={{ fontWeight: 700, color: "#2b7a3e" }}>
            {effectiveDate || "—"}
          </span>
        </span>
        {expiryDate && (
          <span>
            Expiration:{" "}
            <span style={{ fontWeight: 700, color: "#c62828" }}>
              {expiryDate}
            </span>
          </span>
        )}
      </div>
    </div>
  );
}
