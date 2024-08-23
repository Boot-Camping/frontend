import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "./ImageSlider.css";
import { Pagination } from "swiper/modules";
import { useState, useEffect } from "react";
import { get } from "../../utils/Api";

const ImageSlider = ({}) => {
  const [detailImgs, setDetailImgs] = useState([]);

  useEffect(() => {
    const fetchCampInfo = async () => {
      try {
        const response = await get("camp/2");
        setDetailImgs(response.imageUrls);
      } catch (error) {
        console.error("캠핑장 정보 가져오기 실패:", error);
      }
    };
    fetchCampInfo();
  }, []);

  return (
    <div>
      <Swiper
        pagination={{
          dynamicBullets: true,
        }}
        modules={[Pagination]}
        className="slider-detail"
      >
        {detailImgs.map((detailImg, index) => (
          <SwiperSlide key={index}>
            <img
              src={detailImg}
              className="slider-img"
              alt={`Slide ${index + 1}`}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default ImageSlider;
