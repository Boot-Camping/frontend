import React from "react";
import "../css/MainReview.css";
import { mainReviewData } from "../constants/mainReviewData";

const MainReview = () => {
  return (
    <>
      <div className="main-review-title">실시간 리뷰</div>
      {mainReviewData.map((review) => (
        <div className="main-review-wraper" key={review.id}>
          <img className="main-review-img" src={review.img} alt="" />
          <div>
            <div className="main-review-text">{review.text}</div>
            <div className="main-review-time">{review.time}</div>
            <div className="main-review-place">{review.place}</div>
          </div>
        </div>
      ))}
    </>
  );
};

export default MainReview;
