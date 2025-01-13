import React from 'react';

const PolicyManagement = () => {
  return (
    <div style={{ backgroundColor: '#6946C6' }}>
    <div className="min-h-screen w-full bg-customPurple flex flex-col items-center p-6">
      <h2 className="text-white text-2xl font-bold mb-6">Policy Management</h2>

      <table className="w-3/4  border-2 border-black text-white ml-12 "> 
        <thead>
          <tr>
            <th className="border-2 border-white p-2 text-white bg-black">Policy ID</th>
            <th className="border-2 border-white p-2 text-white bg-black">Policy Type</th>
            <th className="border-2 border-white p-2 text-white bg-black">Customer Name</th>
            <th className="border-2 border-white p-2 text-white bg-black">Status</th>
            <th className="border-2 border-white p-2 text-white bg-black">Actions</th>
          </tr>
        </thead>
        <tbody>
          {/* Sample data */}
          <tr>
            <td className=" border-2 border-white p-2">001</td>
            <td className=" border-2 border-white p-2">Life</td>
            <td className=" border-2 border-white p-2">Mageshpoopathi</td>
            <td className=" border-2 border-white p-2">Active</td>
            <td className=" border-2 border-white p-2">
              <button className="bg-[#6946C6] text-white px-4 py-2 rounded hover:bg-white border-2 border-black hover:text-black ">View</button>
            </td>
          </tr>
          {/* More rows can be added */}
        </tbody>
      </table>
    </div>
    </div>
  );
};

export default PolicyManagement;
