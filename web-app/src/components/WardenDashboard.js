import React, { useEffect, useState } from 'react';
import WardenNavBar from './WardenNavBar';
import './WardenDashboard.css';

const WardenDashboard = ({ user }) => {
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

  const handleEdit = (log) => {
    alert(`Edit log ${log.id} (not implemented yet)`);
  };

  const handleDelete = async (logId) => {
    const confirm = window.confirm('Are you sure you want to delete this log?');
    if (!confirm) return;

    try {
      const res = await fetch(`http://localhost:4000/api/loglocation/${logId}`, {
        method: 'DELETE',
      });

      if (!res.ok) {
        const data = await res.json();
        alert(data.message || 'Failed to delete log');
        return;
      }

      setLogs((prev) => prev.filter((log) => log.id !== logId));
    } catch (err) {
      console.error(err);
      alert('Server error. Please try again later.');
    }
  };

  return (
    <>
      <WardenNavBar />
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
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {logs.map((log) => (
              <tr key={log.id}>
                <td>{log.staff_number}</td>
                <td>{log.first_name} {log.last_name}</td>
                <td>{log.location_name}</td>
                <td>{new Date(log.timestamp).toLocaleString()}</td>
                <td>
                  {log.user_id === user.id ? (
                    <button onClick={() => handleEdit(log)}>Edit</button>
                  ) : (
                    '-'
                  )}
                </td>
                <td>
                  {log.user_id === user.id ? (
                    <button onClick={() => handleDelete(log.id)}>Delete</button>
                  ) : (
                    '-'
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default WardenDashboard;
