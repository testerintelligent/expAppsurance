import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { FaSearch } from "react-icons/fa";

const InsurancePage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const initialData = location.state?.formData || {};
  const apiMethod = location.state?.apiMethod || "";

  const [contactData, setContactData] = useState([]);
  const [filteredContact, setFilteredContact] = useState([]);
  const [coverageOptions, setCoverageOptions] = useState([]);
  const [search, setSearch] = useState("");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState({});

  const [insuranceData, setInsuranceData] = useState({
    customerId: "",
    policyType: "",
    coverageDetails: "",
    sumInsured: "",
    premium: "",
    startDate: "2024-01-01",
    endDate: "2025-01-01",
    status: "Active",
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
    axios
      .get("http://10.192.190.148:5000/getContact")
      .then((response) => {
        const contacts = response.data?.contacts || [];
        console.log("initialData", contacts);
        setContactData(contacts);
      })
      .catch((error) => console.error("Error fetching contact data:", error));
  }, []);

  useEffect(() => {
    if (apiMethod === "update" || apiMethod === "view") {
      console.log("contactData", contactData);
      console.log("initialData", initialData);
      const matched = contactData.find((c) => c._id === initialData.customerId);
      if (matched) setFilteredContact([matched]);

      if (initialData.policyType) {
        setCoverageOptions(coverageMapping[initialData.policyType] || []);
      }
    }
  }, [contactData, initialData, apiMethod]);

  const handleSelectCustomer = (customerId, id) => {
    setSearch("");
    setInsuranceData((prev) => ({ ...prev, customerId: id }));
    const contact = contactData.find((c) => c.customerId === customerId);
    setFilteredContact(contact ? [contact] : []);
    //setFilteredContact([]); // ❗ Hide the dropdown after selection
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setSearch(value);
    const matches = contactData.filter((c) => c.customerId.includes(value));
    setFilteredContact(matches);
  };

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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInsuranceData((prev) => ({ ...prev, [name]: value }));
  };

  const validateFields = () => {
    const errs = {};
    if (!insuranceData.customerId) errs.customerId = "Customer ID is required.";
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

    const method = apiMethod === "update" ? "put" : "post";
    const url =
      apiMethod === "update"
        ? `http://10.192.190.148:5000/updatePolicy/${initialData._id}`
        : `http://10.192.190.148:5000/postPolicy`;

    axios[method](url, insuranceData)
      .then((res) => {
        setMessage(res.data.message || "Success!");
        navigate("/");
      })
      .catch((err) => {
        setMessage(err.response?.data?.message || "Failed to process request.");
      });
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="bg-gray-900 bg-opacity-90 shadow-lg p-10 rounded-xl w-full max-w-2xl text-white">
        <h2 className="text-3xl font-bold text-center mb-6">
          Insurance Policy Details
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex flex-col space-y-2">
            <label className="flex">Enter your Customer Id :</label>
            <input
              type="text"
              value={insuranceData.customerId}
              onChange={handleInputChange}
              placeholder="Enter Customer ID"
              className="input-style"
            />
            {filteredContact.length > 0 &&
              apiMethod !== "update" &&
              apiMethod !== "view" &&
              search && (
                <ul className="bg-white text-black p-2 rounded">
                  {filteredContact.map((c) => (
                    <li
                      key={c._id}
                      onClick={() => handleSelectCustomer(c.customerId, c._id)}
                      className="cursor-pointer hover:bg-gray-300 p-1"
                    >
                      {c.customerId}
                    </li>
                  ))}
                </ul>
              )}
            {errors.customerId && (
              <p className="text-red-500">{errors.customerId}</p>
            )}
            {filteredContact.length > 0 && (
              <>
                <input
                  type="text"
                  disabled
                  value={`${filteredContact[0].firstName} ${filteredContact[0].lastName}`}
                  className="input-style"
                />
                <input
                  type="email"
                  disabled
                  value={filteredContact[0].email}
                  className="input-style"
                />
                <input
                  type="text"
                  disabled
                  value={filteredContact[0].address}
                  className="input-style"
                />
                <input
                  type="text"
                  disabled
                  value={filteredContact[0].dateOfBirth}
                  className="input-style"
                />
              </>
            )}

            <select
              value={insuranceData.policyType}
              onChange={handlePolicySelectChange}
              className="w-full p-3 rounded-lg bg-gray-700 border border-gray-500 text-white"
            >
              <option value="">-- Select Policy Type --</option>
              {Object.keys(coverageMapping).map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
            {errors.policyType && (
              <p className="text-red-500">{errors.policyType}</p>
            )}

            <select
              value={insuranceData.coverageDetails}
              onChange={handleCoverageChange}
              disabled={!coverageOptions.length}
              className="w-full p-3 rounded-lg bg-gray-700 border border-gray-500 text-white"
            >
              <option value="">-- Select Coverage --</option>
              {coverageOptions.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
            {errors.coverageDetails && (
              <p className="text-red-500">{errors.coverageDetails}</p>
            )}

            <input
              type="number"
              name="sumInsured"
              value={insuranceData.sumInsured}
              onChange={handleChange}
              placeholder="Sum Insured"
              className="input-style"
            />
            {errors.sumInsured && (
              <p className="text-red-500">{errors.sumInsured}</p>
            )}

            <input
              type="number"
              name="premium"
              value={insuranceData.premium}
              onChange={handleChange}
              placeholder="Premium"
              className="input-style"
            />
            {errors.premium && <p className="text-red-500">{errors.premium}</p>}

            <div className="flex justify-between">
              {apiMethod === "update" && (
                <button type="submit" className="btn-primary">
                  Update
                </button>
              )}

              {apiMethod !== "update" && apiMethod !== "view" && (
                <button type="submit" className="btn-primary">
                  Submit
                </button>
              )}
              <button
                type="button"
                onClick={() => navigate("/")}
                className="btn-secondary"
              >
                Cancel
              </button>
            </div>
          </div>
        </form>
        {message && (
          <p className="mt-4 text-center text-green-500">{message}</p>
        )}
      </div>
    </div>
  );
};

export default InsurancePage;
