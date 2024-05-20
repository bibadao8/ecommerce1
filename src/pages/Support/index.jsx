import React, { useEffect, useState } from "react";
import axios from "axios";
import './index.scss'
import SupportArticle from "../../components/SupportArticle";


function Support() {
    const [supportArticles, setSupportArticles] = useState([]); // Trạng thái lưu các bài báo

    useEffect(() => {
        // Gọi API để lấy bài báo với category "Hỗ trợ khách hàng"
        axios
            .get("http://localhost:5000/articles/category?category=Hỗ trợ khách hàng")
            .then((response) => {
                setSupportArticles(response.data); // Cập nhật trạng thái với dữ liệu từ API
            })
            .catch((error) => {
                console.error("Error fetching support articles:", error);
            });
    }, []); // Chỉ chạy một lần khi trang được tải

    const allSupportArticle = [];
    for (let i = 0; i < supportArticles.length; i++) {
        if(supportArticles){
            allSupportArticle.push(<SupportArticle articleId={supportArticles[i]._id}/>);
        }
    }

    return (
        <div className="Support">
            <div className="allSPArticle">
                {allSupportArticle}
            </div>
        </div>
    )
}
export default Support;
