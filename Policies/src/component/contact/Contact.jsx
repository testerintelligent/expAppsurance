import React, { useState } from "react";
import {
  Box,
  Tabs,
  Tab,
  Typography,
  TextField,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  MenuItem,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { searchContact, createContact } from "./utils/contactAPI";
import { createAccountForContact } from "../account/accountAPI";

function TabPanel(props) {
  const { children, value, index, ...other } = props;
  return (
    <div role="tabpanel" hidden={value !== index} {...other}>
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

export default function Contact() {
  const [tabValue, setTabValue] = useState(0);
  const [searchData, setSearchData] = useState({
    firstName: "",
    lastName: "",
    dateOfBirth: "",
  });
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    dateOfBirth: "",
    gender: "",
    address: "",
    street: "",
    city: "",
    state: "",
    zipCode: "",
    organization: "",
    producerCode: "",
  });
  const [searchResult, setSearchResult] = useState(null);
  const [showDialog, setShowDialog] = useState(false);
  const navigate = useNavigate();

  // Tab change handler
  const handleTabChange = (event, newValue) => setTabValue(newValue);

  // Input handlers
  const handleSearchChange = (e) => {
    setSearchData({ ...searchData, [e.target.name]: e.target.value });
  };
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // API Calls
  const handleSearch = async () => {
  try {
    // Build query object only with filled values
    const query = {};
    if (searchData.firstName) query.firstName = searchData.firstName;
    if (searchData.lastName) query.lastName = searchData.lastName;
    if (searchData.dateOfBirth) query.dateOfBirth = searchData.dateOfBirth;

    if (Object.keys(query).length === 0) {
      alert("Please provide at least one search field");
      return;
    }

    // Call API with only provided fields
    const result = await searchContact(query);
    setSearchResult(Array.isArray(result) ? result : [result]);
  } catch (err) {
    alert(err.response?.data?.message || "Contact not found");
    setSearchResult([]);
  }
};

  const handleCreate = async () => {
    try {
      const newContact = await createContact(formData);
      setSearchResult(newContact);
      setShowDialog(true);

      // Reset form after creation
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        dateOfBirth: "",
        gender: "",
        address: "",
        street: "",
        city: "",
        state: "",
        zipCode: "",
        organization: "",
        producerCode: "",
      });
    } catch (err) {
      alert(err.response?.data?.error || "Failed to create contact");
    }
  };

  return (
    <Box sx={{ width: "100%", maxWidth: 900, mx: "auto", mt: 4 }}>
      <Paper
        elevation={4}
        sx={{
          p: 4,
          borderRadius: 4,
          background: "linear-gradient(135deg, #f8fafc 60%, #e0e7ef 100%)",
        }}
      >
        <Tabs
          value={tabValue}
          onChange={handleTabChange}
          centered
          sx={{ mb: 3 }}
        >
          <Tab label="Search Contact" sx={{ fontWeight: "bold", fontSize: 16 }} />
          <Tab label="Create Contact" sx={{ fontWeight: "bold", fontSize: 16 }} />
        </Tabs>

        {/* -------------------- Search Contact Tab -------------------- */}
        <TabPanel value={tabValue} index={0}>
          <Paper sx={{ p: 3, maxWidth: 800, mx: "auto" }} elevation={3}>
            <Typography variant="h6" gutterBottom>
              Search Contact
            </Typography>

            {/* Search Form */}
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  margin="normal"
                  label="First Name"
                  name="firstName"
                  value={searchData.firstName}
                  onChange={handleSearchChange}
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  margin="normal"
                  label="Last Name"
                  name="lastName"
                  value={searchData.lastName}
                  onChange={handleSearchChange}
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  margin="normal"
                  type="date"
                  label="Date of Birth"
                  name="dateOfBirth"
                  value={searchData.dateOfBirth}
                  onChange={handleSearchChange}
                  InputLabelProps={{ shrink: true }}
                  required
                />
              </Grid>
            </Grid>

            <Button
              variant="contained"
              color="primary"
              onClick={handleSearch}
              sx={{ mt: 2 }}
              fullWidth
            >
              Search
            </Button>

            {/* Search Result Table */}
            {searchResult && searchResult.length > 0 && (
              <TableContainer component={Paper} sx={{ mt: 4 }}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Select</TableCell>
                      <TableCell>First Name</TableCell>
                      <TableCell>Last Name</TableCell>
                      <TableCell>DOB</TableCell>
                      <TableCell>City</TableCell>
                      <TableCell>Zipcode</TableCell>
                      <TableCell>Address</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {searchResult.map((contact, index) => (
                      <TableRow key={index}>
                        <TableCell>
                          <Button
                            variant="contained"
                            size="small"
                            onClick={async () => {
                              try {
                                const account = await createAccountForContact(
                                  contact
                                );
                                navigate("/account", { state: { account } });
                              } catch (err) {
                                alert(
                                  err.response?.data?.message ||
                                    "Failed to create account"
                                );
                              }
                            }}
                          >
                            Select
                          </Button>
                        </TableCell>
                        <TableCell>{contact.firstName}</TableCell>
                        <TableCell>{contact.lastName}</TableCell>
                        <TableCell>{contact.dateOfBirth}</TableCell>
                        <TableCell>{contact.city}</TableCell>
                        <TableCell>{contact.zipcode}</TableCell>
                        <TableCell>{contact.address}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            )}
          </Paper>
        </TabPanel>

        {/* -------------------- Create Contact Tab -------------------- */}
        <TabPanel value={tabValue} index={1}>
          <Box sx={{ maxWidth: 700, mx: "auto", p: 2 }}>
            <Typography
              variant="h5"
              fontWeight={600}
              mb={2}
              color="#2c3e50"
            >
              ➕ Create New Contact
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="First Name"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Last Name"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  required
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  type="date"
                  label="Date of Birth"
                  name="dateOfBirth"
                  value={formData.dateOfBirth}
                  onChange={handleChange}
                  InputLabelProps={{ shrink: true }}
                  required
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  select
                  fullWidth
                  label="Gender"
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  variant="outlined"
                >
                  <MenuItem value="Male">Male</MenuItem>
                  <MenuItem value="Female">Female</MenuItem>
                </TextField>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Address"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Street"
                  name="street"
                  value={formData.street}
                  onChange={handleChange}
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="City"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="State"
                  name="state"
                  value={formData.state}
                  onChange={handleChange}
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Zip Code"
                  name="zipCode"
                  value={formData.zipCode}
                  onChange={handleChange}
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Organization"
                  name="organization"
                  value={formData.organization}
                  onChange={handleChange}
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Producer Code"
                  name="producerCode"
                  value={formData.producerCode}
                  onChange={handleChange}
                  variant="outlined"
                />
              </Grid>
            </Grid>
            <Button
              variant="contained"
              color="primary"
              onClick={handleCreate}
              sx={{ mt: 3, px: 5, fontWeight: 600, borderRadius: 2 }}
            >
              Create Contact
            </Button>
          </Box>
        </TabPanel>

        {/* -------------------- Dialog for New Contact -------------------- */}
        <Dialog open={showDialog} onClose={() => setShowDialog(false)}>
          <DialogTitle sx={{ fontWeight: 700, color: "#1976d2" }}>
            Contact Created Successfully
          </DialogTitle>
          <DialogContent>
            {searchResult && searchResult.contact ? (
              <Box sx={{ p: 1 }}>
                <Typography>
                  <b>Name:</b> {searchResult.contact.firstName} {searchResult.contact.lastName}
                </Typography>
                <Typography>
                  <b>Email:</b> {searchResult.contact.email}
                </Typography>
                <Typography>
                  <b>Phone:</b> {searchResult.contact.phone}
                </Typography>
                <Typography>
                  <b>DOB:</b> {searchResult.contact.dateOfBirth?.slice(0,10)}
                </Typography>
                <Typography>
                  <b>Organization:</b> {searchResult.contact.organization}
                </Typography>
                <Typography>
                  <b>Producer Code:</b> {searchResult.contact.producerCode}
                </Typography>

                {/* Action buttons */}
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "flex-end",
                    mt: 2,
                    gap: 2,
                  }}
                >
                  <Button
                    onClick={() => setShowDialog(false)}
                    variant="outlined"
                    color="secondary"
                  >
                    Cancel
                  </Button>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={async () => {
                      try {
                        const account = await createAccountForContact(searchResult.contact);
                        setShowDialog(false); // close popup
                        navigate("/account", { state: { account } });
                      } catch (err) {
                        alert(
                          err.response?.data?.message ||
                            "Failed to create account"
                        );
                      }
                    }}
                  >
                    Create Account
                  </Button>
                </Box>
              </Box>
            ) : (
              <Typography>No details found</Typography>
            )}
          </DialogContent>
        </Dialog>
      </Paper>
    </Box>
  );
}
