import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "./DetailReviewPage.css";
import { Pagination } from "swiper/modules";

const ReviewImageSlider = ({ reviewImages, onImageClick }) => {
  return (
    <div>
      <Swiper
        pagination={{
          dynamicBullets: true,
        }}
        modules={[Pagination]}
        className="slider-review"
      >
        {reviewImages.map((image) => (
          <SwiperSlide key={image.id}>
            <img
              src={image}
              className="review-slider-img"
              alt={`Review Image ${image.id}`}
              onClick={() => onImageClick(image)}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default ReviewImageSlider;
