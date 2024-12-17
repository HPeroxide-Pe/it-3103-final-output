const express = require('express');
const router = express.Router();
const ordersController = require('../controllers/orderscontroller');
const { authMiddleware, verifyRBAC } = require('../middleware/authRBAC.js');

router.post('/', authMiddleware, verifyRBAC(['Admin', 'Sales']), ordersController.createOrder);

module.exports = router;