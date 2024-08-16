import React from "react";

import "./BookPage.css";
import bookImage from "../../assets/image/detailImg-2.png";

const BookInfo = () => {
  return (
    <div>
      <div className="book-info">
        <img className="book-img" src={bookImage} alt="" />

        <div className="book-contents">
          <div className="book-name">캠프그라운드 화온</div>
          <div className="book-num">
            기준수용인원: 4명 <br />
            최대수용인원: 6명 <br />
            초과인원당 추가비용: 10,000원
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookInfo;
