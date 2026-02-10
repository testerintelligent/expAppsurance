import React, { useState } from "react";
import {
  Box,
  Tabs,
  Tab,
  Typography,
  TextField,
  Button,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TablePagination,
  TableHead,
  TableRow,
  MenuItem,
  Modal,
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { useNavigate } from "react-router-dom";
import { searchContact, createContact } from "./utils/contactAPI";
import { createAccountForContact, searchAccountByContact } from "../account/accountAPI";
import "./contact.css";

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
    country: "", // new
    organization: "Expleo",
    producerCode: "EXP-INS-01",
  });
  const [searchResult, setSearchResult] = useState([]);


  // --- Simple static location mapping for dependent dropdowns ---
  const LOCATION_DATA = {
    countries: [
      { code: 'US', name: 'United States' },
      { code: 'IN', name: 'India' },
    ],
    states: {
      US: [ { code: 'CA', name: 'California' }, { code: 'NY', name: 'New York' } ],
      IN: [ { code: 'TN', name: 'Tamil Nadu' }, { code: 'KR', name: 'Karnataka' } ],
    },
    cities: {
      CA: [ 'Los Angeles', 'San Francisco' ],
      NY: [ 'New York', 'Buffalo' ],
      TN: [ 'Chennai', 'Coimbatore' ],
      KR: [ 'Bengaluru', 'Mysuru' ],
    },
    zips: {
      'Los Angeles': [ '90001', '90002' ],
      'San Francisco': [ '94102', '94103' ],
      'New York': [ '10001', '10002' ],
      'Buffalo': [ '14201' ],
      'Chennai': [ '600001', '600002' ],
      'Coimbatore': [ '641001', '641002' ],
      'Bengaluru': [ '560001', '560002' ],
      'Mysuru': [ '570001', '570002' ],
    }
  };

  const [countries] = useState(LOCATION_DATA.countries);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [zips, setZips] = useState([]);

  const handleCountryChange = (e) => {
    const country = e.target.value;
    setFormData(prev => ({ ...prev, country, state: '', city: '', zipCode: '' }));
    setStates(country ? (LOCATION_DATA.states[country] || []) : []);
    setCities([]);
    setZips([]);
  };

  const handleStateChange = (e) => {
    const state = e.target.value;
    setFormData(prev => ({ ...prev, state, city: '', zipCode: '' }));
    setCities(state ? (LOCATION_DATA.cities[state] || []) : []);
    setZips([]);
  };

  const handleCityChange = (e) => {
    const city = e.target.value;
    setFormData(prev => ({ ...prev, city, zipCode: '' }));
    setZips(city ? (LOCATION_DATA.zips[city] || []) : []);
  };

  const [page, setPage] = useState(0); // current page
  const [rowsPerPage, setRowsPerPage] = useState(5); // rows per page

  const [showContact, setShowContact] = useState(false);
  const [selectedContact, setSelectedContact] = useState({});
  const [isEditMode, setIsEditMode] = useState(false);
  const navigate = useNavigate();

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0); // reset to first page when changing rows per page
  };

  // Calculate paginated data safely
  const paginatedData = Array.isArray(searchResult)
    ? searchResult.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
    : [];

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
      const account = await createAccountForContact(newContact);
      setSearchResult(newContact);
      

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
        country: "", 
        organization: "Expleo",
        producerCode: "EXP-INS-01",
      });
      navigate("/account", { state: { account } });
    } catch (err) {
      alert(err.response?.data?.error || "Failed to create contact");
    }
  };

  const handleView = (contact) => { setSelectedContact(contact); setShowContact(true); };
  const handleClose = () => { setShowContact(false); setSelectedContact(null); };
  const handleEditToggle = () => setIsEditMode((prev) => !prev);

  const handleContactChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleOk = () => {
    handleClose(); // just close without doing anything
  };

  return (
    
    <Box sx={{ width: "100%", maxWidth: 1200, mx: "auto", mt: 2 }}>
      <Paper
        elevation={4}
        sx={{
          p: 1,
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
          <Tab
            label="Search Contact"
            sx={{ fontWeight: "bold", fontSize: 16 }}
          />
          <Tab
            label="Create Contact"
            sx={{ fontWeight: "bold", fontSize: 16 }}
          />
        </Tabs>

        {/* -------------------- Search Contact Tab -------------------- */}
        <TabPanel value={tabValue} index={0}>
          <Paper sx={{ p: 2, maxWidth: 1000, mx: "auto" }} elevation={3}>
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
            {searchResult && searchResult?.length > 0 && (
              <TableContainer component={Paper} sx={{ mt: 3 }}>
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
                      <TableCell>View</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {paginatedData.map((contact, index) => (
                      <TableRow key={index}>
                        <TableCell>
                          <Button
                            variant="contained"
                            size="small"
                            onClick={async () => {
                            try {
                              let account;
                              // 1️⃣ First check if this contact already has an account
                              const existingAccount = await searchAccountByContact(contact._id);

                              if (existingAccount && existingAccount.accountId) {
                              // ✅ Account exists
                              account = existingAccount;
                              console.log("Existing account found:", account);
                              } else {
                              // ❌ No existing account — create one
                              account = await createAccountForContact(contact);
                              console.log("New account created:", account);
                          }

                          // 2️⃣ Navigate to Account screen
                          navigate("/account", { state: { account } });
                          } catch (err) {
                            console.error(err);
                            alert(
                            err.response?.data?.message ||
                            "Failed to fetch or create account"
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
                        <TableCell>
                          <VisibilityIcon
                            color="primary"
                            onClick={() => handleView(contact)} // pass contact if needed
                            style={{ cursor: "pointer" }} // optional: makes it clickable
                          />
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
                {/* Pagination Controls */}
                <TablePagination
                  component="div"
                  count={searchResult?.length}
                  page={page}
                  onPageChange={handleChangePage}
                  rowsPerPage={rowsPerPage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                  rowsPerPageOptions={[5, 10, 25]}
                />
              </TableContainer>
            )}
          </Paper>
        </TabPanel>

        {/* -------------------- view Contact Tab --------------------- */}
        {showContact && selectedContact && (
          <Modal open={showContact} onClose={handleClose} className="mt-12">
            <Box
              sx={{
                width: "100%",
                maxWidth: 1100,
                mx: "auto",
                p: 4,
                backgroundColor: "#fff",
                borderRadius: 3,
                boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
              }}
            >
              <Typography variant="h5" gutterBottom>
                View / Edit Contact
              </Typography>

              <Grid container spacing={3}>
                <Grid size={6}>
                  <TextField
                    label="First Name"
                    name="firstName"
                    value={selectedContact.firstName || ""}
                    onChange={handleContactChange}
                    fullWidth
                    InputProps={{ readOnly: !isEditMode }}
                  />
                </Grid>
                {/* Row 1 */}
                <Grid size={6}>
                  <TextField
                    fullWidth
                    label="First Name"
                    name="firstName"
                    value={selectedContact.firstName}
                    onChange={handleChange}
                    required
                    InputProps={{ readOnly: !isEditMode }}
                  />
                </Grid>
                <Grid size={6}>
                  <TextField
                    fullWidth
                    label="Last Name"
                    name="lastName"
                    value={selectedContact.lastName}
                    onChange={handleChange}
                    required
                    InputProps={{ readOnly: !isEditMode }}
                  />
                </Grid>
                {/* Row 2 */}
                <Grid size={6}>
                  <TextField
                    fullWidth
                    type="date"
                    label="Date of Birth *"
                    name="dateOfBirth"
                    value={selectedContact.dateOfBirth}
                    onChange={handleChange}
                    InputLabelProps={{ shrink: true }}
                    required
                    InputProps={{ readOnly: !isEditMode }}
                  />
                </Grid>
                <Grid size={6}>
                  <TextField
                    select
                    fullWidth
                    label="Gender"
                    name="gender"
                    value={selectedContact.gender}
                    onChange={handleChange}
                    InputProps={{ readOnly: !isEditMode }}
                  >
                    <MenuItem value="Male">Male</MenuItem>
                    <MenuItem value="Female">Female</MenuItem>
                  </TextField>
                </Grid>
                {/* Row 3 */}
                <Grid size={12}>
                  <TextField
                    fullWidth
                    label="Email"
                    name="email"
                    value={selectedContact.email}
                    onChange={handleChange}
                    InputProps={{ readOnly: !isEditMode }}
                  />
                </Grid>
                <Grid size={6}>
                  <TextField
                    fullWidth
                    label="Phone"
                    name="phone"
                    value={selectedContact.phone}
                    onChange={handleChange}
                    InputProps={{ readOnly: !isEditMode }}
                  />
                </Grid>
                {/* Row 4 */}
                <Grid size={6}>
                  <TextField
                    fullWidth
                    label="Address"
                    name="address"
                    value={selectedContact.address}
                    onChange={handleChange}
                    InputProps={{ readOnly: !isEditMode }}
                  />
                </Grid>
                {/* Row 5 */}
                <Grid size={6}>
                  <TextField
                    fullWidth
                    label="Street"
                    name="street"
                    value={selectedContact.street}
                    onChange={handleChange}
                    InputProps={{ readOnly: !isEditMode }}
                  />
                </Grid>
                <Grid size={6}>
                  <TextField
                    fullWidth
                    label="City"
                    name="city"
                    value={selectedContact.city}
                    onChange={handleChange}
                    InputProps={{ readOnly: !isEditMode }}
                  />
                </Grid>
                {/* Row 6 */}
                <Grid size={6}>
                  <TextField
                    fullWidth
                    label="State"
                    name="state"
                    value={selectedContact.state}
                    onChange={handleChange}
                    InputProps={{ readOnly: !isEditMode }}
                  />
                </Grid>
                <Grid size={6}>
                  <TextField
                    fullWidth
                    label="Zip Code"
                    name="zipCode"
                    value={selectedContact.zipCode}
                    onChange={handleChange}
                    InputProps={{ readOnly: !isEditMode }}
                  />
                </Grid>
                {/* Row 7 */}
                <Grid size={6}>
                  <TextField
                    fullWidth
                    label="Organization"
                    name="organization"
                    value={selectedContact.organization}
                    onChange={handleChange}
                    InputProps={{ readOnly: !isEditMode }}
                  />
                </Grid>
                <Grid size={6}>
                  <TextField
                    fullWidth
                    label="Producer Code"
                    name="producerCode"
                    value={selectedContact.producerCode}
                    onChange={handleChange}
                    InputProps={{ readOnly: !isEditMode }}
                  />
                </Grid>{" "}
              </Grid>

              {/* Buttons Section */}
              <Box sx={{ textAlign: "right", mt: 4 }}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleEditToggle}
                  sx={{ mr: 2 }}
                >
                  {isEditMode ? "Update" : "Edit"}
                </Button>

                <Button
                  variant="contained"
                  color="secondary"
                  onClick={handleOk}
                >
                  OK
                </Button>
              </Box>
            </Box>
          </Modal>
        )}

        {/* -------------------- Create Contact Tab -------------------- */}
        <TabPanel value={tabValue} index={1}>
          <Box
            sx={{
              width: "100%",
              maxWidth: 1200,
              mx: "auto",
              p: 4,
              backgroundColor: "#fff",
              borderRadius: 3,
              boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
            }}
          >
            <Typography
              variant="h5"
              fontWeight={700}
              mb={3}
              color="#2c3e50"
              textAlign="center"
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                gap: 1,
              }}
            >
              <span style={{ fontSize: "1.5rem", color: "#1976d2" }}>➕</span>
              Create New Contact
            </Typography>

            <Grid container spacing={3}>
              {/* Row 1 */}
              <Grid size={6}>
                <TextField
                  fullWidth
                  label="First Name"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                />
              </Grid>
              <Grid size={6}>
                <TextField
                  fullWidth
                  label="Last Name"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  required
                />
              </Grid>

              {/* Row 2 */}
              <Grid size={6}>
                <TextField
                  fullWidth
                  type="date"
                  label="Date of Birth *"
                  name="dateOfBirth"
                  value={formData.dateOfBirth}
                  onChange={handleChange}
                  InputLabelProps={{ shrink: true }}
                  required
                />
              </Grid>
              <Grid size={6}>
                <TextField
                  select
                  fullWidth
                  label="Gender"
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                >
                  <MenuItem value="Male">Male</MenuItem>
                  <MenuItem value="Female">Female</MenuItem>
                </TextField>
              </Grid>

              {/* Row 3 */}
              <Grid size={12}>
                <TextField
                  fullWidth
                  label="Email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                />
              </Grid>
              <Grid size={6}>
                <TextField
                  fullWidth
                  label="Phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                />
              </Grid>

              {/* Row 4 */}
              <Grid size={6}>
                <TextField
                  fullWidth
                  label="Address"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                />
              </Grid>

              {/* Row 5: Street + Country */}
              <Grid size={6}>
                <TextField
                  fullWidth
                  label="Street"
                  name="street"
                  value={formData.street}
                  onChange={handleChange}
                />
              </Grid>
              <Grid size={6}>
                <TextField
                  select
                  fullWidth
                  label="Country"
                  name="country"
                  value={formData.country}
                  onChange={handleCountryChange}
                >
                  <MenuItem value="">Select Country</MenuItem>
                  {countries.map((c) => (
                    <MenuItem key={c.code} value={c.code}>
                      {c.name}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>

              {/* Row 6: City + State (dependent) */}
              <Grid size={6}>
                <TextField
                  select
                  fullWidth
                  label="City"
                  name="city"
                  value={formData.city}
                  onChange={handleCityChange}
                  disabled={!cities.length}
                >
                  <MenuItem value="">Select City</MenuItem>
                  {cities.map((ct) => (
                    <MenuItem key={ct} value={ct}>
                      {ct}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
              <Grid size={6}>
                <TextField
                  select
                  fullWidth
                  label="State"
                  name="state"
                  value={formData.state}
                  onChange={handleStateChange}
                  disabled={!states.length}
                >
                  <MenuItem value="">Select State</MenuItem>
                  {states.map((s) => (
                    <MenuItem key={s.code} value={s.code}>
                      {s.name}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>

              {/* Row 7: Zip Code + Organization */}
              <Grid size={6}>
                <TextField
                  select
                  fullWidth
                  label="Zip Code"
                  name="zipCode"
                  value={formData.zipCode}
                  onChange={handleChange}
                  disabled={!zips.length}
                >
                  <MenuItem value="">Select Zip</MenuItem>
                  {zips.map((z) => (
                    <MenuItem key={z} value={z}>
                      {z}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
              <Grid size={6}>
                <TextField
                  select
                  fullWidth
                  label="Organization"
                  name="organization"
                  value={formData.organization}
                  onChange={handleChange}
                >
                  <MenuItem value="Expleo">Expleo</MenuItem>
                  <MenuItem value="Other">Other</MenuItem>
                </TextField>
              </Grid>
              <Grid size={6}>
                <TextField
                  select
                  fullWidth
                  label="Producer Code"
                  name="producerCode"
                  value={formData.producerCode}
                  onChange={handleChange}
                >
                  <MenuItem value="EXP-INS-01">EXP-INS-01</MenuItem>
                </TextField>
              </Grid>
            </Grid>

            <Box sx={{ textAlign: "center", mt: 4 }}>
              <Button
                variant="contained"
                color="primary"
                onClick={handleCreate}
                sx={{
                  px: 6,
                  py: 1.5,
                  borderRadius: 2,
                  fontWeight: 600,
                  boxShadow: "0px 4px 10px rgba(25, 118, 210, 0.3)",
                  "&:hover": {
                    backgroundColor: "#1565c0",
                    boxShadow: "0px 6px 12px rgba(25, 118, 210, 0.4)",
                  },
                }}
              >
                Create Contact
              </Button>
            </Box>
          </Box>
        </TabPanel>

      </Paper>
    </Box>
  );
}