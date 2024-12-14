const Customer = require('../models/customer');

exports.getCustomer = async (req, res) => {
  try {
    const customer = await Customer.findById(req.params.id);
    if (!customer) return res.status(404).send('Customer not found');
    res.json(customer);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

exports.createCustomer = async (req, res) => {
  try {
    const customer = new Customer(req.body);
    await customer.save();
    res.status(201).json(customer);
  } catch (err) {
    res.status(400).send(err.message);
  }
};

exports.updateCustomer = async (req, res) => {
  try {
    const customer = await Customer.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!customer) return res.status(404).send('Customer not found');
    res.json(customer);
  } catch (err) {
    res.status(400).send(err.message);
  }
};

exports.deleteCustomer = async (req, res) => {
  try {
    const customer = await Customer.findByIdAndDelete(req.params.id);
    if (!customer) return res.status(404).send('Customer not found');
    res.json({ message: 'Customer deleted' });
  } catch (err) {
    res.status(500).send(err.message);
  }
};