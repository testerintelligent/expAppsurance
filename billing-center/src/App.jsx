import { BrowserRouter, Routes, Route } from "react-router-dom";
import DashboardLayout from "./layout/DashboardLayout";
import Dashboard from "./pages/Dashboard";
import PolicyDashboard from "./pages/Policy";
import Users from "./pages/Users";
import PolicySummary from "./components/policySummary";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<DashboardLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="/" element={<Dashboard />} />
          <Route path="/users" element={<Users />} />
          <Route path="/policy" element={<PolicyDashboard />} />
          <Route
            path="/policy-summary/:policyNumber"
            element={<PolicySummary />}
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
