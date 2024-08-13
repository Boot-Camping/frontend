import React from "react";
import "../css/BookPage.css";

const BookPage = () => {
  return (
    <>
      <div className="title">캠핑장 예약하기</div>

      <div className="book">
        <div className="book-info">
          <img className="book-img" src="./assets/detailImg-2.png" alt="" />

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
    </>
  );
};

export default BookPage;
