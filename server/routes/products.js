const express = require('express');
const Product = require('../models/Product');

const router = express.Router();

// Get all products with optional search
router.get('/products', async (req, res) => {
    try {
        const { name_like } = req.query;
        let query = {};

        if (name_like) {
            query.name = { $regex: name_like, $options: 'i' };
        }

        const products = await Product.find(query);
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

// Get single product
router.get('/products/:id', async (req, res) => {
    try {
        const product = await Product.findOne({ id: parseInt(req.params.id) });
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.json(product);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

// Get featured products
router.get('/featured_products', async (req, res) => {
    try {
        const products = await Product.find({ best_seller: true });
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

module.exports = router;
