const Product = require('../models/product');

exports.getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) return res.status(404).send('Product not found');
        res.json(product);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
};

exports.updateStock = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) return res.status(404).send('Product not found');

        product.stock = req.body.stock;
        const updatedProduct = await product.save();

        res.json(updatedProduct);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
};