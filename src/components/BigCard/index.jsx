import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './index.scss'
import {useNavigate} from 'react-router-dom';
import { formatCurrency } from '../../utils';


function BigCard({productId}) {
  const navigate = useNavigate();
  const toProductPreview = () => {
    navigate('/product-preview')
  };

  const [product, setProduct] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/products/${productId}`);
        setProduct(response.data);
      } catch (error) {
        console.error('Error fetching product:', error);
      }
    };
    fetchData();
  }, [productId]);

  let imageURL = "" 
  let name = "Tên sản phẩm"
  let summary = "Tổng quan sản phẩm"
  let currPrice = 5000000
  let defPrice = 10000000
  let salePercent = 20

  if(product != null){
    //  Nếu product != null => Gán các thuộc tính cần thiết để hiển thị
    name = product.name
    summary = product.description
    salePercent = product.salePercent
    defPrice = product.price
    currPrice = product.price - (product.price*salePercent/100)
    imageURL = product.imageURL
  }

  return (
    <div className='BigCard' onClick={toProductPreview}>
      <div className="SalePercent">{salePercent}%</div>
      <div className='imageContainer'>
        <img src={imageURL} alt="" className='productImage'/>
      </div>
      <div className="productName">{name}</div>
      <div className="productSummary">{summary}</div>
      <div className="currentPrice">{formatCurrency(currPrice)}</div>
      {salePercent > 0 && <div className="defaultPrice">{formatCurrency(defPrice)}</div>}
    </div>
  )
}

export default BigCard;
