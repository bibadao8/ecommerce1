import { Link } from "react-router-dom";
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { UpOutlined } from '@ant-design/icons';
import './index.scss';

const Header = () => {
  const [isDropdownVisible, setDropdownVisible] = useState(false);
  const [keyword, setKeyword] = useState('');

  const navigate = useNavigate();

  const handleSearch = () => {
    if (keyword.trim() === '') {
      alert('Từ khóa không được trống!');
      return;
    }
    navigate(`/search-result?keyword=${encodeURIComponent(keyword)}`);
    document.getElementById('bar').value = ''
    setKeyword('')
  };
  // Thêm sự kiện bàn phím để kiểm tra nếu nhấn Enter
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch(); // Gọi hàm tìm kiếm
    }
  };

  const toCategoryResult = (id) => {
    let newKeyword = '';

    switch (id) {
      case 1:
        newKeyword = 'Laptop';
        break;
      case 2:
        newKeyword = 'PC';
        break;
      case 3:
        newKeyword = 'Linh kiện';
        break;
      case 4:
        newKeyword = 'Phụ kiện';
        break;
      default:
        newKeyword = 'Sản phẩm cũ';
    }

    setKeyword(''); // Cập nhật keyword
    setDropdownVisible(false)
    
    // Thay vì điều hướng ngay, sử dụng useEffect để đảm bảo trạng thái được cập nhật
    navigate(`/search-result?keyword=${encodeURIComponent(newKeyword)}`);
  };

  const handleMouseEnter = () => {
    setDropdownVisible(true);
  };

  const handleMouseLeave = () => {
    setDropdownVisible(false);
  };

  const toCartPage = () => {
    navigate('/cart');
  };

  return (
    <div className="Header">
      <div className="headerTop">
        <Link to={"/"} className="logo">
          <img src="./images/LOGO2.png" alt="" className="logoImg" />
        </Link>
        <div className="searchBar">
          <input
            type="text"
            id = "bar"
            className="bar"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            onKeyDown={handleKeyPress}
            placeholder="Laptop, điện thoại, ram..."
          />
          <img src="/icons/search.png " alt="" className="searchIcon" onClick={handleSearch} />
        </div>

        <div className="topButton" onClick={toCartPage}>
          <img src="/icons/cart.png" alt="" width={40} height={40} />
          <div>Giỏ hàng</div>
        </div>

        <div className="topButton">
          <img src="/icons/person.png" alt="" />
          <div>Tài khoản</div>
        </div>
      </div>

      <div className="headerBottom">
        <div
          className="productDropdown"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <div
            className={`trigger ${isDropdownVisible ? 'triggerStay' : ''}`}
          >
            <div>Sản phẩm</div>
            <UpOutlined className={`upArrow ${isDropdownVisible ? 'rotate' : ''}`} />
          </div>
          {isDropdownVisible && (
            <div className="dropDown">
              <div className="product" onClick={() => toCategoryResult(1)}>Laptop</div>
              <div className="product" onClick={() => toCategoryResult(2)}>PC</div>
              <div className="product" onClick={() => toCategoryResult(3)}>Linh kiện</div>
              <div className="product" onClick={() => toCategoryResult(4)}>Phụ kiện</div>
              <div className="product" onClick={() => toCategoryResult(5)}>Sản phẩm cũ</div>
            </div>
          )}
        </div>

          <div className="otherButtons">
            <Link to="/promotion" className="linkButton">Khuyến mãi</Link>
            <Link to="/support" className="linkButton">Hỗ trợ</Link>
            <Link to="/news" className="linkButton">Tin tức</Link>
          </div>
      </div>
    </div>
  );
};

export default Header;

// import { Link } from "react-router-dom";
// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { UpOutlined } from '@ant-design/icons';
// import './index.scss';

// const Header = () => {
//   const [isDropdownVisible, setDropdownVisible] = useState(false);
//   const [keyword, setKeyword] = useState('');
//   let [categoryId, setCategoryId] = useState(null); // Để theo dõi khi nào cần điều hướng

//   const navigate = useNavigate();



//   const handleSearch = () => {
//     if (keyword.trim() === '') {
//       alert('Từ khóa không được trống!');
//       return;
//     }
//     navigate(`/search-result?keyword=${encodeURIComponent(keyword)}`);
//     document.getElementById('bar').value = ''
//     setKeyword('')
//   };
//   // Thêm sự kiện bàn phím để kiểm tra nếu nhấn Enter
//   const handleKeyPress = (e) => {
//     if (e.key === 'Enter') {
//       handleSearch(); // Gọi hàm tìm kiếm
//     }
//   };

//   const toCategoryResult = (id) => {
//     setCategoryId(id); // Đặt categoryId và cập nhật keyword
//     if (id === 1) {
//       setKeyword('Laptop');
//     } else if (id === 2) {
//       setKeyword('PC');
//     } else if (id === 3) {
//       setKeyword('Linh kiện');
//     } else if (id === 4) {
//       setKeyword('Phụ kiện');
//     } else {
//       setKeyword('Sản phẩm cũ');
//     }
//     setDropdownVisible(false)
//     navigate(`/search-result?keyword=${encodeURIComponent(keyword)}`);
//   };

//   useEffect(() => {
//     if (categoryId !== null) { // Điều hướng khi categoryId thay đổi
//       const categoryKeyword = keyword; // Sử dụng keyword để điều hướng
//       navigate(`/search-result?keyword=${encodeURIComponent(categoryKeyword)}`);
//       setCategoryId(null); // Đặt lại categoryId sau khi điều hướng
//     }
//   }, [categoryId]); // Chỉ theo dõi categoryId

//   const handleMouseEnter = () => {
//     setDropdownVisible(true);
//   };

//   const handleMouseLeave = () => {
//     setDropdownVisible(false);
//   };

//   const toCartPage = () => {
//     navigate('/cart');
//   };
  
//   return (
//     <div className="Header">
//       <div className="headerTop">
//         <Link to={"/"} className="logo">LOGO</Link>
//         <div className="searchBar">
//           <input
//             type="text"
//             id = "bar"
//             className="bar"
//             onChange={(e) => setKeyword(e.target.value)}
//             onKeyDown={handleKeyPress}
//             placeholder="Laptop, điện thoại, ram..."
//           />
//           <img src="/icons/search.png " alt="" className="searchIcon" onClick={handleSearch} />
//         </div>

//         <div className="topButton" onClick={toCartPage}>
//           <img src="/icons/cart.png" alt="" width={40} height={40} />
//           <div>Giỏ hàng</div>
//         </div>

//         <div className="topButton">
//           <img src="/icons/person.png" alt="" />
//           <div>Tài khoản</div>
//         </div>
//       </div>

//       <div className="headerBottom">
//         <div
//           className="productDropdown"
//           onMouseEnter={handleMouseEnter}
//           onMouseLeave={handleMouseLeave}
//         >
//           <div
//             className={`trigger ${isDropdownVisible ? 'triggerStay' : ''}`}
//           >
//             <div>Sản phẩm</div>
//             <UpOutlined className={`upArrow ${isDropdownVisible ? 'rotate' : ''}`} />
//           </div>
//           {isDropdownVisible && (
//             <div className="dropDown">
//               <div className="product" onClick={() => toCategoryResult(1)}>Laptop</div>
//               <div className="product" onClick={() => toCategoryResult(2)}>PC</div>
//               <div className="product" onClick={() => toCategoryResult(3)}>Linh kiện</div>
//               <div className="product" onClick={() => toCategoryResult(4)}>Phụ kiện</div>
//               <div className="product" onClick={() => toCategoryResult(5)}>Sản phẩm cũ</div>
//             </div>
//           )}
//         </div>

//         <Link to="/promotion" className="linkButton">Khuyến mãi</Link>
//         <Link to="/support" className="linkButton">Hỗ trợ</Link>
//         <Link to="/news" className="linkButton">Tin tức</Link>
//       </div>
//     </div>
//   );
// };

// export default Header;
