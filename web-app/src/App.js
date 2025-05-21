import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import HSTDashboard from './components/HSTDashboard';
import WardenDashboard from './components/WardenDashboard';
import LocationForm from './components/LocationForm';
import './global.css';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/hst-dashboard" element={<HSTDashboard />} />
      <Route path="/warden-dashboard" element={<WardenDashboard />} />
      <Route path="/location-form" element={<LocationForm />} />
    </Routes>
  );
}

export default App;
