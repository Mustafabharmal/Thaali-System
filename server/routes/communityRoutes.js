// routes/communityRoutes.js

const express = require('express');
const router = express.Router();
const communityController = require('../controllers/communityController');

router.get('/', communityController.getCommunities);
router.post('/add', communityController.addCommunity);
router.put('/update/:id', communityController.updateCommunity);
router.put('/delete/:id', communityController.deleteCommunity);

module.exports = router;
    