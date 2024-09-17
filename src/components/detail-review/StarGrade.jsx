import React from "react";
import "./StarGrade.css";
import StarHalfRounded from "@mui/icons-material/StarHalfRounded";
import StarOutlineRounded from "@mui/icons-material/StarOutlineRounded";
import StarRateRounded from "@mui/icons-material/StarRateRounded";

const StarGrade = ({ grade }) => {
  const totalStars = 5;
  const fullStars = Math.floor(grade); // 소수점 이하 제거
  const halfStars = grade % 1 >= 0.5 ? 1 : 0; // 0.5 이상은 반 별
  const emptyStars = totalStars - fullStars - halfStars;

  return (
    <div className="star-rating">
      {[...Array(fullStars)].map((_, index) => (
        <StarRateRounded key={`full-${index}`} className="star-icon" />
      ))}
      {halfStars > 0 && <StarHalfRounded className="star-icon" />}
      {[...Array(emptyStars)].map((_, index) => (
        <StarOutlineRounded key={`empty-${index}`} className="star-icon" />
      ))}
    </div>
  );
};

export default StarGrade;
