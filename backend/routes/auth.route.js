const express = require('express');
const { signup, login, logout, forgotPassword, resetPassword } = require('../controllers/auth.controller');

const router = express.Router();

// POST /api/auth/signup
router.post('/signup', signup);

// POST /api/auth/register
router.post('/register', signup);

// POST /api/auth/login
router.post('/login', login);

// GET /api/auth/logout
router.get('/logout', logout);

// POST /api/auth/forgot-password
router.post('/forgot-password', forgotPassword);

// PUT /api/auth/reset-password/:token
router.put('/reset-password/:token', resetPassword);

module.exports = router;