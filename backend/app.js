require('dotenv').config();
const express = require('express');
const connect = require('./db');

const app = express();
app.use(express.json());

// Connect to MongoDB (attempt; cached in db.js)
connect().then(() => console.log('MongoDB connected (app)')).catch(err => console.error('MongoDB connection error (app):', err));

// Import routes
const authRoutes = require('./routes/auth.route');
app.use('/api/auth', authRoutes);

// Health
app.get('/', (req, res) => res.json({ status: 'ok', env: process.env.NODE_ENV || 'development' }));

module.exports = app;
