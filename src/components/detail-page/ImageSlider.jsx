import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "./ImageSlider.css";
import { Pagination } from "swiper/modules";

const ImageSlider = ({ detailImages }) => {
  return (
    <div>
      <Swiper
        pagination={{
          dynamicBullets: true,
        }}
        modules={[Pagination]}
        className="slider-detail"
      >
        {detailImages.map((detailImage, index) => (
          <SwiperSlide key={index}>
            <img
              src={detailImage}
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
