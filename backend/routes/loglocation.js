const express = require('express');
const router = express.Router();
const { query, sql } = require('../database-connection');

router.post('/', async (req, res) => {
  const { userId, locationId } = req.body;

  if (!userId || !locationId) {
    return res.status(400).json({ message: 'userId and locationId are required' });
  }

  try {
    await query(
      `INSERT INTO fire_warden_logs (user_id, timestamp, location_id) 
       VALUES (@userId, @timestamp, @locationId)`,
      {
        userId: { type: sql.Int, value: userId },
        timestamp: { type: sql.DateTime, value: new Date() },
        locationId: { type: sql.Int, value: locationId }
      }
    );

    res.status(201).json({ message: 'Log added successfully' });
  } catch (error) {
    console.error('Error inserting log:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

router.delete('/:id', async (req, res) => {
  const logId = req.params.id;

  try {
    const result = await query(
      `DELETE FROM fire_warden_logs WHERE id = @logId`,
      {
        logId: { type: sql.Int, value: logId }
      }
    );

    if (result.rowsAffected[0] === 0) {
      return res.status(404).json({ message: 'Log not found' });
    }

    res.json({ message: 'Log deleted successfully' });
  } catch (error) {
    console.error('Error deleting log:', error);
    res.status(500).json({ message: 'Server error while deleting log' });
  }
});

module.exports = router;
