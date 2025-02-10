import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

const Sidebar = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
    sessionStorage.removeItem('sessionKey');
    navigate('/'); 
  };

  return (
    <div className="h-screen text-white fixed top-0 left-0 w-64 bg-opacity-90 bg-gray-900 shadow-lg flex flex-col">
      <div className="px-4 py-6 flex items-center justify-center border-b border-gray-700">
        <NavLink to="/">
          <p className="text-lg font-bold text-white">ExpleoSurance</p>
        </NavLink>
      </div>
      <ul className="flex-1 overflow-y-auto mt-4 space-y-2">
        <li>
          <NavLink to="/Dashboard" className={({ isActive }) => isActive ? "block py-3 px-4 bg-purple-600 text-white rounded-lg" : "block py-3 px-4 hover:bg-purple-500 rounded-lg text-white"}>Dashboard</NavLink>
        </li>
        <li>
          <NavLink to="/insurance" className={({ isActive }) => isActive ? "block py-3 px-4 bg-purple-600 text-white rounded-lg" : "block py-3 px-4 hover:bg-purple-500 rounded-lg text-white"}>New Insurance</NavLink>
        </li>
        <li>
          <NavLink to="/contact" className={({ isActive }) => isActive ? "block py-3 px-4 bg-purple-600 text-white rounded-lg" : "block py-3 px-4 hover:bg-purple-500 rounded-lg text-white"}>Contact</NavLink>
        </li>
        <li>
          <NavLink to="/adminPanel" className={({ isActive }) => isActive ? "block py-3 px-4 bg-purple-600 text-white rounded-lg" : "block py-3 px-4 hover:bg-purple-500 rounded-lg text-white"}>Admin Panel</NavLink>
        </li>
      </ul>
      <div className="px-4 py-3 border-t border-gray-700">
        <button className="w-full py-2 bg-red-600 hover:bg-red-500 text-white rounded-lg" onClick={handleLogout}>Logout</button>
      </div>
    </div>
  );
};

export default Sidebar;
