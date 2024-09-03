
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import RegistrationPage from './component/RegistrationPage';
import LoginPage from './component/LoginPage';
import HomePage from './component/HomePage';
import InsurancePage from './component/InsurancePage';
import ForgotPasswordPage from './component/ForgotPassword';
import Dashboard from './component/Dashboard';


function App() {
  return (
    <div className="App">
      <Router>
      <div>
        <Routes>
        <Route path="/" element={<LoginPage/>} />
          <Route path="/register" element={<RegistrationPage/>} />
          <Route path='/home' element={<HomePage/>}/>
          <Route path='/insurance' element={<InsurancePage/>}/>
          <Route path='/forgotPassword' element={<ForgotPasswordPage/>}/>
          <Route path='/Dashboard' element={<Dashboard/>}/>
        </Routes>
      </div>
    </Router>
      
    </div>
  );
}

export default App;
