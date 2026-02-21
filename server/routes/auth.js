const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const router = express.Router();

const issueAccessToken = (userId) => jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: '7d' });

// Register
router.post('/register', async (req, res) => {
    try {
        const { email, password, name } = req.body;

        // Check if user exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create user
        const user = new User({
            name,
            email,
            password: hashedPassword
        });

        await user.save();

        // Generate token
        const accessToken = issueAccessToken(user._id);

        res.status(201).json({
            accessToken,
            user: {
                id: user._id,
                name: user.name,
                email: user.email
            }
        });
    } catch (error) {
        res.status(500).json({ message: 'We could not process your request right now. Please try again.' });
    }
});

// Login
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        // Find user
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        // Check password
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        // Generate token
        const accessToken = issueAccessToken(user._id);

        res.json({
            accessToken,
            user: {
                id: user._id,
                name: user.name,
                email: user.email
            }
        });
    } catch (error) {
        res.status(500).json({ message: 'We could not process your request right now. Please try again.' });
    }
});

// Guest Login (credentials remain server-side)
router.post('/login/guest', async (req, res) => {
    try {
        const guestEmail = process.env.GUEST_EMAIL;
        const guestPassword = process.env.GUEST_PASSWORD;

        if (!guestEmail || !guestPassword) {
            return res.status(503).json({ message: 'Guest login is unavailable right now.' });
        }

        const user = await User.findOne({ email: guestEmail });
        if (!user) {
            return res.status(503).json({ message: 'Guest login is unavailable right now.' });
        }

        const isPasswordValid = await bcrypt.compare(guestPassword, user.password);
        if (!isPasswordValid) {
            return res.status(503).json({ message: 'Guest login is unavailable right now.' });
        }

        const accessToken = issueAccessToken(user._id);

        res.json({
            accessToken,
            user: {
                id: user._id,
                name: user.name,
                email: user.email
            }
        });
    } catch (error) {
        res.status(500).json({ message: 'We could not process your request right now. Please try again.' });
    }
});

module.exports = router;
