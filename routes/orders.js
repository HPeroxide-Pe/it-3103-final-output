const express = require('express');
const router = express.Router();
const ordersController = require('../controllers/orderscontroller');
const { authMiddleware, verifyRBAC, routeLog} = require('../middleware/authRBAC.js');

router.post('/', authMiddleware, verifyRBAC(['Admin', 'Sales']), routeLog('Order post route accessed'), ordersController.createOrder);

module.exports = router;