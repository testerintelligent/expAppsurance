import React from 'react';

const Dashboard = ({ claims }) => {
  return (
    <table>
      <thead>
        <tr>
          <th>Claim ID</th>
          <th>Customer ID</th>
          <th>Policy ID</th>
          <th>Claim Type</th>
          <th>Claim Amount</th>
          <th>Claim Date</th>
          <th>Resolution Date</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        {claims.map(claim => (
          <tr key={claim.claimId}>
            <td>{claim.claimId}</td>
            <td>{claim.customerId}</td>
            <td>{claim.policyId}</td>
            <td>{claim.claimType}</td>
            <td>{claim.claimAmount}</td>
            <td>{new Date(claim.claimDate).toLocaleDateString()}</td>
            <td>{claim.resolutionDate ? new Date(claim.resolutionDate).toLocaleDateString() : 'N/A'}</td>
            <td>{claim.claimStatus}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Dashboard;
