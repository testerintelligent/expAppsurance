import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import {
  HomeIcon,
  ShieldCheckIcon,
  PhoneIcon,
  UserIcon,
  PlusCircleIcon,
  ChevronDownIcon,
  ChevronRightIcon
} from '@heroicons/react/24/solid';

const Sidebar = () => {
  const navigate = useNavigate();
  const [isActionsOpen, setIsActionsOpen] = useState(false);

  const handleLogout = () => {
    sessionStorage.removeItem('sessionKey');
    navigate('/');
  };

  return (
    <div className="h-screen text-white fixed top-0 left-0 w-64 bg-opacity-90 bg-gray-900 shadow-lg flex flex-col">
      {/* Logo Section */}
      <div className="px-4 py-6 flex items-center justify-center border-b border-gray-700">
        <NavLink to="/">
          <p className="text-lg font-bold text-white">ExpleoSurance</p>
        </NavLink>
      </div>

      {/* Navigation */}
      <ul className="flex-1 overflow-y-auto mt-4 space-y-2 px-2">
        {/* Main Section */}
        <li>
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive
                ? "block py-3 px-4 bg-purple-600 text-white rounded-lg"
                : "block py-3 px-4 hover:bg-purple-500 rounded-lg text-white"
            }
          >
            <div className="flex items-center">
              <HomeIcon className="w-5 h-5 mr-3" />
              <span>Policies</span>
            </div>
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/insurance"
            className={({ isActive }) =>
              isActive
                ? "block py-3 px-4 bg-purple-600 text-white rounded-lg"
                : "block py-3 px-4 hover:bg-purple-500 rounded-lg text-white"
            }
          >
            <div className="flex items-center">
              <ShieldCheckIcon className="w-5 h-5 mr-3" />
              <span>New Insurance</span>
            </div>
          </NavLink>
        </li>

        {/* Collapsible Actions Section */}
        <li className="mt-6">
          <button
            onClick={() => setIsActionsOpen(!isActionsOpen)}
            className="w-full flex items-center justify-between py-2 px-4 rounded-lg hover:bg-purple-500"
          >
            <span className="text-sm font-semibold uppercase">Actions</span>
            {isActionsOpen ? (
              <ChevronDownIcon className="w-4 h-4" />
            ) : (
              <ChevronRightIcon className="w-4 h-4" />
            )}
          </button>

          {isActionsOpen && (
            <ul className="mt-2 pl-4 space-y-2">
              <li>
                <NavLink
                  to="/contact"
                  className={({ isActive }) =>
                    isActive
                      ? "block py-2 px-4 bg-purple-600 text-white rounded-lg"
                      : "block py-2 px-4 hover:bg-purple-500 rounded-lg text-white"
                  }
                >
                  <div className="flex items-center">
                    <PhoneIcon className="w-5 h-5 mr-3" />
                    <span>Contact</span>
                  </div>
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/account"
                  className={({ isActive }) =>
                    isActive
                      ? "block py-2 px-4 bg-purple-600 text-white rounded-lg"
                      : "block py-2 px-4 hover:bg-purple-500 rounded-lg text-white"
                  }
                >
                  <div className="flex items-center">
                    <UserIcon className="w-5 h-5 mr-3" />
                    <span>Account</span>
                  </div>
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/new-submission"
                  className={({ isActive }) =>
                    isActive
                      ? "block py-2 px-4 bg-purple-600 text-white rounded-lg"
                      : "block py-2 px-4 hover:bg-purple-500 rounded-lg text-white"
                  }
                >
                  <div className="flex items-center">
                    <PlusCircleIcon className="w-5 h-5 mr-3" />
                    <span>New Submission</span>
                  </div>
                </NavLink>
              </li>
            </ul>
          )}
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
