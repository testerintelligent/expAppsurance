import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for routing

const AdminPanel = () => {
  const navigate = useNavigate(); // Initialize useNavigate hook

  const handleViewUsers = () => {
    navigate('/home'); // Navigate to /home
  };

  const handleViewPolicies = () => {
    navigate('/Dashboard'); // Navigate to /Dashboard
  };

  const handleViewReports = () => {
    navigate('/reports'); // Navigate to /reports (you can modify this as needed)
  };

  return (
    <div style={{ backgroundColor: '#6946C6' }}>
      <div className="min-h-screen w-full bg-customPurple flex flex-col items-center p-6">
        <h2 className="text-white text-3xl font-bold mb-6">Admin Panel</h2>
        <div className="bg-white border-2 border-black p-3 rounded-md">
          <div className="space-y-4">
            <div className="flex items-center justify-between w-full max-w-md bg-white p-4 rounded shadow">
              <h3 className="text-lg font-bold p-2">Manage Users</h3>
              <button
                onClick={handleViewUsers} // OnClick to navigate to /home
                className="bg-[#6946C6] text-white px-4 py-2 rounded hover:bg-white hover:text-black border-2 border-black"
              >
                View Users
              </button>
            </div>

            <div className="flex items-center justify-between w-full max-w-md bg-white p-4 rounded shadow">
              <h3 className="text-lg font-bold p-2">Manage Policies</h3>
              <button
                onClick={handleViewPolicies} // OnClick to navigate to /Dashboard
                className="bg-[#6946C6] text-white px-4 py-2 rounded hover:bg-white hover:text-black border-2 border-black"
              >
                View Policies
              </button>
            </div>

            <div className="flex items-center justify-between w-full max-w-md bg-white p-4 rounded shadow">
              <h3 className="text-lg font-bold p-2">Generate Reports</h3>
              <button
                onClick={handleViewReports} // OnClick to navigate to /reports (adjust as needed)
                className="bg-[#6946C6] text-white px-4 py-2 rounded hover:bg-white hover:text-black border-2 border-black"
              >
                View Reports
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
