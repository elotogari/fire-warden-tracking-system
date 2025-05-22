import React from 'react';
import HSTNavBar from './HSTNavBar';

const HSTDashboard = ({ user }) => {
  return (
    <>
      <HSTNavBar />
      <h1>Today's Logs</h1>
      <p>Welcome, {user.firstName} {user.lastName}</p>
        {/* Table will go here */}
    </>
  );
};

export default HSTDashboard;