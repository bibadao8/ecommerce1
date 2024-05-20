const express = require('express');
const productController = require('../controllers/productController');
const router = express.Router();

// Đường dẫn để lấy toàn bộ sản phẩm
router.get('/', productController.getAllProducts);

// Đường dẫn để tìm kiếm sản phẩm theo từ khóa
router.get('/search', productController.searchProducts);

// Đường dẫn để tìm kiếm sản phẩm đang giảm giá
router.get('/on-sale', productController.getProductsOnSale);

// Đường dẫn để lấy sản phẩm có nhiều lượt mua nhất
router.get('/most-bought', productController.getProductsByPurchases);

// Đường dẫn để lấy sản phẩm theo ID
router.get('/:id', productController.getProductById);

// Đường dẫn để lấy sản phẩm theo category_id
router.get('/category/:category_id', productController.getProductsByCategory); // Thêm endpoint mới


module.exports = router;
