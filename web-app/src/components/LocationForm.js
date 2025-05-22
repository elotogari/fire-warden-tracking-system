import React, { useEffect, useState } from 'react';
import WardenNavBar from './WardenNavBar';
import './LocationForm.css';

const LocationForm = ({ user }) => {
  const [locations, setLocations] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState('');
  const [currentDateTime, setCurrentDateTime] = useState('');

  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const res = await fetch('http://localhost:4000/api/locations');
        const data = await res.json();
        setLocations(data);
      } catch (err) {
        console.error('Failed to fetch locations:', err);
      }
    };

    fetchLocations();
    setCurrentDateTime(new Date().toLocaleString());
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedLocation) return alert('Please select a location');

    try {
      const res = await fetch('http://localhost:4000/api/loglocation', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: Number(user.id),
          locationId: Number(selectedLocation),
          // timestamp is handled server side
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        alert(data.message || 'Failed to log location');
        return;
      }

      alert('Location logged successfully!');
      setSelectedLocation('');
      setCurrentDateTime(new Date().toLocaleString());
    } catch (err) {
      console.error(err);
      alert('Server error. Please try again later.');
    }
  };

  if (!user) {
    return <p>Please login to log your location.</p>;
  }

  return (
    <>
      <WardenNavBar />
      <div className="location-form-container">
        <h2 style={{ textAlign: 'center' }}>Fire Warden Location Logging Form</h2>
        <form onSubmit={handleSubmit} className="location-form-box">
          <label>Staff Number:</label>
          <input type="text" value={user.staffNumber} disabled />

          <label>Name:</label>
          <input type="text" value={`${user.firstName} ${user.lastName}`} disabled />

          <label>Location:</label>
          <select
            value={selectedLocation}
            onChange={(e) => setSelectedLocation(e.target.value)}
            required
          >
            <option value="">Select a location</option>
            {locations.map((loc) => (
              <option key={loc.id} value={loc.id}>
                {loc.name}
              </option>
            ))}
          </select>

          <label>Date/Time:</label>
          <input type="text" value={currentDateTime} disabled />

          <button type="submit">Submit</button>
        </form>
      </div>
    </>
  );
};

export default LocationForm;