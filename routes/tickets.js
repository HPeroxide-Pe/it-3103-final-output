const express = require('express');
const router = express.Router();
const ticketsController = require('../controllers/ticketscontroller');

router.get('/:id', ticketsController.getTicketById);
router.post('/', ticketsController.createTicket);
router.put('/:id', ticketsController.updateTicket);

module.exports = router;