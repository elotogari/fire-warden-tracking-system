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

router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { location_id, timestamp } = req.body;

  try {
    await query(
      `UPDATE fire_warden_logs
       SET location_id = @location_id, timestamp = @timestamp
       WHERE id = @id`,
      {
        id: { type: sql.Int, value: id },
        location_id: { type: sql.Int, value: location_id },
        timestamp: { type: sql.DateTime, value: new Date(timestamp) },
      }
    );

    res.json({ message: 'Log updated successfully' });
  } catch (err) {
    console.error('Error updating log:', err);
    res.status(500).json({ message: 'Server error while updating log' });
  }
});


module.exports = router;
