const express = require('express');
const cors = require('cors');
const app = express();
const authRoutes = require('./routes/auth');
const locationRoutes = require('./routes/locations');
const logLocationRoutes = require('./routes/loglocation');

app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true,
}));

app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/locations', locationRoutes);
app.use('/api/loglocation', logLocationRoutes);

module.exports = app;