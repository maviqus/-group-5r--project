const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.get('/users', userController.getUsers);
router.post('/users', userController.createUser);
router.post('/users/seed', userController.seedUsers);
router.get('/users/in-memory', userController.getInMemoryUsers);
router.put('/users/:id', userController.updateUser);   // PUT
router.delete('/users/:id', userController.deleteUser); // DELETE

// Auth routes
router.post('/signup', userController.signup);
router.post('/login', userController.login);
router.post('/logout', userController.logout);

// Profile routes (cần xác thực)
router.get('/profile', userController.authenticate, userController.getProfile);
router.put('/profile', userController.authenticate, userController.updateProfile);

module.exports = router;
