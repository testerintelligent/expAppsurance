import React, { useState, lazy, Suspense } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
const PolicyDashboard = lazy(() =>
  import("./component/policy/PolicyDashboard")
);
const InsurancePage = lazy(() => import("./component/insurance/InsurancePage"));
const Contact = lazy(() => import("./component/contact/Contact"));
const Account = lazy(() => import("./component/account/Account"));
const NewSubmission = lazy(() =>
  import("./component/submission/NewSubmission")
);
const Driver = lazy(() => import("./component/driver/Driver"));
const Vehicle = lazy(() => import("./component/vehicle/Vehicle"));
const Quote = lazy(() => import("./component/quote/Quote"));
const Payment = lazy(() => import("./component/payment/Payment"));
const PolicyIssuance = lazy(() => import("./component/policy/PolicyIssuance"));
const PolicySearch = lazy(() => import("./component/policy/PolicySearch"));
const PolicySummary = lazy(() => import("./component/policy/PolicySummary"));
const RequireAuth = lazy(() => import("./component/auth/RequireAuth"));
const Login = lazy(() => import("./component/auth/Login"));
const Signup = lazy(() => import("./component/auth/Signup"));
const DashboardLayout = lazy(() => import("./layout/DashboardLayout"));

function App() {
  const [policies] = useState([]);

  return (
    <div className="App">
      <Router>
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route path="/login" element={<Login />}></Route>
            <Route path="/signup" element={<Signup />}></Route>
            <Route
              element={
                <RequireAuth>
                  <DashboardLayout />
                </RequireAuth>
              }
            >
              <Route
                index
                element={<PolicyDashboard />}
                policies={policies}
              ></Route>
              <Route
                path="/"
                element={<PolicyDashboard />}
                policies={policies}
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
              <Route path="/renewals" element={
                <div style={{ padding: 24, fontFamily: "sans-serif", color: "#2d3e52" }}>
                  <h2 style={{ fontSize: 18, fontWeight: 700 }}>Renewals</h2>
                  <p style={{ fontSize: 13, color: "#6b7c93" }}>Renewals management coming soon.</p>
                </div>
              } />
              <Route path="/transactions" element={
                <div style={{ padding: 24, fontFamily: "sans-serif", color: "#2d3e52" }}>
                  <h2 style={{ fontSize: 18, fontWeight: 700 }}>Transactions</h2>
                  <p style={{ fontSize: 13, color: "#6b7c93" }}>Transaction history coming soon.</p>
                </div>
              } />
              <Route path="/admin" element={
                <div style={{ padding: 24, fontFamily: "sans-serif", color: "#2d3e52" }}>
                  <h2 style={{ fontSize: 18, fontWeight: 700 }}>Administration</h2>
                  <p style={{ fontSize: 13, color: "#6b7c93" }}>Admin panel coming soon.</p>
                </div>
              } />
            </Route>
          </Routes>
        </Suspense>
      </Router>
    </div>
  );
}

export default App;
