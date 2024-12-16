const express = require('express');
const router = express.Router();
const { getCustomer, createCustomer, updateCustomer, deleteCustomer } = require('../controllers/customercontroller.js');
const { authMiddleware, verifyRBAC } = require('../middleware/authRBAC.js');

router.get('/:id', authMiddleware, verifyRBAC(['Admin']), getCustomer);
router.post('/', authMiddleware, verifyRBAC(['Admin']), createCustomer); 
router.put('/:id', authMiddleware, verifyRBAC(['Admin']), updateCustomer);
router.delete('/:id', authMiddleware, verifyRBAC(['Admin']), deleteCustomer);

module.exports = router;