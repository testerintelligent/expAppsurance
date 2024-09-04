import React from 'react';
import { useNavigate } from 'react-router-dom';
import "../style/Navbar.css"; 

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate('/'); 
  };

  return (
    <nav className="navbar">
      <h1 className="navbar-title">InsuranceMaking</h1>
      <button className="logout-button" onClick={handleLogout}>Logout</button>
    </nav>
  );
};

export default Navbar;
