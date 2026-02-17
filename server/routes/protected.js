const express = require('express');
const authMiddleware = require('../middleware/auth');
const User = require('../models/User');
const Order = require('../models/Order');

const router = express.Router();

// Get user profile
router.get('/users/:id', authMiddleware, async (req, res) => {
    try {
        if (req.userId.toString() !== req.params.id) {
            return res.status(403).json({ message: 'Unauthorized' });
        }

        const user = await User.findById(req.params.id).select('-password');
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.json({
            id: user._id,
            name: user.name,
            email: user.email
        });
    } catch (error) {
        res.status(500).json({ message: 'We could not load your profile right now. Please try again.' });
    }
});

// Get user orders
router.get('/orders', authMiddleware, async (req, res) => {
    try {
        const userId = req.query['user.id'];
        
        if (req.userId.toString() !== userId) {
            return res.status(403).json({ message: 'Unauthorized' });
        }

        const orders = await Order.find({ 'user.id': userId }).sort({ createdAt: -1 });
        res.json(orders);
    } catch (error) {
        res.status(500).json({ message: 'We could not load your orders right now. Please try again.' });
    }
});

// Create order
router.post('/orders', authMiddleware, async (req, res) => {
    try {
        const { cartList, amount_paid, quantity, user } = req.body;

        if (req.userId.toString() !== user.id) {
            return res.status(403).json({ message: 'Unauthorized' });
        }

        const order = new Order({
            cartList,
            amount_paid,
            quantity,
            user
        });

        await order.save();
        res.status(201).json(order);
    } catch (error) {
        res.status(500).json({ message: 'We could not place your order right now. Please try again.' });
    }
});

module.exports = router;
