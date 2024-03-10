const express = require('express');
const userController = require('../controllers/userController');
const router = express.Router();

router.get('/users', userController.getAllUsers);
router.post('/add/user', userController.addUser);
router.put('/update/user/:id', userController.updateUser);
router.put('/users/delete/:id', userController.updateUserStatus);

module.exports = router;
