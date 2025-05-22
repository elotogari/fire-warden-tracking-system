import React from 'react';
import WardenNavBar from './WardenNavBar';

const Dashboard = ({ user }) => {
  return (
    <>
      <WardenNavBar />
      <h1>Today's Logs</h1>
      <p>Welcome, {user.firstName} {user.lastName}</p>
      {/* other dashboard stuff */}
    </>
  );
};

export default Dashboard;
