const express = require("express");
const userController = require("../controllers/userController");
const { authenticateToken } = require("../middleware/AuthenticateToken");
const router = express.Router();

router.get("/", authenticateToken, userController.getAllUsers);
router.post("/add", authenticateToken, userController.addUser);
router.put("/update/:id", authenticateToken, userController.updateUser);
router.put("/delete/:id", authenticateToken, userController.updateUserStatus);

module.exports = router;
