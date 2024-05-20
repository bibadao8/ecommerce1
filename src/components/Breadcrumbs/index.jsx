import { useLocation } from 'react-router-dom';
import "./index.scss";
import axios from 'axios';
import { React, useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

const routes = [
  { path: '/', name: 'Trang chủ' },
  { path: '/search-result', name: 'Kết quả tìm kiếm' },
  { path: '/product-preview/:id', name: 'Xem thông tin sản phẩm' }, // Cập nhật dòng này
  { path: '/cart', name: 'Giỏ hàng' },
  { path: '/checkout', name: 'Thanh toán' },
  { path: '/news', name: 'Tin tức' },
  { path: '/support', name: 'Hỗ trợ' },
  { path: '/promotion', name: 'Khuyến mại' }
];

const Breadcrumbs = () => {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter(x => x);

  const [articleTitle, setArticleTitle] = useState(null);
  const [productName, setProductName] = useState(null); // Thêm state để lưu tên sản phẩm

  useEffect(() => {
    const fetchArticleTitle = async () => {
      const lastSegment = pathnames[pathnames.length - 1];
      if (lastSegment && lastSegment.match(/^[0-9a-fA-F]{24}$/)) {
        try {
          const response = await axios.get(`http://localhost:5000/articles/${lastSegment}`);
          setArticleTitle(response.data.title);
        } catch (error) {
          console.error('Lỗi khi lấy bài báo:', error);
        }
      }
    };

    fetchArticleTitle();
  }, [pathnames]);

  useEffect(() => {
    const fetchProductName = async () => {
      const lastSegment = pathnames[pathnames.length - 1];
      if (location.pathname.includes('/product-preview/') && lastSegment) {
        try {
          const response = await axios.get(`http://localhost:5000/products/${lastSegment}`);
          setProductName(response.data.name);
        } catch (error) {
          console.error('Lỗi khi lấy thông tin sản phẩm:', error);
        }
      }
    };

    fetchProductName();
  }, [pathnames]);

  const isArticleRead = () => {
    const lastSegment = pathnames[pathnames.length - 1];
    return (lastSegment && lastSegment.match(/^[0-9a-fA-F]{24}$/) && pathnames[pathnames.length - 2] === 'read-article');
  };

  const isProductPreview = () => {
    return location.pathname.includes('/product-preview/');
  };

  return (
    <div className='Breadcrumbs'>
      {pathnames.length > 0 && (
        <ul className='breadcrumbs'>
          <li>
            <Link to="/" className='parentCrumb'>Trang chủ</Link>
          </li>
          {isArticleRead() ? (
            <li>
              <span className='arrow'>&nbsp;&gt;&nbsp;</span>
              <span className='selectedCrumb'>{articleTitle}</span>
            </li>
          ) : isProductPreview() ? (
            <li>
              <span className='arrow'>&nbsp;&gt;&nbsp;</span>
              <span className='selectedCrumb'>{productName}</span>
            </li>
          ) : (
            pathnames.map((name, index) => {
              const routeTo = `/${pathnames.slice(0, index + 1).join('/')}`;
              const route = routes.find(r => r.path === routeTo);
              const isLast = index === pathnames.length - 1;

              return (
                <li key={index}>
                  <span className='arrow'>&nbsp;&gt;&nbsp;</span>
                  {isLast ? (
                    <span className='selectedCrumb'>{route ? route.name : name}</span>
                  ) : (
                    <Link to={routeTo} className='parentCrumb'>{route ? route.name : name}</Link>
                  )}
                </li>
              );
            })
          )}
        </ul>
      )}
    </div>
  );
}

export default Breadcrumbs;
