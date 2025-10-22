const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Routes cho User CRUD
router.get('/users', userController.getUsers);           // GET tất cả users
router.get('/users/:id', userController.getUserById);    // GET user theo ID
router.post('/users', userController.createUser);        // POST tạo user mới
router.put('/users/:id', userController.updateUser);     // PUT cập nhật user
router.delete('/users/:id', userController.deleteUser);  // DELETE xóa user

module.exports = router;
