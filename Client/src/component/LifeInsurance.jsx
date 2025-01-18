import React, { useState } from 'react';

const LifeInsurance = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    dateOfBirth: '',
    coverageAmount: '',
    policyDuration: '',
    premiumFrequency: '',
    beneficiaries: [{ name: '', relationship: '', benefitPercentage: '' }],
    medicalHistory: '',
    occupation: '',
    smokingStatus: '',
    alcoholConsumption: '',
    nomineeName: '',
    nomineeRelationship: '',
    documents: null,
    hasMedicalHistory: false, // New state to track if medical history requires documents
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleMedicalHistoryChange = (e) => {
    const { value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      medicalHistory: value,
      hasMedicalHistory: value === 'Yes', // Set to true if medical history is "Yes"
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData((prevData) => ({
      ...prevData,
      documents: file,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Life Insurance Policy Submitted:', formData);
  };

  return (
    <div className="min-h-screen bg-customPurple flex flex-col items-center p-6">
      <div className="w-full items-center p-6 m-0" style={{ backgroundColor: '#6946C6' }}>
        <h2 className="text-white text-3xl font-bold mb-6">Life Insurance Policy</h2>
        <div className="bg-white p-6 border-2 border-black rounded-md w-full max-w-lg min-h-[500px] ml-72">
          <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* Full Name */}
            <div className="flex items-center space-x-4">
              <label className="text-black w-1/3">PolicyHolder Name</label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                className="w-2/3 p-2 border border-black rounded"
              />
            </div>

            {/* Date of Birth */}
            <div className="flex items-center space-x-4">
              <label className="text-black w-1/3">Date of Birth</label>
              <input
                type="date"
                name="dateOfBirth"
                value={formData.dateOfBirth}
                onChange={handleChange}
                className="w-2/3 p-2 border border-black rounded"
              />
            </div>

            {/* Coverage Amount */}
            <div className="flex items-center space-x-4">
              <label className="text-black w-1/3">Coverage Amount</label>
              <input
                type="number"
                name="coverageAmount"
                value={formData.coverageAmount}
                onChange={handleChange}
                className="w-2/3 p-2 border border-black rounded"
              />
            </div>

            {/* Policy Duration */}
            <div className="flex items-center space-x-4">
              <label className="text-black w-1/3">Policy Duration (years)</label>
              <input
                type="number"
                name="policyDuration"
                value={formData.policyDuration}
                onChange={handleChange}
                className="w-2/3 p-2 border border-black rounded"
              />
            </div>

            {/* Premium Payment Frequency */}
            <div className="flex items-center space-x-4">
              <label className="text-black w-1/3">Premium Payment Frequency</label>
              <select
                name="premiumFrequency"
                value={formData.premiumFrequency}
                onChange={handleChange}
                className="w-2/3 p-2 border border-black rounded"
              >
                <option value="">Select Frequency</option>
                <option value="monthly">Monthly</option>
                <option value="quarterly">Quarterly</option>
                <option value="yearly">Yearly</option>
              </select>
            </div>

            {/* Medical History */}
            <div className="flex items-center space-x-4">
              <label className="text-black w-1/3">Medical History</label>
              <select
                name="medicalHistory"
                value={formData.medicalHistory}
                onChange={handleMedicalHistoryChange}
                className="w-2/3 p-2 border border-black rounded"
              >
                <option value="">Select</option>
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </select>
            </div>

            {/* Conditional Document Upload */}
            {formData.hasMedicalHistory && (
              <div className="flex items-center space-x-4">
                <label className="text-black w-1/3">Upload Medical Proof</label>
                <input
                  type="file"
                  name="documents"
                  onChange={handleFileChange}
                  className="w-2/3 p-2 border border-black rounded"
                />
                {formData.documents && (
                  <p className="mt-2 text-sm text-gray-600">
                    Uploaded file: {formData.documents.name}
                  </p>
                )}
              </div>
            )}

            {/* Occupation */}
            <div className="flex items-center space-x-4">
              <label className="text-black w-1/3">Occupation</label>
              <input
                type="text"
                name="occupation"
                value={formData.occupation}
                onChange={handleChange}
                className="w-2/3 p-2 border border-black rounded"
              />
            </div>

            {/* Lifestyle Factors (Smoking and Alcohol) */}
            <div className="flex items-center space-x-4">
              <label className="text-black w-1/3">Lifestyle Factors</label>
              <div className="w-2/3 space-y-2">
                <div>
                  <label>Smoking Status</label>
                  <select
                    name="smokingStatus"
                    value={formData.smokingStatus}
                    onChange={handleChange}
                    className="w-full p-2 border border-black rounded"
                  >
                    <option value="">Select</option>
                    <option value="non-smoker">Non-Smoker</option>
                    <option value="smoker">Smoker</option>
                  </select>
                </div>
                <div>
                  <label>Alcohol Consumption</label>
                  <select
                    name="alcoholConsumption"
                    value={formData.alcoholConsumption}
                    onChange={handleChange}
                    className="w-full p-2 border border-black rounded"
                  >
                    <option value="">Select</option>
                    <option value="none">None</option>
                    <option value="moderate">Moderate</option>
                    <option value="excessive">Excessive</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Nominee Details */}
            <div className="flex items-center space-x-4">
              <label className="text-black w-1/3">Nominee Name</label>
              <input
                type="text"
                name="nomineeName"
                value={formData.nomineeName}
                onChange={handleChange}
                className="w-2/3 p-2 border border-black rounded"
              />
            </div>

            <div className="flex items-center space-x-4">
              <label className="text-black w-1/3">Nominee Relationship</label>
              <input
                type="text"
                name="nomineeRelationship"
                value={formData.nomineeRelationship}
                onChange={handleChange}
                className="w-2/3 p-2 border border-black rounded"
              />
            </div>

            {/* File Upload */}
            <div className="flex items-center space-x-4">
              <label className="text-black w-1/3">Upload Documents</label>
              <input
                type="file"
                name="documents"
                onChange={handleFileChange}
                className="w-2/3 p-2 border border-black rounded"
              />
              {formData.documents && (
                <p className="mt-2 text-sm text-gray-600">
                  Uploaded file: {formData.documents.name}
                </p>
              )}
            </div>

            <div className="flex justify-center mt-4">
              <button
                type="submit"
                className="bg-[#6946C6] text-white border-2 border-black px-4 py-2 rounded hover:bg-white hover:text-black"
              >
                Submit Policy
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LifeInsurance;
