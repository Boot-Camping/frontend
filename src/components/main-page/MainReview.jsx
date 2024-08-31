import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "../main-page/MainReview.css";
import { get } from "../../utils/api";

const MainReview = () => {
  const [reviews, setReviews] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await get("reviews");
        const sortedReviews = response.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );
        setReviews(sortedReviews);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchReviews();
  }, []);

  if (error) return <div>Error: {error}</div>;

  return (
    <>
      <div className="main-review-title">실시간 리뷰</div>
      <Swiper
        modules={[Pagination]}
        className="main-review-slider"
        slidesPerView={3}
        direction="vertical"
        spaceBetween={10}
      >
        {reviews.map((review, index) => (
          <SwiperSlide key={index} className="main-review-wrapper">
            <div className="main-review-img-wrapper">
              <img
                className="main-review-reviewImage"
                src={review.reviewImage}
                alt=""
              />
            </div>
            <div className="main-review-info-wrapper">
              <div className="main-review-content">{review.content}</div>
              <div className="main-review-createdAt">{review.createdAt}</div>
              <div className="main-review-campName">{review.campName}</div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
};

export default MainReview;
