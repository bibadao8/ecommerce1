import React, {useState, useEffect} from 'react';
import SmallCard from "../../components/SmallCard";
import {useNavigate} from 'react-router-dom';
import axios from 'axios';
import './index.scss'

function ProductPanel({topic, category_id, cantShowAll}) {
  const [productByCategory, setproductByCategory] = useState([]);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        let response;
        if (category_id === 0) {
          response = await axios.get('http://localhost:5000/products/most-bought');
        } else {
          response = await axios.get(`http://localhost:5000/products/category/${category_id}`);
        }
        setproductByCategory(response.data);
      } catch (error) {
        console.error('Error fetching products by category:', error);
      }
    };
  
    fetchData();
  }, [category_id]); // Thêm category_id vào dependency array
  

  const defList = [];
  for (let i = 0; i < 5; i++) {
    if(productByCategory[i])
      defList.push(<SmallCard productId={productByCategory[i]._id}/>);
  }

  const productList = defList

  const navigate = useNavigate();
  const toCategoryResult = () => {
    let keyword;
    if (category_id === 1) {
      keyword = "Laptop"
    }else if(category_id === 2){
      keyword = "PC"
    }else if(category_id === 3){
      keyword = "Linh kiện"
    }else if(category_id === 4){
      keyword = "Phụ kiện"
    }else{
      keyword = "Sản phẩm cũ"
    }
    navigate(`/search-result?keyword=${encodeURIComponent(keyword)}`);
  };


  return (
    <div className='ProductPanel'>
      <div className="productPanel_Top">
        <div className="Topic">{topic}</div>
        {!cantShowAll && (  // Hiển thị nút nếu `canShowAll` là `true`
        <button className="viewAll" onClick={toCategoryResult}>
          Xem tất cả
        </button>
      )}
      </div>
      <div className="productPanel_Bottom">
        {productList.length == 0 && defList}
        {productList}
      </div>
    </div>
  )
}

export default ProductPanel;
