import React, { useState, useEffect } from "react";
import axios from "axios";
import { NavLink, useNavigate } from "react-router-dom";
import './navbar.css';

export default function Navbar() {
  const navigate = useNavigate();
  const [accountOpen, setAccountOpen] = useState(false);
  const [accountNo, setAccountNo] = useState("");
  const [accountData, setAccountData] = useState([]);

  // Fetch policies data from the API
  useEffect(() => {
    const fetchPolicies = async () => {
      try {
        const response = await axios.get("http://10.192.190.158:5000/api/Policies/getPoliciesForDashboard");
        console.log("response", response.data)
        setAccountData(response.data);
      } catch (error) {
        console.error("Error fetching policies:", error);
      }
    };
    fetchPolicies();
  }, []);

  // Navigate to account screen with accounId
  const accountSearch = (accountNo) => {
    const accountInfo = accountData.find(
      (data) => accountNo === data.accountNumber
    );

    if (accountInfo) {
      console.log("accountInfo", accountInfo.accountHolderName?.split(" ")[0]);
      navigate('/account', {
        state: {
          accountId: accountInfo.accountNumber,
          firstName: accountInfo.accountHolderName?.split(" ")[0],
          lastName: accountInfo.accountHolderName?.split(" ")[1],
        },
      })
    }

  }

  return (
    <header className="border-b-4 border-slate-600 bg-blue-500 relative">
      <div className="max-w-full mx-auto">
        <div className="flex items-center px-3 lg:px-6 h-12">
          <div className="mr-4">
            <h1 className="font-semibold text-white" onClick={() => navigate("/")}>Expleosurance Policy</h1>
          </div>
          <nav className="flex items-center gap-8 flex-1 text-sm ml-16 text-slate-50 overflow-visible">
            {/* <NavDropdown label="Desktop" /> */}
            {/* <NavLink
              to="/account"
              className={({ isActive, isPending }) =>
                isPending ? "pending" : isActive ? "active" : ""
              }
            >
              Account
            </NavLink> */}
            <div className="relative">
              <button
                onClick={() => setAccountOpen(!accountOpen)}
                className="flex items-center gap-1 hover:bg-blue-600 px-3 py-1 rounded"
              >
                Account <span className="text-xs">▼</span>
              </button>

              {accountOpen && (
                <div className="absolute top-full mt-3 w-72 bg-white text-black rounded shadow-lg z-[9999]">


                  {/* Search */}
                  <div className="p-3 border-b">
                    <div className="flex gap-2">
                      <label className="text-s font-semibold">
                        Acc#
                      </label>
                      <input
                        type="text"
                        value={accountNo}
                        onChange={(e) => setAccountNo(e.target.value)}
                        className="flex-1 border rounded px-2 py-1 text-sm"
                        placeholder="Enter account number"
                      />
                      <button
                        onClick={() => {
                          accountSearch(accountNo);
                          // navigate(`/account/${accountNo}`);
                          setAccountOpen(false);
                        }}
                        className="px-2 bg-blue-600 text-white rounded"
                      >
                        🔍
                      </button>
                    </div>
                  </div>

                  {/* Latest 5 Accounts */}
                  <ul>
                    {accountData.slice(0, 5).map((acc) => (
                      <li
                        key={acc.id}
                        onClick={() => {
                          setAccountOpen(false);
                        }}
                        className="px-3 py-2 text-sm hover:bg-slate-100 cursor-pointer text-left"
                      >
                        <div>
                          <span className="m-1 font-medium">{acc.accountNumber} - </span>
                          <span className="text-xs text-slate-500 truncate">{acc.accountHolderName}</span>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
            <NavLink
              to="/policy"
              className={({ isActive, isPending }) =>
                isPending ? "pending" : isActive ? "active" : ""
              }
            >
              Policy
            </NavLink>
            <NavLink
              to="/contact"
              className={({ isActive, isPending }) =>
                isPending ? "pending" : isActive ? "active" : ""
              }
            >
              Contact
            </NavLink>
            <NavLink
              to="/admin"
              className={({ isActive, isPending }) =>
                isPending ? "pending" : isActive ? "active" : ""
              }
            >
              Administration
            </NavLink>
          </nav>
        </div>
      </div>
    </header>
  );
}
