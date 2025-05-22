const express = require('express');
const router = express.Router();
const { query, sql } = require('../database-connection');

router.post('/logs', async (req, res) => {
  const { userId, locationId } = req.body;

  const timestamp = new Date();

  if (!userId || !locationId) {
    return res.status(400).json({ message: 'userId and locationId are required' });
  }

  try {
    const result = await query(
      `INSERT INTO fire_warden_logs (user_id, timestamp, location_id) 
       VALUES (@userId, @timestamp, @locationId)`,
      {
        userId: { type: sql.Int, value: userId },
        timestamp: { type: sql.DateTime, value: timestamp },
        locationId: { type: sql.Int, value: locationId }
      }
    );

    res.status(201).json({ message: 'Log added successfully' });
  } catch (error) {
    console.error('Error inserting log:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
