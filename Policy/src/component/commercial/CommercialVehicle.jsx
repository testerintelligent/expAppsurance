import React, { useState, useEffect } from "react";
import InfoBar from "../InfoBar";
import { useNavigate } from "react-router-dom";
import {
  Box,
  TextField,
  Button,
  Snackbar,
  Alert,
  MenuItem,
} from "@mui/material";

import { createVehicleForSubmission } from "../vehicle/vehicleAPI";
import {
  COMMERCIAL_COVERAGE_OPTIONS,
  COMMERCIAL_DEFAULT_COVERAGES,
} from "../../constants/commercialCoverages";
import { useWorkflowState } from "../../utils/workflowSession";

// ─── Static dropdown data ──────────────────────────────────────────────────
const VEHICLE_TYPES = [
  "Box Truck",
  "Semi-Truck / Tractor",
  "Cargo Van",
  "Pickup Truck",
  "Flatbed Truck",
  "Tanker Truck",
  "Dump Truck",
  "Refrigerated Truck",
  "Step Van",
  "Tow Truck",
];

const MAKE_OPTIONS = [
  "Freightliner",
  "Kenworth",
  "Peterbilt",
  "Mack",
  "Volvo",
  "International",
  "Western Star",
  "Ford",
  "Ram",
  "Chevrolet",
  "GMC",
  "Mercedes-Benz",
];

const MODEL_OPTIONS = {
  Freightliner: ["Cascadia", "M2 106", "Sprinter", "FL70"],
  Kenworth: ["T680", "T800", "W900", "T370"],
  Peterbilt: ["579", "389", "567", "337"],
  Mack: ["Anthem", "Granite", "Pinnacle", "LR"],
  Volvo: ["VNL 760", "VNL 860", "VHD", "VNR"],
  International: ["LT Series", "HV Series", "MV Series", "CV Series"],
  "Western Star": ["5700XE", "4900", "4700", "6900"],
  Ford: ["F-650", "F-750", "Transit", "E-Series"],
  Ram: ["ProMaster", "3500", "4500", "5500"],
  Chevrolet: ["Express", "Silverado 3500HD", "Silverado 4500HD"],
  GMC: ["Savana", "Sierra 3500HD", "Sierra 4500HD"],
  "Mercedes-Benz": ["Sprinter", "Metris"],
};

const VEHICLE_USES = [
  "Delivery / Courier",
  "Freight / Hauling",
  "Service / Repair",
  "Construction",
  "Passenger Transport",
  "Food Distribution",
  "Waste Collection",
  "Agriculture",
  "Moving / Relocation",
  "Other Business Use",
];

const WEIGHT_CLASSES = [
  "Class 1 — up to 6,000 lbs",
  "Class 2 — 6,001–10,000 lbs",
  "Class 3 — 10,001–14,000 lbs",
  "Class 4 — 14,001–16,000 lbs",
  "Class 5 — 16,001–19,500 lbs",
  "Class 6 — 19,501–26,000 lbs",
  "Class 7 — 26,001–33,000 lbs",
  "Class 8 — over 33,000 lbs",
];

const STATE_OPTIONS = [
  "Tamil Nadu",
  "Karnataka",
  "Kerala",
  "Andhra Pradesh",
  "Maharashtra",
  "California",
  "New York",
  "Texas",
  "Florida",
];

const currentYear = new Date().getFullYear();
const YEAR_OPTIONS = Array.from({ length: 25 }, (_, i) => currentYear - i);

// ─── Component ─────────────────────────────────────────────────────────────
export default function CommercialVehicle() {
  const state = useWorkflowState();
  const navigate = useNavigate();

  const contact = state?.contact || {};
  const companyName =
    contact.organization || contact.firstName || "Commercial Account";

  const [tab, setTab] = useState(0);
  const [errorOpen, setErrorOpen] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const [coverages, setCoverages] = useState(
    state?.coverages || COMMERCIAL_DEFAULT_COVERAGES
  );

  const [vehicleData, setVehicleData] = useState(
    state?.vehicleData || {
      vehicleType: "",
      make: "",
      model: "",
      year: "",
      vin: "",
      licensePlate: "",
      stateRegistered: "",
      vehicleUse: "",
      weightClass: "",
      dotVehicleNo: "",
    }
  );

  // Persist to localStorage so the state survives a tab switch
  useEffect(() => {
    localStorage.setItem("commercialVehicleData", JSON.stringify(vehicleData));
  }, [vehicleData]);

  useEffect(() => {
    localStorage.setItem("commercialCoverages", JSON.stringify(coverages));
  }, [coverages]);

  // ─── Coverage toggle (mandatory coverage cannot be deselected) ────────
  const handleCoverageChange = (coverageName) => {
    if (coverageName === "Commercial Liability") return;
    setCoverages((prev) =>
      prev.includes(coverageName)
        ? prev.filter((c) => c !== coverageName)
        : [...prev, coverageName]
    );
  };

  // ─── Form validation ──────────────────────────────────────────────────
  const validateForm = () => {
    const required = [
      { key: "vehicleType", label: "Vehicle Type" },
      { key: "make", label: "Make" },
      { key: "model", label: "Model" },
      { key: "year", label: "Year" },
      { key: "vin", label: "VIN" },
      { key: "licensePlate", label: "License Plate" },
      { key: "stateRegistered", label: "State Registered" },
      { key: "vehicleUse", label: "Vehicle Use" },
    ];
    for (let { key, label } of required) {
      if (!vehicleData[key]?.toString().trim()) {
        setErrorMsg(`${label} is required in the Vehicle Information tab.`);
        return false;
      }
    }
    if (coverages.length === 0) {
      setErrorMsg(
        "At least one coverage (Commercial Liability) must be selected."
      );
      return false;
    }
    return true;
  };

  // ─── Save vehicle and go to Risk Analysis ────────────────────────────
  const handleNext = async () => {
    if (!validateForm()) {
      setErrorOpen(true);
      return;
    }

    const submissionId = state?.submissionId;
    if (!submissionId) {
      setErrorMsg("Missing submission ID");
      setErrorOpen(true);
      return;
    }

    try {
      const payload = { ...vehicleData, coverages };
      await createVehicleForSubmission(submissionId, payload);

      // Pricing / quoting now happens on Policy Review (after Risk Analysis)
      navigate("/risk-analysis", {
        state: {
          ...state,
          vehicleData,
          coverages,
        },
      });
    } catch (err) {
      console.error("Error in commercial vehicle submission:", err);
      setErrorMsg(
        err.response?.data?.message ||
          "Failed to process vehicle. Please try again."
      );
      setErrorOpen(true);
    }
  };

  return (
    <Box sx={{ maxWidth: 1100, mx: 0 }}>
      <InfoBar
        accountNumber={state?.accountNumber || "-"}
        product={state?.productName || "Commercial Auto"}
        contactName={companyName}
        submissionId={state?.submissionId || "-"}
        effectiveDate={state?.effectiveDate || "-"}
        expiryDate={state?.expiryDate || "-"}
      />

      <div
        style={{
          fontSize: 16,
          fontWeight: 700,
          color: "#2d3e52",
          marginBottom: 10,
        }}
      >
        Commercial Vehicle Details
      </div>

      {/* ── Tab bar ────────────────────────────────────────────────────── */}
      <div
        style={{
          borderBottom: "1px solid #d7dbe2",
          background: "#f8fafb",
          display: "flex",
          marginBottom: 0,
        }}
      >
        {["Vehicle Information", "Coverages"].map((label, idx) => (
          <button
            key={idx}
            onClick={() => setTab(idx)}
            style={{
              padding: "7px 18px",
              fontSize: 12,
              fontWeight: tab === idx ? 700 : 500,
              color: tab === idx ? "#1f5fa6" : "#4e5d6d",
              background: "none",
              border: "none",
              borderBottom:
                tab === idx
                  ? "2px solid #1f5fa6"
                  : "2px solid transparent",
              cursor: "pointer",
              marginBottom: -1,
            }}
          >
            {label}
          </button>
        ))}
      </div>

      {/* ── Vehicle Information Tab ───────────────────────────────────── */}
      {tab === 0 && (
        <div
          style={{
            border: "1px solid #d7dbe2",
            borderTop: "none",
            background: "#fff",
          }}
        >
          <div
            style={{
              padding: "12px 14px",
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "0 28px",
            }}
          >
            {/* Left — Vehicle Specifications */}
            <div>
              <div
                style={{
                  fontSize: 11,
                  fontWeight: 700,
                  color: "#2e3e4c",
                  textTransform: "uppercase",
                  letterSpacing: 0.5,
                  marginBottom: 10,
                  paddingBottom: 6,
                  borderBottom: "1px solid #e3e8ee",
                }}
              >
                Vehicle Specifications
              </div>
              <div
                style={{ display: "flex", flexDirection: "column", gap: 10 }}
              >
                <TextField
                  size="small"
                  select
                  label="Vehicle Type *"
                  fullWidth
                  value={vehicleData.vehicleType}
                  onChange={(e) =>
                    setVehicleData({
                      ...vehicleData,
                      vehicleType: e.target.value,
                    })
                  }
                >
                  {VEHICLE_TYPES.map((v) => (
                    <MenuItem key={v} value={v}>
                      {v}
                    </MenuItem>
                  ))}
                </TextField>
                <TextField
                  size="small"
                  select
                  label="Make *"
                  fullWidth
                  value={vehicleData.make}
                  onChange={(e) =>
                    setVehicleData({
                      ...vehicleData,
                      make: e.target.value,
                      model: "",
                    })
                  }
                >
                  {MAKE_OPTIONS.map((m) => (
                    <MenuItem key={m} value={m}>
                      {m}
                    </MenuItem>
                  ))}
                </TextField>
                <TextField
                  size="small"
                  select
                  label="Model *"
                  fullWidth
                  value={vehicleData.model}
                  disabled={!vehicleData.make}
                  onChange={(e) =>
                    setVehicleData({ ...vehicleData, model: e.target.value })
                  }
                >
                  {(MODEL_OPTIONS[vehicleData.make] || []).map((m) => (
                    <MenuItem key={m} value={m}>
                      {m}
                    </MenuItem>
                  ))}
                </TextField>
                <TextField
                  size="small"
                  select
                  label="Year *"
                  fullWidth
                  value={vehicleData.year}
                  onChange={(e) =>
                    setVehicleData({ ...vehicleData, year: e.target.value })
                  }
                >
                  {YEAR_OPTIONS.map((y) => (
                    <MenuItem key={y} value={y}>
                      {y}
                    </MenuItem>
                  ))}
                </TextField>
                <TextField
                  size="small"
                  select
                  label="Vehicle Use *"
                  fullWidth
                  value={vehicleData.vehicleUse}
                  onChange={(e) =>
                    setVehicleData({
                      ...vehicleData,
                      vehicleUse: e.target.value,
                    })
                  }
                >
                  {VEHICLE_USES.map((u) => (
                    <MenuItem key={u} value={u}>
                      {u}
                    </MenuItem>
                  ))}
                </TextField>
              </div>
            </div>

            {/* Right — Registration & Commercial Details */}
            <div>
              <div
                style={{
                  fontSize: 11,
                  fontWeight: 700,
                  color: "#2e3e4c",
                  textTransform: "uppercase",
                  letterSpacing: 0.5,
                  marginBottom: 10,
                  paddingBottom: 6,
                  borderBottom: "1px solid #e3e8ee",
                }}
              >
                Registration &amp; Commercial Details
              </div>
              <div
                style={{ display: "flex", flexDirection: "column", gap: 10 }}
              >
                <TextField
                  size="small"
                  label="VIN *"
                  fullWidth
                  value={vehicleData.vin}
                  onChange={(e) =>
                    setVehicleData({ ...vehicleData, vin: e.target.value })
                  }
                />
                <TextField
                  size="small"
                  label="License Plate *"
                  fullWidth
                  value={vehicleData.licensePlate}
                  onChange={(e) =>
                    setVehicleData({
                      ...vehicleData,
                      licensePlate: e.target.value,
                    })
                  }
                />
                <TextField
                  size="small"
                  select
                  label="State Registered *"
                  fullWidth
                  value={vehicleData.stateRegistered}
                  onChange={(e) =>
                    setVehicleData({
                      ...vehicleData,
                      stateRegistered: e.target.value,
                    })
                  }
                >
                  {STATE_OPTIONS.map((s) => (
                    <MenuItem key={s} value={s}>
                      {s}
                    </MenuItem>
                  ))}
                </TextField>
                <TextField
                  size="small"
                  select
                  label="Weight Class"
                  fullWidth
                  value={vehicleData.weightClass || ""}
                  onChange={(e) =>
                    setVehicleData({
                      ...vehicleData,
                      weightClass: e.target.value,
                    })
                  }
                >
                  <MenuItem value="">Select (optional)</MenuItem>
                  {WEIGHT_CLASSES.map((w) => (
                    <MenuItem key={w} value={w}>
                      {w}
                    </MenuItem>
                  ))}
                </TextField>
                <TextField
                  size="small"
                  label="DOT Vehicle Number (optional)"
                  fullWidth
                  value={vehicleData.dotVehicleNo || ""}
                  onChange={(e) =>
                    setVehicleData({
                      ...vehicleData,
                      dotVehicleNo: e.target.value,
                    })
                  }
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── Coverages Tab ─────────────────────────────────────────────── */}
      {tab === 1 && (
        <div
          style={{
            border: "1px solid #d7dbe2",
            borderTop: "none",
            background: "#fff",
          }}
        >
          <div style={{ padding: "12px 14px" }}>
            <div
              style={{
                fontSize: 11,
                fontWeight: 700,
                color: "#2e3e4c",
                textTransform: "uppercase",
                letterSpacing: 0.5,
                marginBottom: 10,
                paddingBottom: 6,
                borderBottom: "1px solid #e3e8ee",
              }}
            >
              Select Commercial Coverages
            </div>
            <table
              style={{ width: "100%", borderCollapse: "collapse", fontSize: 12 }}
            >
              <thead>
                <tr>
                  <th
                    style={{
                      padding: "7px 10px",
                      background: "#f6f7f8",
                      borderBottom: "2px solid #d7dbe2",
                      borderRight: "1px solid #e3e8ee",
                      textAlign: "left",
                      fontSize: 11,
                      fontWeight: 700,
                      color: "#31475f",
                      width: 36,
                    }}
                  ></th>
                  <th
                    style={{
                      padding: "7px 10px",
                      background: "#f6f7f8",
                      borderBottom: "2px solid #d7dbe2",
                      borderRight: "1px solid #e3e8ee",
                      textAlign: "left",
                      fontSize: 11,
                      fontWeight: 700,
                      color: "#31475f",
                    }}
                  >
                    Coverage
                  </th>
                  <th
                    style={{
                      padding: "7px 10px",
                      background: "#f6f7f8",
                      borderBottom: "2px solid #d7dbe2",
                      borderRight: "1px solid #e3e8ee",
                      textAlign: "left",
                      fontSize: 11,
                      fontWeight: 700,
                      color: "#31475f",
                    }}
                  >
                    Description
                  </th>
                  <th
                    style={{
                      padding: "7px 10px",
                      background: "#f6f7f8",
                      borderBottom: "2px solid #d7dbe2",
                      textAlign: "right",
                      fontSize: 11,
                      fontWeight: 700,
                      color: "#31475f",
                      width: 100,
                    }}
                  >
                    Premium / yr
                  </th>
                </tr>
              </thead>
              <tbody>
                {COMMERCIAL_COVERAGE_OPTIONS.map((cov, idx) => {
                  const isSelected = coverages.includes(cov.name);
                  const isMandatory = cov.mandatory;
                  return (
                    <tr
                      key={cov.name}
                      style={{
                        background: isSelected
                          ? "#edf4fb"
                          : idx % 2 === 0
                          ? "#f8fafb"
                          : "#fff",
                        cursor: isMandatory ? "default" : "pointer",
                      }}
                      onClick={() => !isMandatory && handleCoverageChange(cov.name)}
                    >
                      <td
                        style={{
                          padding: "7px 10px",
                          borderBottom: "1px solid #e3e8ee",
                          borderRight: "1px solid #e3e8ee",
                          textAlign: "center",
                        }}
                      >
                        <input
                          type="checkbox"
                          checked={isSelected}
                          disabled={isMandatory}
                          readOnly
                          style={{
                            cursor: isMandatory ? "default" : "pointer",
                            accentColor: "#1f5fa6",
                          }}
                        />
                      </td>
                      <td
                        style={{
                          padding: "7px 10px",
                          borderBottom: "1px solid #e3e8ee",
                          borderRight: "1px solid #e3e8ee",
                          fontWeight: 600,
                          color: isSelected ? "#1f5fa6" : "#2d3e52",
                        }}
                      >
                        {cov.name}
                        {isMandatory && (
                          <span
                            style={{
                              marginLeft: 6,
                              fontSize: 10,
                              color: "#c62828",
                              fontWeight: 600,
                            }}
                          >
                            MANDATORY
                          </span>
                        )}
                      </td>
                      <td
                        style={{
                          padding: "7px 10px",
                          borderBottom: "1px solid #e3e8ee",
                          borderRight: "1px solid #e3e8ee",
                          color: "#4c5d72",
                        }}
                      >
                        {cov.description}
                      </td>
                      <td
                        style={{
                          padding: "7px 10px",
                          borderBottom: "1px solid #e3e8ee",
                          textAlign: "right",
                          fontWeight: 600,
                          color: "#2b7a3e",
                        }}
                      >
                        &#8377;{cov.premium.toLocaleString("en-IN")}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ── Navigation buttons ────────────────────────────────────────── */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          mt: 2,
          pb: 2,
        }}
      >
        <Button
          variant="outlined"
          size="small"
          onClick={() =>
            navigate("/commercial-driver", {
              state: { ...state, vehicleData, coverages },
            })
          }
        >
          Back
        </Button>
        <Button variant="contained" size="small" onClick={handleNext}>
          Next
        </Button>
      </Box>

      <Snackbar
        open={errorOpen}
        autoHideDuration={4000}
        onClose={() => setErrorOpen(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={() => setErrorOpen(false)}
          severity="error"
          sx={{ width: "100%" }}
        >
          {errorMsg}
        </Alert>
      </Snackbar>
    </Box>
  );
}
