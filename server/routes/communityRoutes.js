// routes/communityRoutes.js

const express = require("express");
const router = express.Router();
const communityController = require("../controllers/communityController");
const { authenticateToken } = require("../middleware/AuthenticateToken");

router.get("/", authenticateToken, communityController.getCommunities);
router.post("/add", authenticateToken, communityController.addCommunity);
router.put(
    "/update/:id",
    authenticateToken,
    communityController.updateCommunity
);
router.put(
    "/delete/:id",
    authenticateToken,
    communityController.deleteCommunity
);

module.exports = router;
