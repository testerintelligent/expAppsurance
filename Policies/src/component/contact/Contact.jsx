import React, { useState, useEffect } from "react";
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
  Snackbar,
  Alert
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { useNavigate } from "react-router-dom";
import { searchContact, createContact, getContact, updateContact } from "./utils/contactAPI";
import {
  createAccountForContact,
  searchAccountByContact,
} from "../account/accountAPI";
import "./contact.css";

function TabPanel(props) {
  const { children, value, index, ...other } = props;
  return (
    <div role="tabpanel" hidden={value !== index} {...other}>
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

// Helper function to format date for input[type="date"]
const formatDateForInput = (dateValue) => {
  if (!dateValue) return "";
  try {
    const date = new Date(dateValue);
    if (isNaN(date.getTime())) return "";
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  } catch (e) {
    return "";
  }
};

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
  
  // Modal-specific dropdown states
  const [modalStates, setModalStates] = useState([]);
  const [modalCities, setModalCities] = useState([]);
  const [modalZips, setModalZips] = useState([]);

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

  // Modal dropdown handlers
  const handleModalCountryChange = (e) => {
    const country = e.target.value;
    setSelectedContact(prev => ({ ...prev, country, state: '', city: '', zipCode: '' }));
    setModalStates(country ? (LOCATION_DATA.states[country] || []) : []);
    setModalCities([]);
    setModalZips([]);
  };

  const handleModalStateChange = (e) => {
    const state = e.target.value;
    setSelectedContact(prev => ({ ...prev, state, city: '', zipCode: '' }));
    setModalCities(state ? (LOCATION_DATA.cities[state] || []) : []);
    setModalZips([]);
  };

  const handleModalCityChange = (e) => {
    const city = e.target.value;
    setSelectedContact(prev => ({ ...prev, city, zipCode: '' }));
    setModalZips(city ? (LOCATION_DATA.zips[city] || []) : []);
  };

  const [page, setPage] = useState(0); // current page
  const [rowsPerPage, setRowsPerPage] = useState(5); // rows per page

  const [showContact, setShowContact] = useState(false);
  const [selectedContact, setSelectedContact] = useState({});
  const [isEditMode, setIsEditMode] = useState(false);
  const [snack, setSnack] = useState({ open: false, msg: "", severity: "success" });
  const navigate = useNavigate();
  const [contactDetails, setContactDetails] = useState([]);

  // Keep the modal's dependent dropdown options in sync with the selected contact
  useEffect(() => {
    if (!showContact || !selectedContact) return;
    setModalStates(LOCATION_DATA.states[selectedContact.country] || []);
    setModalCities(LOCATION_DATA.cities[selectedContact.state] || []);
    setModalZips(LOCATION_DATA.zips[selectedContact.city] || []);
  }, [showContact, selectedContact?.country, selectedContact?.state, selectedContact?.city]);

  // Contacts saved before "country" was persisted (or with a state name instead of a
  // code) would leave the dropdowns blank, so map them onto the dropdown values.
  const normalizeLocation = (contact) => {
    const norm = (v) => String(v || "").replace(/\s+/g, "").toLowerCase();
    let { country, state, city } = contact;
    if (!state && city) {
      state = Object.keys(LOCATION_DATA.cities).find((code) => LOCATION_DATA.cities[code].includes(city));
    }
    for (const [countryCode, list] of Object.entries(LOCATION_DATA.states)) {
      const match = list.find((s) => norm(s.code) === norm(state) || norm(s.name) === norm(state));
      if (match && (!country || country === countryCode)) {
        state = match.code;
        country = countryCode;
        break;
      }
    }
    return { ...contact, country: country || "", state: state || "", city: city || "" };
  };

  // Ensure a stored value that is not in the static list still shows in its dropdown
  const withCurrent = (options, value) =>
    value && !options.some((o) => (o.code ?? o) === value) ? [...options, value] : options;

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

  // Get all the contacts
  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const response = await getContact();
        console.log("response", response.contact)
        setContactDetails(response.contact);
      } catch (error) {
        console.error("Error fetching policies:", error);
      }
    };
    fetchContacts();
  }, [])

  // Utility Functions
  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return isNaN(date.getTime())
      ? "Invalid Date"
      : `${String(date.getDate()).padStart(2, "0")}/${String(
          date.getMonth() + 1
        ).padStart(2, "0")}/${date.getFullYear()}`;
  };
  
  //Filter the search data
  const filteredData = contactDetails.filter((item) => {
    return (
      item.firstName
        ?.toLowerCase()
        .includes(searchData.firstName.toLowerCase()) &&
      item.lastName
        ?.toLowerCase()
        .includes(searchData.lastName.toLowerCase()) &&
      item.dateOfBirth
        ?.toLowerCase()
        .includes(searchData.dateOfBirth.toLowerCase())
    );
  });

  //Function for account search
  const accountSearch = async(contact) => {
    try {
      let account;
      // 1️⃣ First check if this contact already has an account
      const existingAccount =
        await searchAccountByContact(contact._id);

      if (
        existingAccount &&
        existingAccount.accountId
      ) {
        // ✅ Account exists
        account = existingAccount;
        console.log(
          "Existing account found:",
          account
        );
      } else {
        // ❌ No existing account — create one
        account = await createAccountForContact(
          contact
        );
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
  }

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

  const handleView = (contact) => {
    console.log("Opening modal for contact:", contact);
    setSelectedContact(normalizeLocation(contact));
    setIsEditMode(false); // Always open in view mode
    setShowContact(true);
  };
  const handleClose = () => {
    setShowContact(false);
    setSelectedContact(null);
  };
  const handleEditToggle = async () => {
    if (isEditMode) {
      // Save changes
      try {
        const saved = await updateContact(selectedContact._id, selectedContact);
        // Refresh the lists so reopening the contact shows the saved values
        const replace = (list) =>
          Array.isArray(list) ? list.map((c) => (c._id === saved._id ? saved : c)) : list;
        setSearchResult(replace);
        setContactDetails(replace);
        setSnack({ open: true, msg: "Contact updated successfully.", severity: "success" });
      } catch (err) {
        setSnack({ open: true, msg: "Failed to update contact.", severity: "error" });
        return; // Don't toggle if save failed
      }
    }
    setIsEditMode((prev) => !prev);
  };

  const handleContactChange = (e) => {
    setSelectedContact({ ...selectedContact, [e.target.name]: e.target.value });
  };

  const handleOk = () => {
    handleClose(); // just close without doing anything
  };

  return (
    <div style={{ width: "100%", maxWidth: 1200 }}>

      {/* GW Tab bar */}
      <div style={{ borderBottom: "1px solid #d7dbe2", background: "#f8fafb", display: "flex", marginBottom: 14 }}>
        {["Search Contact", "Create Contact"].map((label, idx) => (
          <button key={idx} onClick={() => setTabValue(idx)}
            style={{
              padding: "7px 18px", fontSize: 12, fontWeight: tabValue === idx ? 700 : 500,
              color: tabValue === idx ? "#1f5fa6" : "#4e5d6d",
              background: "none", border: "none", borderBottom: tabValue === idx ? "2px solid #1f5fa6" : "2px solid transparent",
              cursor: "pointer", marginBottom: -1
            }}>
            {label}
          </button>
        ))}
      </div>

      {/* ─── SEARCH TAB ─── */}
      {tabValue === 0 && (
        <div>
          {/* Search filters */}
          <div style={{ border: "1px solid #d7dbe2", background: "#fff", marginBottom: 14 }}>
            <div style={{ background: "#f3f6f9", padding: "7px 12px", borderBottom: "1px solid #d7dbe2", fontSize: 11, fontWeight: 700, color: "#2e3e4c", textTransform: "uppercase", letterSpacing: 0.5 }}>
              Search Contact
            </div>
            <div style={{ padding: "12px 14px" }}>
              <div style={{ display: "flex", gap: 12, alignItems: "flex-end", flexWrap: "wrap" }}>
                <div style={{ flex: "1 1 160px" }}>
                  <label style={{ fontSize: 11, color: "#5a6a7a", fontWeight: 600, display: "block", marginBottom: 3 }}>First Name</label>
                  <input type="text" name="firstName" value={searchData.firstName} onChange={handleSearchChange}
                    style={{ width: "100%", border: "1px solid #c5ccd5", borderRadius: 2, padding: "5px 8px", fontSize: 12, color: "#2d3e52", outline: "none" }} />
                </div>
                <div style={{ flex: "1 1 160px" }}>
                  <label style={{ fontSize: 11, color: "#5a6a7a", fontWeight: 600, display: "block", marginBottom: 3 }}>Last Name</label>
                  <input type="text" name="lastName" value={searchData.lastName} onChange={handleSearchChange}
                    style={{ width: "100%", border: "1px solid #c5ccd5", borderRadius: 2, padding: "5px 8px", fontSize: 12, color: "#2d3e52", outline: "none" }} />
                </div>
                <div style={{ flex: "1 1 160px" }}>
                  <label style={{ fontSize: 11, color: "#5a6a7a", fontWeight: 600, display: "block", marginBottom: 3 }}>Date of Birth</label>
                  <input type="date" name="dateOfBirth" value={searchData.dateOfBirth} onChange={handleSearchChange}
                    style={{ width: "100%", border: "1px solid #c5ccd5", borderRadius: 2, padding: "5px 8px", fontSize: 12, color: "#2d3e52" }} />
                </div>
                <button onClick={handleSearch}
                  style={{ background: "#1f5fa6", color: "#fff", border: "none", borderRadius: 2, padding: "6px 18px", fontSize: 12, fontWeight: 600, cursor: "pointer", alignSelf: "flex-end", marginBottom: 0 }}>
                  Search
                </button>
              </div>
            </div>
          </div>

          {/* Results table */}
          {contactDetails && contactDetails.length > 0 && (
            <div style={{ border: "1px solid #d7dbe2", background: "#fff" }}>
              <div style={{ background: "#f3f6f9", padding: "7px 12px", borderBottom: "1px solid #d7dbe2", fontSize: 11, fontWeight: 700, color: "#2e3e4c", textTransform: "uppercase", letterSpacing: 0.5, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span>Contacts</span>
                <span style={{ fontWeight: 400, color: "#4c5d72", textTransform: "none" }}>{contactDetails.length} records</span>
              </div>
              <div style={{ overflow: "auto" }}>
                <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 12 }}>
                  <thead>
                    <tr>
                      {["", "Name", "Email", "Phone", "DOB", "Gender", "View"].map((col) => (
                        <th key={col} style={{ padding: "8px 10px", background: "#f6f7f8", borderBottom: "2px solid #d7dbe2", borderRight: "1px solid #e3e8ee", textAlign: "left", fontWeight: 700, color: "#31475f", fontSize: 11 }}>
                          {col}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {filteredData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((contact, index) => (
                      <tr key={index} style={{ background: index % 2 === 0 ? "#f8fafb" : "#fff" }}>
                        <td style={{ padding: "7px 10px", borderBottom: "1px solid #e3e8ee", borderRight: "1px solid #e3e8ee" }}>
                          <button onClick={() => accountSearch(contact)}
                            style={{ background: "#1f5fa6", color: "#fff", border: "none", borderRadius: 2, padding: "3px 10px", fontSize: 11, cursor: "pointer" }}>
                            Select
                          </button>
                        </td>
                        <td style={{ padding: "7px 10px", borderBottom: "1px solid #e3e8ee", borderRight: "1px solid #e3e8ee" }}>{contact.firstName} {contact.lastName}</td>
                        <td style={{ padding: "7px 10px", borderBottom: "1px solid #e3e8ee", borderRight: "1px solid #e3e8ee" }}>{contact.email}</td>
                        <td style={{ padding: "7px 10px", borderBottom: "1px solid #e3e8ee", borderRight: "1px solid #e3e8ee" }}>{contact.phone}</td>
                        <td style={{ padding: "7px 10px", borderBottom: "1px solid #e3e8ee", borderRight: "1px solid #e3e8ee" }}>{formatDate(contact.dateOfBirth)}</td>
                        <td style={{ padding: "7px 10px", borderBottom: "1px solid #e3e8ee", borderRight: "1px solid #e3e8ee" }}>{contact.gender}</td>
                        <td style={{ padding: "7px 10px", borderBottom: "1px solid #e3e8ee", borderRight: "1px solid #e3e8ee", textAlign: "center" }}>
                          <VisibilityIcon onClick={() => handleView(contact)} style={{ cursor: "pointer", fontSize: 16, color: "#1f5fa6" }} />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div style={{ padding: "8px 12px", borderTop: "1px solid #d7dbe2", background: "#f8fafb", display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: 12, color: "#4c5d72" }}>
                <span>{contactDetails.length} total</span>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <span>Rows:</span>
                  <select value={rowsPerPage} onChange={handleChangeRowsPerPage}
                    style={{ border: "1px solid #c5ccd5", borderRadius: 2, padding: "2px 4px", fontSize: 12 }}>
                    <option value={5}>5</option><option value={10}>10</option><option value={25}>25</option>
                  </select>
                  <button onClick={() => handleChangePage(null, page - 1)} disabled={page === 0}
                    style={{ background: page === 0 ? "#f4f6f8" : "#fff", border: "1px solid #c5ccd5", borderRadius: 2, padding: "2px 8px", fontSize: 12, cursor: page === 0 ? "default" : "pointer" }}>‹</button>
                  <span>{page + 1} / {Math.max(1, Math.ceil(contactDetails.length / rowsPerPage))}</span>
                  <button onClick={() => handleChangePage(null, page + 1)} disabled={(page + 1) * rowsPerPage >= contactDetails.length}
                    style={{ background: (page + 1) * rowsPerPage >= contactDetails.length ? "#f4f6f8" : "#fff", border: "1px solid #c5ccd5", borderRadius: 2, padding: "2px 8px", fontSize: 12, cursor: (page + 1) * rowsPerPage >= contactDetails.length ? "default" : "pointer" }}>›</button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* ─── CREATE TAB ─── */}
      {tabValue === 1 && (
        <div>
          <div style={{ border: "1px solid #d7dbe2", background: "#fff", marginBottom: 14 }}>
            <div style={{ background: "#f3f6f9", padding: "7px 12px", borderBottom: "1px solid #d7dbe2", fontSize: 11, fontWeight: 700, color: "#2e3e4c", textTransform: "uppercase", letterSpacing: 0.5 }}>
              Personal Information
            </div>
            <div style={{ padding: "12px 14px" }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "10px 20px" }}>
                {[
                  { label: "First Name *", name: "firstName", type: "text" },
                  { label: "Last Name *", name: "lastName", type: "text" },
                  { label: "Date of Birth *", name: "dateOfBirth", type: "date" },
                ].map(({ label, name, type }) => (
                  <div key={name}>
                    <label style={{ fontSize: 11, color: "#5a6a7a", fontWeight: 600, display: "block", marginBottom: 3 }}>{label}</label>
                    <input type={type} name={name} value={formData[name]} onChange={handleChange}
                      style={{ width: "100%", border: "1px solid #c5ccd5", borderRadius: 2, padding: "5px 8px", fontSize: 12, color: "#2d3e52" }} />
                  </div>
                ))}
                <div>
                  <label style={{ fontSize: 11, color: "#5a6a7a", fontWeight: 600, display: "block", marginBottom: 3 }}>Gender</label>
                  <select name="gender" value={formData.gender} onChange={handleChange}
                    style={{ width: "100%", border: "1px solid #c5ccd5", borderRadius: 2, padding: "5px 8px", fontSize: 12, color: "#2d3e52", background: "#fff" }}>
                    <option value="">Select</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                  </select>
                </div>
                <div>
                  <label style={{ fontSize: 11, color: "#5a6a7a", fontWeight: 600, display: "block", marginBottom: 3 }}>Email</label>
                  <input type="email" name="email" value={formData.email} onChange={handleChange}
                    style={{ width: "100%", border: "1px solid #c5ccd5", borderRadius: 2, padding: "5px 8px", fontSize: 12, color: "#2d3e52" }} />
                </div>
                <div>
                  <label style={{ fontSize: 11, color: "#5a6a7a", fontWeight: 600, display: "block", marginBottom: 3 }}>Phone</label>
                  <input type="text" name="phone" value={formData.phone} onChange={handleChange}
                    style={{ width: "100%", border: "1px solid #c5ccd5", borderRadius: 2, padding: "5px 8px", fontSize: 12, color: "#2d3e52" }} />
                </div>
              </div>
            </div>
          </div>

          <div style={{ border: "1px solid #d7dbe2", background: "#fff", marginBottom: 14 }}>
            <div style={{ background: "#f3f6f9", padding: "7px 12px", borderBottom: "1px solid #d7dbe2", fontSize: 11, fontWeight: 700, color: "#2e3e4c", textTransform: "uppercase", letterSpacing: 0.5 }}>
              Address
            </div>
            <div style={{ padding: "12px 14px" }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "10px 20px" }}>
                <div>
                  <label style={{ fontSize: 11, color: "#5a6a7a", fontWeight: 600, display: "block", marginBottom: 3 }}>Address</label>
                  <input type="text" name="address" value={formData.address} onChange={handleChange}
                    style={{ width: "100%", border: "1px solid #c5ccd5", borderRadius: 2, padding: "5px 8px", fontSize: 12, color: "#2d3e52" }} />
                </div>
                <div>
                  <label style={{ fontSize: 11, color: "#5a6a7a", fontWeight: 600, display: "block", marginBottom: 3 }}>Street</label>
                  <input type="text" name="street" value={formData.street} onChange={handleChange}
                    style={{ width: "100%", border: "1px solid #c5ccd5", borderRadius: 2, padding: "5px 8px", fontSize: 12, color: "#2d3e52" }} />
                </div>
                <div>
                  <label style={{ fontSize: 11, color: "#5a6a7a", fontWeight: 600, display: "block", marginBottom: 3 }}>Country</label>
                  <select name="country" value={formData.country} onChange={handleCountryChange}
                    style={{ width: "100%", border: "1px solid #c5ccd5", borderRadius: 2, padding: "5px 8px", fontSize: 12, color: "#2d3e52", background: "#fff" }}>
                    <option value="">Select Country</option>
                    {countries.map((c) => <option key={c.code} value={c.code}>{c.name}</option>)}
                  </select>
                </div>
                <div>
                  <label style={{ fontSize: 11, color: "#5a6a7a", fontWeight: 600, display: "block", marginBottom: 3 }}>State</label>
                  <select name="state" value={formData.state} onChange={handleStateChange} disabled={!states.length}
                    style={{ width: "100%", border: "1px solid #c5ccd5", borderRadius: 2, padding: "5px 8px", fontSize: 12, color: "#2d3e52", background: states.length ? "#fff" : "#f8fafb" }}>
                    <option value="">Select State</option>
                    {states.map((s) => <option key={s.code} value={s.code}>{s.name}</option>)}
                  </select>
                </div>
                <div>
                  <label style={{ fontSize: 11, color: "#5a6a7a", fontWeight: 600, display: "block", marginBottom: 3 }}>City</label>
                  <select name="city" value={formData.city} onChange={handleCityChange} disabled={!cities.length}
                    style={{ width: "100%", border: "1px solid #c5ccd5", borderRadius: 2, padding: "5px 8px", fontSize: 12, color: "#2d3e52", background: cities.length ? "#fff" : "#f8fafb" }}>
                    <option value="">Select City</option>
                    {cities.map((ct) => <option key={ct} value={ct}>{ct}</option>)}
                  </select>
                </div>
                <div>
                  <label style={{ fontSize: 11, color: "#5a6a7a", fontWeight: 600, display: "block", marginBottom: 3 }}>Zip Code</label>
                  <select name="zipCode" value={formData.zipCode} onChange={handleChange} disabled={!zips.length}
                    style={{ width: "100%", border: "1px solid #c5ccd5", borderRadius: 2, padding: "5px 8px", fontSize: 12, color: "#2d3e52", background: zips.length ? "#fff" : "#f8fafb" }}>
                    <option value="">Select Zip</option>
                    {zips.map((z) => <option key={z} value={z}>{z}</option>)}
                  </select>
                </div>
              </div>
            </div>
          </div>

          <div style={{ border: "1px solid #d7dbe2", background: "#fff", marginBottom: 14 }}>
            <div style={{ background: "#f3f6f9", padding: "7px 12px", borderBottom: "1px solid #d7dbe2", fontSize: 11, fontWeight: 700, color: "#2e3e4c", textTransform: "uppercase", letterSpacing: 0.5 }}>
              Organization
            </div>
            <div style={{ padding: "12px 14px" }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px 20px", maxWidth: 520 }}>
                <div>
                  <label style={{ fontSize: 11, color: "#5a6a7a", fontWeight: 600, display: "block", marginBottom: 3 }}>Organization</label>
                  <select name="organization" value={formData.organization} onChange={handleChange}
                    style={{ width: "100%", border: "1px solid #c5ccd5", borderRadius: 2, padding: "5px 8px", fontSize: 12, color: "#2d3e52", background: "#fff" }}>
                    <option value="Expleo">Expleo</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div>
                  <label style={{ fontSize: 11, color: "#5a6a7a", fontWeight: 600, display: "block", marginBottom: 3 }}>Producer Code</label>
                  <select name="producerCode" value={formData.producerCode} onChange={handleChange}
                    style={{ width: "100%", border: "1px solid #c5ccd5", borderRadius: 2, padding: "5px 8px", fontSize: 12, color: "#2d3e52", background: "#fff" }}>
                    <option value="EXP-INS-01">EXP-INS-01</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          <div style={{ display: "flex", justifyContent: "flex-end", paddingBottom: 16 }}>
            <button onClick={handleCreate}
              style={{ background: "#1f5fa6", color: "#fff", border: "none", borderRadius: 2, padding: "6px 20px", fontSize: 12, fontWeight: 700, cursor: "pointer" }}>
              Create Contact
            </button>
          </div>
        </div>
      )}

      {/* ─── SNACKBAR ─── */}
      <Snackbar
        open={snack.open}
        autoHideDuration={4000}
        onClose={() => setSnack((s) => ({ ...s, open: false }))}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert onClose={() => setSnack((s) => ({ ...s, open: false }))} severity={snack.severity} sx={{ width: "100%" }}>
          {snack.msg}
        </Alert>
      </Snackbar>

      {/* ─── VIEW/EDIT MODAL ─── */}
      {showContact && selectedContact && (
        <Modal open={showContact} onClose={handleClose} style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
          <Box sx={{ width: "100%", maxWidth: 900, mx: 2, background: "#fff", border: "1px solid #d7dbe2", borderRadius: 1, outline: "none", maxHeight: "90vh", overflowY: "auto" }}>
            <div style={{ background: "#f3f6f9", padding: "8px 14px", borderBottom: "1px solid #d7dbe2", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span style={{ fontSize: 13, fontWeight: 700, color: "#2e3e4c" }}>VIEW / EDIT CONTACT</span>
              <button onClick={handleClose} style={{ background: "none", border: "none", cursor: "pointer", fontSize: 16, color: "#4e5d6d" }}>✕</button>
            </div>
            <div style={{ padding: 16 }}>
              <Grid container spacing={2}>
                {[
                  { label: "First Name", name: "firstName", type: "text" },
                  { label: "Last Name", name: "lastName", type: "text" },
                  { label: "Date of Birth", name: "dateOfBirth", type: "date", isDate: true },
                  { label: "Email", name: "email", type: "email" },
                  { label: "Phone", name: "phone", type: "text" },
                  { label: "Address", name: "address", type: "text" },
                  { label: "Street", name: "street", type: "text" },
                ].map(({ label, name, type, isDate }) => (
                  <Grid size={6} key={name}>
                    <TextField size="small" fullWidth label={label} name={name}
                      type={type}
                      value={isDate ? (formatDateForInput(selectedContact[name]) || "") : (selectedContact[name] || "")}
                      onChange={handleContactChange}
                      InputProps={{ readOnly: !isEditMode }}
                      InputLabelProps={type === "date" ? { shrink: true } : undefined}
                    />
                  </Grid>
                ))}
                <Grid size={4}>
                  <TextField select size="small" fullWidth label="Gender" name="gender"
                    value={selectedContact.gender || ""} onChange={handleContactChange} disabled={!isEditMode} InputLabelProps={{ shrink: true }}>
                    <MenuItem value="">Select</MenuItem>
                    <MenuItem value="Male">Male</MenuItem>
                    <MenuItem value="Female">Female</MenuItem>
                  </TextField>
                </Grid>
                <Grid size={4}>
                  <TextField select size="small" fullWidth label="Country" name="country"
                    value={selectedContact.country || ""} onChange={handleModalCountryChange} disabled={!isEditMode} InputLabelProps={{ shrink: true }}>
                    <MenuItem value="">Select Country</MenuItem>
                    {countries.map((c) => <MenuItem key={c.code} value={c.code}>{c.name}</MenuItem>)}
                  </TextField>
                </Grid>
                <Grid size={4}>
                  <TextField select size="small" fullWidth label="State" name="state"
                    value={selectedContact.state || ""} onChange={handleModalStateChange} disabled={!isEditMode || !modalStates.length} InputLabelProps={{ shrink: true }}>
                    <MenuItem value="">Select State</MenuItem>
                    {withCurrent(modalStates, selectedContact.state).map((s) => <MenuItem key={s.code ?? s} value={s.code ?? s}>{s.name ?? s}</MenuItem>)}
                  </TextField>
                </Grid>
                <Grid size={4}>
                  <TextField select size="small" fullWidth label="City" name="city"
                    value={selectedContact.city || ""} onChange={handleModalCityChange} disabled={!isEditMode || !modalCities.length} InputLabelProps={{ shrink: true }}>
                    <MenuItem value="">Select City</MenuItem>
                    {withCurrent(modalCities, selectedContact.city).map((ct) => <MenuItem key={ct} value={ct}>{ct}</MenuItem>)}
                  </TextField>
                </Grid>
                <Grid size={4}>
                  <TextField select size="small" fullWidth label="Zip Code" name="zipCode"
                    value={selectedContact.zipCode || ""} onChange={handleContactChange} disabled={!isEditMode || !modalZips.length} InputLabelProps={{ shrink: true }}>
                    <MenuItem value="">Select Zip</MenuItem>
                    {withCurrent(modalZips, selectedContact.zipCode).map((z) => <MenuItem key={z} value={z}>{z}</MenuItem>)}
                  </TextField>
                </Grid>
                <Grid size={4}>
                  <TextField select size="small" fullWidth label="Organization" name="organization"
                    value={selectedContact.organization || ""} onChange={handleContactChange} disabled={!isEditMode} InputLabelProps={{ shrink: true }}>
                    <MenuItem value="Expleo">Expleo</MenuItem>
                    <MenuItem value="Other">Other</MenuItem>
                  </TextField>
                </Grid>
                <Grid size={4}>
                  <TextField select size="small" fullWidth label="Producer Code" name="producerCode"
                    value={selectedContact.producerCode || ""} onChange={handleContactChange} disabled={!isEditMode} InputLabelProps={{ shrink: true }}>
                    <MenuItem value="EXP-INS-01">EXP-INS-01</MenuItem>
                  </TextField>
                </Grid>
              </Grid>
              <div style={{ display: "flex", justifyContent: "flex-end", gap: 8, marginTop: 16, paddingTop: 12, borderTop: "1px solid #e3e8ee" }}>
                <button onClick={handleOk}
                  style={{ background: "#f4f6f8", border: "1px solid #c5ccd5", borderRadius: 2, padding: "5px 14px", fontSize: 12, color: "#4e5d6d", cursor: "pointer" }}>
                  OK
                </button>
                <button onClick={handleEditToggle}
                  style={{ background: "#1f5fa6", color: "#fff", border: "none", borderRadius: 2, padding: "5px 14px", fontSize: 12, fontWeight: 600, cursor: "pointer" }}>
                  {isEditMode ? "Update" : "Edit"}
                </button>
              </div>
            </div>
          </Box>
        </Modal>
      )}
    </div>
  );
}
