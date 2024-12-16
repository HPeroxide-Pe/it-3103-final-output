const express = require('express');
const router = express.Router();
const { getCustomer, createCustomer, updateCustomer, deleteCustomer } = require('../controllers/customercontroller.js');
const { authMiddleware, verifyRBAC } = require('../middleware/authRBAC.js');

router.get('/:id', getCustomer);
router.post('/', authMiddleware, verifyRBAC(['Admin']), createCustomer); //tested the middleware; works
router.put('/:id', updateCustomer);
router.delete('/:id', deleteCustomer);

module.exports = router;