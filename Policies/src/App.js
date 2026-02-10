import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import PolicyDashboard from "./component/policy/PolicyDashboard";
import InsurancePage from "./component/insurance/InsurancePage";
import Contact from "./component/contact/Contact";
import Account from "./component/account/Account";
import Sidebar from "./layout/sidebar";
import Navbar from "./component/navbar/navbar";
import NewSubmission from "./component/submission/NewSubmission";
import Driver from "./component/driver/Driver";
import Vehicle from "./component/vehicle/Vehicle";
import Quote from "./component/quote/Quote";
import Payment from "./component/payment/Payment";
import PolicyIssuance from "./component/policy/PolicyIssuance";
import PolicySearch from "./component/policy/PolicySearch";
import PolicySummary from "./component/policy/PolicySummary";

function App() {
  const [policies] = useState([]);

  return (
    <div className="App">
      <Router>
        <div className="flex flex-col h-full">
          <Navbar />
          <div className="flex flex-1">
            <Sidebar />
            <main className="flex-1 bg-gray-50">
              <Routes>
                <Route
                  path="/"
                  element={<PolicyDashboard policies={policies} />}
                ></Route>
                <Route path="/insurance" element={<InsurancePage />}></Route>
                <Route path="/contact" element={<Contact />}></Route>
                <Route path="/account" element={<Account />}></Route>
                <Route path="/new-submission" element={<NewSubmission />} />
                <Route path="/driver" element={<Driver />} />
                <Route path="/vehicle" element={<Vehicle />} />
                <Route path="/quote" element={<Quote />} />
                <Route path="/payment" element={<Payment />} />
                <Route path="/policy-issuance" element={<PolicyIssuance />} />
                <Route path="/policy" element={<PolicySearch />} />
                <Route
                  path="/policy-summary/:policyNumber"
                  element={<PolicySummary />}
                />
              </Routes>
            </main>
          </div>
        </div>
      </Router>
    </div>
  );
}

export default App;
