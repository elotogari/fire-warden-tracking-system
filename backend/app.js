const express = require('express');
const cors = require('cors');
const app = express();
const authRoutes = require('./routes/auth');
const locationRoutes = require('./routes/locations');

app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true,
}));

app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/locations', locationRoutes);

module.exports = app;