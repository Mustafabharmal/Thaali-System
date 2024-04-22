const express = require("express");
const router = express.Router();
// const  = require("../controllers/MenuController");
const feedComReqController = require("../controllers/FeedComReqController");
const { authenticateToken } = require("../middleware/AuthenticateToken");

router.get("/", authenticateToken,feedComReqController.getFeedComReqs );
router.post("/add", authenticateToken,feedComReqController.addFeedComReq );
router.put("/update/:id", authenticateToken,feedComReqController.editFeedComReq );
router.put("/delete/:id", authenticateToken, feedComReqController.deleteFeedComReq);
// router.get("/dashboard", authenticateToken, feedComReqController.deleteFeedComReq);

// router.post("/add", authenticateToken, menuController.addMenu);
// router.put("/update/:id", authenticateToken, menuController.updateMenu);
// router.put("/delete/:id", authenticateToken, menuController.deleteMenu);

module.exports = router;
