import React, { useState, useEffect } from "react";
import api from "../../utils/api";
import {
  Box,
  TextField,
  Button,
  IconButton,
} from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import { searchAccountByContact, searchAccount } from "./accountAPI";

export default function Account() {
  const location  = useLocation();
  const navigate  = useNavigate();

  const [accountData,    setAccountData]    = useState(null);
  const [searchResults,  setSearchResults]  = useState([]);
  const [searchModel,    setSearchModel]    = useState(true);
  const [page,           setPage]           = useState(0);
  const [rowsPerPage,    setRowsPerPage]    = useState(5);

  const initialSearchState = {
    accountNumber: "",
    firstName:     "",
    lastName:      "",
    organization:  "",   // Company Name
    country:       "",
    city:          "",
    zipCode:       "",
  };
  const [searchData, setSearchData] = useState(initialSearchState);

  // ── Arrive from PolicySummary "Back to Account" or Contact "Select"
  useEffect(() => {
    if (location.state?.account) {
      setAccountData(location.state.account);
      setSearchModel(false);
    } else if (location.state?.contact) {
      searchAccountByContact(location.state.contact._id)
        .then((acc) => { setAccountData(acc); setSearchModel(false); })
        .catch(() => alert("Account not found for this contact"));
    }
  }, [location.state]);

  const handleChange = (e) =>
    setSearchData((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleChangePage       = (_, newPage) => setPage(newPage);
  const handleChangeRowsPerPage = (e) => { setRowsPerPage(parseInt(e.target.value, 10)); setPage(0); };

  const executeSearch = async (payload) => {
    try {
      const result = await searchAccount(payload);
      if (!result || (Array.isArray(result) && result.length === 0)) {
        alert("No accounts found");
        setAccountData(null);
        setSearchResults([]);
        return;
      }
      const list = Array.isArray(result) ? result : [result];
      setSearchResults(list);
      setPage(0);
    } catch (err) {
      console.error(err);
      if (err.response?.status === 404) {
        setSearchResults([]);
        alert("No accounts found matching the criteria.");
      } else {
        alert("Error searching account");
      }
    }
  };

  const handleSearch = () => executeSearch(searchData);

  const handleReset = () => {
    setSearchData(initialSearchState);
    setSearchResults([]);
    setPage(0);
  };

  const handleSelectAccount = (account) => {
    setAccountData(account);
    setSearchModel(false);
  };

  const handleClose = () => {
    setSearchModel(true);
    setAccountData(null);
    setSearchData(initialSearchState);
    setSearchResults([]);
  };

  /* ─────────── SHARED FIELD STYLE ─────────── */
  const inp = {
    width: "100%",
    border: "1px solid #c5ccd5",
    borderRadius: 2,
    padding: "5px 8px",
    fontSize: 12,
    color: "#2d3e52",
    outline: "none",
    boxSizing: "border-box",
  };

  return (
    <div style={{ width: "100%", maxWidth: 1200 }}>

      {/* ── SEARCH PANEL ─────────────────────────────────────── */}
      {searchModel && (
        <div>
          <div style={{ fontSize: 16, fontWeight: 700, color: "#2d3e52", marginBottom: 12 }}>
            My Accounts
          </div>

          <div style={{ border: "1px solid #d7dbe2", background: "#fff", marginBottom: 14 }}>
            {/* Panel header */}
            <div style={{
              background: "#f3f6f9", padding: "7px 12px", borderBottom: "1px solid #d7dbe2",
              fontSize: 11, fontWeight: 700, color: "#2e3e4c", textTransform: "uppercase",
              letterSpacing: 0.5, display: "flex", justifyContent: "space-between", alignItems: "center",
            }}>
              <span>Search Account</span>
              <button
                onClick={() => navigate("/contact", { state: { createNew: true } })}
                style={{
                  background: "#1f5fa6", color: "#fff", border: "none", borderRadius: 2,
                  padding: "4px 14px", fontSize: 11, fontWeight: 700, cursor: "pointer",
                  textTransform: "none",
                }}
              >
                + Create New Account
              </button>
            </div>

            <div style={{ padding: "12px 14px" }}>
              {/* Row 1 — name & account ID */}
              <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginBottom: 10 }}>
                <div style={{ flex: "1 1 150px" }}>
                  <label style={{ fontSize: 11, color: "#5a6a7a", fontWeight: 600, display: "block", marginBottom: 3 }}>First Name</label>
                  <input type="text" name="firstName" value={searchData.firstName} onChange={handleChange} style={inp} />
                </div>
                <div style={{ flex: "1 1 150px" }}>
                  <label style={{ fontSize: 11, color: "#5a6a7a", fontWeight: 600, display: "block", marginBottom: 3 }}>Last Name</label>
                  <input type="text" name="lastName" value={searchData.lastName} onChange={handleChange} style={inp} />
                </div>
                <div style={{ flex: "1 1 180px" }}>
                  <label style={{ fontSize: 11, color: "#5a6a7a", fontWeight: 600, display: "block", marginBottom: 3 }}>Company Name</label>
                  <input type="text" name="organization" value={searchData.organization} onChange={handleChange} style={inp} />
                </div>
                <div style={{ flex: "1 1 150px" }}>
                  <label style={{ fontSize: 11, color: "#5a6a7a", fontWeight: 600, display: "block", marginBottom: 3 }}>Account ID</label>
                  <input type="text" name="accountNumber" value={searchData.accountNumber} onChange={handleChange} style={inp} />
                </div>
              </div>

              {/* Row 2 — location */}
              <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginBottom: 12 }}>
                <div style={{ flex: "1 1 140px" }}>
                  <label style={{ fontSize: 11, color: "#5a6a7a", fontWeight: 600, display: "block", marginBottom: 3 }}>Country</label>
                  <input type="text" name="country" value={searchData.country} onChange={handleChange} style={inp} />
                </div>
                <div style={{ flex: "1 1 140px" }}>
                  <label style={{ fontSize: 11, color: "#5a6a7a", fontWeight: 600, display: "block", marginBottom: 3 }}>City</label>
                  <input type="text" name="city" value={searchData.city} onChange={handleChange} style={inp} />
                </div>
                <div style={{ flex: "1 1 120px" }}>
                  <label style={{ fontSize: 11, color: "#5a6a7a", fontWeight: 600, display: "block", marginBottom: 3 }}>Zip Code</label>
                  <input type="text" name="zipCode" value={searchData.zipCode} onChange={handleChange} style={inp} />
                </div>
              </div>

              {/* Buttons */}
              <div style={{ display: "flex", gap: 8 }}>
                <button onClick={handleSearch}
                  style={{ background: "#1f5fa6", color: "#fff", border: "none", borderRadius: 2, padding: "6px 20px", fontSize: 12, fontWeight: 600, cursor: "pointer" }}>
                  Search
                </button>
                <button onClick={handleReset}
                  style={{ background: "#fff", color: "#4e5d6d", border: "1px solid #c5ccd5", borderRadius: 2, padding: "6px 16px", fontSize: 12, fontWeight: 600, cursor: "pointer" }}>
                  Reset
                </button>
              </div>
            </div>
          </div>

          {/* ── RESULTS TABLE ─── */}
          {searchResults.length > 0 && (
            <div style={{ border: "1px solid #d7dbe2", background: "#fff" }}>
              <div style={{ background: "#f3f6f9", padding: "7px 12px", borderBottom: "1px solid #d7dbe2", fontSize: 11, fontWeight: 700, color: "#2e3e4c", textTransform: "uppercase", letterSpacing: 0.5, display: "flex", justifyContent: "space-between" }}>
                <span>Search Results</span>
                <span style={{ fontWeight: 400, color: "#4c5d72", textTransform: "none" }}>{searchResults.length} record{searchResults.length !== 1 ? "s" : ""}</span>
              </div>
              <div style={{ overflow: "auto" }}>
                <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 12 }}>
                  <thead>
                    <tr>
                      {["", "Account ID", "Account Holder", "Company", "City", "Zip", "Status"].map((col) => (
                        <th key={col} style={{ padding: "8px 10px", background: "#f6f7f8", borderBottom: "2px solid #d7dbe2", borderRight: "1px solid #e3e8ee", textAlign: "left", fontWeight: 700, color: "#31475f", fontSize: 11 }}>{col}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {searchResults.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((account, index) => (
                      <tr key={account._id || index} style={{ background: index % 2 === 0 ? "#f8fafb" : "#fff" }}>
                        <td style={{ padding: "7px 10px", borderBottom: "1px solid #e3e8ee", borderRight: "1px solid #e3e8ee" }}>
                          <button onClick={() => handleSelectAccount(account)}
                            style={{ background: "#1f5fa6", color: "#fff", border: "none", borderRadius: 2, padding: "3px 10px", fontSize: 11, cursor: "pointer" }}>
                            Select
                          </button>
                        </td>
                        <td style={{ padding: "7px 10px", borderBottom: "1px solid #e3e8ee", borderRight: "1px solid #e3e8ee" }}>{account.accountId}</td>
                        <td style={{ padding: "7px 10px", borderBottom: "1px solid #e3e8ee", borderRight: "1px solid #e3e8ee" }}>{account.accountHolderName}</td>
                        <td style={{ padding: "7px 10px", borderBottom: "1px solid #e3e8ee", borderRight: "1px solid #e3e8ee" }}>{account.customerId?.organization || "-"}</td>
                        <td style={{ padding: "7px 10px", borderBottom: "1px solid #e3e8ee", borderRight: "1px solid #e3e8ee" }}>{account.customerId?.city || "-"}</td>
                        <td style={{ padding: "7px 10px", borderBottom: "1px solid #e3e8ee", borderRight: "1px solid #e3e8ee" }}>{account.customerId?.zipCode || "-"}</td>
                        <td style={{ padding: "7px 10px", borderBottom: "1px solid #e3e8ee", borderRight: "1px solid #e3e8ee" }}>
                          <span style={{
                            display: "inline-block", padding: "2px 8px", borderRadius: 2, fontSize: 11, fontWeight: 600,
                            background: account.status === "Active" ? "#e8f5e9" : "#fff3e0",
                            color:      account.status === "Active" ? "#2b7a3e"  : "#b97d00",
                          }}>
                            {account.status || "Active"}
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
                <span>{page + 1} / {Math.max(1, Math.ceil(searchResults.length / rowsPerPage))}</span>
                <button onClick={() => handleChangePage(null, page + 1)} disabled={(page + 1) * rowsPerPage >= searchResults.length}
                  style={{ background: (page + 1) * rowsPerPage >= searchResults.length ? "#f4f6f8" : "#fff", border: "1px solid #c5ccd5", borderRadius: 2, padding: "2px 8px", fontSize: 12, cursor: (page + 1) * rowsPerPage >= searchResults.length ? "default" : "pointer", color: (page + 1) * rowsPerPage >= searchResults.length ? "#a0aab4" : "#4e5d6d" }}>&#8250;</button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* ── ACCOUNT DETAILS VIEW ───────────────────────────── */}
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
                      { label: "Name",          value: `${accountData.customerId.firstName || ""} ${accountData.customerId.lastName || ""}`.trim() },
                      { label: "Company",       value: accountData.customerId.organization || "-" },
                      { label: "Email",         value: accountData.customerId.email },
                      { label: "Phone",         value: accountData.customerId.phone },
                      { label: "DOB",           value: accountData.customerId.dateOfBirth?.slice(0, 10) },
                      { label: "City",          value: accountData.customerId.city },
                      { label: "Zip Code",      value: accountData.customerId.zipCode },
                      { label: "Country",       value: accountData.customerId.country },
                      { label: "Address",       value: accountData.customerId.address },
                      { label: "Producer Code", value: accountData.customerId.producerCode || "-" },
                    ].map((item) => (
                      <div key={item.label} style={{ display: "flex", justifyContent: "space-between", padding: "4px 0", borderBottom: "1px solid #f0f2f5", fontSize: 12 }}>
                        <span style={{ color: "#5a6a7a", minWidth: 95 }}>{item.label}</span>
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
                  { label: "Account ID",   value: accountData.accountId,                                  bg: "#f0f4ff" },
                  { label: "Status",       value: accountData.status,                                     bg: "#f0fff4" },
                  { label: "Account Type", value: accountData.accountType,                                bg: "#fff8f0" },
                  { label: "Created At",   value: new Date(accountData.createdAt).toLocaleDateString(),   bg: "#fdf0ff" },
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
                    style={{ background: "#1f5fa6", color: "#fff", border: "none", borderRadius: 2, padding: "3px 12px", fontSize: 11, fontWeight: 600, cursor: "pointer" }}>
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
                              <span style={{
                                display: "inline-block", padding: "2px 8px", borderRadius: 2, fontSize: 11, fontWeight: 600,
                                background: policy.status === "In Force" ? "#e8f5e9" : "#fff3e0",
                                color:      policy.status === "In Force" ? "#2b7a3e"  : "#b97d00",
                              }}>
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
