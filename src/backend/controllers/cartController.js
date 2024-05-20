// controllers/CartController.js

const CartItem = require('../models/Carts');

class CartController {
    static async getAllCartItems(req, res) {
        try {
            const cartItems = await CartItem.find();
            res.json(cartItems);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    static async addToCart(req, res) {
        const { name, price, quantity, imageURL } = req.body; // Thêm imageURL vào body request
        const newItem = new CartItem({ name, price, quantity, imageURL });
        try {
            const savedItem = await newItem.save();
            res.status(201).json(savedItem);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }

    static async removeFromCart(req, res) {
        const id = req.params.id;
        try {
            await CartItem.findByIdAndDelete(id);
            res.json({ message: 'Item deleted' });
        } catch (error) {
            res.status(404).json({ message: error.message });
        }
    }

    static async updateCartItem(req, res) {
        const id = req.params.id;
        const { quantity, imageURL } = req.body; // Thêm imageURL vào body request
        try {
            const updatedItem = await CartItem.findByIdAndUpdate(id, { quantity, imageURL }, { new: true });
            res.json(updatedItem);
        } catch (error) {
            res.status(404).json({ message: error.message });
        }
    }
}

module.exports = CartController;
