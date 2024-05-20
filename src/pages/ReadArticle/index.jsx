import React, { useEffect, useState } from 'react'; // Sử dụng useEffect và useState
import { useLocation, useParams  } from 'react-router-dom';
import axios from 'axios'; // Thư viện để gọi API
import './index.scss';
import ReactMarkdown from 'react-markdown';

function ReadArticle() {
    const { articleId } = useParams(); // Lấy articleId từ URL
    const [article, setArticle] = useState(null); // Trạng thái để lưu dữ liệu của bài báo
    const [loading, setLoading] = useState(true); // Trạng thái để kiểm tra khi nào dữ liệu đang được tải
    const [error, setError] = useState(null); // Trạng thái để lưu lỗi (nếu có)

    useEffect(() => {
        const fetchArticle = async () => {
            try {
                setLoading(true); // Bắt đầu tải
                const response = await axios.get(`http://localhost:5000/articles/${articleId}`); // Gọi API
                setArticle(response.data); // Lưu dữ liệu của bài báo
            } catch (err) {
                setError(err); // Lưu lỗi
            } finally {
                setLoading(false); // Kết thúc tải
            }
        };

        fetchArticle(); // Gọi hàm để tải dữ liệu
    }, [articleId]); // Chỉ gọi lại khi articleId thay đổi

    if (loading) {
        return <div>Loading...</div>; // Hiển thị khi đang tải
    }

    if (error) {
        return <div>Error: {error.message}</div>; // Hiển thị khi có lỗi
    }

    if (!article) {
        return <div>No article found</div>; // Hiển thị khi không có dữ liệu
    }

    function formatDate(dateStr) {
        // Chuyển chuỗi thành đối tượng Date
        const date = new Date(dateStr);
      
        // Lấy ngày, tháng, và năm
        const day = date.getDate(); // Ngày trong tháng
        const month = date.getMonth() + 1; // Tháng, bắt đầu từ 0, nên cần +1
        const year = date.getFullYear(); // Năm
      
        // Chuyển các giá trị ngày, tháng thành dạng hai chữ số
        const dayStr = day < 10 ? `0${day}` : day.toString();
        const monthStr = month < 10 ? `0${month}` : month.toString();
      
        // Trả về định dạng "DD-MM-YYYY"
        return `${dayStr}-${monthStr}-${year}`;
      }

    return (
        <div className="ReadArticle">
            <div className="articleImageContainer">
                <img src={article.imageURL} alt="" className='articleImage'/>
            </div>
            <div className='title'>{article.title}</div> {/* Hiển thị tiêu đề */}
            <div className='author'>
                {article.author}
                <span className='publishedDate'> - Đăng ngày {formatDate(article.publication_date)}</span> 
                </div>
            <div className='content'>
                <ReactMarkdown>{article.content}</ReactMarkdown>
            </div> 
        </div>
    );
}

export default ReadArticle;
