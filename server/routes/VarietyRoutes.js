const express = require('express');
const router = express.Router();
const varietController = require('../controllers/VarietyController');

router.get('/', varietController.getVariets);
router.post('/add', varietController.addVariet);
router.put('/update/:id', varietController.updateVariet);
router.put('/delete/:id', varietController.deleteVariet);

module.exports = router;
