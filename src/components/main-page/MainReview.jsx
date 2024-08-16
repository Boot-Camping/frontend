import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Grid } from "swiper/modules";
import "swiper/css";
import "swiper/css/grid";
import "swiper/css/pagination";
import "../main-page/MainReview.css";
import { mainReviewData } from "../../constants/mainReviewData";

const MainReview = () => {
  return (
    <>
      <div className="main-review-title">실시간 리뷰</div>
      <Swiper
        pagination={{
          dynamicBullets: true,
        }}
        modules={[Pagination, Grid]}
        className="main-review-slider"
        slidesPerView={1}
        grid={{
          rows: 3,
          fill: "row",
        }}
        spaceBetween={20}
      >
        {mainReviewData.map((review, index) => (
          <SwiperSlide key={index} className="main-review-wraper">
            <div className="main-review-img-wraper">
              <img className="main-review-img" src={review.img} alt="" />
            </div>
            <div className="main-review-info-wraper">
              <div className="main-review-text">{review.text}</div>
              <div className="main-review-time">{review.time}</div>
              <div className="main-review-place">{review.place}</div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
};

export default MainReview;
