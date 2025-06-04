import {BrowserRouter as Router,Routes,Route} from "react-router-dom"
import Login from "./pages/LoginPage";
import React from 'react';
import NewClaim from "./pages/NewClaimPage";
import Dashboard from "./pages/DashboardPage";
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
   {/* <Route path="/Claim" element={<HamburgerMenu claim={claims}/>}></Route> */}
    </Routes>
    </Router>

    </>
  );
}

export default App;
