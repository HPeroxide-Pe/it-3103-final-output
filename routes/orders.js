const express = require('express');
const router = express.Router();
const ordersController = require('../controllers/orderscontroller');
const { authMiddleware, verifyRBAC, routeLog} = require('../middleware/authRBAC.js');

router.post('/', authMiddleware, verifyRBAC(['Admin', 'Sales']), routeLog('Order post route accessed'), ordersController.createOrder);
router.get('/', authMiddleware, verifyRBAC(['Admin', 'Sales']), routeLog('Order post route accessed'), orderController.getAllOrders);
router.get('/:id', authMiddleware, verifyRBAC(['Admin', 'Sales']), routeLog('Order post route accessed'), orderController.getOrderById);
router.put('/:id', authMiddleware, verifyRBAC(['Admin', 'Sales']), routeLog('Order post route accessed'), orderController.updateOrder);
router.delete('/:id', authMiddleware, verifyRBAC(['Admin', 'Sales']), routeLog('Order post route accessed'), orderController.deleteOrder);

module.exports = router;