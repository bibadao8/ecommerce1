import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollToTop = () => {
  const location = useLocation(); // Lấy thông tin về route hiện tại

  useEffect(() => {
    // Cuộn lên đầu trang khi route thay đổi
    window.scrollTo(0, 0);
  }, [location]); // Gọi lại khi route thay đổi

  return null; // Component này không cần trả về bất cứ điều gì
};

export default ScrollToTop;
