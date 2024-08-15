import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "./ImageSlider.css";
import { Pagination } from "swiper/modules";

const ImageSlider = ({ sliderData }) => {
  return (
    <div>
      <Swiper
        pagination={{
          dynamicBullets: true,
        }}
        modules={[Pagination]}
        className="mySwiper"
      >
        {sliderData.map((slide, index) => (
          <SwiperSlide key={index}>
            <img src={slide.image} className="img" alt={`Slide ${index + 1}`} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default ImageSlider;
