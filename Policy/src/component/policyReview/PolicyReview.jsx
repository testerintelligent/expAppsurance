import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Button, Snackbar, Alert, CircularProgress } from "@mui/material";
import InfoBar from "../InfoBar";
import { calculatePremium } from "../vehicle/vehicleAPI";
import { COVERAGE_OPTIONS } from "../../constants/coverages";
import { COMMERCIAL_COVERAGE_OPTIONS } from "../../constants/commercialCoverages";
import { useWorkflowState } from "../../utils/workflowSession";

// ─── Policy Review screen ───────────────────────────────────────────────────
// Personal:   Driver → Vehicle → Risk Analysis → Policy Review → Quote.
// Commercial: CommercialDriver → CommercialVehicle → Risk Analysis → Policy Review → Quote.
// Read-only summary of everything captured so far. "Quote" runs the pricing
// service and opens /quote.

const stateCodeMap = {
  TN: "Tamil Nadu",
  KR: "Karnataka",
  KL: "Kerala",
  AP: "Andhra Pradesh",
  MH: "Maharashtra",
  CA: "California",
  NY: "New York",
};
const getFullStateName = (s) => (!s ? "Tamil Nadu" : stateCodeMap[s] || s);

const MIN_DRIVER_AGE = 18;
const UNDERAGE_ISSUE_ID = "driver-underage";

// Full years between the date of birth and today; null if no/invalid DOB
const getAge = (dob) => {
  if (!dob) return null;
  const birth = new Date(dob);
  if (isNaN(birth)) return null;
  const today = new Date();
  let age = today.getFullYear() - birth.getFullYear();
  const m = today.getMonth() - birth.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) age--;
  return age;
};

const fmtDate = (d) => {
  if (!d || d === "-") return "-";
  const dt = new Date(d);
  return isNaN(dt) ? String(d) : dt.toLocaleDateString("en-GB");
};

/* ─────────── shared styles ─────────── */
const sectionBar = {
  background: "#eef1f4",
  borderTop: "2px solid #d7dbe2",
  borderBottom: "1px solid #d7dbe2",
  padding: "6px 12px",
  fontSize: 15,
  fontWeight: 700,
  color: "#8a96a3",
  marginTop: 14,
};
const subHead = { fontSize: 12, fontWeight: 700, color: "#2d3e52", margin: "10px 0 4px" };
const label = { fontSize: 12, color: "#2d3e52", padding: "5px 0", width: 150, flexShrink: 0, verticalAlign: "top" };
const labelBold = { ...label, fontWeight: 700 };
const value = { fontSize: 12, color: "#2d3e52", padding: "5px 0", verticalAlign: "top" };
const th = {
  textAlign: "left",
  padding: "6px 10px",
  fontSize: 12,
  fontWeight: 500,
  color: "#2d3e52",
  background: "#f5f6f7",
  border: "1px solid #d7dbe2",
};
const td = { padding: "6px 10px", fontSize: 12, color: "#2d3e52", border: "1px solid #e3e8ee" };
const tableWrap = { overflowX: "auto", marginBottom: 8 };

const inr = (n) => `₹${Number(n || 0).toLocaleString("en-IN")}`;

// Shows exactly the coverages selected on the Vehicle → Coverages tab
function CoverageTable({ items }) {
  if (items.length === 0) {
    return <div style={{ fontSize: 12, color: "#6b7c93", padding: "4px 0" }}>No coverages selected.</div>;
  }
  const total = items.reduce((sum, c) => sum + c.premium, 0);
  return (
    <div style={tableWrap}>
      <table style={{ borderCollapse: "collapse", width: "100%", minWidth: 520 }}>
        <thead>
          <tr>
            <th style={{ ...th, width: 220 }}>Coverage</th>
            <th style={th}>Description</th>
            <th style={{ ...th, width: 130, textAlign: "right" }}>Premium / yr</th>
          </tr>
        </thead>
        <tbody>
          {items.map((c) => (
            <tr key={c.name}>
              <td style={{ ...td, fontWeight: 700 }}>
                {c.name}
                {c.mandatory && (
                  <span style={{ marginLeft: 6, fontSize: 10, color: "#c62828", fontWeight: 600 }}>MANDATORY</span>
                )}
              </td>
              <td style={td}>{c.description}</td>
              <td style={{ ...td, textAlign: "right" }}>{inr(c.premium)}</td>
            </tr>
          ))}
          <tr style={{ background: "#f5f6f7" }}>
            <td style={{ ...td, fontWeight: 700 }} colSpan={2}>Total</td>
            <td style={{ ...td, textAlign: "right", fontWeight: 700 }}>{inr(total)}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default function PolicyReview() {
  const state = useWorkflowState() || {};
  const navigate = useNavigate();
  const contact = state.contact || {};
  const driver = state.driver || state.driverForm || {};
  const vehicleData = state.vehicleData || {};
  const selected = state.coverages || [];

  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const isCommercial = (state.productName || "").toLowerCase().includes("commercial");

  // Commercial: the named insured is the company (account contact) — state.contact
  // holds the driver by now. Personal: the insured is the contact captured so far.
  const insured = (isCommercial && state.account?.customerId) || contact;
  const insuredName =
    (isCommercial && (insured.organization || state.account?.accountHolderName)) ||
    state.account?.accountHolderName ||
    `${insured.firstName || ""} ${insured.lastName || ""}`.trim() ||
    "-";
  const driverName = `${driver.firstName || ""} ${driver.lastName || ""}`.trim() || insuredName;

  const streetLine = [insured.address, insured.address2].filter(Boolean).join(", ");
  const cityLine = [insured.city, [getFullStateName(insured.state), insured.zipCode].filter(Boolean).join(" ")]
    .filter(Boolean)
    .join(", ");

  // Keep the catalogue order; only those ticked on the (Commercial) Vehicle page
  const chosen = (isCommercial ? COMMERCIAL_COVERAGE_OPTIONS : COVERAGE_OPTIONS).filter((c) =>
    selected.includes(c.name)
  );

  const handleBack = () => navigate("/risk-analysis", { state });

  const handleQuote = async () => {
    // ── UW rule: driver must be at least 18 years old ──
    const dob = driver.dateOfBirth || state.driverForm?.dateOfBirth || contact.dateOfBirth;
    const age = getAge(dob);
    const otherIssues = (state.uwIssues || []).filter((i) => i.id !== UNDERAGE_ISSUE_ID);
    const existing = (state.uwIssues || []).find((i) => i.id === UNDERAGE_ISSUE_ID);

    if (age === null || age < MIN_DRIVER_AGE) {
      const description =
        age === null
          ? `Driver ${driverName} has no valid date of birth. Minimum driver age is ${MIN_DRIVER_AGE} years.`
          : `Driver ${driverName} is ${age} years old (DOB ${fmtDate(dob)}). Minimum driver age is ${MIN_DRIVER_AGE} years.`;

      // An underwriter can approve the issue on Risk Analysis — then quoting is allowed,
      // as long as the details (and so the description) haven't changed since.
      const approved = existing?.status === "Approved" && existing.description === description;

      if (!approved) {
        const now = new Date().toLocaleString();
        const issue = {
          id: UNDERAGE_ISSUE_ID,
          shortName: `Driver under ${MIN_DRIVER_AGE}`,
          value: age === null ? "No DOB" : age,
          description,
          blocking: "Blocks Quote",
          status: "Open",
          history: [...(existing?.history || []), { action: "Raised on Quote", at: now }],
        };
        navigate("/risk-analysis", {
          state: {
            ...state,
            uwIssues: [...otherIssues, issue],
            uwAlert: "Quote blocked: the driver must be at least 18 years old. See UW Issues.",
          },
        });
        return;
      }
    }

    // Age OK → drop any stale under-age issue
    const uwIssues = age !== null && age >= MIN_DRIVER_AGE ? otherIssues : state.uwIssues || [];

    const licenseTypeMap = {
      "CDL Class A": "HMV",
      "CDL Class B": "HMV",
      "CDL Class C": "LMV",
      "Light Motor Vehicle": "LMV",
      "Heavy Motor Vehicle": "HMV",
    };
    const vehicleAge = new Date().getFullYear() - parseInt(vehicleData.year);

    const pricingPayload = {
      product: state.productName,
      policyDate: state.effectiveDate || new Date().toISOString().split("T")[0],
      input: {
        country: contact.country || "India",
        state: getFullStateName(contact.state || contact.stateCode || vehicleData.stateRegistered),
        city: contact.city || "",
        licenseType: licenseTypeMap[driver.licenseType] || (isCommercial ? "HMV" : "LMV"),
        drivingExperience: parseInt(driver.drivingExperience) || 0,
        claimHistory: parseInt(driver.accidentsClaims ?? driver.claimHistory) || 0,
        vehicleAge,
      },
    };

    try {
      setLoading(true);
      const pricingResult = await calculatePremium(pricingPayload);
      navigate("/quote", { state: { ...state, uwIssues, pricingData: pricingResult } });
    } catch (err) {
      console.error("Pricing failed:", err);
      setErrorMsg(err.response?.data?.message || "Failed to calculate premium. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ maxWidth: 1100, mx: 0 }}>
      <InfoBar
        accountNumber={state.accountNumber || "-"}
        product={state.productName || "-"}
        contactName={`${contact.firstName || ""} ${contact.lastName || ""}`.trim()}
        submissionId={state.submissionId || "-"}
        effectiveDate={state.effectiveDate || "-"}
        expiryDate={state.expiryDate || "-"}
      />

      <div style={{ fontSize: 16, fontWeight: 700, color: "#2d3e52", marginBottom: 10 }}>Policy Review</div>

      <div style={{ border: "1px solid #d7dbe2", background: "#fff", padding: "4px 12px 12px" }}>
        {/* ── Insured & policy details ───────────────────────── */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: 16 }}>
          <table style={{ flex: "1 1 360px", borderCollapse: "collapse" }}>
            <tbody>
              <tr><td style={labelBold}>Primary Named Insured</td><td style={value}>{insuredName}</td></tr>
              <tr>
                <td style={label}>Address</td>
                <td style={value}>
                  {streetLine || "-"}
                  {cityLine && <><br />{cityLine}</>}
                </td>
              </tr>
              <tr><td style={label}>Country</td><td style={value}>{insured.country || "-"}</td></tr>
              <tr><td style={label}>Phone</td><td style={value}>{insured.phone || "-"}</td></tr>
              <tr><td style={label}>Email</td><td style={value}>{insured.email || "-"}</td></tr>
            </tbody>
          </table>
          <table style={{ flex: "1 1 300px", borderCollapse: "collapse", borderLeft: "1px solid #d7dbe2" }}>
            <tbody>
              <tr><td style={{ ...labelBold, paddingLeft: 12 }}>Product</td><td style={value}>{state.productName || "-"}</td></tr>
              <tr><td style={{ ...labelBold, paddingLeft: 12 }}>Effective Date</td><td style={value}>{fmtDate(state.effectiveDate)}</td></tr>
              <tr><td style={{ ...labelBold, paddingLeft: 12 }}>Expiration Date</td><td style={value}>{fmtDate(state.expiryDate)}</td></tr>
              <tr><td style={{ ...labelBold, paddingLeft: 12 }}>Submission</td><td style={value}>{state.submissionId || "-"}</td></tr>
            </tbody>
          </table>
        </div>

        {/* ── Line-level coverages ───────────────────────────── */}
        <div style={sectionBar}>{state.productName || "Personal Auto"} Line</div>
        <div style={subHead}>Selected Coverages</div>
        <CoverageTable items={chosen} />

        {/* ── Vehicle ────────────────────────────────────────── */}

        <div style={sectionBar}>Vehicle 1</div>
        <div style={{ display: "flex", flexWrap: "wrap", borderBottom: "1px solid #eef1f4" }}>
          {[
            ["VIN", vehicleData.vin],
            ["Model Year", vehicleData.year],
            ["Make", vehicleData.make],
            ["Model", vehicleData.model],
            ["License Plate", vehicleData.licensePlate],
            ["State Registered", vehicleData.stateRegistered],
            ...(isCommercial
              ? [
                  ["Vehicle Type", vehicleData.vehicleType],
                  ["Vehicle Use", vehicleData.vehicleUse],
                  ["Weight Class", vehicleData.weightClass],
                  ["DOT Vehicle No", vehicleData.dotVehicleNo],
                ]
              : []),
          ].map(([k, v]) => (
            <div key={k} style={{ flex: "1 1 240px", display: "flex", padding: "4px 0" }}>
              <span style={{ ...labelBold, width: 120 }}>{k}</span>
              <span style={value}>{v || "-"}</span>
            </div>
          ))}
        </div>

        <div style={{ display: "flex", padding: "6px 0" }}>
          <span style={{ ...labelBold, width: 120 }}>Primary Driver</span>
          <span style={value}>{driverName}</span>
        </div>

        <div style={subHead}>Assigned Drivers</div>
        <div style={tableWrap}>
          <table style={{ borderCollapse: "collapse", minWidth: 300 }}>
            <thead>
              <tr>
                <th style={{ ...th, width: 180, color: "#1f5fa6" }}>Driver</th>
                <th style={{ ...th, width: 120, color: "#1f5fa6" }}>Percentage</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={td}>{driverName}</td>
                <td style={{ ...td, textAlign: "right" }}>100</td>
              </tr>
              <tr>
                <td style={{ ...td, fontWeight: 700 }}>Total</td>
                <td style={{ ...td, textAlign: "right", fontWeight: 700 }}>100</td>
              </tr>
            </tbody>
          </table>
        </div>

      </div>

      {/* Navigation — Back on the left, Quote on the right */}
      <Box sx={{ display: "flex", justifyContent: "space-between", mt: 2, pb: 2 }}>
        <Button variant="outlined" size="small" onClick={handleBack}>
          Back
        </Button>
        <Button
          variant="contained"
          size="small"
          onClick={handleQuote}
          disabled={loading}
          startIcon={loading ? <CircularProgress size={14} color="inherit" /> : null}
        >
          Quote
        </Button>
      </Box>

      <Snackbar
        open={!!errorMsg}
        autoHideDuration={4000}
        onClose={() => setErrorMsg("")}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert onClose={() => setErrorMsg("")} severity="error" sx={{ width: "100%" }}>
          {errorMsg}
        </Alert>
      </Snackbar>
    </Box>
  );
}
