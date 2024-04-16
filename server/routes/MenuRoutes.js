const express = require('express');
const router = express.Router();
const menuController = require('../controllers/MenuController');

router.get('/', menuController.getMenus);
router.post('/add', menuController.addMenu);
router.put('/update/:id', menuController.updateMenu);
router.put('/delete/:id', menuController.deleteMenu);

module.exports = router;
