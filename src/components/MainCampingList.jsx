import React from "react";
import "../css/MainCampingList.css";

const MainCampingList = () => {
  return (
    <>
      <div className="camping-list-waper">
        <div className="camping-list-title">캠핑장 리스트</div>
        <select>
          <option value="reservation">예약 많은 순</option>
          <option value="review">리뷰 많은순</option>
          <option value="star">평점 좋은 순</option>
          <option value="hart">찜 많은 순</option>
        </select>
      </div>
      <div>
        <img
          className="camping-img"
          src="https://campingagains3.s3.ap-northeast-2.amazonaws.com/small_C1_d5d87fe452.jpg"
          alt=""
        />
        <div className="camping-name">캠프 그라운드 화온</div>
        <div className="camping-type">오토캠핑</div>
        {/* <img src="" alt="wixblog" className={classes.title} /> */}
        <div className="camping-info">5.0・리뷰(123)・예약(168) </div>
      </div>
    </>
  );
};

export default MainCampingList;
