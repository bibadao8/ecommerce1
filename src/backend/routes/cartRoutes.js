// routes/cartRoutes.js

const express = require('express');
const router = express.Router();
const CartController = require('../controllers/cartController');

router.get('/carts', CartController.getAllCartItems);
router.post('/carts', CartController.addToCart);
router.delete('/carts/:id', CartController.removeFromCart);
router.put('/carts/:id', CartController.updateCartItem);

module.exports = router;
