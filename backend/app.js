const express = require('express');
const path = require('path');
const app = express();
const authRoutes = require('./routes/auth');
const locationRoutes = require('./routes/locations');
const logLocationRoutes = require('./routes/loglocation');
const todaysLogs = require('./routes/today');

app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/locations', locationRoutes);
app.use('/api/loglocation', logLocationRoutes);
app.use('/api/today', todaysLogs);

app.use(express.static(path.join(__dirname, 'web-app/build')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'web-app/build/index.html'));
});

module.exports = app;