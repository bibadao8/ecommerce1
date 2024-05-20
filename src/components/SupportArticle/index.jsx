import React, { useEffect, useState } from 'react'; // Sử dụng useEffect và useState
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; // Thư viện để gọi API
import './index.scss'

function SupportArticle({articleId}) {
  const [article, setArticle] = useState(null); // Trạng thái để lưu dữ liệu của bài báo
  useEffect(() => {
      const fetchArticle = async () => {
          try {
              const response = await axios.get(`http://localhost:5000/articles/${articleId}`); // Gọi API
              setArticle(response.data); // Lưu dữ liệu của bài báo
          } catch (error) {
            console.error('Error fetching product:', error);
          }
      };
      fetchArticle(); // Gọi hàm để tải dữ liệu
  }, [articleId]); // Chỉ gọi lại khi articleId thay đổi

  let articleName = "";
  let articleCoverImgURL = "";
  if(article){
    articleName = article.title
    articleCoverImgURL = article.imageURL
  }

  const navigate = useNavigate();
  const goToThisSPArticle = () =>{
    if(articleId) navigate(`/read-article/${articleId}`);
  }

  return (
    <div className='SupportArticle' onClick={goToThisSPArticle}>
      <div className="spImage">
        <img src={articleCoverImgURL} alt="" className='coverImage'/>
      </div>
      
      <div className="spBottom">
        <div className="spTopic">
          {articleName}
        </div>
      </div>
    </div>
  )
}

export default SupportArticle;
