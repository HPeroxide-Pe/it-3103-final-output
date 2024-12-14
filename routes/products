const express = require('express');
const router = express.Router();
const productsController = require('../controllers/productscontroller');

router.get('/:id', productsController.getProductById);
router.put('/:id/stock', productsController.updateStock);

module.exports = router;