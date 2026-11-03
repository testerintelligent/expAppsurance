import React, { useState, useEffect } from "react";
import api from "../../utils/api";
import {
  Box,
  Typography,
  TextField,
  Button,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableContainer,
  TableBody,
  TablePagination,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useLocation, useNavigate } from "react-router-dom";
import { searchAccountByContact, searchAccount } from "./accountAPI";

export default function Account() {
  const location = useLocation();
  const navigate = useNavigate();
  const [accountData, setAccountData] = useState(null);
  const [accountDetails, setAccountDetails] = useState([]);

  const [page, setPage] = useState(0); // current page
  const [rowsPerPage, setRowsPerPage] = useState(5); // rows per page

  const initialSearchState = {
    accountNumber: "",
    firstName: "",
    lastName: "",
    dateOfBirth: "",
  };

  const [searchData, setSearchData] = useState(initialSearchState);
  const [searchModel, setSearchModel] = useState(true);

  useEffect(() => {
    if (location.state?.account) {
      setAccountData(location.state.account);
      setSearchModel(false);
    } else if (location.state?.contact) {
      searchAccountByContact(location.state.contact._id)
        .then(setAccountData)
        .catch(() => alert("Account not found for this contact"));
    }
  }, [location.state]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setSearchData((prev) => ({
      ...prev,
      [name]: value
    }));
  };
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0); // reset to first page when changing rows per page
  };

  const filteredData = accountDetails.filter((item) => {
    return (
      item.accountNumber
        ?.toLowerCase()
        .includes(searchData.accountNumber.toLowerCase()) &&
      item.accountHolderName
        ?.toLowerCase()
        .includes(searchData.firstName.toLowerCase()) &&
      item.accountHolderName
        ?.toLowerCase()
        .includes(searchData.lastName.toLowerCase())
    );
  });

  // Fetch policies data from the API
  useEffect(() => {
    const fetchPolicies = async () => {
      try {
        const response = await api.get("/api/Policies/getPoliciesForDashboard");
        console.log("response", response.data)
        setAccountDetails(response.data);
      } catch (error) {
        console.error("Error fetching policies:", error);
      }
    };
    fetchPolicies();
  }, []);


  const searchAccountData = async (payload) => {
    const updatedSearchData = {
      accountNumber: payload.accountNumber,
      firstName: payload.accountHolderName.split(" ")[0] || "",
      lastName: payload.accountHolderName.split(" ")[1] || "",
      dateOfBirth: "",
    }
    executeSearch(updatedSearchData);
  }

  const executeSearch = async (payload) => {
    try {
      const result = await searchAccount(payload);

      if (!result || (Array.isArray(result) && result.length === 0)) {
        alert("Account not found");
        setAccountData(null);
        return;
      }

      setAccountData(result);
      setSearchModel(false);
    } catch (err) {
      console.error(err);
      alert("Error searching account");
    }
  };

  const handleSearch = () => {
    executeSearch(searchData);
  };

  const handleClose = () => {
    setSearchModel(true);
    setAccountData(null);
    setSearchData(initialSearchState);
  };

  return (
    <div style={{ width: "100%", maxWidth: 1200 }}>

      {/* Search panel — shown when no contact passed and searchModel is true */}
      {!location.state?.contact && searchModel && (
        <div>
          <div style={{ fontSize: 16, fontWeight: 700, color: "#2d3e52", marginBottom: 12 }}>My Accounts</div>

          <div style={{ border: "1px solid #d7dbe2", background: "#fff", marginBottom: 14 }}>
            <div style={{ background: "#f3f6f9", padding: "7px 12px", borderBottom: "1px solid #d7dbe2", fontSize: 11, fontWeight: 700, color: "#2e3e4c", textTransform: "uppercase", letterSpacing: 0.5 }}>
              Search Account
            </div>
            <div style={{ padding: "12px 14px" }}>
              <div style={{ display: "flex", gap: 12, alignItems: "flex-end", flexWrap: "wrap" }}>
                <div style={{ flex: "1 1 160px" }}>
                  <label style={{ fontSize: 11, color: "#5a6a7a", fontWeight: 600, display: "block", marginBottom: 3 }}>Account ID</label>
                  <input type="text" name="accountNumber" value={searchData.accountNumber} onChange={handleChange}
                    style={{ width: "100%", border: "1px solid #c5ccd5", borderRadius: 2, padding: "5px 8px", fontSize: 12, color: "#2d3e52", outline: "none" }} />
                </div>
                <div style={{ flex: "1 1 160px" }}>
                  <label style={{ fontSize: 11, color: "#5a6a7a", fontWeight: 600, display: "block", marginBottom: 3 }}>First Name</label>
                  <input type="text" name="firstName" value={searchData.firstName} onChange={handleChange}
                    style={{ width: "100%", border: "1px solid #c5ccd5", borderRadius: 2, padding: "5px 8px", fontSize: 12, color: "#2d3e52", outline: "none" }} />
                </div>
                <div style={{ flex: "1 1 160px" }}>
                  <label style={{ fontSize: 11, color: "#5a6a7a", fontWeight: 600, display: "block", marginBottom: 3 }}>Last Name</label>
                  <input type="text" name="lastName" value={searchData.lastName} onChange={handleChange}
                    style={{ width: "100%", border: "1px solid #c5ccd5", borderRadius: 2, padding: "5px 8px", fontSize: 12, color: "#2d3e52", outline: "none" }} />
                </div>
                <div style={{ flex: "1 1 160px" }}>
                  <label style={{ fontSize: 11, color: "#5a6a7a", fontWeight: 600, display: "block", marginBottom: 3 }}>Date of Birth</label>
                  <input type="date" name="dateOfBirth" value={searchData.dateOfBirth} onChange={handleChange}
                    style={{ width: "100%", border: "1px solid #c5ccd5", borderRadius: 2, padding: "5px 8px", fontSize: 12, color: "#2d3e52" }} />
                </div>
                <button onClick={handleSearch}
                  style={{ background: "#1f5fa6", color: "#fff", border: "none", borderRadius: 2, padding: "6px 18px", fontSize: 12, fontWeight: 600, cursor: "pointer" }}>
                  Search
                </button>
              </div>
            </div>
          </div>

          {accountDetails && accountDetails.length > 0 && (
            <div style={{ border: "1px solid #d7dbe2", background: "#fff" }}>
              <div style={{ background: "#f3f6f9", padding: "7px 12px", borderBottom: "1px solid #d7dbe2", fontSize: 11, fontWeight: 700, color: "#2e3e4c", textTransform: "uppercase", letterSpacing: 0.5, display: "flex", justifyContent: "space-between" }}>
                <span>Search Results</span>
                <span style={{ fontWeight: 400, color: "#4c5d72", textTransform: "none" }}>{accountDetails.length} records</span>
              </div>
              <div style={{ overflow: "auto" }}>
                <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 12 }}>
                  <thead>
                    <tr>
                      {["", "Account ID", "Account Holder Name", "Policy Number", "Policy Type", "Status"].map((col) => (
                        <th key={col} style={{ padding: "8px 10px", background: "#f6f7f8", borderBottom: "2px solid #d7dbe2", borderRight: "1px solid #e3e8ee", textAlign: "left", fontWeight: 700, color: "#31475f", fontSize: 11 }}>{col}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {filteredData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((account, index) => (
                      <tr key={index} style={{ background: index % 2 === 0 ? "#f8fafb" : "#fff" }}>
                        <td style={{ padding: "7px 10px", borderBottom: "1px solid #e3e8ee", borderRight: "1px solid #e3e8ee" }}>
                          <button onClick={() => searchAccountData(account)}
                            style={{ background: "#1f5fa6", color: "#fff", border: "none", borderRadius: 2, padding: "3px 10px", fontSize: 11, cursor: "pointer" }}>
                            Select
                          </button>
                        </td>
                        <td style={{ padding: "7px 10px", borderBottom: "1px solid #e3e8ee", borderRight: "1px solid #e3e8ee" }}>{account.accountNumber}</td>
                        <td style={{ padding: "7px 10px", borderBottom: "1px solid #e3e8ee", borderRight: "1px solid #e3e8ee" }}>{account.accountHolderName}</td>
                        <td style={{ padding: "7px 10px", borderBottom: "1px solid #e3e8ee", borderRight: "1px solid #e3e8ee" }}>{account.policyNumber}</td>
                        <td style={{ padding: "7px 10px", borderBottom: "1px solid #e3e8ee", borderRight: "1px solid #e3e8ee" }}>{account.policyType}</td>
                        <td style={{ padding: "7px 10px", borderBottom: "1px solid #e3e8ee", borderRight: "1px solid #e3e8ee" }}>
                          <span style={{ display: "inline-block", padding: "2px 8px", borderRadius: 2, fontSize: 11, fontWeight: 600,
                            background: account.status === "In Force" ? "#e8f5e9" : "#fff3e0",
                            color: account.status === "In Force" ? "#2b7a3e" : "#b97d00" }}>
                            {account.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              {/* Pagination */}
              <div style={{ padding: "8px 12px", borderTop: "1px solid #d7dbe2", background: "#f8fafb", display: "flex", justifyContent: "flex-end", alignItems: "center", fontSize: 12, color: "#4c5d72", gap: 8 }}>
                <span>Rows:</span>
                <select value={rowsPerPage} onChange={handleChangeRowsPerPage} style={{ border: "1px solid #c5ccd5", borderRadius: 2, padding: "2px 4px", fontSize: 12 }}>
                  <option value={5}>5</option><option value={10}>10</option><option value={25}>25</option>
                </select>
                <button onClick={() => handleChangePage(null, page - 1)} disabled={page === 0}
                  style={{ background: page === 0 ? "#f4f6f8" : "#fff", border: "1px solid #c5ccd5", borderRadius: 2, padding: "2px 8px", fontSize: 12, cursor: page === 0 ? "default" : "pointer", color: page === 0 ? "#a0aab4" : "#4e5d6d" }}>&#8249;</button>
                <span>{page + 1} / {Math.max(1, Math.ceil(accountDetails.length / rowsPerPage))}</span>
                <button onClick={() => handleChangePage(null, page + 1)} disabled={(page + 1) * rowsPerPage >= accountDetails.length}
                  style={{ background: (page + 1) * rowsPerPage >= accountDetails.length ? "#f4f6f8" : "#fff", border: "1px solid #c5ccd5", borderRadius: 2, padding: "2px 8px", fontSize: 12, cursor: (page + 1) * rowsPerPage >= accountDetails.length ? "default" : "pointer", color: (page + 1) * rowsPerPage >= accountDetails.length ? "#a0aab4" : "#4e5d6d" }}>&#8250;</button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Account Details view */}
      {accountData && (
        <div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
            <div style={{ fontSize: 16, fontWeight: 700, color: "#2d3e52" }}>Account Information</div>
            <button onClick={handleClose}
              style={{ background: "#f4f6f8", border: "1px solid #c5ccd5", borderRadius: 2, padding: "4px 12px", fontSize: 12, color: "#4e5d6d", cursor: "pointer" }}>
              &#10005; Close
            </button>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "280px 1fr", gap: 14 }}>
            {/* Contact Info */}
            <div style={{ border: "1px solid #d7dbe2", background: "#fff" }}>
              <div style={{ background: "#f3f6f9", padding: "7px 12px", borderBottom: "1px solid #d7dbe2", fontSize: 11, fontWeight: 700, color: "#2e3e4c", textTransform: "uppercase", letterSpacing: 0.5 }}>
                Contact Information
              </div>
              <div style={{ padding: "10px 14px" }}>
                {accountData.customerId ? (
                  <>
                    {[
                      { label: "Name", value: `${accountData.customerId.firstName} ${accountData.customerId.lastName}` },
                      { label: "Email", value: accountData.customerId.email },
                      { label: "Phone", value: accountData.customerId.phone },
                      { label: "DOB", value: accountData.customerId.dateOfBirth?.slice(0, 10) },
                      { label: "City", value: accountData.customerId.city },
                      { label: "Zip Code", value: accountData.customerId.zipCode },
                      { label: "Address", value: accountData.customerId.address },
                      { label: "Organization", value: accountData.customerId.organization || "-" },
                      { label: "Producer Code", value: accountData.customerId.producerCode || "-" },
                    ].map((item) => (
                      <div key={item.label} style={{ display: "flex", justifyContent: "space-between", padding: "4px 0", borderBottom: "1px solid #f0f2f5", fontSize: 12 }}>
                        <span style={{ color: "#5a6a7a", minWidth: 90 }}>{item.label}</span>
                        <span style={{ fontWeight: 600, color: "#2d3e52", textAlign: "right", wordBreak: "break-all" }}>{item.value}</span>
                      </div>
                    ))}
                  </>
                ) : (
                  <div style={{ fontSize: 12, color: "#4c5d72" }}>No contact information available.</div>
                )}
              </div>
            </div>

            {/* Account Info + Policies */}
            <div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: 10, marginBottom: 14 }}>
                {[
                  { label: "Account ID", value: accountData.accountId, bg: "#f0f4ff" },
                  { label: "Status", value: accountData.status, bg: "#f0fff4" },
                  { label: "Account Type", value: accountData.accountType, bg: "#fff8f0" },
                  { label: "Created At", value: new Date(accountData.createdAt).toLocaleDateString(), bg: "#fdf0ff" },
                ].map((item) => (
                  <div key={item.label} style={{ border: "1px solid #d7dbe2", background: item.bg, padding: "8px 12px" }}>
                    <div style={{ fontSize: 11, color: "#5a6a7a", marginBottom: 2 }}>{item.label}</div>
                    <div style={{ fontSize: 12, fontWeight: 700, color: "#2d3e52" }}>{item.value}</div>
                  </div>
                ))}
              </div>

              <div style={{ border: "1px solid #d7dbe2", background: "#fff" }}>
                <div style={{ background: "#f3f6f9", padding: "7px 12px", borderBottom: "1px solid #d7dbe2", fontSize: 11, fontWeight: 700, color: "#2e3e4c", textTransform: "uppercase", letterSpacing: 0.5, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span>Policies</span>
                  <button onClick={() => navigate("/new-submission", { state: { account: accountData, contact: accountData.customerId } })}
                    style={{ background: "#1f5fa6", color: "#fff", border: "none", borderRadius: 2, padding: "3px 12px", fontSize: 11, fontWeight: 600, cursor: "pointer", textTransform: "none" }}>
                    + New Submission
                  </button>
                </div>
                <div style={{ overflow: "auto" }}>
                  <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 12 }}>
                    <thead>
                      <tr>
                        {["Policy Number", "Submission", "Product Type", "Status"].map((col) => (
                          <th key={col} style={{ padding: "8px 10px", background: "#f6f7f8", borderBottom: "2px solid #d7dbe2", borderRight: "1px solid #e3e8ee", textAlign: "left", fontWeight: 700, color: "#31475f", fontSize: 11 }}>{col}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {accountData.policies && accountData.policies.length > 0 ? (
                        accountData.policies.map((policy, idx) => (
                          <tr key={policy._id} style={{ background: idx % 2 === 0 ? "#f8fafb" : "#fff" }}>
                            <td style={{ padding: "7px 10px", borderBottom: "1px solid #e3e8ee", borderRight: "1px solid #e3e8ee" }}>
                              <button onClick={() => navigate(`/policy-summary/${policy.policyNumber}`, { state: { policy } })}
                                disabled={!policy.policyNumber}
                                style={{ background: "none", border: "none", color: policy.policyNumber ? "#1f5fa6" : "#a0aab4", cursor: policy.policyNumber ? "pointer" : "default", fontSize: 12, fontWeight: 600, padding: 0, textDecoration: "underline" }}>
                                {policy.policyNumber || "-"}
                              </button>
                            </td>
                            <td style={{ padding: "7px 10px", borderBottom: "1px solid #e3e8ee", borderRight: "1px solid #e3e8ee" }}>{policy.submissionId}</td>
                            <td style={{ padding: "7px 10px", borderBottom: "1px solid #e3e8ee", borderRight: "1px solid #e3e8ee" }}>{policy.productType}</td>
                            <td style={{ padding: "7px 10px", borderBottom: "1px solid #e3e8ee", borderRight: "1px solid #e3e8ee" }}>
                              <span style={{ display: "inline-block", padding: "2px 8px", borderRadius: 2, fontSize: 11, fontWeight: 600,
                                background: policy.status === "In Force" ? "#e8f5e9" : "#fff3e0",
                                color: policy.status === "In Force" ? "#2b7a3e" : "#b97d00" }}>
                                {policy.status}
                              </span>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan={4} style={{ padding: "14px 10px", textAlign: "center", fontSize: 12, color: "#4c5d72" }}>No policies found</td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
