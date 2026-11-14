import React, { useEffect, useState } from "react";
import {
  FormControl,
  Select,
  MenuItem,
  InputLabel,
  Checkbox,
} from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import PolicyTitleBar from "./PolicyTitleBar";


export default function BasicInformation() {
  const location = useLocation();
  const navigate = useNavigate();

  /* ===============================
     STATE
     =============================== */
  const [policy, setPolicy] = useState(null);
  const [lossDate, setLossDate] = useState("");
  const [claimType, setClaimType] = useState("");

  const [howReported, setHowReported] = useState("Phone");
  const [reportedName, setReportedName] = useState("");
  const [relation, setRelation] = useState("Self");
  const [dateOfNotice, setDateOfNotice] = useState(
    new Date().toISOString().substring(0, 10)
  );
  const [samePerson, setSamePerson] = useState("same");
  const [selectedVehicles, setSelectedVehicles] = useState([]);
  const [selectedDrivers, setSelectedDrivers] = useState([]);

  /* ===============================
     LOAD POLICY CONTEXT
     =============================== */
  useEffect(() => {
    if (location.state?.policy) {
      setPolicy(location.state.policy);
      setLossDate(location.state.lossDate || "");
      setClaimType(location.state.claimType || "");
    } else {
      const saved = sessionStorage.getItem("selectedPolicyForClaim");
      if (saved) {
        setPolicy(JSON.parse(saved));
      }
    }
  }, [location.state]);

  /* ===============================
     AUTO-FILL REPORTER (INSURED)
     =============================== */
  useEffect(() => {
    if (policy?.contact) {
      const first = policy.contact.firstName || "";
      const last = policy.contact.lastName || "";
      setReportedName(`${first} ${last}`.trim());
    }
  }, [policy]);

  /* ===============================
     EARLY RETURN
     =============================== */
  if (!policy) {
    return (
      <div style={{ padding: 16 }}>
        <span style={{ color: "red" }}>No policy context found. Please go back.</span>
      </div>
    );
  }

  const contact = policy.contact;
  const vehicles = policy.vehicle || [];
  const drivers = policy.driver || [];

  const insuredFullName = `${contact?.firstName || ""} ${contact?.lastName || ""}`.trim();

  const insuredAddress =
    contact?.address ||
    contact?.street ||
    `${contact?.city || ""}, ${contact?.state || ""} ${contact?.zipCode || ""}`;

  /* ===============================
     HANDLERS
     =============================== */
  const toggleVehicle = (id) => {
    setSelectedVehicles((prev) =>
      prev.includes(id) ? prev.filter((v) => v !== id) : [...prev, id]
    );
  };

  const toggleDriver = (id) => {
    setSelectedDrivers((prev) =>
      prev.includes(id) ? prev.filter((d) => d !== id) : [...prev, id]
    );
  };

  const handleNext = () => {
    navigate("/Claim/addClaimInfo", {
      state: {
        policy,
        lossDate,
        claimType,
        howReported,
        reportedName,
        relation,
        dateOfNotice,
        samePerson,
        selectedVehicles,
        selectedDrivers,
        drivers,
        vehicles,
      },
    });
  };

  /* ===============================
     UI
     =============================== */
  return (
    <div style={{ padding: "16px 18px", background: "#eef2f5", minHeight: "100%", color: "#2d3e52" }}>
      <div style={{ maxWidth: 1200, background: "#fff", border: "1px solid #d7dbe2" }}>
        <div style={{ padding: "14px 16px" }}>
          {/* TITLE BAR */}
          <PolicyTitleBar
            policyNumber={policy?.policyNumber}
            insured={insuredFullName}
            lossDate={lossDate}
            status="Draft"
          />

          {/* Action buttons */}
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 16, marginTop: 8 }}>
            <button style={{ border: "1px solid #c62828", background: "#fff", color: "#c62828", padding: "5px 14px", fontSize: 12, cursor: "pointer" }}>
              Cancel
            </button>
            <div style={{ display: "flex", gap: 8 }}>
              <button onClick={() => navigate(-1)} style={{ border: "1px solid #d7dbe2", background: "#fff", color: "#2d3e52", padding: "5px 14px", fontSize: 12, cursor: "pointer" }}>
                ← Back
              </button>
              <button onClick={handleNext} style={{ background: "#1f5fa6", color: "#fff", border: "none", padding: "5px 14px", fontSize: 12, fontWeight: 600, cursor: "pointer" }}>
                Next →
              </button>
            </div>
          </div>

          {/* ================= REPORTED BY ================= */}
          <div style={{ fontSize: 11, fontWeight: 700, color: "#2e3e4c", textTransform: "uppercase", letterSpacing: 0.5, background: "#f3f6f9", border: "1px solid #d7dbe2", borderLeft: "none", borderRight: "none", padding: "7px 12px", marginBottom: 10, marginTop: 16 }}>
            Reported By
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12, padding: "0 0 12px" }}>
            <div>
              <FormControl fullWidth size="small">
                <InputLabel>How Reported</InputLabel>
                <Select
                  label="How Reported"
                  value={howReported}
                  onChange={(e) => setHowReported(e.target.value)}
                >
                  <MenuItem value="Phone">Phone</MenuItem>
                  <MenuItem value="Email">Email</MenuItem>
                  <MenuItem value="In Person">In Person</MenuItem>
                </Select>
              </FormControl>
            </div>

            <div>
              <FormControl fullWidth size="small">
                <InputLabel>Name</InputLabel>
                <Select
                  label="Name"
                  value={reportedName}
                  onChange={(e) => setReportedName(e.target.value)}
                >
                  <MenuItem value={insuredFullName}>{insuredFullName}</MenuItem>
                </Select>
              </FormControl>
            </div>

            <div>
              <FormControl fullWidth size="small">
                <InputLabel>Relation</InputLabel>
                <Select
                  label="Relation"
                  value={relation}
                  onChange={(e) => setRelation(e.target.value)}
                >
                  <MenuItem value="Self">Self</MenuItem>
                  <MenuItem value="Spouse">Spouse</MenuItem>
                  <MenuItem value="Child">Child</MenuItem>
                  <MenuItem value="Agent">Agent</MenuItem>
                  <MenuItem value="Other">Other</MenuItem>
                </Select>
              </FormControl>
            </div>
          </div>

          <div style={{ borderTop: "1px solid #d7dbe2", margin: "14px 0" }} />

          {/* ================= INSURED ================= */}
          <div style={{ fontSize: 11, fontWeight: 700, color: "#2e3e4c", textTransform: "uppercase", letterSpacing: 0.5, background: "#f3f6f9", border: "1px solid #d7dbe2", borderLeft: "none", borderRight: "none", padding: "7px 12px", marginBottom: 10 }}>
            Insured
          </div>
          <div style={{ padding: "12px 0", fontSize: 12, display: "flex", flexDirection: "column", gap: 4 }}>
            <div><span style={{ color: "#6b7c93", minWidth: 80, display: "inline-block" }}>Name:</span> <span style={{ fontWeight: 600 }}>{insuredFullName}</span></div>
            <div><span style={{ color: "#6b7c93", minWidth: 80, display: "inline-block" }}>Address:</span> <span style={{ fontWeight: 600 }}>{insuredAddress}</span></div>
            <div><span style={{ color: "#6b7c93", minWidth: 80, display: "inline-block" }}>Phone:</span> <span style={{ fontWeight: 600 }}>{contact?.phone || "N/A"}</span></div>
          </div>

          <div style={{ borderTop: "1px solid #d7dbe2", margin: "14px 0" }} />

          {/* ================= VEHICLES ================= */}
          <div style={{ fontSize: 11, fontWeight: 700, color: "#2e3e4c", textTransform: "uppercase", letterSpacing: 0.5, background: "#f3f6f9", border: "1px solid #d7dbe2", borderLeft: "none", borderRight: "none", padding: "7px 12px", marginBottom: 10 }}>
            Involved Vehicles
          </div>

          {vehicles.length > 0 ? (
            vehicles.map((v) => (
              <div key={v._id} style={{ display: "flex", alignItems: "center", fontSize: 12, marginBottom: 4 }}>
                <Checkbox
                  checked={selectedVehicles.includes(v._id)}
                  onChange={() => toggleVehicle(v._id)}
                  size="small"
                />
                <span>
                  {v.year} {v.make} {v.model} ({v.licensePlate})
                </span>
              </div>
            ))
          ) : (
            <div style={{ fontSize: 12, color: "#6b7c93", paddingBottom: 8 }}>No vehicles found.</div>
          )}

          <div style={{ borderTop: "1px solid #d7dbe2", margin: "14px 0" }} />

          {/* ================= DRIVERS ================= */}
          <div style={{ fontSize: 11, fontWeight: 700, color: "#2e3e4c", textTransform: "uppercase", letterSpacing: 0.5, background: "#f3f6f9", border: "1px solid #d7dbe2", borderLeft: "none", borderRight: "none", padding: "7px 12px", marginBottom: 10 }}>
            Drivers
          </div>

          {drivers.length > 0 ? (
            drivers.map((d) => (
              <div key={d._id} style={{ display: "flex", alignItems: "center", fontSize: 12, marginBottom: 4 }}>
                <Checkbox
                  checked={selectedDrivers.includes(d._id)}
                  onChange={() => toggleDriver(d._id)}
                  size="small"
                />
                <span>
                  {d.firstName} {d.lastName}
                </span>
              </div>
            ))
          ) : (
            <div style={{ fontSize: 12, color: "#6b7c93", paddingBottom: 8 }}>No drivers found.</div>
          )}
        </div>
      </div>
    </div>
  );
}
