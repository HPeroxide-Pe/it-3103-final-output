const express = require('express');
const router = express.Router();
const ordersController = require('../controllers/orderscontroller');

router.post('/', ordersController.createOrder);

module.exports = router;