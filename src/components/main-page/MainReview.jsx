import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Scrollbar } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "../main-page/MainReview.css";
import { get } from "../../utils/api";
import { relativeDate } from "../../utils/relativeDate";

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
    <div className="main-review underline">
      <div className="main-review-title ">실시간 리뷰</div>
      <Swiper
        modules={[Scrollbar]}
        className="main-review-slider"
        slidesPerView={3}
        direction="vertical"
        spaceBetween={10}
        scrollbar={{
          hide: false,
          draggable: true,
        }}
      >
        {reviews.map((review, index) => (
          <SwiperSlide key={index} className="main-review-wrapper ">
            <div className="main-review-img-wrapper">
              {review.reviewImage && review.reviewImage.length > 0 ? (
                <img
                  className="main-review-reviewImage"
                  src={review.reviewImage}
                  alt=""
                />
              ) : (
                <div className="main-review-no-reviewImage">
                  리뷰 사진이 없습니다
                </div>
              )}
            </div>
            <div className="main-review-info-wrapper">
              <div className="main-review-content">{review.content}</div>
              <div className="main-review-createdAt">
                {relativeDate(review.createdAt)}
              </div>
              <div className="main-review-campName">{review.campName}</div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default MainReview;
