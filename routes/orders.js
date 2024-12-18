const express = require('express');
const router = express.Router();
const ordersController = require('../controllers/orderscontroller');
const { authMiddleware, verifyRBAC, routeLog} = require('../middleware/authRBAC.js');

router.post('/', authMiddleware, verifyRBAC(['Admin', 'Sales']), routeLog('Order post route accessed'), ordersController.createOrder);
router.get('/', authMiddleware, verifyRBAC(['Admin', 'Sales']), routeLog('Order post route accessed'), ordersController.getAllOrders);
router.get('/:id', authMiddleware, verifyRBAC(['Admin', 'Sales']), routeLog('Order post route accessed'), ordersController.getOrderById);
router.put('/:id', authMiddleware, verifyRBAC(['Admin', 'Sales']), routeLog('Order post route accessed'), ordersController.updateOrder);
router.delete('/:id', authMiddleware, verifyRBAC(['Admin', 'Sales']), routeLog('Order post route accessed'), ordersController.deleteOrder);

module.exports = router;