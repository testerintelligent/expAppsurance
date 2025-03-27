import React from 'react';

const PolicyDashboard = ({ policies }) => {
  return (
    <table>
      <thead>
        <tr>
          <th>Policy ID</th>
          <th>Customer ID</th>
          <th>Policy Type</th>
          <th>Coverage Details</th>
          <th>Premium</th>
          <th>Start Date</th>
          <th>End Date</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        {policies.map((policy) => (
          <tr key={policy.policyId}>
            <td>{policy.policyId}</td>
            <td>{policy.customerId}</td>
            <td>{policy.policyType}</td>
            <td>{policy.coverageDetails}</td>
            <td>{policy.premium}</td>
            <td>{new Date(policy.startDate).toLocaleDateString()}</td>
            <td>{new Date(policy.endDate).toLocaleDateString()}</td>
            <td>{policy.status}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default PolicyDashboard;
