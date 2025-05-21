import React from 'react';
import WardenNavBar from './WardenNavBar';

const WardenDashboard = () => {
  return (
    <>
      <WardenNavBar />
      <div style={{ padding: '20px' }}>
        <h2>Today's Logs</h2>
        {/* Table will go here */}
      </div>
    </>
  );
};

export default WardenDashboard;
