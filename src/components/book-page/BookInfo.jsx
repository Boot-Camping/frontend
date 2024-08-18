import React from "react";
import "./BookPage.css";
import bookImage from "../../assets/image/detailImg-2.png";
import { detailCampingInfo } from "../../constants/detailPageInfo";

const BookInfo = () => {
  const mockInfo = detailCampingInfo[0];

  return (
    <div>
      <div className="book-info">
        <div className="book-contents">
          <div className="camping-name">{mockInfo.title}</div>
          <div className="camping-num">
            기준수용인원: {mockInfo.standardNum}명 <br />
            최대수용인원: {mockInfo.maxNum}명 <br />
            초과인원당 추가비용: {mockInfo.overCharge}원
          </div>
        </div>
        <img className="book-img" src={bookImage} alt="" />
      </div>
    </div>
  );
};

export default BookInfo;
