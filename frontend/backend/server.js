// server.js - unified Express server
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const userRoutes = require('./routes/user'); // routes mounted at /api
const usersRouter = require('./routes/users'); // lightweight router mounted at /users

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Read port and mongo uri (support both names)
const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI || process.env.MONGODB_URI || process.env.MONGOURL;

if (!MONGO_URI) {
  console.error('❌ Missing MongoDB connection string. Set MONGO_URI or MONGODB_URI in your environment (.env)');
  console.error('See backend/.env.example for an example.');
  process.exit(1);
}

// Connect to MongoDB
mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('✅ Connected to MongoDB'))
  .catch(err => {
    console.error('❌ MongoDB connection error:', err.message || err);
    process.exit(1);
  });

// Routes
// Mount controller-style routes at /api (returns { success, data, ... })
app.use('/api', userRoutes);
// Also mount simple routes at /users to keep compatibility with frontend that expects /users
app.use('/users', usersRouter);

app.get('/', (req, res) => {
  res.json({ message: 'Backend API running', routes: ['/api/users', '/users'] });
});

app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
