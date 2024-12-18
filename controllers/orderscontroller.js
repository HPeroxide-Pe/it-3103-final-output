const Order = require('../models/orders');
const Product = require('../models/product');

exports.createOrder = async (req, res) => {
    try {
        const { customerId, products } = req.body;

        if (!products || products.length === 0) {
            return res.status(400).json({ message: 'Order must have at least one product' });
        }

        let totalAmount = 0;
        for (let i = 0; i < products.length; i++) {
            const product = await Product.findById(products[i].productId);
            if (!product) {
                return res.status(404).json({ message: `Product with ID ${products[i].productId} not found` });
            }
            totalAmount += product.price * products[i].quantity;
        }

        const newOrder = new Order({
            customerId,
            products,
            totalAmount,
        });

        const savedOrder = await newOrder.save();
        res.status(201).json(savedOrder);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
};

exports.getAllOrders = async (req, res) => {
    try {
        const orders = await Order.find().populate('customerId').populate('products.productId');
        res.status(200).json(orders);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
};

exports.getOrderById = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id)
            .populate('customerId')
            .populate('products.productId');
        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }
        res.status(200).json(order);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
};

exports.updateOrder = async (req, res) => {
    try {
        const updatedOrder = await Order.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
        }).populate('customerId').populate('products.productId');
        if (!updatedOrder) {
            return res.status(404).json({ message: 'Order not found' });
        }
        res.status(200).json(updatedOrder);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
};

exports.deleteOrder = async (req, res) => {
    try {
        const deletedOrder = await Order.findByIdAndDelete(req.params.id);
        if (!deletedOrder) {
            return res.status(404).json({ message: 'Order not found' });
        }
        res.status(200).json({ message: 'Order deleted successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
};