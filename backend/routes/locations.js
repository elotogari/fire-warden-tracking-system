const express = require('express');
const router = express.Router();
const { query, sql } = require('../database-connection');

router.get('/', async (req, res) => {
  try {
    const result = await query('SELECT id, name FROM locations');
    res.json(result.recordset);
  } catch (error) {
    console.error('Error fetching locations:', error);
    res.status(500).json({ message: 'Server error while fetching locations' });
  }
});

module.exports = router;
