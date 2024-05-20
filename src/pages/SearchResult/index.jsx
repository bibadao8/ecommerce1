import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import './index.scss'
import SmallCard from "../../components/SmallCard";
import { getTruePrice } from '../../utils';

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

function SearchResult({ products }) {
  const query = useQuery();
  const keyword = query.get("keyword"); // Lấy giá trị của 'keyword' từ URL
  let resultNum = 0;

  const [allSmallCards, setAllSmallCards] = useState([]);
  const [allDisplayCards, setAllDisplayCards] = useState([]);
  const [productsFind, setAllProductsFind] = useState([]);
  const [manufacturers, setManufacturers] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedManufacturers, setSelectedManufacturers] = useState([]);

  // Map tên danh mục tới mã danh mục
  const categoryMap = {
    "Laptop": 1,
    "PC": 2,
    "Linh kiện": 3,
    "Phụ kiện": 4,
    "Sản phẩm cũ": 5,
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        let apiEndpoint;

        // Kiểm tra nếu keyword trùng với tên danh mục
        if (categoryMap[keyword]) {
          // Nếu trùng, sử dụng endpoint của danh mục
          const categoryId = categoryMap[keyword];
          apiEndpoint = `http://localhost:5000/products/category/${categoryId}`;
        } else {
          // Nếu không trùng, sử dụng endpoint tìm kiếm
          apiEndpoint = `http://localhost:5000/products/search?keyword=${encodeURIComponent(keyword)}`;
        }

        if (keyword == 'Tất cả') apiEndpoint = `http://localhost:5000/products`;

        // Gọi API với endpoint đã chọn
        const res = await axios.get(apiEndpoint);
        setAllProductsFind(res.data); // Cập nhật state với dữ liệu sản phẩm trả về
        setFilteredProducts(res.data);
        setSelectedManufacturers([]);
      } catch (error) {
        console.error("Error fetching products:", error.message);
      }
    };
    if (keyword) { // Chỉ thực hiện tìm kiếm khi keyword có giá trị
      setSelectedManufacturers(manufacturers); // Đặt lại tất cả các hãng khi sản phẩm thay đổi

      fetchProducts();
    }
  }, [keyword]); // Thực hiện khi keyword thay đổi

  useEffect(() => {
    if (filteredProducts) {
      // Tạo danh sách ban đầu từ products
      const initialCards = filteredProducts.map((product) => (
        <SmallCard productId={product._id} key={product._id} />
      ));
      setAllSmallCards(initialCards);
    }
  }, [filteredProducts]);

  if (productsFind != null) {
    resultNum = productsFind.length
  }

  const extractManufacturers = (products) => {
    const uniqueManufacturers = [...new Set(products.map(p => p.manufacturer))]; // Lấy các hãng duy nhất
    setManufacturers(uniqueManufacturers); // Cập nhật danh sách hãng
    setSelectedManufacturers(uniqueManufacturers);
  };
  // Hàm để lọc sản phẩm theo các hãng được chọn
  const filterProducts = () => {
    if (selectedManufacturers.length === 0) {
      setFilteredProducts(productsFind); // Nếu không có hãng được chọn, trả về tất cả sản phẩm
    } else {
      const filtered = productsFind.filter(p => selectedManufacturers.includes(p.manufacturer));
      setFilteredProducts(filtered); // Cập nhật sản phẩm dựa trên filter
    }
  };

  // Hàm xử lý khi chọn/bỏ chọn các hãng
  const handleManufacturerChange = (manufacturer) => {
    if (selectedManufacturers.includes(manufacturer)) {
      setSelectedManufacturers(selectedManufacturers.filter(m => m !== manufacturer));
    } else {
      setSelectedManufacturers([...selectedManufacturers, manufacturer]);
    }
  };
  const handleAllChange = () => {
    if (selectedManufacturers.length === manufacturers.length) {
      setSelectedManufacturers([]); // Bỏ chọn tất cả
    } else {
      setSelectedManufacturers(manufacturers); // Chọn tất cả
    }
  };

  useEffect(() => {
    extractManufacturers(productsFind); // Trích xuất hãng từ danh sách sản phẩm
  }, [productsFind]); // Cập nhật khi danh sách sản phẩm thay đổi

  useEffect(() => {
    filterProducts(); // Lọc sản phẩm dựa trên các hãng được chọn
  }, [selectedManufacturers]); // Cập nhật khi danh sách hãng được chọn thay đổi
  useEffect(() => {
    if (allSmallCards) {
      setAllDisplayCards(allSmallCards);
      console.log("CHANGE")
    }
  }, [allSmallCards]);
  const sortByPurchase = () => {
    if (filteredProducts) {
      filteredProducts.sort((a, b) => b.purchasesNum - a.purchasesNum);
      updateAllSmallCards();
    }
  }

  const sortLowToHighPrice = () => {
    if (filteredProducts) {
      filteredProducts.sort((a, b) => getTruePrice(a.price, a.salePercent) - getTruePrice(b.price, b.salePercent));
      updateAllSmallCards();
    }
  }

  const sortHighToLowPrice = () => {
    if (filteredProducts) {
      filteredProducts.sort((a, b) => getTruePrice(b.price, b.salePercent) - getTruePrice(a.price, a.salePercent));
      updateAllSmallCards();
    }
  }

  const sortBySale = () => {
    if (filteredProducts) {
      filteredProducts.sort((a, b) => b.salePercent - a.salePercent);
      updateAllSmallCards();
    }
  }

  const sortByDate = () => {
    if (filteredProducts) {
      filteredProducts.sort((a, b) => {
        const dateA = new Date(a.createdDate);
        const dateB = new Date(b.createdDate);

        return dateB - dateA;
      });
      updateAllSmallCards();
    }
  }

  const updateAllSmallCards = () => {
    const sortedCards = filteredProducts.map((product) => (
      <SmallCard productId={product._id} key={product._id} />
    ));
    setAllSmallCards(sortedCards); // Cập nhật state
  }

  const isCategory = !!categoryMap[keyword];

  return (
    <div className="SearchResult">
      <div className="SearchResult-Top">
        <div className="foundInfo">
          {isCategory ? (
            <>
              <span className="special special_2">{keyword.toUpperCase()}</span>
            </>
          ) : (
            <>
              Tìm thấy <span className="special">{resultNum}</span> kết quả tìm kiếm với từ khóa
              <span className="special"> "{keyword}"</span>
            </>
          )}
        </div>
        <div className="popularFilters">
          <button className="filterButton" onClick={sortByPurchase}>Bán chạy nhất</button>
          <button className="filterButton" onClick={sortLowToHighPrice}>Giá tăng dần</button>
          <button className="filterButton" onClick={sortHighToLowPrice}>Giá giảm dần</button>
          <button className="filterButton" onClick={sortBySale}>Giảm giá</button>
          <button className="filterButton" onClick={sortByDate}>Mới nhất</button>
        </div>
      </div>
      <div className="SearchResult-Bottom">
        {productsFind.length === 0 ? (
          <div className="noResultContainer">
            Không tìm thấy kết quả
          </div>
        ) : (
          <>
            <div className="allFilters">
              <div className="singleFilter">
                <div className="filterTopic">THƯƠNG HIỆU</div>
                <div className="allBox">
                  {manufacturers.length >= 2 ? (
                    <>
                      <div className="singleBox">
                        <input
                          type="checkbox"
                          className="custom-checkbox"
                          onClick={handleAllChange}
                          checked={selectedManufacturers.length === manufacturers.length}
                        />
                        <label>Tất cả</label>
                      </div>
                      {manufacturers.map((manufacturer) => (
                        <div key={manufacturer} className="singleBox">
                          <input
                            type="checkbox"
                            checked={selectedManufacturers.includes(manufacturer)}
                            onChange={() => handleManufacturerChange(manufacturer)}
                            className="custom-checkbox"
                          />
                          <label>{manufacturer}</label>
                        </div>
                      ))}
                    </>
                  ) : (
                    <div className="singleBox">
                      <label>{manufacturers[0]}</label>
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className="allSearchProducts">
              {allDisplayCards}
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default SearchResult;
