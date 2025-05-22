const express = require('express');
const router = express.Router();
const { query, sql } = require('../database-connection');

router.get('/', async (req, res) => {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const result = await query(
      `SELECT l.id, l.user_id, l.timestamp, l.location_id,
              u.staff_number, u.first_name, u.last_name,
              loc.name AS location_name
       FROM fire_warden_logs l
       JOIN users u ON l.user_id = u.id
       JOIN locations loc ON l.location_id = loc.id
       WHERE l.timestamp >= @startOfDay
       ORDER BY l.timestamp DESC`,
      {
        startOfDay: { type: sql.DateTime, value: today }
      }
    );

    res.json(result.recordset);
  } catch (error) {
    console.error('Error fetching today\'s logs:', error);
    res.status(500).json({ message: 'Server error while fetching logs' });
  }
});

module.exports = router;
