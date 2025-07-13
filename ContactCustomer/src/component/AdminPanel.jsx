import React from 'react';
import { useNavigate, } from 'react-router-dom';



const AdminPanel = () => {
  const navigate = useNavigate();


  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="bg-gray-900 bg-opacity-90 shadow-lg rounded-xl p-10 max-w-2xl w-full text-white">
        <h2 className="text-3xl font-bold text-center mb-6">Admin Panel</h2>
        <div className="space-y-6">
          
          {/* Manage Users */}
          <div className="flex items-center justify-between bg-gray-800 p-4 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold">Manage Users</h3>
            <button
              onClick={() => navigate('/home')}
              className="bg-purple-700 text-white px-4 py-2 rounded-lg hover:bg-purple-800 border border-white transition-all"
            >
              View Users
            </button>
          </div>
          <div className="flex items-center justify-between bg-gray-800 p-4 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold">View Policies</h3>
            <button
              onClick={() =>window.location.href = 'http://10.192.190.158:3001'}
              className="bg-purple-700 text-white px-4 py-2 rounded-lg hover:bg-purple-800 border border-white transition-all"
            >
              View Policies
            </button>
          </div>
          {/* Manage Policies */}
          <div className="flex items-center justify-between bg-gray-800 p-4 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold">Manage Customers</h3>
            <button
              onClick={() => navigate('/Dashboard')}
              className="bg-purple-700 text-white px-4 py-2 rounded-lg hover:bg-purple-800 border border-white transition-all"
            >
              View Customers
            </button>
          </div>


          <div className="flex items-center justify-between bg-gray-800 p-4 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold">Manage Claims</h3>
            <button
              onClick={() => window.location.href = 'http://10.192.190.158:3002'}
              className="bg-purple-700 text-white px-4 py-2 rounded-lg hover:bg-purple-800 border border-white transition-all"
            >
              View claims
            </button>
          </div>

          {/* Generate Reports */}
          <div className="flex items-center justify-between bg-gray-800 p-4 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold">Generate Reports</h3>
            <button
              onClick={() => navigate('/reports')}
              className="bg-purple-700 text-white px-4 py-2 rounded-lg hover:bg-purple-800 border border-white transition-all"
            >
              View Reports
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
