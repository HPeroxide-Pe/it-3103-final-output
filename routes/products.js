const express = require('express');
const router = express.Router();
const productsController = require('../controllers/productscontroller');
const { authMiddleware, verifyRBAC, routeLog } = require('../middleware/authRBAC.js');

router.get('/:id', authMiddleware, verifyRBAC(['Admin', 'Sales']), routeLog('Product get route accessed'), productsController.getProductById);
router.put('/:id/stock', authMiddleware, verifyRBAC(['Admin', 'Sales']), routeLog('Product put route accessed'), productsController.updateStock);

module.exports = router;