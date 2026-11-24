import React, { useState } from "react";
import InfoBar from "../InfoBar";
import { useNavigate } from "react-router-dom";
import { useWorkflowState } from "../../utils/workflowSession";
import { createDriverForSubmission } from "../driver/driverAPI";
import {
  Box,
  Grid,
  TextField,
  MenuItem,
  RadioGroup,
  FormControlLabel,
  Radio,
  Button,
  Snackbar,
  Alert,
} from "@mui/material";

// ─── Blank driver form — same shape as Personal Auto ─────────────────────────
const emptyForm = {
  firstName: "",
  lastName: "",
  dateOfBirth: "",
  maritalStatus: "",
  phone: "",
  email: "",
  secondaryEmail: "",
  country: "",
  address: "",
  address2: "",
  city: "",
  state: "",
  zipCode: "",
  licenseType: "",
  licenseCountry: "",
  licenseDate: "",
  drivingExperience: "",
  accidentsClaims: "",
};

export default function CommercialDriver() {
  const state = useWorkflowState();
  const navigate = useNavigate();

  // The state.contact is the Commercial account contact (the company).
  // The driver form below captures the individual driver — a new person
  // working for that company. Address is pre-filled from the company's
  // registered address as a convenience but all fields remain editable.
  const contact = state?.contact || {};
  const companyName =
    contact.organization || contact.firstName || "Commercial Account";

  const [formData, setFormData] = useState(
    state?.driverForm || {
      ...emptyForm,
      // Pre-fill address from the commercial contact; driver can update if different
      country: contact.country || "",
      address: contact.address || "",
      city: contact.city || "",
      state: contact.state || "",
      zipCode: contact.zipCode || "",
    }
  );

  const [tab, setTab] = useState(0);
  const [errorOpen, setErrorOpen] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  // ─── Validation — same required fields as Personal Auto ──────────────────
  const validateForm = () => {
    const contactFields = [
      "firstName",
      "lastName",
      "dateOfBirth",
      "maritalStatus",
      "phone",
      "email",
      "country",
      "address",
      "city",
      "state",
      "zipCode",
    ];
    const rolesFields = [
      "licenseType",
      "licenseCountry",
      "licenseDate",
      "drivingExperience",
      "accidentsClaims",
    ];

    for (let key of contactFields) {
      if (!formData[key]) {
        setTab(0);
        setErrorMsg(`${key} is required`);
        return false;
      }
    }
    for (let key of rolesFields) {
      if (!formData[key]) {
        setTab(1);
        setErrorMsg(`${key} is required`);
        return false;
      }
    }
    return true;
  };

  // ─── Save driver and proceed ──────────────────────────────────────────────
  const handleNext = async () => {
    if (!validateForm()) {
      setErrorOpen(true);
      return;
    }
    if (!state?.submissionId) {
      setErrorMsg("Submission ID missing. Please go back.");
      setErrorOpen(true);
      return;
    }
    try {
      // Create the driver — submissionId links it to the commercial account/contact
      const payload = {
        ...formData,
        drivingExperience: Number(formData.drivingExperience),
        accidentsClaims: Number(formData.accidentsClaims),
      };

      const driver = await createDriverForSubmission(
        state.submissionId,
        payload
      );

      // Navigate to commercial vehicle screen
      navigate("/commercial-vehicle", {
        state: {
          ...state,
          driverId: driver?._id,
          driver: driver,
          contact: formData,          // driver's own contact detail
          driverForm: formData,
        },
      });
    } catch (err) {
      setErrorMsg(err.response?.data?.message || "Failed to save driver");
      setErrorOpen(true);
    }
  };

  // ─── Shared section-header style ─────────────────────────────────────────
  const sectionHead = {
    fontSize: 11,
    fontWeight: 700,
    color: "#2e3e4c",
    textTransform: "uppercase",
    letterSpacing: 0.5,
    marginBottom: 10,
    paddingBottom: 6,
    borderBottom: "1px solid #e3e8ee",
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

      {/* ── Driver Details heading ────────────────────────────────────────── */}
      <div style={{ fontSize: 16, fontWeight: 700, color: "#2d3e52", marginBottom: 10 }}>
        Driver Details
      </div>

      {/* ── Tab bar ───────────────────────────────────────────────────────── */}
      <div
        style={{
          borderBottom: "1px solid #d7dbe2", background: "#f8fafb",
          display: "flex", marginBottom: 0,
        }}
      >
        {["Contact Detail", "Roles"].map((label, idx) => (
          <button
            key={idx}
            onClick={() => setTab(idx)}
            style={{
              padding: "7px 18px", fontSize: 12,
              fontWeight: tab === idx ? 700 : 500,
              color: tab === idx ? "#1f5fa6" : "#4e5d6d",
              background: "none", border: "none",
              borderBottom: tab === idx ? "2px solid #1f5fa6" : "2px solid transparent",
              cursor: "pointer", marginBottom: -1,
            }}
          >
            {label}
          </button>
        ))}
      </div>

      {/* ── Contact Detail Tab ────────────────────────────────────────────── */}
      {tab === 0 && (
        <div style={{ border: "1px solid #d7dbe2", borderTop: "none", background: "#fff" }}>
          <div
            style={{
              padding: "12px 14px",
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "0 28px",
            }}
          >
            {/* Left — Contact */}
            <div>
              <div style={sectionHead}>Contact Detail</div>
              <Grid container spacing={1.5}>
                {[
                  { label: "First Name", field: "firstName" },
                  { label: "Last Name", field: "lastName" },
                ].map(({ label, field }) => (
                  <Grid item xs={12} key={field}>
                    <TextField
                      size="small" label={label} fullWidth required
                      value={formData[field] || ""}
                      onChange={(e) => setFormData({ ...formData, [field]: e.target.value })}
                    />
                  </Grid>
                ))}
                <Grid item xs={12}>
                  <TextField
                    size="small" label="Date of Birth" type="date" fullWidth required
                    InputLabelProps={{ shrink: true }}
                    value={formData.dateOfBirth || ""}
                    onChange={(e) => setFormData({ ...formData, dateOfBirth: e.target.value })}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    size="small" label="Primary Phone" fullWidth required
                    value={formData.phone || ""}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    size="small" label="Primary Email" type="email" fullWidth required
                    value={formData.email || ""}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    size="small" select label="Marital Status" fullWidth required
                    value={formData.maritalStatus || ""}
                    sx={{
                      width: "100%", minWidth: 250,
                      "& .MuiInputBase-root": { width: "100%" },
                      "& .MuiSelect-select": { height: "1.4375em", minHeight: "1.4375em", lineHeight: "1.4375em" },
                    }}
                    onChange={(e) => setFormData({ ...formData, maritalStatus: e.target.value })}
                  >
                    <MenuItem value="">Select</MenuItem>
                    <MenuItem value="single">Single</MenuItem>
                    <MenuItem value="married">Married</MenuItem>
                    <MenuItem value="divorced">Divorced</MenuItem>
                    <MenuItem value="widowed">Widowed</MenuItem>
                  </TextField>
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    size="small" label="Secondary Email" fullWidth
                    value={formData.secondaryEmail || ""}
                    onChange={(e) => setFormData({ ...formData, secondaryEmail: e.target.value })}
                  />
                </Grid>
              </Grid>
            </div>

            {/* Right — Address */}
            <div>
              <div style={sectionHead}>Address</div>
              <Grid container spacing={1.5}>
                {[
                  { label: "Country", field: "country" },
                  { label: "Address 1", field: "address" },
                  { label: "City", field: "city" },
                  { label: "State", field: "state" },
                  { label: "ZIP Code", field: "zipCode" },
                ].map(({ label, field }) => (
                  <Grid item xs={12} key={field}>
                    <TextField
                      size="small" label={label} fullWidth required
                      value={formData[field] || ""}
                      onChange={(e) => setFormData({ ...formData, [field]: e.target.value })}
                    />
                  </Grid>
                ))}
                <Grid item xs={12}>
                  <TextField
                    size="small" label="Address 2" fullWidth
                    value={formData.address2 || ""}
                    onChange={(e) => setFormData({ ...formData, address2: e.target.value })}
                  />
                </Grid>
              </Grid>
            </div>
          </div>
        </div>
      )}

      {/* ── Roles Tab ─────────────────────────────────────────────────────── */}
      {tab === 1 && (
        <div style={{ border: "1px solid #d7dbe2", borderTop: "none", background: "#fff" }}>
          <div
            style={{
              padding: "12px 14px",
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "0 28px",
            }}
          >
            {/* Left — License Information */}
            <div>
              <div style={sectionHead}>License Information</div>
              <Grid container spacing={1.5}>
                <Grid item xs={12}>
                  <TextField
                    size="small" select label="Type of License" fullWidth required
                    value={formData.licenseType || ""}
                    onChange={(e) => setFormData({ ...formData, licenseType: e.target.value })}
                  >
                    <MenuItem value="">Select</MenuItem>
                    <MenuItem value="CDL Class A">CDL Class A — Combination vehicles</MenuItem>
                    <MenuItem value="CDL Class B">CDL Class B — Heavy straight vehicles</MenuItem>
                    <MenuItem value="CDL Class C">CDL Class C — Small vehicles / hazmat</MenuItem>
                    <MenuItem value="Light Motor Vehicle">Light Motor Vehicle</MenuItem>
                    <MenuItem value="Heavy Motor Vehicle">Heavy Motor Vehicle</MenuItem>
                  </TextField>
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    size="small" select label="Country of License" fullWidth required
                    value={formData.licenseCountry || ""}
                    onChange={(e) => setFormData({ ...formData, licenseCountry: e.target.value })}
                  >
                    <MenuItem value="">Select</MenuItem>
                    <MenuItem value="United States">United States</MenuItem>
                    <MenuItem value="Canada">Canada</MenuItem>
                    <MenuItem value="India">India</MenuItem>
                    <MenuItem value="United Kingdom">United Kingdom</MenuItem>
                    <MenuItem value="Australia">Australia</MenuItem>
                    <MenuItem value="Other">Other</MenuItem>
                  </TextField>
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    size="small" label="Date Obtained" type="date" fullWidth required
                    InputLabelProps={{ shrink: true }}
                    value={formData.licenseDate || ""}
                    onChange={(e) => setFormData({ ...formData, licenseDate: e.target.value })}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    size="small" label="Years of Driving Experience" fullWidth required
                    value={formData.drivingExperience || ""}
                    onChange={(e) => setFormData({ ...formData, drivingExperience: e.target.value })}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    size="small" select label="Accidents and Claims History" fullWidth required
                    value={formData.accidentsClaims || ""}
                    onChange={(e) => setFormData({ ...formData, accidentsClaims: e.target.value })}
                  >
                    <MenuItem value="">Select</MenuItem>
                    {["0", "1", "2", "3", "4", "5 or more"].map((v) => (
                      <MenuItem key={v} value={v}>{v}</MenuItem>
                    ))}
                  </TextField>
                </Grid>
              </Grid>
            </div>

            {/* Right — Declarations */}
            <div>
              <div style={sectionHead}>Declarations</div>
              <Grid container spacing={1.5}>
                {[
                  "Driving violations",
                  "Previous insurer",
                  "Are you the main driver of any other vehicle?",
                  "Do you own or have registered in your own name any other vehicles?",
                  "Do you own, insure or have any other vehicles registered in your name?",
                ].map((question) => (
                  <Grid item xs={12} key={question}>
                    <div style={{ fontSize: 12, color: "#3d5164", marginBottom: 2 }}>
                      {question}
                    </div>
                    <RadioGroup row defaultValue="no">
                      <FormControlLabel value="yes" control={<Radio size="small" />} label="Yes" />
                      <FormControlLabel value="no" control={<Radio size="small" />} label="No" />
                    </RadioGroup>
                  </Grid>
                ))}
              </Grid>
            </div>
          </div>
        </div>
      )}

      {/* ── Back / Next buttons ───────────────────────────────────────────── */}
      <Box sx={{ display: "flex", justifyContent: "space-between", mt: 2, pb: 2 }}>
        <Button
          variant="text" size="small"
          onClick={() => navigate("/qualification", { state: { ...state, driverForm: formData } })}
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
