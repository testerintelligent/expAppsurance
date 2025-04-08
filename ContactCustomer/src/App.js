import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import RegistrationPage from './component/RegistrationPage';
import LoginPage from './component/LoginPage';
import Layout from './layout/layout';
import About from './component/About';
import AdminPanel from './component/AdminPanel';
import ClaimsManagement from './component/ClaimsManagement';
import Dashboard from './component/Dashboard';
import ForgotPasswordPage from './component/ForgotPassword';
import HomePage from './component/HomePage';
import LegalAndCompliance from './component/LegalAndCompliance';
import PaymentPage from './component/PaymentPage';
import PolicyManagement from './component/PolicyManagement';
import ProfileManagement from './component/ProfileManagement';
import QuateGeneration from './component/QuateGeneration';
import Support from './component/Support';
import PolicyInitiation from './component/PolicyInitiation';
import LifeInsurance from './component/LifeInsurance';
import Contact from './component/ContactDetailPage/Contact';
import BillingPage from './component/BillingPage'
import "./style/tailwind.css";

function App() {
  return (
    <div className="App">
      <Router>
        <div>
          <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route path="/register" element={<RegistrationPage />} />
            <Route path="/forgotPassword" element={<ForgotPasswordPage />} />
            
            {/* Protected Routes inside Layout */}
            <Route element={<Layout />}> 
              <Route path="/validateUser" element={<PolicyInitiation />} />
              <Route path="/about" element={<About />} />
              <Route path="/adminPanel" element={<AdminPanel />} />
              <Route path="/claimsManagement" element={<ClaimsManagement />} />
              <Route path="/legalAndCompliance" element={<LegalAndCompliance />} />
              <Route path="/paymentPage" element={<PaymentPage />} />
              <Route path="/policyManagement" element={<PolicyManagement />} />
              <Route path="/profileManagement" element={<ProfileManagement />} />
              <Route path="/quateGeneration" element={<QuateGeneration />} />
              <Route path="/support" element={<Support />} />
              <Route path="/home" element={<HomePage />} />
              <Route path="/Dashboard" element={<Dashboard />} />
              <Route path="/LifeInsurance" element={<LifeInsurance />} />
              <Route path="/contact" element={<Contact />} />
              
              {/* ✅ Added Billing Page Route */}
              <Route path="/billing" element={<BillingPage />} />
              
            </Route>
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;
