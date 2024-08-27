import React, { useState } from "react";
import { svgCollection } from "../../constants/svgCollection";
import "./ReviewWriter.css";

const svg = svgCollection;

const StarRating = ({ totalStars = 5, gradeChangeHandle }) => {
  const [rating, setRating] = useState(0);

  const clickStarHandle = (starIndex) => {
    setRating(starIndex + 1);
    if (gradeChangeHandle) {
      gradeChangeHandle(starIndex + 1);
    }
  };

  return (
    <div className="star-rating">
      {Array.from({ length: totalStars }, (_, index) => (
        <svg
          key={index}
          className={`star-icon ${index < rating ? "filled" : ""}`}
          onClick={() => clickStarHandle(index)}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
        </svg>
      ))}
    </div>
  );
};

export default StarRating;
