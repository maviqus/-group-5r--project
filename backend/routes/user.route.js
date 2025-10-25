const express = require('express');
const router = express.Router();
const { getProfile, updateProfile, getAllUsers, deleteUser } = require('../controllers/userController');
const { protect, admin } = require('../middlewares/auth.middleware');

// Routes
router.route('/profile').get(protect, getProfile).put(protect, updateProfile);
router.route('/').get(protect, admin, getAllUsers);
router.route('/:id').delete(protect, admin, deleteUser);

module.exports = router;