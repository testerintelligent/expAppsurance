import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

const Sidebar = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
    sessionStorage.removeItem('sessionKey');
    navigate('/'); 
  };

  return (
    <div className="h-screen text-white fixed top-0 left-0 w-64 bg-black shadow-lg">
      <div className="flex flex-col h-full justify-between">
        <div className="overflow-y-auto"> {/* Add this div to make the sidebar scrollable */}
          <div className="px-4 py-6 flex items-center justify-center border-b border-gray-200">
            <NavLink to="/">
              <p className="text-lg font-bold text-white">ExpleoSurance</p>
            </NavLink>
          </div>
          <ul className="mt-4">
            <li>
              <NavLink
                to="/Dashboard"
                className={({ isActive }) =>
                  isActive
                    ? "flex items-center py-3 px-4 bg-cyan-100 rounded-lg text-cyan-900 font-semibold"
                    : "flex items-center py-3 px-4 hover:bg-cyan-50 rounded-lg hover:text-cyan-900 text-white font-semibold"
                }
              >
                Dashboard
              </NavLink>
            </li>
            {/* <li>
              <NavLink
                to="/validateUser"
                className={({ isActive }) =>
                  isActive
                    ? "flex items-center py-3 px-4 bg-cyan-100 rounded-lg text-cyan-900 font-semibold"
                    : "flex items-center py-3 px-4 hover:bg-cyan-50 rounded-lg hover:text-cyan-900 text-white font-semibold"
                }
              >
                Policy Initiation
              </NavLink>
            </li> */}

            {/* <li>
              <NavLink
                to="/quateGeneration"
                className={({ isActive }) =>
                  isActive
                    ? "flex items-center py-3 px-4 bg-cyan-100 rounded-lg text-cyan-900 font-semibold"
                    : "flex items-center py-3 px-4 hover:bg-cyan-50 rounded-lg hover:text-cyan-900 text-white font-semibold"
                }
              >
                Quate Generation
              </NavLink>
            </li> */}

            <li>
              <NavLink
                to="/insurance"
                className={({ isActive }) =>
                  isActive
                    ? "flex items-center py-3 px-4 bg-cyan-100 rounded-lg text-cyan-900 font-semibold"
                    : "flex items-center py-3 px-4 hover:bg-cyan-50 rounded-lg hover:text-cyan-900 text-white font-semibold"
                }
              >
                New Insurance
              </NavLink>
            </li>
            {/* <li>
              <NavLink
                to="/claimsManagement"
                className={({ isActive }) =>
                  isActive
                    ? "flex items-center py-3 px-4 bg-cyan-100 rounded-lg text-cyan-900 font-semibold"
                    : "flex items-center py-3 px-4 hover:bg-cyan-50 rounded-lg hover:text-cyan-900 text-white font-semibold"
                }
              >
                Claims Management
              </NavLink>
            </li> */}
            {/* <li>
              <NavLink
                to="/paymentPage"
                className={({ isActive }) =>
                  isActive
                    ? "flex items-center py-3 px-4 bg-cyan-100 rounded-lg text-cyan-900 font-semibold"
                    : "flex items-center py-3 px-4 hover:bg-cyan-50 rounded-lg hover:text-cyan-900 text-white font-semibold"
                }
              >
                Payment Page
              </NavLink>
            </li> */}
            {/* <li> 
              <NavLink
                to="/policyManagement"
                className={({ isActive }) =>
                  isActive
                    ? "flex items-center py-3 px-4 bg-cyan-100 rounded-lg text-cyan-900 font-semibold"
                    : "flex items-center py-3 px-4 hover:bg-cyan-50 rounded-lg hover:text-cyan-900 text-white font-semibold"
                }
              >
                Policy Management
              </NavLink>
            </li> */}
            {/* <li>
              <NavLink
                to="/profileManagement"
                className={({ isActive }) =>
                  isActive
                    ? "flex items-center py-3 px-4 bg-cyan-100 rounded-lg text-cyan-900 font-semibold"
                    : "flex items-center py-3 px-4 hover:bg-cyan-50 rounded-lg hover:text-cyan-900 text-white font-semibold"
                }
              >
                Profile Management
              </NavLink>
            </li> */}
            <li>
              <NavLink
                to="/contact"
                className={({ isActive }) =>
                  isActive
                    ? "flex items-center py-3 px-4 bg-cyan-100 rounded-lg text-cyan-900 font-semibold"
                    : "flex items-center py-3 px-4 hover:bg-cyan-50 rounded-lg hover:text-cyan-900 text-white font-semibold"
                }
              >
                Contact
              </NavLink>
            </li>
            {/* <li>
              <NavLink
                to="/support"
                className={({ isActive }) =>
                  isActive
                    ? "flex items-center py-3 px-4 bg-cyan-100 rounded-lg text-cyan-900 font-semibold"
                    : "flex items-center py-3 px-4 hover:bg-cyan-50 rounded-lg hover:text-cyan-900 text-white font-semibold"
                }
              >
                Support
              </NavLink>
            </li> */}
            {/* <li>
              <NavLink
                to="/legalAndcompliance"
                className={({ isActive }) =>
                  isActive
                    ? "flex items-center py-3 px-4 bg-cyan-100 rounded-lg text-cyan-900 font-semibold"
                    : "flex items-center py-3 px-4 hover:bg-cyan-50 rounded-lg hover:text-cyan-900 text-white font-semibold"
                }
              >
                LegalAndCompliance
              </NavLink>
            </li> */}
            <li>
              <NavLink
                to="/adminPanel"
                className={({ isActive }) =>
                  isActive
                    ? "flex items-center py-3 px-4 bg-cyan-100 rounded-lg text-cyan-900 font-semibold"
                    : "flex items-center py-3 px-4 hover:bg-cyan-50 rounded-lg hover:text-cyan-900 text-white font-semibold"
                }
              >
                Admin Panel
              </NavLink>
            </li>
            {/* <li>
              <NavLink
                to="/about"
                className={({ isActive }) =>
                  isActive
                    ? "flex items-center py-3 px-4 bg-cyan-100 rounded-lg text-cyan-900 font-semibold"
                    : "flex items-center py-3 px-4 hover:bg-cyan-50 rounded-lg hover:text-cyan-900 text-white font-semibold"
                }
              >
                About
              </NavLink>
            </li> */}
            <li>
              <div className="px-4 py-3 hover:bg-cyan-50 flex items-center hover:text-cyan-900 text-white font-semibold rounded-lg mb-5">
                <button className="w-64 text-left h-6" onClick={handleLogout}>Logout</button>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
