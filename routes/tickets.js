const express = require('express');
const router = express.Router();
const ticketsController = require('../controllers/ticketscontroller');
const { authMiddleware, verifyRBAC, routeLog } = require('../middleware/authRBAC.js');

router.get('/:id', authMiddleware, verifyRBAC(['Admin', 'Support']), routeLog('Ticket get route accessed'), ticketsController.getTicketById);
router.post('/', authMiddleware, verifyRBAC(['Admin', 'Support']), routeLog('Ticket post route accessed'), ticketsController.createTicket);
router.put('/:id', authMiddleware, verifyRBAC(['Admin', 'Support']), routeLog('Ticket put route accessed'), ticketsController.updateTicket);

module.exports = router;