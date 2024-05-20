import React from "react";
import './index.scss';

function Cart() {
    const cartItems = [
        { href: "https://hacom.vn/uu-dai-mua-som-giam-nhieu", imgSrc: "./images/A8.png", imgClass: "A8-icon" },
        { href: "https://hacom.vn/mua-1-tang-1-khuay-dong-mua-he-voi-go-pro", imgSrc: "./images/A7.png", imgClass: "A7-icon" },
        { href: "https://www.anphatpc.com.vn/tiec-sale-gio-vang-linh-dinh-deal-hot.html", imgSrc: "./images/A6.png", imgClass: "A6-icon" },
        { href: "https://www.anphatpc.com.vn/sap-gia-cuoi-tuan-deal-ngon-cham-dinh.html", imgSrc: "./images/A5.png", imgClass: "A5-icon" },
        { href: "https://www.anphatpc.com.vn/deal-giai-nhiet-qua-thu-thiet.html", imgSrc: "./images/A4.png", imgClass: "A4-icon" },
        { href: "https://www.anphatpc.com.vn/rinh-voucher-khung-quay-le-cuc-sung.html", imgSrc: "./images/A3.png", imgClass: "A3-icon" },
        { href: "https://www.anphatpc.com.vn/may-in-tot-hot-deal-ngon.html", imgSrc: "./images/A2.png", imgClass: "A2-icon" },
        { href: "https://www.anphatpc.com.vn/voucher-2-cu-tang-du-ca-ram.html", imgSrc: "./images/A1.png", imgClass: "A1-icon" },
    ];

    return (
        <div className="trang-khuyn-mi">
            {cartItems.map((item, index) => (
                <a key={index} href={item.href}>
                    <img className={item.imgClass} loading="lazy" alt="" src={item.imgSrc} />
                </a>
            ))}
        </div>
    );
}

export default Cart;
