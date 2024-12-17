const express = require('express');
const router = express.Router();
const { getCustomer, createCustomer, updateCustomer, deleteCustomer } = require('../controllers/customercontroller.js');
const { authMiddleware, verifyRBAC, routeLog} = require('../middleware/authRBAC.js');

router.get('/:id', authMiddleware, verifyRBAC(['Admin']), routeLog('Customer get route accessed'), getCustomer);
router.post('/', authMiddleware, verifyRBAC(['Admin']), routeLog('Customer post route accessed'), createCustomer); 
router.put('/:id', authMiddleware, verifyRBAC(['Admin']), routeLog('Customer put route accessed'), updateCustomer);
router.delete('/:id', authMiddleware, verifyRBAC(['Admin']), routeLog('Customer delete route accessed'), deleteCustomer);

module.exports = router;