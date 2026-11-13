import React, { useState, useEffect } from "react";
import InfoBar from "../InfoBar";
import { useNavigate } from "react-router-dom";
import { useWorkflowState } from "../../utils/workflowSession";
import {
  createDriverForSubmission,
  getDriversBySubmission,
  getDriversByAccount,
} from "./driverAPI";
import PrimaryDriverQuestion from "./IsNewDriver";
import { formatDateForInput } from "../../utils/dateFormatter";
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
  CircularProgress,
} from "@mui/material";

export default function Driver() {
  const state = useWorkflowState();
  const navigate = useNavigate();
  const contact = state?.contact || {};
  const [isPrimaryDriver, setIsPrimaryDriver] = useState(
    state?.isPrimaryDriver || ""
  );
  const [loading, setLoading] = useState(false);
  const [existingDrivers, setExistingDrivers] = useState([]);

  console.log("isPrimary", isPrimaryDriver);

  const emptyForm = {
    firstName: "",
    lastName: "",
    dateOfBirth: "",
    maritalStatus: "",
    phone: "",
    email: "",
    secondaryEmail: "",
    country: "India",
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

  const [formData, setFormData] = useState(state?.driverForm || emptyForm);
  const [selectedDriverId, setSelectedDriverId] = useState("");

  const [tab, setTab] = useState(0);
  const [errorOpen, setErrorOpen] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  // Fetch existing drivers when isPrimaryDriver changes or when dealing with existing account
  useEffect(() => {
    if (state?.driverForm) {
      return;
    }
    const accountId = state?.account?._id;
    const isExistingAccount = state?.isExistingAccount;

    if (isPrimaryDriver === "yes") {
      // Yes: Account holder is primary driver - fetch existing drivers or use contact info
      setLoading(true);

      let driverPromise;
      if (isExistingAccount && accountId) {
        // Existing account: fetch all drivers for this account
        console.log("Fetching drivers for existing account:", accountId);
        driverPromise = getDriversByAccount(accountId);
      } else if (state?.submissionId) {
        // New submission: fetch drivers for this submission
        console.log("Fetching drivers for submission:", state.submissionId);
        driverPromise = getDriversBySubmission(state.submissionId);
      } else {
        setLoading(false);
        setFormData((prev) => ({
          ...prev,
          ...contact,
          dateOfBirth: formatDateForInput(contact.dateOfBirth),
        }));
        return;
      }

      driverPromise
        .then((drivers) => {
          setExistingDrivers(drivers);
          if (drivers && drivers.length > 0) {
            // Pre-fill with first driver found
            const driver = drivers[0];
            setFormData({
              firstName: driver.firstName || "",
              lastName: driver.lastName || "",
              dateOfBirth: formatDateForInput(driver.dateOfBirth) || "",
              maritalStatus: driver.maritalStatus || "",
              phone: driver.phone || "",
              email: driver.email || "",
              secondaryEmail: driver.secondaryEmail || "",
              country: driver.country || "India",
              address: driver.address || "",
              address2: driver.address2 || "",
              city: driver.city || "",
              state: driver.state || "",
              zipCode: driver.zipCode || "",
              licenseType: driver.licenseType || "",
              licenseCountry: driver.licenseCountry || "",
              licenseDate: formatDateForInput(driver.licenseDate) || "",
              drivingExperience: driver.drivingExperience || "",
              accidentsClaims: driver.accidentsClaims || "",
            });
          } else {
            // No driver found, use contact details
            setFormData({ ...emptyForm, ...contact, dateOfBirth: formatDateForInput(contact.dateOfBirth) });
          }
        })
        .catch(() => {
          // No drivers or error - use contact details
          setFormData({ ...emptyForm, ...contact, dateOfBirth: formatDateForInput(contact.dateOfBirth) });
          setExistingDrivers([]);
        })
        .finally(() => setLoading(false));
    } else if (isPrimaryDriver === "no") {
      // No: User should select from available drivers or create new
      setFormData(emptyForm);
      setLoading(true);

      let driverPromise;
      if (isExistingAccount && accountId) {
        // Existing account: fetch all drivers for this account
        console.log(
          "Fetching drivers for existing account (no primary):",
          accountId
        );
        driverPromise = getDriversByAccount(accountId);
      } else if (state?.submissionId) {
        // New submission: fetch drivers for this submission
        console.log(
          "Fetching drivers for submission (no primary):",
          state.submissionId
        );
        driverPromise = getDriversBySubmission(state.submissionId);
      } else {
        setLoading(false);
        setExistingDrivers([]);
        return;
      }

      driverPromise
        .then((drivers) => {
          setExistingDrivers(drivers);
        })
        .catch(() => {
          setExistingDrivers([]);
        })
        .finally(() => setLoading(false));
    }
  }, [
    isPrimaryDriver,
    state?.submissionId,
    state?.isExistingAccount,
    state?.account?._id,
  ]);

  // Validate both Contact and Roles tabs

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
      // If isPrimaryDriver is "no" and an existing driver is selected, skip creation
      if (isPrimaryDriver === "no" && selectedDriverId) {
        navigate("/vehicle", {
          state: {
            ...state,
            driverId: selectedDriverId,
            contact: formData,
          },
        });
        return;
      }

      const payload = {
        ...formData,
        drivingExperience: Number(formData.drivingExperience),
        accidentsClaims: Number(formData.accidentsClaims),
      };

      console.log("Creating driver with submissionId:", state.submissionId);
      console.log("Driver payload:", payload);

      const driver = await createDriverForSubmission(
        state.submissionId,
        payload
      );

      console.log("Driver created:", driver);

      navigate("/vehicle", {
        state: {
          ...state,
          driverId: driver?._id,
          driver: driver,
          contact: formData,
          driverForm: formData,
        },
      });
    } catch (err) {
      setErrorMsg(err.response?.data?.message || "Failed to save driver");
      setErrorOpen(true);
    }
  };

  return (
    <Box sx={{ maxWidth: 1100, mx: 0 }}>
      <InfoBar
        accountNumber={state?.accountNumber || "-"}
        product={state?.productName || "-"}
        contactName={`${formData.firstName || ""} ${formData.lastName || ""}`.trim()}
        submissionId={state?.submissionId || "-"}
        effectiveDate={state?.effectiveDate || "-"}
        expiryDate={state?.expiryDate || "-"}
      />

      <div style={{ fontSize: 16, fontWeight: 700, color: "#2d3e52", marginBottom: 10 }}>Driver Details</div>

      {/* Primary driver question */}
      <div style={{ border: "1px solid #d7dbe2", background: "#fff", marginBottom: 14 }}>
        <div style={{ background: "#f3f6f9", padding: "7px 12px", borderBottom: "1px solid #d7dbe2", fontSize: 11, fontWeight: 700, color: "#2e3e4c", textTransform: "uppercase", letterSpacing: 0.5 }}>
          Driver Assignment
        </div>
        <div style={{ padding: "10px 14px" }}>
          <PrimaryDriverQuestion value={isPrimaryDriver} onChange={setIsPrimaryDriver} />
        </div>
      </div>

      {loading && (
        <Box sx={{ display: "flex", justifyContent: "center", p: 3 }}>
          <CircularProgress size={24} />
        </Box>
      )}

      {!loading && (
        <>
          {/* Existing driver selector when isPrimaryDriver === "no" */}
          {isPrimaryDriver === "no" && existingDrivers.length > 0 && (
            <div style={{ border: "1px solid #d7dbe2", background: "#fff", marginBottom: 14 }}>
              <div style={{ background: "#f3f6f9", padding: "7px 12px", borderBottom: "1px solid #d7dbe2", fontSize: 11, fontWeight: 700, color: "#2e3e4c", textTransform: "uppercase", letterSpacing: 0.5 }}>
                Select Existing Driver
              </div>
              <div style={{ padding: "10px 14px" }}>
                <TextField
                  select size="small" fullWidth label="Available Drivers" value={selectedDriverId}
                  onChange={(e) => {
                    const driverId = e.target.value;
                    setSelectedDriverId(driverId);
                    const driver = existingDrivers.find((d) => d._id === driverId);
                    if (driver) {
                      setFormData({
                        firstName: driver.firstName || "", lastName: driver.lastName || "",
                        dateOfBirth: formatDateForInput(driver.dateOfBirth) || "",
                        maritalStatus: driver.maritalStatus || "", phone: driver.phone || "",
                        email: driver.email || "", secondaryEmail: driver.secondaryEmail || "",
                        country: driver.country || "India", address: driver.address || "",
                        address2: driver.address2 || "", city: driver.city || "",
                        state: driver.state || "", zipCode: driver.zipCode || "",
                        licenseType: driver.licenseType || "", licenseCountry: driver.licenseCountry || "",
                        licenseDate: formatDateForInput(driver.licenseDate) || "",
                        drivingExperience: driver.drivingExperience || "", accidentsClaims: driver.accidentsClaims || "",
                      });
                    }
                  }}
                  sx={{ maxWidth: 400 }}
                >
                  <MenuItem value="">-- Create New Driver --</MenuItem>
                  {existingDrivers.map((driver) => (
                    <MenuItem key={driver._id} value={driver._id}>{driver.firstName} {driver.lastName}</MenuItem>
                  ))}
                </TextField>
              </div>
            </div>
          )}

          {/* GW Tab bar */}
          <div style={{ borderBottom: "1px solid #d7dbe2", background: "#f8fafb", display: "flex", marginBottom: 0 }}>
            {["Contact Detail", "Roles"].map((label, idx) => (
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

          {/* Contact Detail Tab */}
          {tab === 0 && (
            <div style={{ border: "1px solid #d7dbe2", borderTop: "none", background: "#fff" }}>
              <div style={{ padding: "12px 14px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0 28px" }}>
                {/* Left: Contact */}
                <div>
                  <div style={{ fontSize: 11, fontWeight: 700, color: "#2e3e4c", textTransform: "uppercase", letterSpacing: 0.5, marginBottom: 10, paddingBottom: 6, borderBottom: "1px solid #e3e8ee" }}>Contact Detail</div>
                  <Grid container spacing={1.5}>
                    {[
                      { label: "First Name", field: "firstName", readOnly: true },
                      { label: "Last Name", field: "lastName", readOnly: true },
                      { label: "Date of Birth", field: "dateOfBirth", readOnly: true },
                      { label: "Primary Phone", field: "phone", readOnly: true },
                      { label: "Primary Email", field: "email", readOnly: true },
                    ].map(({ label, field, readOnly }) => (
                      <Grid item xs={12} key={field}>
                        <TextField size="small" label={label} value={formData[field] || ""} fullWidth required InputProps={{ readOnly }} />
                      </Grid>
                    ))}
                    <Grid item xs={12}>
                      <TextField size="small" select label="Marital Status" value={formData.maritalStatus || ""} fullWidth required
                        onChange={(e) => setFormData({ ...formData, maritalStatus: e.target.value })}>
                        <MenuItem value="">Select</MenuItem>
                        <MenuItem value="single">Single</MenuItem>
                        <MenuItem value="married">Married</MenuItem>
                        <MenuItem value="divorced">Divorced</MenuItem>
                        <MenuItem value="widowed">Widowed</MenuItem>
                      </TextField>
                    </Grid>
                    <Grid item xs={12}>
                      <TextField size="small" label="Secondary Email" value={formData.secondaryEmail || ""} fullWidth
                        onChange={(e) => setFormData({ ...formData, secondaryEmail: e.target.value })} />
                    </Grid>
                  </Grid>
                </div>

                {/* Right: Address */}
                <div>
                  <div style={{ fontSize: 11, fontWeight: 700, color: "#2e3e4c", textTransform: "uppercase", letterSpacing: 0.5, marginBottom: 10, paddingBottom: 6, borderBottom: "1px solid #e3e8ee" }}>Address</div>
                  <Grid container spacing={1.5}>
                    {[
                      { label: "Country", field: "country", readOnly: true },
                      { label: "Address 1", field: "address", readOnly: true },
                      { label: "City", field: "city", readOnly: true },
                      { label: "State", field: "state", readOnly: true },
                      { label: "ZIP Code", field: "zipCode", readOnly: true },
                    ].map(({ label, field, readOnly }) => (
                      <Grid item xs={12} key={field}>
                        <TextField size="small" label={label} value={formData[field] || ""} fullWidth required InputProps={{ readOnly }} />
                      </Grid>
                    ))}
                    <Grid item xs={12}>
                      <TextField size="small" label="Address 2" value={formData.address2 || ""} fullWidth
                        onChange={(e) => setFormData({ ...formData, address2: e.target.value })} />
                    </Grid>
                  </Grid>
                </div>
              </div>
            </div>
          )}

          {/* Roles Tab */}
          {tab === 1 && (
            <div style={{ border: "1px solid #d7dbe2", borderTop: "none", background: "#fff" }}>
              <div style={{ padding: "12px 14px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0 28px" }}>
                <div>
                  <div style={{ fontSize: 11, fontWeight: 700, color: "#2e3e4c", textTransform: "uppercase", letterSpacing: 0.5, marginBottom: 10, paddingBottom: 6, borderBottom: "1px solid #e3e8ee" }}>License Information</div>
                  <Grid container spacing={1.5}>
                    <Grid item xs={12}>
                      <TextField size="small" select label="Type of License" fullWidth required value={formData.licenseType || ""}
                        onChange={(e) => setFormData({ ...formData, licenseType: e.target.value })}>
                        <MenuItem value="">Select</MenuItem>
                        <MenuItem value="Light Motor Vehicle">Light Motor Vehicle</MenuItem>
                        <MenuItem value="Heavy Motor Vehicle">Heavy Motor Vehicle</MenuItem>
                      </TextField>
                    </Grid>
                    <Grid item xs={12}>
                      <TextField size="small" select label="Country of License" fullWidth required value={formData.licenseCountry || ""}
                        onChange={(e) => setFormData({ ...formData, licenseCountry: e.target.value })}>
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
                      <TextField size="small" label="Date Obtained" type="date" fullWidth required InputLabelProps={{ shrink: true }}
                        value={formData.licenseDate || ""} onChange={(e) => setFormData({ ...formData, licenseDate: e.target.value })} />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField size="small" label="Years of Driving Experience" fullWidth required value={formData.drivingExperience || ""}
                        onChange={(e) => setFormData({ ...formData, drivingExperience: e.target.value })} />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField size="small" select label="Accidents and Claims History" fullWidth required value={formData.accidentsClaims || ""}
                        onChange={(e) => setFormData({ ...formData, accidentsClaims: e.target.value })}>
                        <MenuItem value="">Select</MenuItem>
                        {["0", "1", "2", "3", "4", "5 or more"].map((v) => <MenuItem key={v} value={v}>{v}</MenuItem>)}
                      </TextField>
                    </Grid>
                  </Grid>
                </div>

                <div>
                  <div style={{ fontSize: 11, fontWeight: 700, color: "#2e3e4c", textTransform: "uppercase", letterSpacing: 0.5, marginBottom: 10, paddingBottom: 6, borderBottom: "1px solid #e3e8ee" }}>Declarations</div>
                  <Grid container spacing={1.5}>
                    {[
                      "Driving violations",
                      "Previous insurer",
                      "Are you the main driver of any other vehicle?",
                      "Do you own or have registered in your own name any other vehicles?",
                      "Do you own, insure or have any other vehicles registered in your name?",
                    ].map((question) => (
                      <Grid item xs={12} key={question}>
                        <div style={{ fontSize: 12, color: "#3d5164", marginBottom: 2 }}>{question}</div>
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

          {/* Next button */}
          <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2, pb: 2 }}>
            <Button variant="contained" size="small" onClick={handleNext}>Next</Button>
          </Box>
        </>
      )}

      <Snackbar open={errorOpen} autoHideDuration={4000} onClose={() => setErrorOpen(false)} anchorOrigin={{ vertical: "bottom", horizontal: "center" }}>
        <Alert onClose={() => setErrorOpen(false)} severity="error" sx={{ width: "100%" }}>{errorMsg}</Alert>
      </Snackbar>
    </Box>
  );
}
