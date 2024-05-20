// models/CartItem.js

const mongoose = require('mongoose');

const cartItemSchema = new mongoose.Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true },
    quantity: { type: Number, required: true },
    imageURL: { type: String, required: true } // Thêm trường imageURL để lưu trữ link ảnh
});

const CartItem = mongoose.model('CartItem', cartItemSchema);

module.exports = CartItem;
