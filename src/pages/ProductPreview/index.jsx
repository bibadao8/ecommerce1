import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { formatCurrency } from '../../utils';
import './index.scss';
import { FaShippingFast,FaHeadset,FaShieldAlt,FaMedal } from "react-icons/fa";

function ProductPreview() {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/products/${productId}`);
        setProduct(response.data);
        setLoading(false);
      } catch (err) {
        console.error('Lỗi khi tải sản phẩm:', err);
        setError('Không thể tải dữ liệu sản phẩm.');
        setLoading(false);
      }
    };
    fetchProduct();
  }, [productId]);

  if (loading) {
    return <div>Đang tải...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  const discountedPrice = product.price - (product.price * (product.salePercent / 100));

  return (
    <div className="ProductPreview">
      <div className="productImageContainer">
        <img src={product.imageURL} alt={product.name} className="productImage" />
        <div className="productImageOverlay">
          <p className="productOg"><FaMedal />Hàng chính hãng</p>
          <p className="productShipping"> <FaShippingFast />Giao hàng miễn phí</p>
        </div>
        <div className="productOriginal">
        <p className="productHelp"><FaHeadset />Hỗ trợ cài đặt miễn phí</p>
          <p className="productWarranty"><FaShieldAlt /> Bảo hành 12 Tháng</p>
          </div>
      </div>
      <div className="productInfo">
        <h2 className="productName">{product.name}</h2>
        <p className="productDescription">Mô tả: {product.description}</p>
        <p className="productPrice">
          Giá: {formatCurrency(discountedPrice)}
          {product.salePercent > 0 && (
            <span className="original-price"> {formatCurrency(product.price)}</span>
          )}
        </p>
        <p className="product-stock">Còn lại: {product.stockQuantity} sản phẩm</p>
        <p className="product-rating">Đánh giá: {product.rating} / 5</p>
        <div className="product-details">
          <h3>Chi tiết sản phẩm</h3>
          <ul>
            {Object.entries(product.details).map(([key, value]) => (
              <li key={key}><strong>{key}:</strong> {value}</li>
            ))}
          </ul>
        </div>
        <div className="product-buttons">
          <button className="btn btn-primary btn-xl btn-full" id="btn-buy-now">
            <div><strong>MUA NGAY</strong></div>
            <p>Giao hàng miễn phí hoặc nhận tại shop</p>
          </button>
          <div className="btn btn-info btn-xl btn-half" id="btn-installment">
            <div><strong>TRẢ GÓP 0%</strong></div>
            <p>Duyệt nhanh qua điện thoại</p>
          </div>
          <div className="btn btn-info btn-xl btn-half" id="btn-installment-card">
            <div><strong>TRẢ GÓP QUA THẺ</strong></div>
            <p>Visa, Master Card, JCB, AMEX</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductPreview;
