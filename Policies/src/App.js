import React, { useState, useEffect } from 'react';
import './App.css';
import PolicyDashboard from './component/PolicyDashboard';

function App() {
  const [policies, setPolicies] = useState([]);

  useEffect(() => {
    // Static policy data for now
    const staticPolicyData = [
      {
        policyId: 'POL001',
        customerId: 'CUS001',
        policyType: 'Health Insurance',
        coverageDetails: 'Covers hospitalization, surgeries, and treatments',
        premium: 1500,
        startDate: '2025-01-01',
        endDate: '2025-12-31',
        status: 'Active',
      },
      {
        policyId: 'POL002',
        customerId: 'CUS002',
        policyType: 'Car Insurance',
        coverageDetails: 'Covers accidental damage and theft of the vehicle',
        premium: 2000,
        startDate: '2025-02-01',
        endDate: '2026-01-31',
        status: 'Active',
      },
      {
        policyId: 'POL003',
        customerId: 'CUS003',
        policyType: 'Home Insurance',
        coverageDetails: 'Covers property damage and theft',
        premium: 1000,
        startDate: '2025-03-01',
        endDate: '2026-02-28',
        status: 'Expired',
      },
      {
        policyId: 'POL004',
        customerId: 'CUS004',
        policyType: 'Life Insurance',
        coverageDetails: 'Covers death and critical illness benefits',
        premium: 2500,
        startDate: '2025-04-01',
        endDate: '2025-12-31',
        status: 'Active',
      },
      {
        policyId: 'POL005',
        customerId: 'CUS005',
        policyType: 'Travel Insurance',
        coverageDetails: 'Covers trip cancellation, medical expenses during travel',
        premium: 500,
        startDate: '2025-03-15',
        endDate: '2025-04-15',
        status: 'Canceled',
      },
      {
        policyId: 'POL006',
        customerId: 'CUS006',
        policyType: 'Dental Insurance',
        coverageDetails: 'Covers dental check-ups and treatments',
        premium: 400,
        startDate: '2025-02-01',
        endDate: '2026-01-31',
        status: 'Active',
      },
      {
        policyId: 'POL007',
        customerId: 'CUS007',
        policyType: 'Pet Insurance',
        coverageDetails: 'Covers veterinary treatments and emergencies',
        premium: 300,
        startDate: '2025-05-01',
        endDate: '2026-04-30',
        status: 'Active',
      },
      {
        policyId: 'POL008',
        customerId: 'CUS008',
        policyType: 'Motorcycle Insurance',
        coverageDetails: 'Covers accidents, theft, and third-party liability',
        premium: 1200,
        startDate: '2025-06-01',
        endDate: '2026-05-31',
        status: 'Active',
      },
      {
        policyId: 'POL009',
        customerId: 'CUS009',
        policyType: 'Home Insurance',
        coverageDetails: 'Covers damage to structure and property inside',
        premium: 800,
        startDate: '2025-07-01',
        endDate: '2026-06-30',
        status: 'Expired',
      },
      {
        policyId: 'POL010',
        customerId: 'CUS010',
        policyType: 'Health Insurance',
        coverageDetails: 'Covers hospital stays, surgeries, and consultations',
        premium: 1800,
        startDate: '2025-08-01',
        endDate: '2026-07-31',
        status: 'Active',
      },
    ];

    setPolicies(staticPolicyData); // Set static data to state
  }, []);

  return (
    <div className="App">
      <h2>Policy Dashboard</h2>
      <PolicyDashboard policies={policies} />
    </div>
  );
}

export default App;

