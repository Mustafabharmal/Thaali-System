const express = require("express");
const authController = require("../controllers/authController");
const router = express.Router();

router.post("/login", authController.login);
router.post("/logout", authController.logout);
router.post("/forgetPassword", authController.forgetPassword);
router.post("/UpdatePassword", authController.UpdatePassword);
// router.put('/update/:id', userController.updateUser);
// router.put('/delete/:id', userController.updateUserStatus);

module.exports = router;
