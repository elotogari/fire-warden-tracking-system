import React, { useEffect, useState } from 'react';
import './EditLogModal.css';

const EditLogModal = ({ isOpen, onClose, log, onSave, locations }) => {
  const [locationId, setLocationId] = useState(log?.location_id || '');
  const [timestamp, setTimestamp] = useState('');

  useEffect(() => {
    if (log) {
      setLocationId(log.location_id);
      setTimestamp(new Date(log.timestamp).toISOString().slice(0, 16));
    }
  }, [log]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await onSave({ ...log, location_id: locationId, timestamp });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="modal-backdrop">
      <div className="modal-box">
        <h3>Edit Log</h3>
        <form onSubmit={handleSubmit}>
          <label>Location:</label>
          <select
            className="form-input"
            value={locationId}
            onChange={(e) => setLocationId(e.target.value)}
            required
          >
            <option value="">Select location</option>
            {locations.map((loc) => (
              <option key={loc.id} value={loc.id}>
                {loc.name}
              </option>
            ))}
          </select>

          <label>Date/Time:</label>
          <input
            type="datetime-local"
            className="form-input"
            value={timestamp}
            onChange={(e) => setTimestamp(e.target.value)}
            required
          />

          <div className="modal-buttons">
            <button type="submit">Save</button>
            <button type="button" onClick={onClose}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditLogModal;
