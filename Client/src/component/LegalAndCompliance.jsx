import React from 'react';

const LegalAndCompliance = () => {
  return (
    <div className="flex justify-center items-center min-h-screen px-4">
      <div className="bg-gray-900 bg-opacity-90 shadow-lg rounded-xl p-10 max-w-3xl w-full text-white">
        <h2 className="text-3xl font-bold text-center mb-6">Legal and Compliance</h2>

        <h3 className="text-xl font-semibold mt-6 mb-2">Terms and Conditions</h3>
        <p>These are the terms and conditions of our service. Please read them carefully before proceeding.</p>
        <ul className="list-disc pl-6 mt-4">
          <li>Users must agree to the terms to proceed with any services provided by us.</li>
          <li>All policies are subject to updates, and users will be notified of changes accordingly.</li>
          <li>We comply with all legal standards, including data protection regulations.</li>
        </ul>

        <h3 className="text-xl font-semibold mt-6 mb-2">Privacy Policy</h3>
        <p>We are committed to protecting your privacy. All personal data is securely stored and processed.</p>
        <p className="mt-2">You can request to delete or update your information at any time.</p>

        <h3 className="text-xl font-semibold mt-6 mb-2">Compliance Information</h3>
        <p>We adhere to all compliance standards and regulatory requirements. Our policies are reviewed regularly to ensure compliance.</p>
      </div>
    </div>
  );
};

export default LegalAndCompliance;
