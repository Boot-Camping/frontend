import React from "react";
import "./BookPage.css";

const BookInfo = ({ campInfo }) => {
  return (
    <div>
      <div className="book-info underline">
        <div className="book-contents">
          <div className="camping-name">캠핑장 정보</div>
          <div className="camping-num">
            {campInfo.name}
            <br />
            기준 수용인원: {campInfo.standardNum} 명 <br />
            최대 수용인원: {campInfo.maxNum} 명 <br />
            1박 가격: {campInfo.price.toLocaleString()} 원<br />
            초과 인원당 추가비용: {campInfo.overCharge.toLocaleString()} 원
          </div>
        </div>
        <img className="book-img" src={campInfo.imageUrls[0]} alt="" />
      </div>
    </div>
  );
};

export default BookInfo;
