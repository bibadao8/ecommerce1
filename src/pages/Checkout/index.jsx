import React from "react";
import './index.scss'
import {DeleteOutlined} from '@ant-design/icons';
function Checkout() {
    return (
        <div className="Checkout">
             <div class="gio-hang">
                <p>THANH TOÁN</p>
                <button>Giỏ hàng</button>
            </div>
        <div class="danh-ten">

            <p class="dt-sp">SẢN PHẨM</p>
            <p class="dt-pl">PHÂN LOẠI</p>
            <p class="dt-dg">ĐƠN GIÁ</p>
            <p class="dt-sl">SỐ LƯỢNG</p>
            <p class="dt-st">SỐ TIỀN</p>
        </div>
        <div class="Cart-one">
            <div class="Cart-img">
                <img src="https://p-vn.ipricegroup.com/uploaded_43db79bf8c3dfc144ff570da797c3d3e1c5850c3.jpg" alt=""></img>
            </div>
            <p class="Cart-name">4K UHD LED Smart TV with Chromecast Built-in </p>
            <div class="Cart-pl">
            <p>Phân loại</p>
                <select id="cart-items" name="cart-items">
                <option value="128gb">128GB</option>
                <option value="256gb">256GB</option>
                <option value="512gb">512GB</option>
                <option value="1tb">1TB</option>
                </select>
            </div>
            <div class="Cart-price">
                <span class="Cart-gia-goc">70000đ</span>
                <span class="Cart-gia-ban">90000đ</span>
            </div>
            <div class="Cart-sl">
                <button>-</button>
                <input value={1}></input>
                <button>+</button>
            </div>
            <p class="Cart-st">70000đ</p>

        </div>
        <div class="Cart-one">
            <div class="Cart-img">
                <img src="https://p-vn.ipricegroup.com/uploaded_43db79bf8c3dfc144ff570da797c3d3e1c5850c3.jpg" alt=""></img>
            </div>
            <p class="Cart-name">4K UHD LED Smart TV with Chromecast Built-in </p>
            <div class="Cart-pl">
            <p>Phân loại</p>
                <select id="cart-items" name="cart-items">
                <option value="128gb">128GB</option>
                <option value="256gb">256GB</option>
                <option value="512gb">512GB</option>
                <option value="1tb">1TB</option>
                </select>
            </div>
            <div class="Cart-price">
                <span class="Cart-gia-goc">70000đ</span>
                <span class="Cart-gia-ban">90000đ</span>
            </div>
            <div class="Cart-sl">
                <button>-</button>
                <input value={1}></input>
                <button>+</button>
            </div>
            <p class="Cart-st">70000đ</p>

        </div>
        </div>
    )
}

export default Checkout;
