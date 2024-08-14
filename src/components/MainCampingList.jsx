import React from "react";
import { Link } from "react-router-dom";
import "../css/MainCampingList.css";

const MainCampingList = () => {
  return (
    <>
      <div className="camping-title-wraper">
        <div className="camping-title">캠핑장 리스트</div>
        <select>
          <option value="reservation">예약 많은 순</option>
          <option value="review">리뷰 많은순</option>
          <option value="star">평점 좋은 순</option>
          <option value="heart">찜 많은 순</option>
        </select>
      </div>
      <div className="camping-list-wraper">
        <div className="camping-list">
          <img
            className="camping-img"
            src="https://campingagains3.s3.ap-northeast-2.amazonaws.com/small_C1_d5d87fe452.jpg"
            alt=""
          />
          <Link to="/detail">
            <img className="camping-img-heart" src="/assets/heart.svg" alt="" />

            <div className="camping-name">캠프 그라운드 화온</div>
            <div className="camping-sub-title-box">
              <div className="camping-type">오토캠핑</div>
              <div className="camping-price">40,000~</div>
            </div>
          </Link>
          <div className="camping-info-wraper">
            <img className="camping-info-star" src="/assets/star.svg" alt="" />
            <div className="camping-info">5.0</div>
            <div className="camping-info">・리뷰(123)</div>
            <div className="camping-info">・예약(168)</div>
          </div>
        </div>
        <div className="camping-list">
          <img
            className="camping-img"
            src="https://campingagains3.s3.ap-northeast-2.amazonaws.com/small_C1_d5d87fe452.jpg"
            alt=""
          />
          <img className="camping-img-heart" src="/assets/heart.svg" alt="" />
          <div className="camping-name">캠프 그라운드 화온</div>
          <div className="camping-sub-title-box">
            <div className="camping-type">오토캠핑</div>
            <div className="camping-price">40,000~</div>
          </div>
          <div className="camping-info-wraper">
            <img className="camping-info-star" src="/assets/star.svg" alt="" />
            <div className="camping-info">5.0</div>
            <div className="camping-info">・리뷰(123)</div>
            <div className="camping-info">・예약(168)</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MainCampingList;
