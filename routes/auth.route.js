const express = require('express');
const { signup, login, logout } = require('../controllers/auth.controller');

const router = express.Router();

// POST /api/auth/signup
router.post('/signup', signup);

// POST /api/auth/login
router.post('/login', login);

// GET /api/auth/logout
router.get('/logout', logout);

module.exports = router;