import React from "react";
import "./BookPage.css";
import bookImage from "../../assets/image/detailImg-2.png";
import { detailPageCampingInfo } from "../../constants/detailPageCampingInfo";
import NumCounter from "../../utils/numCounter";

const BookInfo = () => {
  const standardNum = detailPageCampingInfo[6];
  const maxNum = detailPageCampingInfo[7];
  const overCharge = detailPageCampingInfo[8];

  return (
    <div>
      <div className="book-info">
        <div className="book-contents">
          <div className="camping-name">캠핑장 예약하기</div>
          <div className="camping-num">
            {standardNum.label}: {standardNum.value}명 <br />
            {maxNum.label}: {maxNum.value}명 <br />
            {overCharge.label}: {overCharge.value}원
          </div>
        </div>
        <img className="book-img" src={bookImage} alt="" />
      </div>
      <div className="counter-title">예약인원</div>
      <NumCounter />
    </div>
  );
};

export default BookInfo;
