import React from "react";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { useLocation, useNavigate } from "react-router-dom";

const InfoRow = ({ label, value }) => (
  <div style={{ display: "grid", gridTemplateColumns: "180px 1fr", padding: "3px 0", fontSize: 12, borderBottom: "1px solid #f0f0f0" }}>
    <span style={{ color: "#6b7c93" }}>{label}</span>
    <span style={{ fontWeight: 600, color: "#1f2d3d" }}>{value}</span>
  </div>
);

export default function ClaimSuccess() {
  const { state } = useLocation();
  const navigate = useNavigate();

  if (!state?.claim) {
    return (
      <div style={{ padding: 16 }}>
        <span style={{ color: "red" }}>Claim details not available.</span>
      </div>
    );
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-GB");
  };

  const { claim, policy, lossDescription, lossLocation, lossCause, weather, faultRating, policeReported } = state;

  console.log("ClaimSuccess received claim data:", policy);

  return (
    <div style={{ padding: "16px 18px", background: "#eef2f5", minHeight: "100%", color: "#2d3e52" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>

        {/* HEADER */}
        <div style={{ background: "#e8f5e9", border: "1px solid #a5d6a7", padding: "20px", textAlign: "center", marginBottom: 14 }}>
          <CheckCircleIcon style={{ fontSize: 40, color: "#2b7a3e" }} />
          <div style={{ fontSize: 18, fontWeight: 700, marginTop: 8, color: "#1f2d3d" }}>Claim Created Successfully</div>
          <div style={{ fontSize: 14, marginTop: 4, color: "#2b7a3e" }}>Claim Number: <strong>{claim.claimNumber}</strong></div>
        </div>

        {/* Policy Information */}
        <div style={{ border: "1px solid #d7dbe2", background: "#fff", marginBottom: 14 }}>
          <div style={{ background: "#f3f6f9", padding: "7px 12px", borderBottom: "1px solid #d7dbe2", fontSize: 11, fontWeight: 700, color: "#2e3e4c", textTransform: "uppercase", letterSpacing: 0.5 }}>Policy Information</div>
          <div style={{ padding: "10px 16px" }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0 24px" }}>
              <div>
                <InfoRow label="Policy Number" value={policy.policyNumber} />
                <InfoRow label="Policy Status" value={policy.status} />
              </div>
              <div>
                <InfoRow label="Product" value={policy.productType} />
              </div>
            </div>
          </div>
        </div>

        {/* Insured Information */}
        <div style={{ border: "1px solid #d7dbe2", background: "#fff", marginBottom: 14 }}>
          <div style={{ background: "#f3f6f9", padding: "7px 12px", borderBottom: "1px solid #d7dbe2", fontSize: 11, fontWeight: 700, color: "#2e3e4c", textTransform: "uppercase", letterSpacing: 0.5 }}>Insured Information</div>
          <div style={{ padding: "10px 16px" }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0 24px" }}>
              <div>
                <InfoRow label="Name" value={claim.insured.name} />
                <InfoRow label="Phone" value={claim.insured.phone} />
              </div>
              <div>
                <InfoRow label="Address" value={claim.insured.address} />
              </div>
            </div>
          </div>
        </div>

        {/* Loss / FNOL Details */}
        <div style={{ border: "1px solid #d7dbe2", background: "#fff", marginBottom: 14 }}>
          <div style={{ background: "#f3f6f9", padding: "7px 12px", borderBottom: "1px solid #d7dbe2", fontSize: 11, fontWeight: 700, color: "#2e3e4c", textTransform: "uppercase", letterSpacing: 0.5 }}>Loss / FNOL Details</div>
          <div style={{ padding: "10px 16px" }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0 24px" }}>
              <div>
                <InfoRow label="Loss Date" value={formatDate(claim.lossDate)} />
                <InfoRow label="Date of Notice" value={formatDate(claim.dateOfNotice)} />
                <InfoRow label="Claim Type" value={claim.claimType} />
              </div>
              <div>
                <InfoRow label="Reported By" value={claim.reportedBy} />
                <InfoRow label="How Reported" value={claim.howReported} />
              </div>
            </div>
          </div>
        </div>

        {/* Loss Description & Details */}
        <div style={{ border: "1px solid #d7dbe2", background: "#fff", marginBottom: 14 }}>
          <div style={{ background: "#f3f6f9", padding: "7px 12px", borderBottom: "1px solid #d7dbe2", fontSize: 11, fontWeight: 700, color: "#2e3e4c", textTransform: "uppercase", letterSpacing: 0.5 }}>Loss Description &amp; Details</div>
          <div style={{ padding: "10px 16px" }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0 24px" }}>
              <div>
                <InfoRow label="Loss Description" value={lossDescription || "N/A"} />
                <InfoRow label="Loss Location" value={lossLocation || "N/A"} />
                <InfoRow label="Loss Cause" value={lossCause || "N/A"} />
              </div>
              <div>
                <InfoRow label="Weather Condition" value={weather || "N/A"} />
                <InfoRow label="Fault Rating" value={faultRating || "N/A"} />
                <InfoRow label="Police Reported" value={policeReported ? "Yes" : "No"} />
              </div>
            </div>
          </div>
        </div>

        {/* Vehicles Involved */}
        <div style={{ border: "1px solid #d7dbe2", background: "#fff", marginBottom: 14 }}>
          <div style={{ background: "#f3f6f9", padding: "7px 12px", borderBottom: "1px solid #d7dbe2", fontSize: 11, fontWeight: 700, color: "#2e3e4c", textTransform: "uppercase", letterSpacing: 0.5 }}>Vehicles Involved</div>
          <div style={{ padding: "10px 16px" }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0 24px" }}>
              <div>
                <InfoRow label="Make" value={policy.vehicle[0].make || "N/A"} />
                <InfoRow label="Model" value={policy.vehicle[0].model || "N/A"} />
                <InfoRow label="Year" value={policy.vehicle[0].year || "N/A"} />
              </div>
              <div>
                <InfoRow label="License Plate" value={policy.vehicle[0].licensePlate || "N/A"} />
                <InfoRow label="State Registered" value={policy.vehicle[0].stateRegistered || "N/A"} />
                <InfoRow label="Vin" value={policy.vehicle[0].vin || "N/A"} />
              </div>
            </div>
          </div>
        </div>

        {/* Drivers Involved */}
        <div style={{ border: "1px solid #d7dbe2", background: "#fff", marginBottom: 14 }}>
          <div style={{ background: "#f3f6f9", padding: "7px 12px", borderBottom: "1px solid #d7dbe2", fontSize: 11, fontWeight: 700, color: "#2e3e4c", textTransform: "uppercase", letterSpacing: 0.5 }}>Drivers Involved</div>
          <div style={{ padding: "10px 16px" }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0 24px" }}>
              <div>
                <InfoRow label="Driver Name" value={policy.driver[0].firstName || "N/A"} />
                <InfoRow label="License Date" value={formatDate(policy.driver[0].licenseDate) || "N/A"} />
                <InfoRow label="License Type" value={policy.driver[0].licenseType || "N/A"} />
              </div>
              <div>
                <InfoRow label="Date of Birth" value={formatDate(policy.driver[0].dateOfBirth) || "N/A"} />
                <InfoRow label="Driving Experience" value={policy.driver[0].drivingExperience || "N/A"} />
                <InfoRow label="Country" value={policy.driver[0].country || "N/A"} />
              </div>
            </div>
          </div>
        </div>

        {/* ACTION */}
        <div style={{ textAlign: "center", marginTop: 16, marginBottom: 16 }}>
          <button onClick={() => navigate("/Claim")} style={{ background: "#1f5fa6", color: "#fff", border: "none", padding: "8px 24px", fontSize: 13, fontWeight: 600, cursor: "pointer" }}>
            Back to Home
          </button>
        </div>
      </div>
    </div>
  );
}
