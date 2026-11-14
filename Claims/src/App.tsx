import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Sidebar from "./layout/sidebar";
import Navbar from "./components/navbar/navbar";
import Login from "./components/auth/Login";
import Signup from "./components/auth/Signup";
import "./App.css";
import DashboardLayout from "../src/layout/DashboardLayout";
import RequireAuth from "./components/auth/RequireAuth";

import PolicySearchforClaim from "./pages/PolicySearch";
import CreateClaim from "./pages/CreateClaim";
import ClaimBasicInfo from "./pages/ClaimBasicInfo";
import AddClaimInformation from "./pages/AddClaimInformation";
// import Services from "./pages/Services";
import ClaimSummary from "./pages/ClaimSummary";
import ClaimsList from "./pages/ClaimsList";
import ReviewClaim from "./pages/ReviewClaim";
import ClaimSuccess from "./pages/ClaimSuccess";
import ClaimDashboard from "./pages/claimDashboard";

const App = () => {
  return (
    <div className="App">
      <Router>
        {/* <div className="flex flex-col h-full">
          <Navbar />

          <div className="flex flex-1">
            <Sidebar />

            <main className="flex-1 bg-gray-50"> */}

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
            {/* ===============================
                    FNOL FLOW
                   =============================== */}

            <Route path="/" element={<ClaimDashboard />} />
            {/* 1️⃣ Policy Search */}
            <Route path="/Claim" element={<PolicySearchforClaim />} />

            {/* 2️⃣ Create Claim (Loss Date + Claim Type) */}
            <Route path="/Claim/CreateClaim" element={<CreateClaim />} />

            {/* 3️⃣ Basic Information */}
            <Route path="/Claim/basicinfo" element={<ClaimBasicInfo />} />

            {/* 4️⃣ Loss & Claim Details */}
            <Route
              path="/Claim/addClaimInfo"
              element={<AddClaimInformation />}
            />

            {/* 5️⃣ Review Claim */}
            <Route path="/Claim/review" element={<ReviewClaim />} />

            {/* 5️⃣ ClaimSuccess */}
            <Route path="/Claim/success" element={<ClaimSuccess />} />

            {/* 6️⃣ Claim Summary */}
            <Route path="/Claim/summary/:id" element={<ClaimSummary />} />

            {/* ===============================
                    CLAIM LIST
                   =============================== */}
            <Route path="/claims" element={<ClaimsList />} />

            {/* ===============================
                    FALLBACK / LEGACY
                   =============================== */}
            <Route path="/claims/create" element={<CreateClaim />} />
          </Route>
        </Routes>
        {/* </main>
          </div>
        </div> */}
      </Router>
    </div>
  );
};

export default App;
