import React from 'react';

const PolicyManagement = () => {
  // Simulated data for policies
  const policies = [
    { id: 1, customerName: 'test', policyType: 'Life', status: 'Approved' },
    { id: 2, customerName: 'Expleo', policyType: 'Health', status: 'Pending' },
    { id: 3, customerName: 'demo', policyType: 'Auto', status: 'Rejected' },
  ];

  return (
    <div style={{ backgroundColor: '#6946C6' }}>
    <div className="min-h-screen w-full bg-customPurple flex flex-col items-center p-6">
      <h2 className="text-white text-2xl font-bold mb-6">Claims Management</h2>

      <div className="w-full max-w-4xl bg-white p-6 rounded shadow ml-32 border-black border-2">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">Claims List</h3>

        <table className="w-full table-auto">
          <thead >
            <tr>
              <th className="px-4 py-2 border-b text-left text-white bg-black border-2 border-white">Policy ID</th>
              <th className="px-4 py-2 border-b text-left text-white bg-black border-2 border-white">Customer Name</th>
              <th className="px-4 py-2 border-b text-left text-white bg-black border-2 border-white">Policy Type</th>
              <th className="px-4 py-2 border-b text-left text-white bg-black border-2 border-white">Status</th>
              <th className="px-4 py-2 border-b text-left text-white bg-black border-2 border-white">Actions</th>
            </tr>
          </thead>
          <tbody className='border-2 border-black'>
            {policies.map((policy) => (
              <tr key={policy.id}>
                <td className="px-4 py-2 border-b border-2 border-black">{policy.id}</td>
                <td className="px-4 py-2 border-b border-2 border-black">{policy.customerName}</td>
                <td className="px-4 py-2 border-b border-2 border-black">{policy.policyType}</td>
                <td className={`border-2 border-black px-4 py-2 border-b ${policy.status === 'Approved' ? 'text-green-500' : policy.status === 'Rejected' ? 'text-red-500' : 'text-yellow-500'}`}>
                  {policy.status}
                </td>
                <td className="px-4 py-2 border-b border-2 border-black">
                  <button className="bg-[#6946C6] text-white border-2 border-black px-4 py-2 rounded hover:bg-white hover:text-black">
                    View Details
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
    </div>
  );
};

export default PolicyManagement;
