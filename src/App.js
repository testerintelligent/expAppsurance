
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import RegistrationPage from './component/RegistrationPage';
import LoginPage from './component/LoginPage';
import HomePage from './component/HomePage';


function App() {
  return (
    <div className="App">
      <Router>
      <div>
        <Routes>
        <Route path="/" element={<LoginPage/>} />
          <Route path="/register" element={<RegistrationPage/>} />
          <Route path='/home' element={<HomePage/>}/>
        </Routes>
      </div>
    </Router>
      
    </div>
  );
}

export default App;
