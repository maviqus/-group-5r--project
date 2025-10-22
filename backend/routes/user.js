const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.get('/users', userController.getUsers);
router.post('/users', userController.createUser);
router.post('/users/seed', userController.seedUsers);
router.get('/users/in-memory', userController.getInMemoryUsers);
router.put('/users/:id', userController.updateUser);   // PUT
router.delete('/users/:id', userController.deleteUser); // DELETE

module.exports = router;
