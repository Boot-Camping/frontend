import React from "react";
import "../css/Category.css";

const CategoryPage = () => {
  return (
    <div>
      <div className="category-title-waper">
        <div className="category-title">반려견 동반</div>
        <select>
          <option value="reservation">예약 많은 순</option>
          <option value="review">리뷰 많은순</option>
          <option value="star">평점 좋은 순</option>
          <option value="hart">찜 많은 순</option>
        </select>
      </div>
    </div>
  );
};

export default CategoryPage;
