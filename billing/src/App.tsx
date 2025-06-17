import "./style/tailwind.css";
import BillingPage from "./pages/BillingPage.tsx";
import {BrowserRouter as MainRoute, Route, Routes} from "react-router-dom"
import Login from "./pages/LoginPage.tsx";

function App() {
  return (
    <>
    <MainRoute>
              <Routes>
                <Route path="/" element={ <Login/>}></Route>
                <Route path="/newBilling" element={ <BillingPage/>}></Route>
              </Routes>
    </MainRoute>
     
    </>
  );
}

export default App;
