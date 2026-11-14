import "./App.css";
import DashboardLayout from "./layout/DashboardLayout";
import RateTable from "./components/RateTable";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <Routes>
      <Route element={<DashboardLayout />}>
        <Route path="/" element={<RateTable />} />
        {/* <Route path="/form" element={<MotorForm />} /> */}
      </Route>
    </Routes>
  );
}

export default App;
