import React from 'react';
import HSTNavBar from './HSTNavBar';

const HSTDashboard = () => {
  return (
    <>
      <HSTNavBar />
      <div style={{ padding: '20px' }}>
        <h2>Health & Safety Team Dashboard</h2>
        {/* Table will go here */}
      </div>
    </>
  );
};

export default HSTDashboard;