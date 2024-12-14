const express = require('express');
const router = express.Router();
const { getCustomer, createCustomer, updateCustomer, deleteCustomer } = require('../controllers/customercontroller.js');

router.get('/:id', getCustomer);
router.post('/', createCustomer);
router.put('/:id', updateCustomer);
router.delete('/:id', deleteCustomer);

module.exports = router;