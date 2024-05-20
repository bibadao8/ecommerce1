import './index.scss'
import {CopyrightOutlined} from '@ant-design/icons';
import {FacebookOutlined} from '@ant-design/icons'; 
import {YoutubeOutlined} from '@ant-design/icons'; 
import {InstagramOutlined} from '@ant-design/icons'; 
import {TikTokOutlined} from '@ant-design/icons'; 
import React, {useState, useEffect} from 'react';
import { Link } from "react-router-dom";
import {useNavigate} from 'react-router-dom';

const Footer = () => { 
  const navigate = useNavigate();
  const toCategoryResult = (category_id) => {
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

  const goToThisSPArticle = (articleId) =>{
    if(articleId) navigate(`/read-article/${articleId}`);
  }

  return (
      <div className="Footer">
        <div className="footerTop">
        <Link to={"/"} className="logo">
          <img src="./images/LOGO2.png" alt="" className="logoImg" />
        </Link>
          <div className="shop">
            <div className="topic">Shop</div>
            <ul className="allItems">
              <li onClick={() => toCategoryResult(1)}>Laptop</li>
              <li onClick={() => toCategoryResult(2)}>PC</li>
              <li onClick={() => toCategoryResult(3)}>Phụ kiện</li>
              <li onClick={() => toCategoryResult(4)}>Linh kiện</li>
              <li onClick={() => toCategoryResult(5)}>Sản phẩm cũ</li>
            </ul>
          </div>
          <div className="support">
          <div className="topic">Hỗ trợ khách hàng</div>
          <ul className="allItems">
            <li onClick={() => {goToThisSPArticle("66350eda934c97708830d3ad")}}>Hướng dẫn thanh toán</li>
            <li onClick={() => {goToThisSPArticle("66408f9e820761f6761995a2")}}>Các câu hỏi thường gặp</li>
          </ul>
          </div>
          <div className="aboutUs">
          <div className="topic">Về công ty</div>
          <ul className="allItems">
            <li onClick={() => {goToThisSPArticle("6639909ee18ad3c345096091")}}>Giới thiệu công ty</li>
            <li onClick={() => {goToThisSPArticle("6639923fe18ad3c345096093")}}>Quy chế hoạt động</li>
            <li onClick={() => {goToThisSPArticle("663992fde18ad3c345096094")}}>Chính sách công ty</li>
            <li onClick={() => {goToThisSPArticle("663993d4e18ad3c345096095")}}>Tuyển dụng</li>
          </ul>
          </div>
          <div className="contactUs">
          <div className="topic">Liên hệ với chúng tôi</div>
          <div className="allLogos">
            <FacebookOutlined className="smallLogo"/>
            <YoutubeOutlined className="smallLogo"/>
            <InstagramOutlined className="smallLogo"/>
            <TikTokOutlined className="smallLogo"/>
          </div>
          </div>
        </div>
        <div className="footerBottom">
        <CopyrightOutlined />
        <div>Công ty 2024</div>
        </div>
      </div>  
  )
};

export default Footer;