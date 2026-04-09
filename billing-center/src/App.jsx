import { BrowserRouter, Routes, Route } from "react-router-dom";
import DashboardLayout from "./layout/DashboardLayout";
import Dashboard from "./pages/Dashboard";
import PolicyDashboard from "./pages/Policy";
import Users from "./pages/Users";
import PolicySummary from "./components/policySummary";
import Invoice from "./pages/Invoice.jsx";
import Signup from "./pages/Signup.jsx";
import Login from "./pages/Login.jsx";
import RequireAuth from "./components/RequireAuth";
import PaymentSchedule from "./pages/PaymentSchedule.jsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route
          element={
            <RequireAuth>
              <DashboardLayout />
            </RequireAuth>
          }
        >
          <Route index element={<Dashboard />} />
          <Route path="/" element={<Dashboard />} />
          <Route path="/users" element={<Users />} />
          <Route path="/policy" element={<PolicyDashboard />} />
          <Route path="/invoice/:policyNumber" element={<Invoice />} />
          <Route
            path="/policy-summary/:policyNumber"
            element={<PolicySummary />}
          />
          <Route
            path="/payment-schedule/:policyNumber"
            element={<PaymentSchedule />}
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
