const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    image: {
        type: String,   // String becoz we've to provide image path in string
        required: true
    },
});

module.exports = mongoose.model('Product', ProductSchema);