import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Button, Snackbar, Alert } from "@mui/material";
import InfoBar from "../InfoBar";
import { useWorkflowState } from "../../utils/workflowSession";

// ─── Risk Analysis (UW) screen ──────────────────────────────────────────────
// Driver → Vehicle → Risk Analysis → Policy Review → Quote.
// "Next" opens Policy Review. Blocking UW issues that are not approved prevent moving on.

const TABS = [
  "UW Issues",
  "Contingencies",
  "Prior Policies",
  "Claims",
  "Prior Losses",
  "Motor Vehicle Records",
];

/* ─────────── shared styles ─────────── */
const btn = (enabled = true) => ({
  background: enabled ? "#1f5fa6" : "#b8bfc7",
  color: "#fff",
  border: "none",
  borderRadius: 2,
  padding: "6px 14px",
  fontSize: 13,
  cursor: enabled ? "pointer" : "default",
});
const th = {
  textAlign: "left",
  padding: "7px 10px",
  fontSize: 11,
  fontWeight: 700,
  color: "#2e3e4c",
  background: "#f3f6f9",
  borderBottom: "1px solid #d7dbe2",
};
const td = { padding: "7px 10px", fontSize: 12, borderBottom: "1px solid #e3e8ee" };
const emptyMsg = { fontSize: 13, fontWeight: 700, color: "#2d3e52", padding: "8px 0" };
const uwTd = { padding: "5px 10px", fontSize: 13, color: "#2d3e52", borderBottom: "1px solid #e3e8ee", borderRight: "1px solid #eef0f2" };

// UW issue groups, in display order, keyed off each issue's blocking point
const ISSUE_GROUPS = ["Blocking Quote Release", "Blocking Bind", "Blocking Issuance", "Informational"];
const issueGroup = (i) =>
  ({
    "Blocks Quote": "Blocking Quote Release",
    "Blocks Bind": "Blocking Bind",
    "Blocks Issuance": "Blocking Issuance",
  }[i.blocking] || "Informational");

export default function RiskAnalysis() {
  const state = useWorkflowState() || {};
  const navigate = useNavigate();
  const contact = state.contact || {};
  const driver = state.driver || state.driverForm || {};
  const vehicleData = state.vehicleData || {};
  const contingencies = state.contingencies || [];

  const [tab, setTab] = useState(0);
  const [issues, setIssues] = useState(state.uwIssues || []);
  const [checked, setChecked] = useState([]); // ids of ticked UW issues
  const [expanded, setExpanded] = useState(null); // id of issue whose details are shown
  const [blockingFilter, setBlockingFilter] = useState("Me");
  // Policy Review sends uwAlert when a UW rule (e.g. driver under 18) blocks the quote
  const [toast, setToast] = useState(state.uwAlert ? { severity: "error", msg: state.uwAlert } : null); // { severity, msg }

  const currentState = () => {
    const { uwAlert, ...rest } = state; // one-time message, don't carry it forward
    return { ...rest, uwIssues: issues };
  };
  const showToast = (severity, msg) => setToast({ severity, msg });

  /* ─────────── actions ─────────── */
  const isCommercial = (state.productName || "").toLowerCase().includes("commercial");
  const handleBack = () =>
    navigate(isCommercial ? "/commercial-vehicle" : "/vehicle", { state: currentState() });

  // Apply a status change to the given issue ids. `action` is what goes in History.
  const changeIssueStatus = (ids, newStatus, action = newStatus) => {
    if (!ids.length) return;
    const now = new Date().toLocaleString();
    setIssues((prev) =>
      prev.map((i) =>
        ids.includes(i.id)
          ? { ...i, status: newStatus, history: [...(i.history || []), { action, at: now }] }
          : i
      )
    );
    setChecked([]);
  };

  const toggleChecked = (id) =>
    setChecked((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));

  const showHistory = () => {
    const issue = issues.find((i) => i.id === checked[0]);
    if (!issue) return;
    showToast("info", (issue.history || []).map((h) => `${h.action} – ${h.at}`).join("  |  "));
  };

  const handleNext = () => {
    const blockers = issues.filter((i) => i.blocking === "Blocks Quote" && i.status !== "Approved");
    if (blockers.length) {
      showToast("error", `${blockers.length} UW issue(s) block quoting. Approve them first.`);
      setTab(0);
      return;
    }
    navigate("/policy-review", { state: currentState() });
  };

  const visibleIssues = issues.filter((i) => (blockingFilter === "Me" ? i.status !== "Approved" : true));
  const checkedIssues = issues.filter((i) => checked.includes(i.id));
  const canReject = checkedIssues.some((i) => i.status !== "Rejected");
  const canReopen = checkedIssues.some((i) => i.status !== "Open");
  const canHistory = checkedIssues.length === 1;
  const driverName = `${driver.firstName || ""} ${driver.lastName || ""}`.trim() || "-";

  /* ─────────── tab bodies ─────────── */
  const renderIssueTable = (rows) =>
    rows.length === 0 ? null : (
      <div style={{ overflowX: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", marginBottom: 8 }}>
          <thead>
            <tr>
              <th style={th}>Description</th>
              <th style={th}>Blocking Point</th>
              <th style={th}>Status</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.id}>
                <td style={td}>{r.description}</td>
                <td style={td}>{r.blocking}</td>
                <td style={td}>{r.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );

  const renderTab = () => {
    switch (tab) {
      case 0:
        return (
          <>
            {/* Toolbar — acts on the ticked rows */}
            <div style={{ display: "flex", gap: 8, alignItems: "center", flexWrap: "wrap", padding: "6px 0" }}>
              {/* Approve needs authority the current user doesn't have — use Special Approve on the row */}
              <button style={btn(false)} disabled title="Insufficient authority — use Special Approve">Approve</button>
              <button style={btn(canReject)} disabled={!canReject} onClick={() => changeIssueStatus(checked, "Rejected")}>Reject</button>
              <button style={btn(canReopen)} disabled={!canReopen} onClick={() => changeIssueStatus(checked, "Open", "Reopened")}>Reopen</button>
              <button style={btn(canHistory)} disabled={!canHistory} onClick={showHistory}>History</button>
              <label style={{ fontSize: 13, color: "#2d3e52", marginLeft: 6 }}>
                View Issues Blocking <span style={{ color: "#e8875b" }}>*</span>
              </label>
              <select
                value={blockingFilter}
                onChange={(e) => setBlockingFilter(e.target.value)}
                style={{ fontSize: 13, padding: "5px 8px", minWidth: 200, border: "1px solid #c5ccd5", background: "#f5f5f5" }}
              >
                <option value="Me">Me</option>
                <option value="All">All</option>
              </select>
            </div>

            {visibleIssues.length === 0 ? (
              <div style={emptyMsg}>No issues identified at this time.</div>
            ) : (
              <div style={{ overflowX: "auto" }}>
                <table style={{ width: "100%", minWidth: 760, borderCollapse: "collapse", border: "1px solid #d7dbe2" }}>
                  <tbody>
                    {ISSUE_GROUPS.map((group) => {
                      const rows = visibleIssues.filter((i) => issueGroup(i) === group);
                      if (rows.length === 0) return null;
                      const informational = group === "Informational";
                      return (
                        <React.Fragment key={group}>
                          <tr style={{ background: "#f3f4f5" }}>
                            <td style={{ ...uwTd, width: 32 }} />
                            <td style={{ ...uwTd, color: "#2d3e52" }} colSpan={5}>{group}</td>
                          </tr>
                          {rows.map((r) => (
                            <React.Fragment key={r.id}>
                              <tr style={{ background: checked.includes(r.id) ? "#edf4fb" : "#fff" }}>
                                <td style={{ ...uwTd, width: 32, textAlign: "center" }}>
                                  <input
                                    type="checkbox"
                                    checked={checked.includes(r.id)}
                                    onChange={() => toggleChecked(r.id)}
                                    style={{ cursor: "pointer", accentColor: "#1f5fa6" }}
                                  />
                                </td>
                                <td style={{ ...uwTd, width: 300 }}>
                                  <span
                                    onClick={() => setExpanded(expanded === r.id ? null : r.id)}
                                    style={{ color: "#1f5fa6", cursor: "pointer" }}
                                    title="Show details"
                                  >
                                    {r.shortName || r.description}
                                  </span>
                                </td>
                                <td style={{ ...uwTd, width: 40, textAlign: "center" }}>
                                  {r.status === "Open" && !informational ? "*" : ""}
                                </td>
                                <td style={{ ...uwTd, width: 140, textAlign: "right" }}>{r.value ?? ""}</td>
                                <td style={{ ...uwTd, color: "#6b7c93", fontStyle: "italic" }}>
                                  {r.status !== "Open" ? r.statusLabel || r.status : ""}
                                </td>
                                <td style={{ ...uwTd, textAlign: "right", whiteSpace: "nowrap", width: 290 }}>
                                  <span style={{ display: "inline-flex", gap: 4 }}>
                                    {!informational && (
                                      <button style={btn(false)} disabled title="Insufficient authority — use Special Approve">Approve</button>
                                    )}
                                    <button
                                      style={btn(r.status !== "Rejected")}
                                      disabled={r.status === "Rejected"}
                                      onClick={() => changeIssueStatus([r.id], "Rejected")}
                                    >
                                      Reject
                                    </button>
                                    {!informational && (
                                      <button
                                        style={btn(r.status !== "Approved")}
                                        disabled={r.status === "Approved"}
                                        onClick={() => {
                                          setIssues((prev) =>
                                            prev.map((i) =>
                                              i.id === r.id
                                                ? {
                                                    ...i,
                                                    status: "Approved",
                                                    statusLabel: "Special Approved",
                                                    history: [...(i.history || []), { action: "Special Approved", at: new Date().toLocaleString() }],
                                                  }
                                                : i
                                            )
                                          );
                                          setChecked((prev) => prev.filter((x) => x !== r.id));
                                        }}
                                      >
                                        Special Approve
                                      </button>
                                    )}
                                  </span>
                                </td>
                              </tr>
                              {expanded === r.id && (
                                <tr>
                                  <td style={uwTd} />
                                  <td style={{ ...uwTd, color: "#4c5d72", fontSize: 12 }} colSpan={5}>{r.description}</td>
                                </tr>
                              )}
                            </React.Fragment>
                          ))}
                        </React.Fragment>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </>
        );
      case 1:
        return contingencies.length === 0 ? (
          <div style={emptyMsg}>No contingencies.</div>
        ) : (
          renderIssueTable(contingencies)
        );
      case 2:
        return <div style={emptyMsg}>No prior policies on record.</div>;
      case 3:
      case 4: {
        const count = parseInt(driver.accidentsClaims) || 0;
        return count === 0 ? (
          <div style={emptyMsg}>{tab === 3 ? "No claims reported." : "No prior losses reported."}</div>
        ) : (
          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr>
                  <th style={th}>Driver</th>
                  <th style={th}>{tab === 3 ? "Accidents / Claims (declared)" : "Prior Losses (declared)"}</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td style={td}>{driverName}</td>
                  <td style={td}>{count}</td>
                </tr>
              </tbody>
            </table>
          </div>
        );
      }
      case 5:
        return (
          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr>
                  <th style={th}>Driver</th>
                  <th style={th}>License Type</th>
                  <th style={th}>License Country</th>
                  <th style={th}>Licensed Since</th>
                  <th style={th}>Driving Experience (yrs)</th>
                  <th style={th}>Vehicle</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td style={td}>{driverName}</td>
                  <td style={td}>{driver.licenseType || "-"}</td>
                  <td style={td}>{driver.licenseCountry || "-"}</td>
                  <td style={td}>{driver.licenseDate ? String(driver.licenseDate).slice(0, 10) : "-"}</td>
                  <td style={td}>{driver.drivingExperience ?? "-"}</td>
                  <td style={td}>
                    {[vehicleData.year, vehicleData.make, vehicleData.model].filter(Boolean).join(" ") || "-"}
                    {vehicleData.licensePlate ? ` (${vehicleData.licensePlate})` : ""}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        );
      default:
        return null;
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

      <div style={{ fontSize: 16, fontWeight: 700, color: "#2d3e52", marginBottom: 10 }}>Risk Analysis</div>

      {/* Tabs */}
      <div style={{ border: "1px solid #d7dbe2", borderBottom: "none", background: "#f8fafb", display: "flex", flexWrap: "wrap" }}>
        {TABS.map((label, idx) => (
          <button
            key={label}
            onClick={() => setTab(idx)}
            style={{
              padding: "7px 18px",
              fontSize: 12,
              fontWeight: tab === idx ? 700 : 500,
              color: tab === idx ? "#1f5fa6" : "#4e5d6d",
              background: "none",
              border: "none",
              borderBottom: tab === idx ? "2px solid #1f5fa6" : "2px solid transparent",
              cursor: "pointer",
            }}
          >
            {label}
          </button>
        ))}
      </div>

      <div style={{ padding: "8px 12px 12px", border: "1px solid #d7dbe2", background: "#fff" }}>{renderTab()}</div>

      {/* Navigation — Back on the left, Next on the right */}
      <Box sx={{ display: "flex", justifyContent: "space-between", mt: 2, pb: 2 }}>
        <Button variant="outlined" size="small" onClick={handleBack}>
          Back
        </Button>
        <Button variant="contained" size="small" onClick={handleNext}>
          Next
        </Button>
      </Box>

      <Snackbar
        open={!!toast}
        autoHideDuration={4000}
        onClose={() => setToast(null)}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        {toast ? (
          <Alert onClose={() => setToast(null)} severity={toast.severity} sx={{ width: "100%" }}>
            {toast.msg}
          </Alert>
        ) : <span />}
      </Snackbar>
    </Box>
  );
}
