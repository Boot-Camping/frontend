import React from "react";
import "./BookPage.css";
import bookImage from "../../assets/image/detailImg-2.png";
import { detailPageCampingInfo } from "../../constants/detailPageCampingInfo";

const BookInfo = () => {
  const standardNum = detailPageCampingInfo[5];
  const maxNum = detailPageCampingInfo[6];
  const price = detailPageCampingInfo[7];
  const overCharge = detailPageCampingInfo[8];

  return (
    <div>
      <div className="book-info">
        <div className="book-contents">
          <div className="camping-name">캠핑장 정보</div>
          <div className="camping-num">
            {standardNum.label}: {standardNum.value}명 <br />
            {maxNum.label}: {maxNum.value}명 <br />
            {price.label}:{price.value}원<br />
            {overCharge.label}: {overCharge.value}원
          </div>
        </div>
        <img className="book-img" src={bookImage} alt="" />
      </div>
    </div>
  );
};

export default BookInfo;
