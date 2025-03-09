import React ,{useState}from 'react';
import { useNavigate } from 'react-router-dom';
import "../style/Navbar.css"; 

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    sessionStorage.removeItem('sessionKey');
    navigate('/'); 
  };
  const [isOpen, setIsOpen] = useState(false);

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="navbar">
       <div className="navbar-logo">
       <h1 className="navbar-title">AppInsurance</h1>
       <div id='linksnavBar' className={`navbar-links ${isOpen ? "open" : ""}`}>
       
        <a className='navBarLinks' href="/dashBoard">DashBoard</a>

        <a className='navBarLinks' href="/insurance">New Insurance</a>
        <a className='navBarLinks' href="/about">About</a>
       
      </div>
      </div>
     
     
    
      <button className="logout-button" onClick={handleLogout}>Logout</button>
    </nav>
  );
};

export default Navbar;
