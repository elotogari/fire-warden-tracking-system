import React from 'react';
import { useNavigate } from 'react-router-dom';
import './HSTNavBar.css';

export default function HSTNavBar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate('/');
  };

  return (
    <nav className="hst-navbar">
      <div className="hst-nav-right">
        <button className="logout-button" onClick={handleLogout}>Logout</button>
      </div>
    </nav>
  );
}
