import React, { useState } from "react";
import { ReactSVG } from "react-svg";
import { svgCollection } from "../../constants/svgCollection";
import "./ReviewWriter.css";

const svg = svgCollection;

const StarRating = ({ totalStars = 5, ratingChangeHandle }) => {
  const [rating, setRating] = useState(0);

  const clickStarHandle = (starIndex) => {
    setRating(starIndex + 1);
    if (ratingChangeHandle) {
      ratingChangeHandle(starIndex + 1);
    }
  };

  return (
    <div className="star-rating">
      {Array.from({ length: totalStars }, (_, index) => (
        <ReactSVG
          key={index}
          src={svg.starEmpty}
          className={`star-icon ${index < rating ? "filled" : ""}`}
          onClick={() => clickStarHandle(index)}
        />
      ))}
    </div>
  );
};

export default StarRating;
