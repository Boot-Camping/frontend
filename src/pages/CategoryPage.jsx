import React from "react";
import "../css/CategoryPage.css";

const CategoryPage = () => {
  return (
    <>
      <div className="category-title-wraper">
        <div className="category-title">반려견 동반</div>
        <select>
          <option value="reservation">예약 많은 순</option>
          <option value="review">리뷰 많은순</option>
          <option value="star">평점 좋은 순</option>
          <option value="hart">찜 많은 순</option>
        </select>
      </div>
      <div className="category-camping-list">
        <img
          className="category-camping-img"
          src="https://campingagains3.s3.ap-northeast-2.amazonaws.com/small_C1_d5d87fe452.jpg"
          alt=""
        />
        <img
          className="category-camping-img-heart"
          src="/assets/heart.svg"
          alt=""
        />
        <div className="category-camping-type">오토캠핑</div>
        <div className="category-camping-sub-title-wraper">
          <div className="category-camping-name">캠프 그라운드 화온</div>
          <div className="category-camping-price">40,000~</div>
        </div>
        <div className="category-camping-location-wraper">
          <div className="category-camping-location-box">
            <img
              className="category-camping-location-icon"
              src="/assets/location.svg"
              alt=""
            />
            <div className="category-camping-location">충북 논산시</div>
          </div>
          <div className="category-camping-people">기준2인/최대6인</div>
        </div>
        <div className="category-camping-info-wraper">
          <img
            className="category-camping-info-star"
            src="/assets/star.svg"
            alt=""
          />
          <div className="category-camping-info">5.0</div>
          <div className="category-camping-info">・리뷰(123)</div>
          <div className="category-camping-info">・예약(168)</div>
        </div>
      </div>
    </>
  );
};

export default CategoryPage;
