import React, { useState, useEffect } from "react";
import InfoBar from "../InfoBar";
import { useLocation, useNavigate } from "react-router-dom";
import {
  createDriverForSubmission,
  getDriversBySubmission,
  getDriversByAccount,
} from "./driverAPI";
import PrimaryDriverQuestion from "./IsNewDriver";
import { formatDateForInput } from "../../utils/dateFormatter";
import {
  Box,
  Typography,
  Paper,
  Grid,
  TextField,
  MenuItem,
  Tabs,
  Tab,
  RadioGroup,
  FormControlLabel,
  Radio,
  Button,
  Snackbar,
  Alert,
  CircularProgress,
} from "@mui/material";
import { yellow } from "@mui/material/colors";

export default function Driver() {
  const { state } = useLocation();
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

  // ✅ Fetch existing drivers when isPrimaryDriver changes or when dealing with existing account
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
            setFormData({ ...emptyForm, ...contact });
          }
        })
        .catch(() => {
          // No drivers or error - use contact details
          setFormData({ ...emptyForm, ...contact });
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

      console.log("✅ Driver created:", driver);

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
    <Box sx={{ maxWidth: 1200, mx: "auto", mt: 4 }}>
      <InfoBar
        accountNumber={state?.accountNumber || "-"}
        product={state?.productName || "-"}
        contactName={`${formData.firstName || ""} ${
          formData.lastName || ""
        }`.trim()}
        submissionId={state?.submissionId || "-"}
        effectiveDate={state?.effectiveDate || "-"}
        expiryDate={state?.expiryDate || "-"}
      />

      <Typography variant="h4" fontWeight={700} sx={{ mb: 3 }}>
        Driver Details
      </Typography>

      <div className="w-full mb-4">
        <PrimaryDriverQuestion
          value={isPrimaryDriver}
          onChange={setIsPrimaryDriver}
        />
        ;
      </div>

      <Paper sx={{ p: 4, borderRadius: 4 }}>
        <Tabs value={tab} onChange={(_, v) => setTab(v)} sx={{ mb: 3 }}>
          <Tab label="Contact Detail" />
          <Tab label="Roles" />
        </Tabs>

        {/* --- Loading state --- */}
        {loading && (
          <Box sx={{ display: "flex", justifyContent: "center", p: 4 }}>
            <CircularProgress />
          </Box>
        )}

        {!loading && (
          <>
            {/* --- Driver Selection (when isPrimaryDriver === "no") --- */}
            {isPrimaryDriver === "no" && existingDrivers.length > 0 && (
              <Box sx={{ mb: 4, p: 3, bgcolor: "#f5f5f5", borderRadius: 2 }}>
                <Typography variant="h6" fontWeight={600} sx={{ mb: 2 }}>
                  Select an Existing Driver
                </Typography>
                <TextField
                  select
                  fullWidth
                  label="Available Drivers"
                  value={selectedDriverId}
                  onChange={(e) => {
                    const driverId = e.target.value;
                    setSelectedDriverId(driverId);
                    const driver = existingDrivers.find(
                      (d) => d._id === driverId
                    );
                    if (driver) {
                      setFormData({
                        firstName: driver.firstName || "",
                        lastName: driver.lastName || "",
                        dateOfBirth:
                          formatDateForInput(driver.dateOfBirth) || "",
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
                        licenseDate:
                          formatDateForInput(driver.licenseDate) || "",
                        drivingExperience: driver.drivingExperience || "",
                        accidentsClaims: driver.accidentsClaims || "",
                      });
                    }
                  }}
                >
                  <MenuItem value="">-- Create New Driver --</MenuItem>
                  {existingDrivers.map((driver) => (
                    <MenuItem key={driver._id} value={driver._id}>
                      {driver.firstName} {driver.lastName}
                    </MenuItem>
                  ))}
                </TextField>
              </Box>
            )}{" "}
            {/* --- Contact Detail Tab --- */}
            {tab === 0 && (
              <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                  <Typography
                    variant="subtitle1"
                    fontWeight={600}
                    sx={{ mb: 2 }}
                  >
                    Contact Detail
                  </Typography>

                  <TextField
                    label="First Name"
                    value={formData.firstName || ""}
                    fullWidth
                    sx={{ mb: 2 }}
                    InputProps={{ readOnly: true }}
                  />
                  <TextField
                    label="Last Name"
                    value={formData.lastName || ""}
                    fullWidth
                    sx={{ mb: 2 }}
                    InputProps={{ readOnly: true }}
                  />
                  <TextField
                    label="Date of Birth"
                    value={formData.dateOfBirth || ""}
                    fullWidth
                    sx={{ mb: 2 }}
                    InputProps={{ readOnly: true }}
                  />

                  <TextField
                    select
                    label="Marital Status"
                    value={formData.maritalStatus || ""}
                    fullWidth
                    sx={{ mb: 2 }}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        maritalStatus: e.target.value,
                      })
                    }
                  >
                    <MenuItem value="">Select</MenuItem>
                    <MenuItem value="single">Single</MenuItem>
                    <MenuItem value="married">Married</MenuItem>
                    <MenuItem value="divorced">Divorced</MenuItem>
                    <MenuItem value="widowed">Widowed</MenuItem>
                  </TextField>

                  <TextField
                    label="Primary Phone"
                    value={formData.phone || ""}
                    fullWidth
                    sx={{ mb: 2 }}
                    InputProps={{ readOnly: true }}
                  />
                  <TextField
                    label="Primary Email"
                    value={formData.email || ""}
                    fullWidth
                    sx={{ mb: 2 }}
                    InputProps={{ readOnly: true }}
                  />

                  {/* Optional field */}
                  <TextField
                    label="Secondary Email"
                    value={formData.secondaryEmail || ""}
                    fullWidth
                    sx={{ mb: 2 }}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        secondaryEmail: e.target.value,
                      })
                    }
                  />
                </Grid>

                <Grid item xs={12} md={6}>
                  <Typography
                    variant="subtitle1"
                    fontWeight={600}
                    sx={{ mb: 2 }}
                  >
                    Address
                  </Typography>
                  <TextField
                    label="Country"
                    value={formData.country || "India"}
                    fullWidth
                    sx={{ mb: 2 }}
                    InputProps={{ readOnly: true }}
                  />
                  <TextField
                    label="Address 1"
                    value={formData.address || ""}
                    fullWidth
                    sx={{ mb: 2 }}
                    InputProps={{ readOnly: true }}
                  />
                  {/* Optional field */}
                  <TextField
                    label="Address 2"
                    value={formData.address2 || ""}
                    fullWidth
                    sx={{ mb: 2 }}
                    onChange={(e) =>
                      setFormData({ ...formData, address2: e.target.value })
                    }
                  />
                  <TextField
                    label="City"
                    value={formData.city || ""}
                    fullWidth
                    sx={{ mb: 2 }}
                    InputProps={{ readOnly: true }}
                  />
                  <TextField
                    label="State"
                    value={formData.state || ""}
                    fullWidth
                    sx={{ mb: 2 }}
                    InputProps={{ readOnly: true }}
                  />
                  <TextField
                    label="ZIP Code"
                    value={formData.zipCode || ""}
                    fullWidth
                    sx={{ mb: 2 }}
                    InputProps={{ readOnly: true }}
                  />
                </Grid>
              </Grid>
            )}
            {/* --- Roles Tab --- */}
            {tab === 1 && (
              <Box sx={{ mt: 2 }}>
                <Typography variant="subtitle1" fontWeight={600} sx={{ mb: 2 }}>
                  Driver Roles
                </Typography>
                <Grid container spacing={2}>
                  <Grid item xs={12} md={6}>
                    <TextField
                      select
                      label="Type of License"
                      fullWidth
                      value={formData.licenseType || ""}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          licenseType: e.target.value,
                        })
                      }
                      sx={{ mb: 2 }}
                    >
                      <MenuItem value="">Select</MenuItem>
                      <MenuItem value="Light Motor Vehicle">
                        Light Motor Vehicle
                      </MenuItem>
                      <MenuItem value="Heavy Motor Vehicle">
                        Heavy Motor Vehicle
                      </MenuItem>
                    </TextField>

                    <TextField
                      select
                      label="Country of License"
                      fullWidth
                      value={formData.licenseCountry || ""}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          licenseCountry: e.target.value,
                        })
                      }
                      sx={{ mb: 2 }}
                    >
                      <MenuItem value="">Select</MenuItem>
                      <MenuItem value="United States">United States</MenuItem>
                      <MenuItem value="Canada">Canada</MenuItem>
                      <MenuItem value="India">India</MenuItem>
                      <MenuItem value="United Kingdom">United Kingdom</MenuItem>
                      <MenuItem value="Australia">Australia</MenuItem>
                      <MenuItem value="Other">Other</MenuItem>
                    </TextField>

                    <TextField
                      label="Date Obtained"
                      type="date"
                      fullWidth
                      InputLabelProps={{ shrink: true }}
                      value={formData.licenseDate || ""}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          licenseDate: e.target.value,
                        })
                      }
                      sx={{ mb: 2 }}
                    />

                    <TextField
                      label="Years of Driving Experience"
                      fullWidth
                      value={formData.drivingExperience || ""}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          drivingExperience: e.target.value,
                        })
                      }
                      sx={{ mb: 2 }}
                    />

                    <TextField
                      select
                      label="Accidents and Claims History"
                      fullWidth
                      value={formData.accidentsClaims || ""}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          accidentsClaims: e.target.value,
                        })
                      }
                      sx={{ mb: 2 }}
                    >
                      <MenuItem value="">Select</MenuItem>
                      <MenuItem value="0">0</MenuItem>
                      <MenuItem value="1">1</MenuItem>
                      <MenuItem value="2">2</MenuItem>
                      <MenuItem value="3">3</MenuItem>
                      <MenuItem value="4">4</MenuItem>
                      <MenuItem value="5 or more">5 or more</MenuItem>
                    </TextField>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Typography sx={{ mt: 1 }}>Driving violations</Typography>
                    <RadioGroup row defaultValue="no">
                      <FormControlLabel
                        value="yes"
                        control={<Radio />}
                        label="Yes"
                      />
                      <FormControlLabel
                        value="no"
                        control={<Radio />}
                        label="No"
                      />
                    </RadioGroup>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Typography sx={{ mt: 1 }}>Previous insurer</Typography>
                    <RadioGroup row defaultValue="no">
                      <FormControlLabel
                        value="yes"
                        control={<Radio />}
                        label="Yes"
                      />
                      <FormControlLabel
                        value="no"
                        control={<Radio />}
                        label="No"
                      />
                    </RadioGroup>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Typography sx={{ mt: 1 }}>
                      Are you the main driver of any other vehicle?
                    </Typography>
                    <RadioGroup row defaultValue="no">
                      <FormControlLabel
                        value="yes"
                        control={<Radio />}
                        label="Yes"
                      />
                      <FormControlLabel
                        value="no"
                        control={<Radio />}
                        label="No"
                      />
                    </RadioGroup>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Typography sx={{ mt: 1 }}>
                      Do you own or have registered in your own name any other
                      vehicles?
                    </Typography>
                    <RadioGroup row defaultValue="no">
                      <FormControlLabel
                        value="yes"
                        control={<Radio />}
                        label="Yes"
                      />
                      <FormControlLabel
                        value="no"
                        control={<Radio />}
                        label="No"
                      />
                    </RadioGroup>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Typography sx={{ mt: 1 }}>
                      Do you own, insure or have any other vehicles registered
                      in your name?
                    </Typography>
                    <RadioGroup row defaultValue="no">
                      <FormControlLabel
                        value="yes"
                        control={<Radio />}
                        label="Yes"
                      />
                      <FormControlLabel
                        value="no"
                        control={<Radio />}
                        label="No"
                      />
                    </RadioGroup>
                  </Grid>
                </Grid>
              </Box>
            )}
            {/* --- Next Button --- */}
            <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 4 }}>
              <Button variant="contained" color="primary" onClick={handleNext}>
                Next
              </Button>
            </Box>
          </>
        )}
      </Paper>

      {/* --- Snackbar for errors --- */}
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
