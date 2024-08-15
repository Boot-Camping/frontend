import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "../main-page/MainSlider.css";
import { sliderData } from "../../constants/sliderData";

const MainSlider = () => {
  return (
    <div>
      <div className="slider-title">새로 등록된 캠핑장소</div>
      <Swiper
        pagination={{
          dynamicBullets: true,
        }}
        modules={[Pagination]}
        className="slider-main"
      >
        {sliderData.map((slide, index) => (
          <SwiperSlide key={index}>
            <img className="slider-img" src={slide.image} alt="" />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default MainSlider;
