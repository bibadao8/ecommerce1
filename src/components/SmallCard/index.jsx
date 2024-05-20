import React, { useState, useEffect } from 'react';
import axios from 'axios';  //axios: Đây là một thư viện phổ biến dùng để thực hiện các yêu cầu HTTP trong JavaScript
import './index.scss'
import { useNavigate } from 'react-router-dom';
import { formatCurrency } from '../../utils';

function SmallCard({productId}) {
  const navigate = useNavigate();

const handleClick = () => {
    navigate(`/product-preview/${productId}`);
};

  //  Lấy thông tin của sản phẩm có ID: productId
  const [product, setProduct] = useState(null);

  //  QUAN TRỌNG
  useEffect(() => {
    const fetchData = async () => {
      try {
        /*
          Còn nhớ link tài nguyên không? => http://localhost:5000/...
          Trước đấy ta đã tạo đường dẫn tại productRoutes.js
          Và xử lý logic yêu cầu tại productControllers.js
          => Tìm sản phẩm theo ID nên ta sẽ sử dụng đường dẫn tương ứng với yêu cầu đó
            => http://localhost:5000/products/:id
          Và ta muốn lấy thông tin của CSDL để hiển thị
            => Sử dụng GET qua axios
          Như vậy tổng thể mục đích của câu lệnh dưới:
            const response = await axios.get(`http://localhost:5000/products/${productId}`); 
          => Dùng để gửi yêu cầu HTTP GET đến một URL nhất định và chờ kết quả,
          sau đó lưu vào biến response, chính là phản hồi của server.
        */  
        const response = await axios.get(`http://localhost:5000/products/${productId}`);

        /* Vậy giả sử nếu response nhận được kết quả thì nó là loại gì? int? string?
        Không, nó là một kiểu dữ liệu như này: (ví dụ với một sản phẩm có id cụ thể)
          {
          "status": 200,
          "statusText": "OK",
          "headers": {
            "content-type": "application/json"
          },
          //  ĐẶC BIỆT CHÚ Ý "data" vì đây chính là dữ liệu lấy từ CSDL
          "data": {
            "_id": "662d235e4d4e5120feba0e8d",
            "name": "Dell Inspiron 15 5000",
            "description": "Laptop mạnh mẽ với vi xử lý Intel Core i7, màn hình Full HD 15.6 inch.",
            "price": 20000000,
            "salePercent": 10,
            "stockQuantity": 50,
            "createdDate": "2023-10-15T00:00:00.000Z",
            "purchasesNum": 100,
            "rating": 4.5,
            "manufacturer": "Dell",
            "category_id": 1,
            "imageURL": "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcRmxdGW4FpbXUFYjfn3d8diQ0BJ78xoXVFkIp0eAL7WJJKlU-6ePGfVcQDTcxoL2Q8uMxpWGnQGxT9hJzMRWPlKlVg2C7szEUIIqT2aScntgC6exBlFAhOe&usqp=CAE"
          },
          "config": {
            "method": "get",
            "url": "http://localhost:5000/products/662d235e4d4e5120feba0e8d"
          }
        }
        => Chính vì vậy, ta sẽ lưu response.data vào product để hiển thị kết quả
        */
        setProduct(response.data); // Cập nhật state với thông tin sản phẩm nhận được từ server
      } catch (error) {
        console.error('Error fetching product:', error);
      }
    };
    fetchData();
  }, [productId]);

  //  Giá trị hiển thị mặc định nếu product == null
  let imageURL = "" 
  let name = "Tên sản phẩm"
  let summary = "Tổng quan sản phẩm"
  let currPrice = 5000000
  let defPrice = 10000000
  let salePercent = 0

  let isOutOfStock = false;
  let isPublishedYet = true;

  if(product != null){
    //  Nếu product != null => Gán các thuộc tính cần thiết để hiển thị
    name = product.name
    summary = product.description
    salePercent = product.salePercent
    defPrice = product.price
    currPrice = product.price - (product.price*salePercent/100)
    imageURL = product.imageURL

    isOutOfStock = product.stockQuantity <= 0;

    var currentDate = new Date();
    var createdDateString = '2024-09-20';
    var createdDate = new Date(product.createdDate);
    var currentDateString = currentDate.toISOString().slice(0, 10); 
    var createdDateString = createdDate.toISOString().slice(0, 10);
    if (createdDateString > currentDateString) {
        isPublishedYet = false;
    } else {
        isPublishedYet = true; 
    }
  }

  return (
    <div className='SmallCard' onClick={handleClick}>
      {salePercent > 0 && <div className="SalePercent">{
        salePercent
      }%
      </div>}
      <div className='imageContainer'>
        <img src={imageURL} alt="" className='productImage' />
      </div>
      <div className="productName">{name}</div>
      <div className="productSummary">{summary}</div>
      {(!isOutOfStock && isPublishedYet ) && (
        <div>
          <div className="currentPrice">{formatCurrency(currPrice)}</div>
          {salePercent > 0 && <div className="defaultPrice">{formatCurrency(defPrice)}</div>}
        </div>
      )}
      {isOutOfStock && <div className='outOfStock'>Hết hàng</div>}
      {!isPublishedYet && <div className='comingSoon'>Sắp ra mắt</div>}
    </div>
  )
}

export default SmallCard;
