import React from 'react';
import WardenNavBar from './WardenNavBar';

const Dashboard = ({ user }) => {
  return (
    <>
      <WardenNavBar />
      <h1>Today's Logs</h1>
      {/* Render a table or list of logs here */}
      <p>Welcome, {user.firstName} {user.lastName}</p>
      {/* other dashboard stuff */}
    </>
  );
};

export default Dashboard;
