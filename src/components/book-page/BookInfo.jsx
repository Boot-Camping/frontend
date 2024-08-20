import React from "react";
import "./BookPage.css";
import bookImage from "../../assets/image/detailImg-2.png";
import { detailCampingInfo } from "../../constants/detailCampingInfo";

const BookInfo = () => {
  const standardNum = detailCampingInfo[5];
  const maxNum = detailCampingInfo[6];
  const price = detailCampingInfo[7];
  const overCharge = detailCampingInfo[9];

  return (
    <div>
      <div className="book-info">
        <div className="book-contents">
          <div className="camping-name">캠핑장 정보</div>
          <div className="camping-num">
            {standardNum.label}: {standardNum.value} 명 <br />
            {maxNum.label}: {maxNum.value} 명 <br />
            {price.label}: {price.value.toLocaleString()} 원<br />
            {overCharge.label}: {overCharge.value.toLocaleString()} 원
          </div>
        </div>
        <img className="book-img" src={bookImage} alt="" />
      </div>
    </div>
  );
};

export default BookInfo;
