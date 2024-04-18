const express = require("express");
const router = express.Router();
const menuController = require("../controllers/MenuController");
const { authenticateToken } = require("../middleware/AuthenticateToken");

router.get("/", authenticateToken, menuController.getMenus);
router.post("/add", authenticateToken, menuController.addMenu);
router.put("/update/:id", authenticateToken, menuController.updateMenu);
router.put("/delete/:id", authenticateToken, menuController.deleteMenu);

module.exports = router;
