const express = require('express');
const router = express.Router();
const { getProfile, updateProfile, uploadAvatar, getAllUsers, deleteUser } = require('../controllers/userController');
const { protect, admin } = require('../middlewares/auth.middleware');
const upload = require('../middlewares/upload');

// Routes
router.route('/profile').get(protect, getProfile).put(protect, updateProfile);
router.route('/profile/avatar').put(protect, upload.single('avatar'), uploadAvatar);
router.route('/users').get(protect, admin, getAllUsers);
router.route('/users/:id').delete(protect, admin, deleteUser);

module.exports = router;