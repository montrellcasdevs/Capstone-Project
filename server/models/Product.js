const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    id: {
        type: Number,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true
    },
    overview: {
        type: String,
        required: true
    },
    long_description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    poster: {
        type: String,
        required: true
    },
    image_local: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        required: true,
        min: 1,
        max: 5
    },
    in_stock: {
        type: Boolean,
        default: true
    },
    size: {
        type: Number,
        required: true
    },
    best_seller: {
        type: Boolean,
        default: false
    }
}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);
