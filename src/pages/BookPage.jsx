import React, { useState } from "react";
import BookingPayment from "./PaymentPage";
import DateRangePicker from "../components/book-page/DateRangePicker";
import "../components/book-page/BookPage.css";

import bookImage from "../../src/assets/image/detailImg-2.png";

const BookPage = () => {
  const [isVisible, setIsVisible] = useState(false);

  const clickVisibileHandle = () => {
    setIsVisible(!isVisible);
  };

  return (
    <>
      <div className="title">캠핑장 예약하기</div>

      <div className="book">
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

        <div className="book-date">
          <h3>캠핑기간 선택하기</h3>
          <DateRangePicker />
        </div>

        <button className="confirm-button" onClick={clickVisibileHandle}>
          {isVisible ? "캠핑기간 다시 선택하기" : "결제하러 가기"}
        </button>
        <div
          className="hidden-component"
          style={{ display: isVisible ? "block" : "none" }}
        >
          <BookingPayment />
        </div>
      </div>
    </>
  );
};

export default BookPage;
