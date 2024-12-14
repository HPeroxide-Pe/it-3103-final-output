const Ticket = require('../models/ticket');

exports.getTicketById = async (req, res) => {
    try {
        const ticket = await Ticket.findById(req.params.id);
        if (!ticket) return res.status(404).send('Ticket not found');
        res.json(ticket);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
};

exports.createTicket = async (req, res) => {
    try {
        const newTicket = new Ticket(req.body);
        const savedTicket = await newTicket.save();
        res.status(201).json(savedTicket);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
};

exports.updateTicket = async (req, res) => {
    try {
        const updatedTicket = await Ticket.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedTicket) return res.status(404).send('Ticket not found');
        res.json(updatedTicket);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
};