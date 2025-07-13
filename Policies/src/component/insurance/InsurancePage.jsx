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
    axios
      .get("http://10.192.190.158:5000/getContact")
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
    const method = apiMethod === "update" ? "put" : "post";
    const url =
      apiMethod === "update"
        ? `http://10.192.190.158:5000/updatePolicy/${initialData._id}`
        : `http://10.192.190.158:5000/postPolicy`;

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
          <label className="block text-left mb-1">Customer ID</label>
            <div className="relative">
              <input
                type="text"
                name="customerId"
                value={customerId}
                onChange={handleCustomerChange}
                placeholder="Search Customer"
                className="input-style"
              />
              <button
                type="button"
                onClick={handleSearch}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-blue-600 text-white p-2 rounded"
              >
                <FaSearch />
              </button>
            </div>
            {errors.customerId && (
              <p className="text-red-500">{errors.customerId}</p>
            )}
            {filteredContact.length > 0 && (
              <>
                <label className="block text-left mb-1">Customer Name</label>
                <input
                  type="text"
                  disabled
                  value={`${filteredContact[0].firstName} ${filteredContact[0].lastName}`}
                  className="input-style"
                />
                <label className="block text-left mb-1">Email</label>
                <input
                  type="email"
                  disabled
                  value={filteredContact[0].email}
                  className="input-style"
                />
                <label className="block text-left mb-1">Address</label>
                <input
                  type="text"
                  disabled
                  value={filteredContact[0].address}
                  className="input-style"
                />
                <label className="block text-left mb-1">Date of Birth</label>
                <input
                  type="text"
                  disabled
                  value={filteredContact[0].dateOfBirth}
                  className="input-style"
                />
              </>
            )}
            <label className="block text-left mb-1">Policy Type</label>
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
            <label className="block text-left mb-1">Coverage</label>
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
            <label className="block text-left mb-1">Start Date</label>
            <input
              type="date"
              name="startDate"
              value={insuranceData.startDate?.split("T")[0]}
              onChange={handleChange}
              placeholder="Start Date"
              className="input-style"
            />
            <label className="block text-left mb-1">End Date</label>
            <input
              type="date"
              name="endDate"
              value={insuranceData.endDate?.split("T")[0]}
              onChange={handleChange}
              placeholder="End Date"
              className="input-style"
            />
            <label className="block text-left mb-1">Sum Insured</label>
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
            <label className="block text-left mb-1">Premium</label>
            <input
              type="number"
              name="premium"
              value={insuranceData.premium}
              onChange={handleChange}
              placeholder="Premium"
              className="input-style"
            />
            {errors.premium && <p className="text-red-500">{errors.premium}</p>}
            <label className="block text-left mb-1">Status</label>
            <select
              name="status"
              value={insuranceData.status}
              onChange={handleChange}
              className="w-full p-3 rounded-lg bg-gray-700 border border-gray-500 text-white"
            >
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
            {/* Modal for Suggestions */}
            {showModal && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                <div className="bg-white text-black p-6 rounded-md max-w-md w-full">
                  <h4 className="text-xl mb-4">Select Customer Name</h4>
                  <div className="max-h-48 overflow-y-auto">
                    {filteredOrgSuggestions.map((option) => (
                      <div
                        key={option}
                        onClick={() => selectSuggestion(currentField, option)}
                        className="cursor-pointer px-4 py-2 hover:bg-blue-500"
                      >
                        {option}
                      </div>
                    ))}
                  </div>
                  <button
                    onClick={() => setShowModal(false)}
                    className="mt-4 w-full bg-red-500 text-white p-2 rounded"
                  >
                    Close
                  </button>
                </div>
              </div>
            )}
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
