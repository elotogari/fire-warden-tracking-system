import React, { useEffect, useState } from 'react';
import WardenNavBar from './WardenNavBar';
import './WardenDashboard.css';
import EditLogModal from './EditLogModal';

const WardenDashboard = ({ user }) => {
  const [logs, setLogs] = useState([]);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [logToEdit, setLogToEdit] = useState(null);
  const [locations, setLocations] = useState([]);

  const fetchData = async () => {
    try {
      const [logsRes, locsRes] = await Promise.all([
        fetch('http://localhost:4000/api/today'),
        fetch('http://localhost:4000/api/locations'),
      ]);
      const logsData = await logsRes.json();
      const locsData = await locsRes.json();

      setLogs(logsData);
      setLocations(locsData);
    } catch (err) {
      console.error('Failed to fetch logs or locations:', err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleEdit = (log) => {
    setLogToEdit(log);
    setIsEditOpen(true);
  };

  const handleSaveEdit = async (updatedLog) => {
    try {
      const res = await fetch(`http://localhost:4000/api/loglocation/${updatedLog.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          location_id: updatedLog.location_id,
          timestamp: updatedLog.timestamp,
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        alert(data.message || 'Failed to update log');
        return;
      }

      await fetchData();
      setIsEditOpen(false);
    } catch (err) {
      console.error(err);
      alert('Server error. Please try again later.');
    }
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

      <EditLogModal
        isOpen={isEditOpen}
        onClose={() => setIsEditOpen(false)}
        log={logToEdit}
        onSave={handleSaveEdit}
        locations={locations}
      />
    </>
  );
};

export default WardenDashboard;