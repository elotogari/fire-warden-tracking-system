import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import HSTDashboard from './components/HSTDashboard';
import WardenDashboard from './components/WardenDashboard';
import LocationForm from './components/LocationForm';
import './global.css';

function App() {
  const [user, setUser] = useState(null);

  return (
    <Routes>
      <Route path="/" element={<Login setUser={setUser} />} />
      <Route path="/warden-dashboard" element={<WardenDashboard user={user} />} />
      <Route path="/hst-dashboard" element={<HSTDashboard user={user} />} />
      <Route path="/location-form" element={<LocationForm user={user} />} />
    </Routes>
  );
}

export default App;
