import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { CircularProgress } from "@mui/material";
import api from "../utils/api";

import PolicyTitleBar from "./PolicyTitleBar";


const styles = {
  container: { padding: 16, fontFamily: "Inter, Arial, sans-serif", color: "#1f2937", maxWidth: 1400, background: "#eef2f5", minHeight: "100%" },
  summaryTitle: { fontSize: 16, fontWeight: 700, marginBottom: 12, color: "#2d3e52", marginTop: 10 },
  grid: { display: "grid", gridTemplateColumns: "2fr 1fr", gap: 16 },
  section: { marginBottom: 14, background: "#fff", border: "1px solid #d7dbe2", padding: 0 },
  sectionTitle: { fontWeight: 700, fontSize: 11, background: "#f3f6f9", borderBottom: "1px solid #d7dbe2", padding: "7px 12px", textTransform: "uppercase", letterSpacing: 0.5, color: "#2e3e4c" },
  sectionBody: { padding: "10px 16px" },
  row: { display: "grid", gridTemplateColumns: "180px 1fr", padding: "4px 0", fontSize: 12, borderBottom: "1px solid #f0f0f0", alignItems: "center" },
  label: { color: "#6b7280", fontSize: 12 },
  value: { fontWeight: 600, fontSize: 12 },
  aside: { display: "flex", flexDirection: "column", gap: 14 },
  asideCard: { background: "#fff", border: "1px solid #d7dbe2" },
};

export default function ClaimSummary() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [claim, setClaim] = useState(null);
  const [error, setError] = useState(null);


  useEffect(() => {
    let mounted = true;
    const fetchClaim = async () => {
      try {
        const res = await api.get(`/claims/search/${id}`);
        const data = res.data?.claim || res.data;
        if (mounted) {
          setClaim(data);
          setLoading(false);
        }
      } catch (err) {
        console.error("Error fetching claim:", err);
        if (mounted) {
          setError(err?.response?.data?.message || err.message || "Failed to load claim");
          setLoading(false);
        }
      }
    };
    fetchClaim();
    return () => (mounted = false);
  }, [id]);

  if (loading) {
    return (
      <div style={{ padding: 32, display: "flex", justifyContent: "center" }}>
        <CircularProgress />
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ padding: 16 }}>
        <div style={{ border: "1px solid #d7dbe2", background: "#fff", padding: 16 }}>
          <span style={{ color: "red" }}>{error}</span>
          <div style={{ marginTop: 12 }}>
            <button onClick={() => navigate(-1)} style={{ background: "#1f5fa6", color: "#fff", border: "none", padding: "6px 14px", fontSize: 12, cursor: "pointer" }}>Back</button>
          </div>
        </div>
      </div>
    );
  }

  if (!claim) {
    return (
      <div style={{ padding: 16 }}>
        <div style={{ fontSize: 12, color: "#6b7c93" }}>No claim found.</div>
        <div style={{ marginTop: 12 }}>
          <button onClick={() => navigate(-1)} style={{ background: "#1f5fa6", color: "#fff", border: "none", padding: "6px 14px", fontSize: 12, cursor: "pointer" }}>Back</button>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <PolicyTitleBar
        policyNumber={claim.policyNumber}
        claimNumber={claim.claimNumber}
        lossDate={claim.lossDate}
        status="Open"
      />

      <div style={styles.summaryTitle}>Claim Summary</div>
      <div style={styles.grid}>
        {/* Left column */}
        <div>
          {/* Basics */}
          <div style={styles.section}>
            <div style={styles.sectionTitle}>Basics</div>
            <div style={styles.sectionBody}>
              <div style={styles.row}><div style={styles.label}>Loss Date</div><div style={styles.value}>{new Date(claim.lossDate).toLocaleDateString("en-GB")}</div></div>
              <div style={styles.row}><div style={styles.label}>Loss Type</div><div style={styles.value}>{claim.claimType}</div></div>
              <div style={styles.row}><div style={styles.label}>How Reported</div><div style={styles.value}>{claim.howReported}</div></div>
              <div style={styles.row}><div style={styles.label}>Reported By</div><div style={styles.value}>{claim.reportedBy}</div></div>
              <div style={styles.row}><div style={styles.label}>Relation To Insured</div><div style={styles.value}>{claim.relationToInsured}</div></div>
              <div style={styles.row}><div style={styles.label}>Incident Only?</div><div style={styles.value}>{claim.incidentOnly ? "Yes" : "No"}</div></div>
            </div>
          </div>

          {/* Loss Details */}
          <div style={styles.section}>
            <div style={styles.sectionTitle}>Loss Details</div>
            <div style={styles.sectionBody}>
              <div style={styles.row}><div style={styles.label}>Loss Cause</div><div style={styles.value}>{claim.lossCause || "None"}</div></div>
              <div style={styles.row}><div style={styles.label}>Loss Location</div><div style={styles.value}>{claim.lossLocation || "None"}</div></div>
              <div style={styles.row}><div style={styles.label}>Loss Description</div><div style={styles.value}>{claim.lossDescription || "None"}</div></div>
              <div style={styles.row}><div style={styles.label}>Notice Date</div><div style={styles.value}>{new Date(claim.dateOfNotice).toLocaleDateString("en-GB")}</div></div>
              <div style={styles.row}><div style={styles.label}>Fault Rating</div><div style={styles.value}>{claim.faultRating || "None"}</div></div>
              <div style={styles.row}><div style={styles.label}>Weather</div><div style={styles.value}>{claim.weather}</div></div>
            </div>
          </div>

          {/* Policy */}
          <div style={styles.section}>
            <div style={styles.sectionTitle}>Policy</div>
            <div style={styles.sectionBody}>
              <div style={styles.row}><div style={styles.label}>Policy Number</div><div style={styles.value}>{claim.policyId.policyNumber}</div></div>
              <div style={styles.row}><div style={styles.label}>Type</div><div style={styles.value}>{claim.policyId.productType}</div></div>
              <div style={styles.row}><div style={styles.label}>Effective Date</div><div style={styles.value}>{new Date(claim.policyId.effectiveDate).toLocaleDateString("en-GB")}</div></div>
              <div style={styles.row}><div style={styles.label}>Expiration Date</div><div style={styles.value}>{new Date(claim.policyId.expiryDate).toLocaleDateString("en-GB")}</div></div>
            </div>
          </div>
        </div>

        {/* Right column / aside */}
        <aside style={styles.aside}>
          {/* Insured */}
          <div style={styles.asideCard}>
            <div style={styles.sectionTitle}>Insured</div>
            <div style={{ padding: "10px 16px" }}>
              <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                <li style={{ fontSize: 12 }}>
                  <div style={{ color: "#6b7280" }}>Name</div>
                  <div style={{ fontWeight: 600, color: "#1f2d3d" }}>{claim.insured.name}</div>
                  <div style={{ color: "#6b7280", marginTop: 8 }}>Phone</div>
                  <div style={{ fontWeight: 600, color: "#1f2d3d" }}>{claim.insured.phone}</div>
                  <div style={{ color: "#6b7280", marginTop: 8 }}>Address</div>
                  <div style={{ fontWeight: 600, color: "#1f2d3d" }}>{claim.insured.address}</div>
                </li>
              </ul>
            </div>
          </div>

          {/* Vehicles */}
          <div style={styles.asideCard}>
            <div style={styles.sectionTitle}>Vehicle(s)</div>
            <div style={{ padding: "10px 16px" }}>
              {Array.isArray(claim.vehicles) && claim.vehicles.length > 0 ? (
                <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                  {claim.vehicles.map((v, i) => (
                    <li key={i} style={{ fontSize: 12, borderBottom: "1px solid #f0f0f0", paddingBottom: 8, marginBottom: 8 }}>
                      <div style={{ fontWeight: 700, color: "#1f2d3d" }}>{v.make} {v.model} <span style={{ color: "#6b7280", fontWeight: 500 }}>• {v.year}</span></div>
                      <div style={{ color: "#6b7280", fontSize: 11 }}>VIN: {v.vin}</div>
                      <div style={{ color: "#6b7280", fontSize: 11 }}>Reg: {v.licensePlate || "N/A"}</div>
                    </li>
                  ))}
                </ul>
              ) : <div style={{ color: "#6b7280", fontSize: 12 }}>No vehicles recorded</div>}
            </div>
          </div>

          {/* Drivers */}
          <div style={styles.asideCard}>
            <div style={styles.sectionTitle}>Driver(s)</div>
            <div style={{ padding: "10px 16px" }}>
              {Array.isArray(claim.drivers) && claim.drivers.length > 0 ? (
                <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                  {claim.drivers.map((d, i) => (
                    <li key={i} style={{ fontSize: 12, borderBottom: "1px solid #f0f0f0", paddingBottom: 8, marginBottom: 8 }}>
                      <div style={{ fontWeight: 700, color: "#1f2d3d" }}>{d.firstName} {d.lastName}</div>
                      <div style={{ color: "#6b7280", fontSize: 11 }}>Contact: {d.email}</div>
                      <div style={{ color: "#6b7280", fontSize: 11 }}>License Type: {d.licenseType || "N/A"}</div>
                    </li>
                  ))}
                </ul>
              ) : <div style={{ color: "#6b7280", fontSize: 12 }}>No Drivers recorded</div>}
            </div>
          </div>

          {/* Quick Actions */}
          <div style={styles.asideCard}>
            <div style={styles.sectionTitle}>Quick Actions</div>
            <div style={{ padding: "10px 16px", display: "flex", flexDirection: "column", gap: 8 }}>
              <button onClick={() => navigate("/claims")} style={{ background: "#1f5fa6", color: "#fff", border: "none", padding: "7px 0", fontSize: 12, fontWeight: 600, cursor: "pointer" }}>
                Back to claims
              </button>
              <button onClick={() => navigate("/Claim")} style={{ background: "#fff", color: "#1f5fa6", border: "1px solid #1f5fa6", padding: "7px 0", fontSize: 12, cursor: "pointer" }}>
                Create a new claim
              </button>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
