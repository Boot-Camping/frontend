import React from "react";
import "./BookPage.css";

const BookInfo = ({ campInfo }) => {
  const { name, standardNum, maxNum, price, overCharge, imageUrls } = campInfo;

  const formatCurrency = (amount) => {
    return amount.toLocaleString() + " 원";
  };

  return (
    <div>
      <div className="book-info">
        <div className="book-contents">
          <div className="book-info-title">캠핑장 정보</div>
          <div className="camping-num">
            • {name}
            <br />• 기준 수용인원: {standardNum} 명
            <br />• 최대 수용인원: {maxNum} 명
            <br />• 1박 가격: {formatCurrency(price)}
            <br />• 초과 인원당 추가비용: {formatCurrency(overCharge)}
          </div>
        </div>
        <img className="book-img" src={imageUrls[0]} alt="" />
      </div>
    </div>
  );
};

export default BookInfo;
