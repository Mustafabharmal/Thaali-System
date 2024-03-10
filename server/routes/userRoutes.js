const express = require('express');
const userController = require('../controllers/userController');
const router = express.Router();

router.get('/', userController.getAllUsers);
router.post('/add', userController.addUser);
router.put('/update/:id', userController.updateUser);
router.put('/delete/:id', userController.updateUserStatus);

module.exports = router;
