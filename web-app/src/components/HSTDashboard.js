import React, { useEffect, useState } from 'react';
import HSTNavBar from './HSTNavBar';
import './WardenDashboard.css';

const HSTDashboard = ({ user }) => {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const res = await fetch('http://localhost:4000/api/today');
        const data = await res.json();
        setLogs(data);
      } catch (err) {
        console.error('Failed to fetch logs:', err);
      }
    };

    fetchLogs();
  }, []);

  return (
    <>
      <HSTNavBar />
      <div className="warden-dashboard">
        <h1>Today's Logs</h1>
        <p>Welcome, {user.firstName} {user.lastName}</p>

        <table className="logs-table">
          <thead>
            <tr>
              <th>Staff ID</th>
              <th>Name</th>
              <th>Location</th>
              <th>Date/Time</th>
            </tr>
          </thead>
          <tbody>
            {logs.map((log) => (
              <tr key={log.id}>
                <td>{log.staff_number}</td>
                <td>{log.first_name} {log.last_name}</td>
                <td>{log.location_name}</td>
                <td>{new Date(log.timestamp).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default HSTDashboard;