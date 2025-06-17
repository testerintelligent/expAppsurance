import {BrowserRouter as Router,Routes,Route} from "react-router-dom"
import Login from "./pages/LoginPage.tsx";
import React from 'react';
import NewClaim from "./pages/NewClaimPage.tsx";
import Dashboard from "./pages/DashboardPage.tsx";
import ClaimStatus from "./pages/ClaimStatusPage.tsx";
import ClaimHistory from "./pages/ClaimHistoryPage.tsx";
// import { useState,useEffect } from "react";




const App=()=> {

  // const [claims, setClaims] = useState([]);

  // useEffect(() => {
  //   // Static claim data for now
 

  //    setClaims(staticClaimsData); // Set static data to state
  // }, []);

  return (
    <>
    <Router>
    <Routes>
      <Route path="/" element={<Login/>}></Route>
      <Route path="/newClaim" element={<NewClaim/>}></Route>
      <Route path="/dashboard" element={<Dashboard/>}></Route>
      <Route path="/claimStatus" element={<ClaimStatus/>}></Route>
      <Route path="/claimHistory" element={<ClaimHistory/>}></Route>
   {/* <Route path="/Claim" element={<HamburgerMenu claim={claims}/>}></Route> */}
    </Routes>
    </Router>

    </>
  );
}

export default App;
