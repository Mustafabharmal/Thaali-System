const express = require("express");
const router = express.Router();
const DashboardController = require("../controllers/DashboardController");
const { authenticateToken } = require("../middleware/AuthenticateToken");

router.get("/", authenticateToken, DashboardController.getData);
// router.post("/add", authenticateToken, DashboardController.addMenu);
// router.put("/update/:id", authenticateToken, DashboardController.updateMenu);
// router.put("/delete/:id", authenticateToken, DashboardController.deleteMenu);

module.exports = router;
