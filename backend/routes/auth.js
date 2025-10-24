const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Signup
router.post('/signup', async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const existing = await User.findOne({ email });
        if (existing) return res.status(400).json({ message: 'Email already exists' });
        const user = await User.create({ name, email, password });
        res.status(201).json({ id: user._id, name: user.name, email: user.email });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Login
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email }).select('+password');
        if (!user) return res.status(400).json({ message: 'Invalid credentials' });
        const ok = await user.comparePassword(password);
        if (!ok) return res.status(400).json({ message: 'Invalid credentials' });
        const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET || 'secret', { expiresIn: '1h' });
        res.json({ token });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Logout (client-side flow) - just acknowledge
router.post('/logout', (req, res) => {
    res.json({ message: 'Logged out (client should discard token)' });
});

module.exports = router;
