import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './WardenNavBar.css';

export default function WardenNavBar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate('/');
  };

  return (
    <nav className="warden-navbar">
      <div className="nav-left">
        <Link to="/warden-dashboard" className="nav-link">Dashboard</Link>
        <Link to="/location-form" className="nav-link">Log Location</Link>
      </div>
      <div className="nav-right">
        <button className="logout-button" onClick={handleLogout}>Logout</button>
      </div>
    </nav>
  );
}