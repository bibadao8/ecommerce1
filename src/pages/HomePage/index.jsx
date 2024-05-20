import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './index.scss'
import { useNavigate } from 'react-router-dom';
import BigCard from "../../components/BigCard";
import ProductPanel from "../../components/ProductPanel";

import {LeftOutlined} from '@ant-design/icons';
import {RightOutlined} from '@ant-design/icons';

function HomePage() {
    const [translateValue, setTranslateValue] = useState(0);
    const [currentImageIndex, setImageIndex] = useState(0);
    const [currentSaleIndex, setSaleIndex] = useState(0);
    
    const bannerTranslate = 1488;
    const prevTranslate = () => {
        setImageIndex(currentImageIndex - 1);
        setTranslateValue(translateValue + bannerTranslate);
    };
    
    const nextTranslate = () => {
        setImageIndex(currentImageIndex + 1);
        setTranslateValue(translateValue - bannerTranslate);
    }
    
    const saleTranslate = 1377;
    const [saleTranslateValue, setSaleTranslateValue] = useState(0);

    const images = [
        '/images/Banner1.png', 
        '/images/Banner3.png', 
        '/images/Banner2.png'
    ];

    const [productsOnSale, setProductsOnSale] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await axios.get('http://localhost:5000/products/on-sale');
            console.log("API Response:", response.data);
            setProductsOnSale(response.data);
          } catch (error) {
            console.error('Error fetching products on sale:', error);
          }
        };
        fetchData();
    }, []);

    const saleRow1 = [];
    const saleRow2 = [];
    for(let i = 0; i < 22; i++){
        const product = productsOnSale[i]
        if(product){
            if(i >= 0 && i < 12) saleRow1.push(<BigCard productId={product._id}/>);
            else if(i >= 12 ) saleRow2.push(<BigCard productId={product._id}/>);
        }
    }

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


    const prevSaleTranslate = () => {
        setSaleIndex(currentSaleIndex - 1);
        setSaleTranslateValue(saleTranslateValue + saleTranslate);
    };
    
    const nextSaleTranslate = () => {
        setSaleIndex(currentSaleIndex + 1);
        setSaleTranslateValue(saleTranslateValue - saleTranslate);
    }
    return (
        <div className="HomePage">
            <div className="Banner">
                <div className="imageTransitionUI">
                    <button className="transButton" onClick={prevTranslate} disabled = {currentImageIndex == 0}>
                        <LeftOutlined className='arow'/>
                        </button>
                    <div className="allDots">
                        <div className={`dot ${currentImageIndex === 0 ? 'isChosen' : ''}`}></div>
                        <div className={`dot ${currentImageIndex === 1 ? 'isChosen' : ''}`}></div>
                        <div className={`dot ${currentImageIndex === 2 ? 'isChosen' : ''}`}></div>
                    </div>
                    <button className="transButton" onClick={nextTranslate} disabled = {currentImageIndex == 2}>
                        <RightOutlined className='arow'/>
                        </button>
                </div>
                <div className="allImages" style={{transform: `translate(${translateValue}px)`}}>
                    <img src={images[0]} alt="" />
                    <img src={images[1]} alt="" />
                    <img src={images[2]} alt="" />
                </div>
            </div>
            <div className="Hotsale">
                <div className="hotsaleUp">
                    <div className="hotsaleText"> HOT SALE</div>
                    </div>
                <div className="hotsaleBottom">
                    <button className="transButton left" onClick={prevSaleTranslate} disabled = {currentSaleIndex == 0}>
                        <LeftOutlined className='arow'/>
                    </button>
                    <div className="saleContainer">
                        <div className="allSaleProduct" style={{transform: `translate(${saleTranslateValue}px)`}}>
                            <div className="saleRow">{saleRow1}</div>
                            <div className="saleRow">{saleRow2}</div>
                        </div>
                    </div>
                    <button className="transButton right" onClick={nextSaleTranslate} disabled = {currentSaleIndex == 2}>
                        <RightOutlined className='arow'/>
                    </button>
                </div>
            </div>
            <ProductPanel topic = "BÁN CHẠY NHẤT" category_id={0} cantShowAll={true}/>
            <div className="AllProducts">
                <div className="allProduct_Left">
                    CÁC LOẠI SẢN PHẨM
                </div>
                <div className="allProduct_Right">
                    <div className="productButton" onClick={() => toCategoryResult(1)}>
                        <div className="productContainer">
                            <div className="allProductImages">
                                <img src="/icons/laptop.png" alt="" />
                            </div>
                            <div>Laptop</div>
                        </div>
                    </div>
                    <div className="productButton" onClick={() => toCategoryResult(2)}>
                        <div className="productContainer">
                            <div className="allProductImages">
                                <img src="/icons/pc.png" alt="" />
                            </div>
                            <div>PC</div>
                        </div>
                    </div>
                    <div className="productButton" onClick={() => toCategoryResult(3)}>
                        <div className="productContainer">
                            <div className="allProductImages">
                                <img src="/icons/cpu.png" alt="" />
                                <img src="/icons/ram.png" alt="" />
                            </div>
                            <div>Linh kiện</div>
                        </div>
                    </div>
                    <div className="productButton" onClick={() => toCategoryResult(4)}>
                        <div className="productContainer">
                            <div className="allProductImages">
                                <img src="/icons/mouse.png" alt="" />
                                <img src="/icons/usb.png" alt="" />
                                <img src="/icons/keyboard.png" alt="" />
                            </div>
                            <div>Phụ kiện</div>
                        </div>
                    </div>
                    <div className="productButton" onClick={() => toCategoryResult(5)}>
                        <div className="productContainer">
                            <div className="allProductImages">
                                <img src="/icons/oldProduct.png" alt="" />
                            </div>
                            <div>Sản phẩm cũ</div>
                        </div>
                    </div>
                </div>
            </div>
            <ProductPanel topic = "LAPTOP" category_id={1}/>
            <ProductPanel topic = "PC" category_id={2}/>
            <ProductPanel topic = "LINH KIỆN" category_id={3}/>
            <ProductPanel topic = "PHỤ KIỆN" category_id={4}/>
            <ProductPanel topic = "SẢN PHẨM CŨ GIÁ RẺ" category_id={5}/>
            <div className="news">
                <div className="newsTop">
                    <div className="Topic">TIN TỨC MỚI NHẤT</div>
                    <button className="viewAll">Xem tất cả</button>
                </div>
                <div className="newBottom">
                    <div className="bigNew newHover">
                        <div className="newTopic">Tiêu đề tin tức</div>
                    </div>
                    <div className='newRight'>
                        <div className="smallNew newHover">
                            <div className="newTopic">Tiêu đề tin tức</div>

                        </div>
                        <div className="smallNew newHover">
                            <div className="newTopic">Tiêu đề tin tức</div>

                        </div>
                        <div className="smallNew newHover">
                            <div className="newTopic">Tiêu đề tin tức</div>

                        </div>
                        <div className="smallNew newHover">
                            <div className="newTopic">Tiêu đề tin tức</div>

                        </div>

                    </div>
                </div>
            </div>
            <div className="finalImage">
                <img src="/images/finalImage.jpg" alt="" width={1470}/>
            </div>
        </div>
    )
}

export default HomePage;
