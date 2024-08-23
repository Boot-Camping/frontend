import React from "react";
import "./ReviewPage.css";

const ReviewMoreBtn = ({ onClick, isExpanded }) => {
  return (
    <button className="review-more-btn" onClick={onClick}>
      {isExpanded ? "리뷰 접기" : "리뷰 더보기"}
    </button>
  );
};

export default ReviewMoreBtn;
