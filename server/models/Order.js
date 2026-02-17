const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    cartList: [{
        id: Number,
        name: String,
        overview: String,
        poster: String,
        price: Number
    }],
    amount_paid: {
        type: Number,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    user: {
        name: String,
        email: String,
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }
    }
}, { timestamps: true });

module.exports = mongoose.model('Order', orderSchema);
