import "./style/tailwind.css";
import BillingPage from "./pages/BillingPage.tsx";
import { BrowserRouter as MainRoute, Navigate, Route, Routes } from "react-router-dom"
import Login from "./pages/LoginPage.tsx";
import Account from "./layout/Account.tsx";
import Policy from "./layout/Policy.tsx";
import Contact from "./layout/Contact.tsx";
import Admin from "./layout/Admin.tsx";
import { Provider } from "react-redux";
import store from "./redux/store.ts";
import PolicySummary from "./layout/PolicySummary.tsx";
import PolicyDetails from "./layout/policyDetails.tsx";
import { useEffect, useState } from "react";
import Charges from "./layout/Charges.tsx";

function App() {
     
  return (

    <Provider store={store}>
      <MainRoute>
        <Routes>
          {/* <Route path="/" element={ <Login/>}/> */}

          <Route path="/" element={<BillingPage />}>
             <Route path="account" element={<Account />} />
             <Route path="policy" element={<Policy />} />
             <Route path="contact" element={<Contact />} />
             <Route path="charges" element={<Charges />} />
             <Route path="admin" element={<Admin />} />
             <Route path="policysummary" element={<PolicySummary />}/>
             <Route path="policydetails" element={<PolicyDetails />}/>
          </Route>
        </Routes>
      </MainRoute>
    </Provider>
  );
}

export default App;
