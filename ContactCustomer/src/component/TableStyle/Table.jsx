import React from "react";
const Table = ({ headers, dataModel }) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full table-auto border-collapse">
        <thead className="border-b">
            <div>
          <tr>
            {headers.map((value, index) => (
              <th key={index} className="px-4 py-2 text-left">{value}</th>
            ))}
          </tr>
          </div>
        </thead>
        <tbody>
          {dataModel.map((insurance, index) => (
            <div className="m-3 p-1 w-48">
            <tr key={index} className="border-b last:border-b-0">
              <td className="px-4 py-2">{insurance.CurrentDate}</td>
              <td className="px-4 py-2">{insurance.policyNumber}</td>
              <td className="px-4 py-2">{insurance.Name}</td>
              <td className="px-4 py-2">{insurance.email}</td>
              <td className="px-4 py-2">{insurance.Address}</td>
              <td className="px-4 py-2">{insurance.DateOfBirth}</td>
              <td className="px-4 py-2">{insurance.Gender}</td>
              <td className="px-4 py-2">{insurance.PolicyType.join(', ')}</td>
              <td className="px-4 py-2">{insurance.SumInsured}</td>
              <td className="px-4 py-2">{insurance.Premium}</td>
              <td className="px-4 py-2 text-red-500">
                <button className="hover:text-red-700">
                  Delete Policy
                </button>
              </td>
            </tr>
            </div>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
