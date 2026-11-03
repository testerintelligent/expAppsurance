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

import { createVehicleForSubmission, calculatePremium } from "./vehicleAPI";
import { COVERAGE_OPTIONS, DEFAULT_COVERAGES } from "../../constants/coverages";
import { useWorkflowState } from "../../utils/workflowSession";

export default function Vehicle() {
  const state = useWorkflowState();
  const navigate = useNavigate();
  const contact = state?.contact || {};

  const [tab, setTab] = useState(0);
  const [errorOpen, setErrorOpen] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  // Dropdown Options
  const makeOptions = ["Toyota", "Honda", "Ford", "BMW", "Hyundai"];

  const modelOptions = {
    Toyota: ["Corolla", "Camry", "RAV4"],
    Honda: ["Civic", "Accord", "CR-V"],
    Ford: ["F-150", "Escape", "Explorer"],
    BMW: ["X3", "X5", "3 Series"],
    Hyundai: ["Elantra", "Tucson", "Santa Fe"],
  };

  const currentYear = new Date().getFullYear();
  const yearOptions = Array.from({ length: 25 }, (_, i) => currentYear - i);

  const stateOptions = [
    "Tamil Nadu",
    "Karnataka",
    "Kerala",
    "Andhra Pradesh",
    "Maharashtra",
  ];

  const stateCodeMap = {
    // Short codes from Contact form
    TN: "Tamil Nadu",
    KR: "Karnataka",
    KL: "Kerala",
    AP: "Andhra Pradesh",
    MH: "Maharashtra",
    CA: "California",
    NY: "New York",
    "Tamil Nadu": "Tamil Nadu",
    Karnataka: "Karnataka",
    Kerala: "Kerala",
    "Andhra Pradesh": "Andhra Pradesh",
    Maharashtra: "Maharashtra",
    California: "California",
    "New York": "New York",
  };

  const getFullStateName = (stateInput) => {
    if (!stateInput) return "Tamil Nadu";
    return stateCodeMap[stateInput] || stateInput;
  };

  const [coverages, setCoverages] = useState(
    state?.coverages || DEFAULT_COVERAGES
  );

  // Vehicle form data
  const [vehicleData, setVehicleData] = useState(
    state?.vehicleData || {
      make: "",
      model: "",
      year: "",
      vin: "",
      licensePlate: "",
      stateRegistered: "",
    }
  );

  const handleCoverageChange = (coverage) => {
    if (coverage === "Third-Party Liability") return;

    setCoverages((prev) =>
      prev.includes(coverage)
        ? prev.filter((c) => c !== coverage)
        : [...prev, coverage]
    );
  };

  useEffect(() => {
    localStorage.setItem("vehicleData", JSON.stringify(vehicleData));
  }, [vehicleData]);

  useEffect(() => {
    localStorage.setItem("coverages", JSON.stringify(coverages));
  }, [coverages]);

  const validateForm = () => {
    const requiredFields = [
      { key: "make", label: "Make" },
      { key: "model", label: "Model" },
      { key: "year", label: "Year" },
      { key: "vin", label: "VIN" },
      { key: "licensePlate", label: "License Plate" },
      { key: "stateRegistered", label: "State Registered" },
    ];

    for (let field of requiredFields) {
      if (!vehicleData[field.key]?.toString().trim()) {
        setErrorMsg(
          `${field.label} is required in the Vehicle Information tab.`
        );
        return false;
      }
    }

    if (coverages.length === 0) {
      setErrorMsg(
        "At least one coverage (Third-Party Liability) must be selected."
      );
      return false;
    }

    return true;
  };

  const handleNext = async () => {
    try {
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

      const payload = {
        ...vehicleData,
        coverages,
      };

      await createVehicleForSubmission(submissionId, payload);

      // Build pricing API payload from all screen data
      console.log("State data:", state);

      // Calculate vehicle age from year (2025 = 1 year old, 2024 = 2 years old, etc.)
      const currentYear = new Date().getFullYear();
      const vehicleAge = currentYear - parseInt(vehicleData.year);

      // Map licenseType full name to abbreviation
      const licenseTypeMap = {
        "Light Motor Vehicle": "LMV",
        "Heavy Motor Vehicle": "HMV",
      };
      const licenseTypeAbbrev =
        licenseTypeMap[state?.driver?.licenseType] || "LMV";

      const pricingPayload = {
        product: state?.productName,
        policyDate:
          state?.effectiveDate || new Date().toISOString().split("T")[0],
        input: {
          country: state?.contact?.country || "India",
          state: getFullStateName(
            state?.contact?.state ||
              state?.contact?.stateCode ||
              vehicleData.stateRegistered
          ),
          city: state?.contact?.city || "",
          licenseType: licenseTypeAbbrev,
          drivingExperience: parseInt(state?.driver?.drivingExperience) || 0,
          claimHistory: parseInt(state?.driver?.claimHistory) || 0,
          vehicleAge: vehicleAge,
        },
      };

      console.log("Calling pricing API with payload:", pricingPayload);

      const pricingResult = await calculatePremium(pricingPayload);
      console.log("Pricing API Response:", pricingResult);

      navigate("/quote", {
        state: {
          ...state,
          vehicleData,
          coverages,
          pricingData: pricingResult,
        },
      });
    } catch (err) {
      console.error("Error in vehicle submission:", err);
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
        product={state?.productName || "-"}
        contactName={`${contact.firstName || ""} ${contact.lastName || ""}`.trim()}
        submissionId={state?.submissionId || "-"}
        effectiveDate={state?.effectiveDate || "-"}
        expiryDate={state?.expiryDate || "-"}
      />

      <div style={{ fontSize: 16, fontWeight: 700, color: "#2d3e52", marginBottom: 10 }}>Vehicle Details</div>

      {/* GW Tab bar */}
      <div style={{ borderBottom: "1px solid #d7dbe2", background: "#f8fafb", display: "flex", marginBottom: 0 }}>
        {["Vehicle Information", "Coverages"].map((label, idx) => (
          <button key={idx} onClick={() => setTab(idx)}
            style={{
              padding: "7px 18px", fontSize: 12, fontWeight: tab === idx ? 700 : 500,
              color: tab === idx ? "#1f5fa6" : "#4e5d6d",
              background: "none", border: "none", borderBottom: tab === idx ? "2px solid #1f5fa6" : "2px solid transparent",
              cursor: "pointer", marginBottom: -1
            }}>
            {label}
          </button>
        ))}
      </div>

      {/* Vehicle Information Tab */}
      {tab === 0 && (
        <div style={{ border: "1px solid #d7dbe2", borderTop: "none", background: "#fff" }}>
          <div style={{ padding: "12px 14px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0 28px" }}>
            {/* Vehicle Specs */}
            <div>
              <div style={{ fontSize: 11, fontWeight: 700, color: "#2e3e4c", textTransform: "uppercase", letterSpacing: 0.5, marginBottom: 10, paddingBottom: 6, borderBottom: "1px solid #e3e8ee" }}>Vehicle Specifications</div>
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                <TextField size="small" select label="Make" fullWidth value={vehicleData.make}
                  onChange={(e) => setVehicleData({ ...vehicleData, make: e.target.value, model: "" })}>
                  {makeOptions.map((make) => <MenuItem key={make} value={make}>{make}</MenuItem>)}
                </TextField>
                <TextField size="small" select label="Model" fullWidth value={vehicleData.model} disabled={!vehicleData.make}
                  onChange={(e) => setVehicleData({ ...vehicleData, model: e.target.value })}>
                  {(modelOptions[vehicleData.make] || []).map((model) => <MenuItem key={model} value={model}>{model}</MenuItem>)}
                </TextField>
                <TextField size="small" select label="Year" fullWidth value={vehicleData.year}
                  onChange={(e) => setVehicleData({ ...vehicleData, year: e.target.value })}>
                  {yearOptions.map((year) => <MenuItem key={year} value={year}>{year}</MenuItem>)}
                </TextField>
              </div>
            </div>

            {/* Registration */}
            <div>
              <div style={{ fontSize: 11, fontWeight: 700, color: "#2e3e4c", textTransform: "uppercase", letterSpacing: 0.5, marginBottom: 10, paddingBottom: 6, borderBottom: "1px solid #e3e8ee" }}>Registration Details</div>
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                <TextField size="small" label="VIN" fullWidth value={vehicleData.vin}
                  onChange={(e) => setVehicleData({ ...vehicleData, vin: e.target.value })} />
                <TextField size="small" label="License Plate" fullWidth value={vehicleData.licensePlate}
                  onChange={(e) => setVehicleData({ ...vehicleData, licensePlate: e.target.value })} />
                <TextField size="small" select label="State Registered" fullWidth value={vehicleData.stateRegistered}
                  onChange={(e) => setVehicleData({ ...vehicleData, stateRegistered: e.target.value })}>
                  {stateOptions.map((state) => <MenuItem key={state} value={state}>{state}</MenuItem>)}
                </TextField>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Coverages Tab */}
      {tab === 1 && (
        <div style={{ border: "1px solid #d7dbe2", borderTop: "none", background: "#fff" }}>
          <div style={{ padding: "12px 14px" }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: "#2e3e4c", textTransform: "uppercase", letterSpacing: 0.5, marginBottom: 10, paddingBottom: 6, borderBottom: "1px solid #e3e8ee" }}>Select Coverages</div>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 12 }}>
              <thead>
                <tr>
                  <th style={{ padding: "7px 10px", background: "#f6f7f8", borderBottom: "2px solid #d7dbe2", borderRight: "1px solid #e3e8ee", textAlign: "left", fontSize: 11, fontWeight: 700, color: "#31475f", width: 36 }}></th>
                  <th style={{ padding: "7px 10px", background: "#f6f7f8", borderBottom: "2px solid #d7dbe2", borderRight: "1px solid #e3e8ee", textAlign: "left", fontSize: 11, fontWeight: 700, color: "#31475f" }}>Coverage</th>
                  <th style={{ padding: "7px 10px", background: "#f6f7f8", borderBottom: "2px solid #d7dbe2", borderRight: "1px solid #e3e8ee", textAlign: "left", fontSize: 11, fontWeight: 700, color: "#31475f" }}>Description</th>
                  <th style={{ padding: "7px 10px", background: "#f6f7f8", borderBottom: "2px solid #d7dbe2", textAlign: "right", fontSize: 11, fontWeight: 700, color: "#31475f", width: 100 }}>Premium / yr</th>
                </tr>
              </thead>
              <tbody>
                {COVERAGE_OPTIONS.map((cov, idx) => {
                  const isSelected = coverages.includes(cov.name);
                  const isMandatory = cov.name === "Third-Party Liability";
                  return (
                    <tr key={cov.name} style={{ background: isSelected ? "#edf4fb" : idx % 2 === 0 ? "#f8fafb" : "#fff", cursor: isMandatory ? "default" : "pointer" }}
                      onClick={() => !isMandatory && handleCoverageChange(cov.name)}>
                      <td style={{ padding: "7px 10px", borderBottom: "1px solid #e3e8ee", borderRight: "1px solid #e3e8ee", textAlign: "center" }}>
                        <input type="checkbox" checked={isSelected} disabled={isMandatory} readOnly
                          style={{ cursor: isMandatory ? "default" : "pointer", accentColor: "#1f5fa6" }} />
                      </td>
                      <td style={{ padding: "7px 10px", borderBottom: "1px solid #e3e8ee", borderRight: "1px solid #e3e8ee", fontWeight: 600, color: isSelected ? "#1f5fa6" : "#2d3e52" }}>
                        {cov.name}
                        {isMandatory && <span style={{ marginLeft: 6, fontSize: 10, color: "#c62828", fontWeight: 600 }}>MANDATORY</span>}
                      </td>
                      <td style={{ padding: "7px 10px", borderBottom: "1px solid #e3e8ee", borderRight: "1px solid #e3e8ee", color: "#4c5d72" }}>{cov.description}</td>
                      <td style={{ padding: "7px 10px", borderBottom: "1px solid #e3e8ee", textAlign: "right", fontWeight: 600, color: "#2b7a3e" }}>&#8377;{cov.premium.toLocaleString("en-IN")}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Navigation */}
      <Box sx={{ display: "flex", justifyContent: "space-between", mt: 2, pb: 2 }}>
        <Button variant="outlined" size="small"
          onClick={() => navigate("/driver", { state: { ...state, vehicleData, coverages } })}>
          Back
        </Button>
        <Button variant="contained" size="small" onClick={handleNext}>
          Quote
        </Button>
      </Box>

      <Snackbar open={errorOpen} autoHideDuration={4000} onClose={() => setErrorOpen(false)} anchorOrigin={{ vertical: "bottom", horizontal: "center" }}>
        <Alert onClose={() => setErrorOpen(false)} severity="error" sx={{ width: "100%" }}>{errorMsg}</Alert>
      </Snackbar>
    </Box>
  );
}
