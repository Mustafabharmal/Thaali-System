const express = require('express');
const router = express.Router();
const varietController = require('../controllers/VarietyController');

const  {authenticateToken}  = require('../middleware/AuthenticateToken');

router.get('/',authenticateToken,varietController.getVariets);
router.post('/add',authenticateToken, varietController.addVariet);
router.put('/update/:id',authenticateToken, varietController.updateVariet);
router.put('/delete/:id', authenticateToken,varietController.deleteVariet);

module.exports = router;
