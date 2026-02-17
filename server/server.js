require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');

// Import routes
const authRoutes = require('./routes/auth');
const productRoutes = require('./routes/products');
const protectedRoutes = require('./routes/protected');

const app = express();
const PORT = process.env.PORT || 8000;

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/', authRoutes); // /login, /register
app.use('/444', productRoutes); // /444/products, /444/featured_products
app.use('/600', protectedRoutes); // /600/users/:id
app.use('/660', protectedRoutes); // /660/orders

// Health check
app.get('/', (req, res) => {
    res.json({ message: 'Bookstore API is running' });
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'We could not complete your request right now. Please try again.' });
});

app.listen(PORT, () => {
    console.log(`🚀 Server is running on port ${PORT}`);
});
