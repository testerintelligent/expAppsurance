import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import api from "../../utils/api";
import { FaSearch } from "react-icons/fa";

const InsurancePage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const initialData = location.state?.formData || {};
  const apiMethod = location.state?.apiMethod || "";

  const [contactData, setContactData] = useState([]);
  const [filteredContact, setFilteredContact] = useState([]);
  const [coverageOptions, setCoverageOptions] = useState([]);
  //const [search, setSearch] = useState("");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [currentField, setCurrentField] = useState("");
  const [customerId, setCustomerId] = useState("");

  const [insuranceData, setInsuranceData] = useState({
    customerId: "",
    policyType: "",
    coverageDetails: "",
    sumInsured: "",
    premium: "",
    startDate: "",
    endDate: "",
    status: "",
    ...initialData,
  });

  const coverageMapping = {
    Health: [
      "Hospitalization costs",
      "Treatment Cost",
      "Emergency Services",
      "Laboratory Expenses",
      "Prescription Drugs",
      "Day-care procedures",
    ],
    Life: ["Term", "Endowment", "Retirement", "Money-Back"],
    Vehicle: [
      "Third-Party Liability",
      "Comprehensive",
      "Personal Vehicle Damage",
    ],
  };
  useEffect(() => {
    api
      .get("/api/getContact")
      .then((response) => {
        const contacts = response.data?.contacts || [];
        setContactData(contacts);
      })
      .catch((error) => console.error("Error fetching contact data:", error));
  }, []);

  useEffect(() => {
    if (apiMethod === "update" || apiMethod === "view") {
      const matched = contactData.find((c) => c._id === initialData.customerId);
      if (matched) {
        setFilteredContact([matched]);
        setCustomerId(matched.customerId); // ✅ Set the displayable customer ID
      }

      if (initialData.policyType) {
        setCoverageOptions(coverageMapping[initialData.policyType] || []);
      }
    }
  }, [contactData, initialData, apiMethod]);

  const handlePolicySelectChange = (e) => {
    const type = e.target.value;
    setInsuranceData((prev) => ({
      ...prev,
      policyType: type,
      coverageDetails: "",
    }));
    setCoverageOptions(coverageMapping[type] || []);
  };

  const handleCoverageChange = (e) => {
    setInsuranceData((prev) => ({ ...prev, coverageDetails: e.target.value }));
  };

  const handleCustomerChange = (e) => {
    contactData.filter((contact) => {
      if (contact.customerId === e.target.value) {
        setInsuranceData((prev) => ({ ...prev, customerId: contact._id }));
      }
    });
  };

  const handleSearch = () => {
    setShowModal(true);
  };

  const filteredOrgSuggestions = contactData.map(
    (option) => option.firstName + " " + option.lastName
  );
  const selectSuggestion = (field, value) => {
    contactData.filter((contact) => {
      const name = contact.firstName + " " + contact.lastName;
      if (name === value) {
        setCustomerId(contact.customerId);
        setFilteredContact([contact]);
        setInsuranceData((prev) => ({ ...prev, customerId: contact._id }));
      }
    });
    setShowModal(false);
  };
  const handleChange = (e) => {
    const { name, value } = e.target;

    setInsuranceData((prev) => ({ ...prev, [name]: value }));
  };

  const validateFields = () => {
    const errs = {};
    if (!insuranceData.policyType) errs.policyType = "Policy Type is required.";
    if (!insuranceData.coverageDetails)
      errs.coverageDetails = "Coverage Details are required.";
    if (!insuranceData.sumInsured) errs.sumInsured = "Sum Insured is required.";
    if (
      !insuranceData.premium ||
      isNaN(insuranceData.premium) ||
      parseFloat(insuranceData.premium) <= 0
    ) {
      errs.premium = "Premium must be a positive number.";
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateFields()) return;
    const request =
      apiMethod === "update"
        ? api.put(`/api/updatePolicy/${initialData._id}`, insuranceData)
        : api.post("/api/postPolicy", insuranceData);

    request
      .then((res) => {
        setMessage(res.data.message || "Success!");
        navigate("/");
      })
      .catch((err) => {
        setMessage(err.response?.data?.message || "Failed to process request.");
      });
  };

  return (
    <div>
      <div style={{ fontSize: 16, fontWeight: 700, color: "#2d3e52", marginBottom: 12 }}>
        Insurance Policy Details
      </div>

      <div style={{ border: "1px solid #d7dbe2", background: "#fff", marginBottom: 14 }}>
        <div style={{ background: "#f3f6f9", padding: "7px 12px", borderBottom: "1px solid #d7dbe2", fontSize: 11, fontWeight: 700, color: "#2e3e4c", textTransform: "uppercase", letterSpacing: 0.5 }}>
          Customer
        </div>
        <div style={{ padding: "12px 14px" }}>
          <form onSubmit={handleSubmit}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px 20px" }}>
              {/* Customer ID */}
              <div style={{ gridColumn: "1 / -1" }}>
                <label style={{ fontSize: 11, color: "#5a6a7a", fontWeight: 600, display: "block", marginBottom: 3 }}>Customer ID</label>
                <div style={{ display: "flex", gap: 6 }}>
                  <input
                    type="text"
                    name="customerId"
                    value={customerId}
                    onChange={handleCustomerChange}
                    placeholder="Search Customer"
                    style={{ flex: 1, border: "1px solid #c5ccd5", borderRadius: 2, padding: "5px 8px", fontSize: 12, color: "#2d3e52", outline: "none" }}
                  />
                  <button
                    type="button"
                    onClick={handleSearch}
                    style={{ background: "#1f5fa6", color: "#fff", border: "none", borderRadius: 2, padding: "5px 12px", fontSize: 12, cursor: "pointer" }}
                  >
                    Search
                  </button>
                </div>
              </div>

              {filteredContact.length > 0 && (
                <>
                  <div>
                    <label style={{ fontSize: 11, color: "#5a6a7a", fontWeight: 600, display: "block", marginBottom: 3 }}>Customer Name</label>
                    <input type="text" disabled value={`${filteredContact[0].firstName} ${filteredContact[0].lastName}`}
                      style={{ width: "100%", border: "1px solid #e3e8ee", borderRadius: 2, padding: "5px 8px", fontSize: 12, background: "#f8fafb", color: "#3d5164" }} />
                  </div>
                  <div>
                    <label style={{ fontSize: 11, color: "#5a6a7a", fontWeight: 600, display: "block", marginBottom: 3 }}>Email</label>
                    <input type="email" disabled value={filteredContact[0].email}
                      style={{ width: "100%", border: "1px solid #e3e8ee", borderRadius: 2, padding: "5px 8px", fontSize: 12, background: "#f8fafb", color: "#3d5164" }} />
                  </div>
                  <div>
                    <label style={{ fontSize: 11, color: "#5a6a7a", fontWeight: 600, display: "block", marginBottom: 3 }}>Address</label>
                    <input type="text" disabled value={filteredContact[0].address}
                      style={{ width: "100%", border: "1px solid #e3e8ee", borderRadius: 2, padding: "5px 8px", fontSize: 12, background: "#f8fafb", color: "#3d5164" }} />
                  </div>
                  <div>
                    <label style={{ fontSize: 11, color: "#5a6a7a", fontWeight: 600, display: "block", marginBottom: 3 }}>Date of Birth</label>
                    <input type="text" disabled value={filteredContact[0].dateOfBirth}
                      style={{ width: "100%", border: "1px solid #e3e8ee", borderRadius: 2, padding: "5px 8px", fontSize: 12, background: "#f8fafb", color: "#3d5164" }} />
                  </div>
                </>
              )}
            </div>
          </form>
        </div>
      </div>

      <div style={{ border: "1px solid #d7dbe2", background: "#fff", marginBottom: 14 }}>
        <div style={{ background: "#f3f6f9", padding: "7px 12px", borderBottom: "1px solid #d7dbe2", fontSize: 11, fontWeight: 700, color: "#2e3e4c", textTransform: "uppercase", letterSpacing: 0.5 }}>
          Policy Details
        </div>
        <div style={{ padding: "12px 14px" }}>
          <form onSubmit={handleSubmit}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "10px 20px" }}>
              <div>
                <label style={{ fontSize: 11, color: "#5a6a7a", fontWeight: 600, display: "block", marginBottom: 3 }}>Policy Type *</label>
                <select value={insuranceData.policyType} onChange={handlePolicySelectChange}
                  style={{ width: "100%", border: "1px solid #c5ccd5", borderRadius: 2, padding: "5px 8px", fontSize: 12, color: "#2d3e52", background: "#fff" }}>
                  <option value="">-- Select Policy Type --</option>
                  {Object.keys(coverageMapping).map((type) => <option key={type} value={type}>{type}</option>)}
                </select>
                {errors.policyType && <div style={{ color: "#c62828", fontSize: 11, marginTop: 2 }}>{errors.policyType}</div>}
              </div>

              <div>
                <label style={{ fontSize: 11, color: "#5a6a7a", fontWeight: 600, display: "block", marginBottom: 3 }}>Coverage *</label>
                <select value={insuranceData.coverageDetails} onChange={handleCoverageChange} disabled={!coverageOptions.length}
                  style={{ width: "100%", border: "1px solid #c5ccd5", borderRadius: 2, padding: "5px 8px", fontSize: 12, color: "#2d3e52", background: coverageOptions.length ? "#fff" : "#f8fafb" }}>
                  <option value="">-- Select Coverage --</option>
                  {coverageOptions.map((opt) => <option key={opt} value={opt}>{opt}</option>)}
                </select>
                {errors.coverageDetails && <div style={{ color: "#c62828", fontSize: 11, marginTop: 2 }}>{errors.coverageDetails}</div>}
              </div>

              <div>
                <label style={{ fontSize: 11, color: "#5a6a7a", fontWeight: 600, display: "block", marginBottom: 3 }}>Status</label>
                <select name="status" value={insuranceData.status} onChange={handleChange}
                  style={{ width: "100%", border: "1px solid #c5ccd5", borderRadius: 2, padding: "5px 8px", fontSize: 12, color: "#2d3e52", background: "#fff" }}>
                  <option value="">-- Select Status --</option>
                  <option value="In Force">In Force</option>
                  <option value="Lapsed">Lapsed</option>
                  <option value="Grace Period">Grace Period</option>
                  <option value="Cancelled">Cancelled</option>
                  <option value="Under Review">Under Review</option>
                  <option value="Expired">Expired</option>
                  <option value="Suspended">Suspended</option>
                  <option value="Matured">Matured</option>
                </select>
              </div>

              <div>
                <label style={{ fontSize: 11, color: "#5a6a7a", fontWeight: 600, display: "block", marginBottom: 3 }}>Start Date</label>
                <input type="date" name="startDate" value={insuranceData.startDate?.split("T")[0]} onChange={handleChange}
                  style={{ width: "100%", border: "1px solid #c5ccd5", borderRadius: 2, padding: "5px 8px", fontSize: 12, color: "#2d3e52" }} />
              </div>

              <div>
                <label style={{ fontSize: 11, color: "#5a6a7a", fontWeight: 600, display: "block", marginBottom: 3 }}>End Date</label>
                <input type="date" name="endDate" value={insuranceData.endDate?.split("T")[0]} onChange={handleChange}
                  style={{ width: "100%", border: "1px solid #c5ccd5", borderRadius: 2, padding: "5px 8px", fontSize: 12, color: "#2d3e52" }} />
              </div>

              <div>
                <label style={{ fontSize: 11, color: "#5a6a7a", fontWeight: 600, display: "block", marginBottom: 3 }}>Sum Insured *</label>
                <input type="number" name="sumInsured" value={insuranceData.sumInsured} onChange={handleChange} placeholder="0"
                  style={{ width: "100%", border: "1px solid #c5ccd5", borderRadius: 2, padding: "5px 8px", fontSize: 12, color: "#2d3e52" }} />
                {errors.sumInsured && <div style={{ color: "#c62828", fontSize: 11, marginTop: 2 }}>{errors.sumInsured}</div>}
              </div>

              <div>
                <label style={{ fontSize: 11, color: "#5a6a7a", fontWeight: 600, display: "block", marginBottom: 3 }}>Premium *</label>
                <input type="number" name="premium" value={insuranceData.premium} onChange={handleChange} placeholder="0"
                  style={{ width: "100%", border: "1px solid #c5ccd5", borderRadius: 2, padding: "5px 8px", fontSize: 12, color: "#2d3e52" }} />
                {errors.premium && <div style={{ color: "#c62828", fontSize: 11, marginTop: 2 }}>{errors.premium}</div>}
              </div>
            </div>

            <div style={{ display: "flex", justifyContent: "flex-end", gap: 8, marginTop: 16, paddingTop: 12, borderTop: "1px solid #e3e8ee" }}>
              <button type="button" onClick={() => navigate("/")}
                style={{ background: "#f4f6f8", border: "1px solid #c5ccd5", borderRadius: 2, padding: "5px 14px", fontSize: 12, color: "#4e5d6d", cursor: "pointer" }}>
                Cancel
              </button>
              {apiMethod === "update" && (
                <button type="submit"
                  style={{ background: "#1f5fa6", color: "#fff", border: "none", borderRadius: 2, padding: "5px 14px", fontSize: 12, fontWeight: 600, cursor: "pointer" }}>
                  Update
                </button>
              )}
              {apiMethod !== "update" && apiMethod !== "view" && (
                <button type="submit"
                  style={{ background: "#1f5fa6", color: "#fff", border: "none", borderRadius: 2, padding: "5px 14px", fontSize: 12, fontWeight: 600, cursor: "pointer" }}>
                  Submit
                </button>
              )}
            </div>
          </form>

          {message && <div style={{ marginTop: 10, color: "#2b7a3e", fontSize: 12 }}>{message}</div>}
        </div>
      </div>

      {/* Customer search modal */}
      {showModal && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.4)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 9999 }}>
          <div style={{ background: "#fff", border: "1px solid #d7dbe2", borderRadius: 3, width: 420, maxWidth: "90%" }}>
            <div style={{ background: "#f3f6f9", padding: "8px 12px", borderBottom: "1px solid #d7dbe2", fontSize: 12, fontWeight: 700, color: "#2e3e4c", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span>SELECT CUSTOMER</span>
              <button onClick={() => setShowModal(false)} style={{ background: "none", border: "none", fontSize: 16, cursor: "pointer", color: "#4e5d6d" }}>✕</button>
            </div>
            <div style={{ maxHeight: 240, overflowY: "auto" }}>
              {filteredOrgSuggestions.map((option) => (
                <div key={option} onClick={() => selectSuggestion(currentField, option)}
                  style={{ padding: "7px 12px", fontSize: 12, cursor: "pointer", borderBottom: "1px solid #f0f0f0", color: "#3d5164" }}
                  onMouseEnter={e => e.currentTarget.style.background = "#edf4fb"}
                  onMouseLeave={e => e.currentTarget.style.background = ""}
                >
                  {option}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default InsurancePage;
