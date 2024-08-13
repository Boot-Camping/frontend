import React from "react";
import "../css/MainCampingList.css";

const MainCampingList = () => {
  return (
    <>
      <div className="camping-list-waper">
        <div className="camping-list-title">캠핑장 리스트</div>
        <select>
          <option value="review">리뷰 많은순</option>
          <option value="star">평점 좋은 순</option>
          <option value="reservation">예약 많은 순</option>
          <option value="hart">찜 많은 순</option>
        </select>
      </div>
    </>
  );
};

export default MainCampingList;
