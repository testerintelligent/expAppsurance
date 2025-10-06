import React, { useState } from "react";
import InfoBar from "../InfoBar";
import { useLocation, useNavigate } from "react-router-dom";
import { Box, Typography, Paper, Grid, TextField, MenuItem, Tabs, Tab, RadioGroup, FormControlLabel, Radio, Button } from "@mui/material";

export default function Driver() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const contact = state?.contact || {};
  const [tab, setTab] = useState(0);

  return (
    <Box sx={{ maxWidth: 900, mx: "auto", mt: 4 }}>
      <InfoBar
        accountNumber={state?.accountNumber || "6431739974"}
        policyNumber={state?.policyNumber || "0923090878"}
        expiryDate={state?.expiryDate || "04/06/2026"}
      />
      <Typography variant="h4" fontWeight={700} sx={{ mb: 3 }}>
        Driver Details
      </Typography>
      <Paper sx={{ p: 4, borderRadius: 4 }}>
        <Tabs value={tab} onChange={(_, v) => setTab(v)} sx={{ mb: 3 }}>
          <Tab label="Contact Detail" />
          <Tab label="Roles" />
        </Tabs>
        {tab === 0 && (
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <Typography variant="subtitle1" fontWeight={600} sx={{ mb: 2 }}>
                Contact Detail
              </Typography>
              <TextField label="First name" value={contact.firstName || ""} fullWidth sx={{ mb: 2 }} InputProps={{ readOnly: true }} />
              <TextField label="Last name" value={contact.lastName || ""} fullWidth sx={{ mb: 2 }} InputProps={{ readOnly: true }} />
              <TextField label="Date of Birth" value={contact.dateOfBirth || ""} fullWidth sx={{ mb: 2 }} InputProps={{ readOnly: true }} />
              <TextField label="Marital Status" value={contact.maritalStatus || ""} fullWidth sx={{ mb: 2 }} select InputProps={{ readOnly: true }}>
                <MenuItem value="none">None</MenuItem>
                <MenuItem value="single">Single</MenuItem>
                <MenuItem value="married">Married</MenuItem>
              </TextField>
              <TextField label="Primary Phone" value={contact.phone || ""} fullWidth sx={{ mb: 2 }} InputProps={{ readOnly: true }} />
              <TextField label="Primary Email" value={contact.email || ""} fullWidth sx={{ mb: 2 }} InputProps={{ readOnly: true }} />
              <TextField label="Secondary Email" value={contact.secondaryEmail || ""} fullWidth sx={{ mb: 2 }} InputProps={{ readOnly: true }} />
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="subtitle1" fontWeight={600} sx={{ mb: 2 }}>
                Address
              </Typography>
              <TextField label="Country" value={contact.country || "United States"} fullWidth sx={{ mb: 2 }} InputProps={{ readOnly: true }} />
              <TextField label="Address 1" value={contact.address || ""} fullWidth sx={{ mb: 2 }} InputProps={{ readOnly: true }} />
              <TextField label="Address 2" value={contact.address2 || ""} fullWidth sx={{ mb: 2 }} InputProps={{ readOnly: true }} />
              <TextField label="City" value={contact.city || ""} fullWidth sx={{ mb: 2 }} InputProps={{ readOnly: true }} />
              <TextField label="State" value={contact.state || ""} fullWidth sx={{ mb: 2 }} InputProps={{ readOnly: true }} />
              <TextField label="ZIP Code" value={contact.zipCode || ""} fullWidth sx={{ mb: 2 }} InputProps={{ readOnly: true }} />
            </Grid>
          </Grid>
        )}
        {tab === 1 && (
          <Box sx={{ mt: 2 }}>
            <Typography variant="subtitle1" fontWeight={600} sx={{ mb: 2 }}>
              Driver Roles
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      select
                      label="Type of License"
                      fullWidth
                      defaultValue="Light Motor Vehicle"
                    >
                      <MenuItem value="Light Motor Vehicle">Light Motor Vehicle</MenuItem>
                      <MenuItem value="Heavy Motor Vehicle">Heavy Motor Vehicle</MenuItem>
                    </TextField>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      select
                      label="Country it was issued in"
                      fullWidth
                      defaultValue="United States"
                    >
                      <MenuItem value="United States">United States</MenuItem>
                      <MenuItem value="Canada">Canada</MenuItem>
                      <MenuItem value="India">India</MenuItem>
                      <MenuItem value="United Kingdom">United Kingdom</MenuItem>
                      <MenuItem value="Australia">Australia</MenuItem>
                      <MenuItem value="Other">Other</MenuItem>
                    </TextField>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField label="Date it was obtained" type="date" fullWidth InputLabelProps={{ shrink: true }} />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      select
                      label="Accidents and claims history"
                      fullWidth
                      defaultValue="0"
                    >
                      <MenuItem value="0">0</MenuItem>
                      <MenuItem value="1">1</MenuItem>
                      <MenuItem value="2">2</MenuItem>
                      <MenuItem value="3">3</MenuItem>
                      <MenuItem value="4">4</MenuItem>
                      <MenuItem value="5 or more">5 or more</MenuItem>
                    </TextField>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField label="Years of driving experience" fullWidth />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Typography sx={{ mt: 1 }}>Driving violations</Typography>
                    <RadioGroup row defaultValue="no">
                      <FormControlLabel value="yes" control={<Radio />} label="Yes" />
                      <FormControlLabel value="no" control={<Radio />} label="No" />
                    </RadioGroup>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Typography sx={{ mt: 1 }}>Previous insurer</Typography>
                    <RadioGroup row defaultValue="no">
                      <FormControlLabel value="yes" control={<Radio />} label="Yes" />
                      <FormControlLabel value="no" control={<Radio />} label="No" />
                    </RadioGroup>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Typography sx={{ mt: 1 }}>Are you the main driver of any other vehicle?</Typography>
                    <RadioGroup row defaultValue="no">
                      <FormControlLabel value="yes" control={<Radio />} label="Yes" />
                      <FormControlLabel value="no" control={<Radio />} label="No" />
                    </RadioGroup>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Typography sx={{ mt: 1 }}>Do you own or have registered in your own name any other vehicles?</Typography>
                    <RadioGroup row defaultValue="no">
                      <FormControlLabel value="yes" control={<Radio />} label="Yes" />
                      <FormControlLabel value="no" control={<Radio />} label="No" />
                    </RadioGroup>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Typography sx={{ mt: 1 }}>Do you own, insure or have any other vehicles registered in your name?</Typography>
                    <RadioGroup row defaultValue="no">
                      <FormControlLabel value="yes" control={<Radio />} label="Yes" />
                      <FormControlLabel value="no" control={<Radio />} label="No" />
                    </RadioGroup>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Box>
        )}
        {/* ...other tabs can be implemented similarly... */}
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 4 }}>
          <Button
            variant="contained"
            color="primary"
            onClick={() =>
              navigate("/vehicle", {
                state: {
                  ...state,
                  contact,
                  accountNumber: state?.accountNumber,
                  policyNumber: state?.policyNumber,
                  expiryDate: state?.expiryDate
                }
              })
            }
          >
            Next
          </Button>
        </Box>
      </Paper>
    </Box>
  );
}
