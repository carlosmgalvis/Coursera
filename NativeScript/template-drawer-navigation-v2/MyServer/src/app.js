/*
npm install
node app.js
*/

const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const userRoutes = require('./routes/users');
const showRoutes = require('./routes/shows');
const saleRoutes = require('./routes/sales');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Request logging
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  next();
});

// Routes
app.use('/api/users', userRoutes);
app.use('/api/shows', showRoutes);
app.use('/api/sales', saleRoutes);

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

app.get('/', (req, res) => {
  res.json({
    name: 'MyApp API',
    version: '2.0.0',
    endpoints: {
      users: '/api/users',
      shows: '/api/shows',
      sales: '/api/sales'
    }
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ success: false, error: 'Endpoint not found' });
});

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ success: false, error: 'Something went wrong!' });
});

module.exports = app;