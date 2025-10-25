require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connect = require('./db');

const app = express();

// CORS configuration - Comprehensive
app.use(cors({
    origin: true, // Allow all origins
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'Origin', 'X-Requested-With', 'Accept']
}));

// Additional CORS headers middleware
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');

    // Handle preflight
    if (req.method === 'OPTIONS') {
        return res.sendStatus(200);
    }
    next();
});

app.use(express.json());

// Connect to MongoDB (attempt; cached in db.js)
connect().then(() => console.log('MongoDB connected (app)')).catch(err => console.error('MongoDB connection error (app):', err));

// Import routesA more recent Production Deployment has been created, so the one you are looking at cannot be redeployed anymore. Learn More
const authRoutes = require('./routes/auth.route');
const userRoutes = require('./routes/user.route');
app.use('/api/auth', authRoutes);
app.use('/api', userRoutes);

// Health
app.get('/', (req, res) => res.json({ status: 'ok', env: process.env.NODE_ENV || 'development' }));

module.exports = app;
