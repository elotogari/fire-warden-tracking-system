const express = require('express');
const router = express.Router();
const { query, sql } = require('../database-connection');

router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const result = await query('SELECT * FROM users WHERE username = @username', {
      username: { type: sql.NVarChar, value: username }
    });

    if (result.recordset.length === 0) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }

    const user = result.recordset[0];

    if (password !== user.password) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }

    res.json({
      message: 'Login successful',
      role: user.role,
      userId: user.id
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
