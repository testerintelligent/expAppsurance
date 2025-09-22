import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import Layout from "./layout/layout";
import PolicyDashboard from "./component/policy/PolicyDashboard";
import InsurancePage from "./component/insurance/InsurancePage";
import Contact from "./component/contact/Contact";
import Account from "./component/account/Account";

function App() {
  const [policies] = useState([]);

  return (
    <div className="App">
      <Router>
        <div>
          <Routes>
            <Route element={<Layout />}>
              < Route path="/" element={<PolicyDashboard  policies={policies} />}></Route>
              < Route path="/insurance" element={<InsurancePage />}></Route>
              < Route path="/contact" element={<Contact />}></Route>
              < Route path="/account" element={<Account />}></Route>
            </Route>
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;
