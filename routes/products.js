const express = require('express');
const router = express.Router();
const productsController = require('../controllers/productscontroller');
const { authMiddleware, verifyRBAC } = require('../middleware/authRBAC.js');

router.get('/:id', authMiddleware, verifyRBAC(['Admin', 'Sales']), productsController.getProductById);
router.put('/:id/stock', authMiddleware, verifyRBAC(['Admin', 'Sales']), productsController.updateStock);

module.exports = router;