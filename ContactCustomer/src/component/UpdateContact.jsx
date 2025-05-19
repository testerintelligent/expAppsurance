import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { FaSearch } from "react-icons/fa";

const UpdateContact = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [contact, setContact] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [currentField, setCurrentField] = useState("");

  const allOrgOptions = [
    "Acme Corp",
    "Globex Corporation",
    "Initech",
    "Umbrella Corp",
    "Stark Industries",
    "Wayne Enterprises",
  ];
  const allProdOptions = [
    "PROD-1001",
    "PROD-2002",
    "PROD-3003",
    "PROD-4004",
    "PROD-5005",
  ];



  useEffect(() => {
    axios
      .get(`http://10.192.190.148:5000/view/${id}`)
      .then((res) => {
        setContact(res.data.contact);
        setLoading(false);
      })
      .catch(() => {
        setError("Error loading contact");
        setLoading(false);
      });
  }, [id]);

  const selectSuggestion = (field, value) => {
    setContact((prev) => ({ ...prev, [field]: value }));
    setShowModal(false);
  };

  const handleSearch = (field) => {
    setCurrentField(field);
    setShowModal(true);
  };
  

  const handleChange = (e) => {
    const { name, value } = e.target;
    setContact((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleUpdate = () => {
    axios
      .put(`http://10.192.190.148:5000/updateContact/${id}`, contact)
      .then(() => {
        alert("Contact updated successfully");
        navigate("/Dashboard");
      })
      .catch((err) => {
        alert("Update failed");
        console.error(err);
      });
  };

  if (loading) return <p>Loading...</p>;
  if (error || !contact) return <p>{error || "Contact not found"}</p>;

  return (
    <div className="flex justify-center items-start py-10 bg-white-900 min-h-screen overflow-y-auto">
      <div className="bg-gray-800 bg-opacity-90 shadow-2xl rounded-xl p-8 w-full max-w-3xl h-max text-white">
        <h2 className="text-3xl font-bold mb-6 text-center">Update Contact</h2>

        {/* Personal Info */}
        <div className="mb-10">
          <h3 className="text-lg font-semibold mb-2 text-left">
            Personal Information
          </h3>
          <div className="h-1 w-20 bg-blue-500 mb-4"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input label="First Name" name="firstName" value={contact.firstName} onChange={handleChange} />
            <Input label="Last Name" name="lastName" value={contact.lastName} onChange={handleChange} />
            <Input label="Email" name="email" value={contact.email} onChange={handleChange} />
            <Input label="Phone" name="phone" value={contact.phone} onChange={handleChange} />
            <Input label="Date of Birth" name="dateOfBirth" type="date" value={contact.dateOfBirth?.split("T")[0]} onChange={handleChange} />
            <div>
              <label className="block text-left mb-1">Gender</label>
              <div className="flex flex-col">
                {["Male", "Female"].map((g) => (
                  <label key={g} className="flex items-center space-x-2 mb-1">
                    <input type="radio" name="gender" value={g} checked={contact.gender === g} onChange={handleChange} className="form-radio h-4 w-4 text-blue-600" />
                    <span>{g}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Address Info */}
        <div className="mb-10">
          <h3 className="text-lg font-semibold mb-2 text-left">Address Details</h3>
          <div className="h-1 w-20 bg-blue-500 mb-4"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-left mb-1">Address Type</label>
              <select
                name="address"
                value={contact.address}
                onChange={handleChange}
                className="w-full p-2 rounded bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select Type</option>
                <option value="Home">Home</option>
                <option value="Work">Work</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <Input label="Street" name="street" value={contact.street || ""} onChange={handleChange} />
            <Input label="City" name="city" value={contact.city || ""} onChange={handleChange} />
            <Input label="State" name="state" value={contact.state || ""} onChange={handleChange} />
            <Input label="Zip Code" name="zipCode" value={contact.zipCode || ""} onChange={handleChange} />
          </div>
        </div>

        {/* Org Info */}
        <div className="mb-10">
          <h3 className="text-lg font-semibold mb-2 text-left">Organization & Producer Code</h3>
          <div className="h-1 w-20 bg-blue-500 mb-4"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-left mb-1">Organization</label>
              <div className="relative">
                <input
                  type="text"
                  name="organization"
                  value={contact.organization}
                  onChange={handleChange}
                  placeholder="Search Organization"
                  className="w-full p-2 rounded bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  type="button"
                  onClick={() => handleSearch("organization")}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-blue-600 text-white p-2 rounded"
                >
                  <FaSearch />
                </button>
              </div>
            </div>

            <div>
              <label className="block text-left mb-1">Producer Code</label>
              <div className="relative">
                <input
                  type="text"
                  name="producerCode"
                  value={contact.producerCode}
                  onChange={handleChange}
                  placeholder="Search Producer Code"
                  className="w-full p-2 rounded bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  type="button"
                  onClick={() => handleSearch("producerCode")}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-blue-600 text-white p-2 rounded"
                >
                  <FaSearch />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Modal */}
        {showModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white text-black p-6 rounded-md max-w-md w-full">
              <h4 className="text-xl mb-4">
                Select {currentField === "organization" ? "Organization" : "Producer Code"}
              </h4>
              <div className="max-h-48 overflow-y-auto border border-gray-300 rounded">
                {(currentField === "organization" ? allOrgOptions : allProdOptions).map((option) => (
                  <div
                    key={option}
                    onClick={() => selectSuggestion(currentField, option)}
                    className="cursor-pointer px-4 py-2 hover:bg-blue-500 hover:text-white"
                  >
                    {option}
                  </div>
                ))}
              </div>
              <div className="mt-4 flex justify-end">
                <button
                  onClick={() => setShowModal(false)}
                  className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}

        <div className="flex justify-between mt-8">
          <button onClick={() => navigate("/Dashboard")} className="bg-gray-500 py-2 px-4 rounded-md text-white hover:bg-gray-700">
            Cancel
          </button>
          <button onClick={handleUpdate} className="bg-blue-600 py-2 px-6 rounded-md text-white hover:bg-blue-800">
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

// Reusable Input Component
const Input = ({ label, name, value, onChange, type = "text" }) => (
  <div>
    <label className="block text-left mb-1">{label}:</label>
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      className="w-full p-2 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
  </div>
);

export default UpdateContact;
