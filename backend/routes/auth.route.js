const express = require('express');
const router = express.Router();
const { signup, login, logout } = require('../controllers/auth.controller');

// API endpoints used by Tester (Student 3)
router.post('/signup', signup);
router.post('/login', login);
router.get('/logout', logout);

module.exports = router;
