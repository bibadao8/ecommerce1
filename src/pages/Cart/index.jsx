import './index.scss'
import React, { useState, useEffect } from "react";
import axios from "axios";
import { DeleteOutlined } from '@ant-design/icons';

function Cart() {
    const [cartItems, setCartItems] = useState([]);
    const [checkedItems, setCheckedItems] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:5000/carts")
            .then(response => {
                const cartItemsArray = Object.values(response.data);
                const initialCheckedItems = new Array(cartItemsArray.length).fill(false);
                setCartItems(cartItemsArray.map(item => ({ ...item, checked: false })));
                setCheckedItems(initialCheckedItems);
            })
            .catch(error => {
                console.error("Error fetching cart items:", error);
            });
    }, []);
// .....
    const removeFromCart = (_id) => {
        axios.delete(`http://localhost:5000/carts/${_id}`)
            .then(response => {
                console.log("Product removed from cart:", response.data);
                const updatedCartItems = cartItems.filter(item => item._id !== _id);
                setCartItems(updatedCartItems);
            })
            .catch(error => {
                console.error("Error removing product from cart:", error);
            });
    };    

    const increaseQuantity = (_id) => {
        const updatedCart = cartItems.map(item => {
            if (item._id === _id) {
                return { ...item, quantity: item.quantity + 1 };
            }
            return item;
        });
        updateCart(_id, updatedCart.find(item => item._id === _id).quantity, updatedCart.find(item => item._id === _id).imageURL);
    };
    
    const decreaseQuantity = (_id) => {
        const updatedCart = cartItems.map(item => {
            if (item._id === _id && item.quantity > 1) {
                return { ...item, quantity: item.quantity - 1 };
            }
            return item;
        });
        updateCart(_id, updatedCart.find(item => item._id === _id).quantity, updatedCart.find(item => item._id === _id).imageURL);
    };

    const toggleCheckbox = (index) => {
        const updatedCheckedItems = [...checkedItems];
        updatedCheckedItems[index] = !updatedCheckedItems[index];

        const updatedCartItems = cartItems.map((item, idx) => {
            if (idx === index) {
                return { ...item, checked: !item.checked };
            }
            return item;
        });

        setCheckedItems(updatedCheckedItems);
        setCartItems(updatedCartItems);
    };

    const calculateTotal = () => {
        return cartItems.reduce((total, item) => {
            if (item.checked) {
                return total + (item.price * item.quantity);
            }
            return total;
        }, 0);
    };

 
    const updateCart = (id, quantity, imageURL) => {
        axios.put(`http://localhost:5000/carts/${id}`, { quantity, imageURL })
            .then(response => {
                console.log("Cart updated:", response.data);
                const updatedCartItem = response.data;
                const updatedCartItems = cartItems.map(item => {
                    if (item._id === id) {
                        return updatedCartItem;
                    }
                    return item;
                });
                setCartItems(updatedCartItems);
            })
            .catch(error => {
                console.error("Error updating cart:", error);
            });
    };

    return (
        <div className="Cart">
            <div className="gio-hang">
                <p>GIỎ HÀNG</p>
                <a href="/">Thêm sản phẩm</a>
            </div>
            <div className="danh-ten">
                <p className="dt-sp">SẢN PHẨM</p>
                <p className="dt-dg">ĐƠN GIÁ</p>
                <p className="dt-sl">SỐ LƯỢNG</p>
                <p className="dt-st">SỐ TIỀN</p>
                <p className="dt-xoa">XÓA</p>
            </div>
            {cartItems.map((item, index) => (
                <div key={item._id} className="Cart-one">
                    <div className="Cart-option">
                        <input type="checkbox" checked={checkedItems[index]} onChange={() => toggleCheckbox(index)}></input>
                    </div>
                    <div className="Cart-img">
                        <img src={item.imageURL} alt=""></img>
                    </div>
                    <p className="Cart-name">{item.name}</p>
                    <div className="Cart-price">
                        <span className="Cart-gia-goc">{item.price}đ</span>
                        <span className="Cart-gia-ban">{item.price}</span>
                    </div>
                    <div className="Cart-sl">
                        <button onClick={() => decreaseQuantity(item._id)}>-</button>
                        <input value={item.quantity}></input>
                        <button onClick={() => increaseQuantity(item._id)}>+</button>
                    </div>
                    <p className="Cart-st">{item.price * item.quantity}đ</p>
                    <div className="Cart-delete" onClick={() => removeFromCart(item._id)}><DeleteOutlined /></div>
                </div>
            ))}
            <div className="cart-tt">
                <p>Tổng tiền ({cartItems.filter(item => item.checked).length} sản phẩm): {calculateTotal()}đ</p>
                <button>Thanh toán</button>
            </div>
        </div>
    );
}

export default Cart;
