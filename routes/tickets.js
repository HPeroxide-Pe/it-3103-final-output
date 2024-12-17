const express = require('express');
const router = express.Router();
const ticketsController = require('../controllers/ticketscontroller');
const { authMiddleware, verifyRBAC } = require('../middleware/authRBAC.js');

router.get('/:id', authMiddleware, verifyRBAC(['Admin', 'Support']), ticketsController.getTicketById);
router.post('/', authMiddleware, verifyRBAC(['Admin', 'Support']), ticketsController.createTicket);
router.put('/:id', authMiddleware, verifyRBAC(['Admin', 'Support']), ticketsController.updateTicket);

module.exports = router;