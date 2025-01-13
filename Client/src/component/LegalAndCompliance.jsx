import React from 'react';

const LegalAndCompliance = () => {
  return (
    <div className="p-7 "style={{ backgroundColor: '#6946C6' }}>
      <div className="bg-white ml-60 rounded-lg border-2 border-black p-6">
      <h2 className="text-black text-3xl font-bold ">Legal and Compliance</h2>
      <div className="w-full max-w-4xl bg-white p-6 rounded shadow ">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">Terms and Conditions</h3>
        <p className="text-gray-600 mb-4">
          These are the terms and conditions of our service. Please read them carefully before proceeding.
        </p>
        <p className="text-gray-600 mb-4">
          1. Users must agree to the terms to proceed with any services provided by us.
        </p>
        <p className="text-gray-600 mb-4">
          2. All policies are subject to updates and users will be notified of changes accordingly.
        </p>
        <p className="text-gray-600 mb-4">
          3. Our company complies with all relevant legal standards, including data protection regulations.
        </p>

        <h3 className="text-xl font-semibold text-gray-800 mt-8 mb-4">Privacy Policy</h3>
        <p className="text-gray-600 mb-4">
          We are committed to protecting your privacy. All personal data will be securely stored and processed.
        </p>
        <p className="text-gray-600 mb-4">
          You can request to delete or update your information at any time. Please read the full privacy policy for more details.
        </p>

        <h3 className="text-xl font-semibold text-gray-800 mt-8 mb-4">Compliance Information</h3>
        <p className="text-gray-600">
          We adhere to all applicable compliance standards and regulatory requirements. Our policies and procedures are regularly reviewed to ensure compliance.
        </p>
      </div>
    </div>
 </div>
  );
};

export default LegalAndCompliance;
