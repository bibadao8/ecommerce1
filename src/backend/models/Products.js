const mongoose = require('mongoose')

// Định nghĩa Schema và Model cho Product
const ProductSchema = new mongoose.Schema({
    name: String,  
    description: String,
    price: Number,
    salePercent: Number,
    stockQuantity: Number,
    createdDate: Date,
    purchasesNum: Number,
    rating: Number,
    manufacturer: String,
    category_id: Number,
    image_url: String
});

const Product = mongoose.model('Product', ProductSchema);

module.exports = Product;