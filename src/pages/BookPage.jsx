import React, { useState } from "react";
import BookingPayment from "./PaymentPage";
import BookInfo from "../components/book-page/BookInfo";

import DateRangePicker from "../components/book-page/DateRangePicker";
import "../components/book-page/BookPage.css";

const BookPage = () => {
  const [isVisible, setIsVisible] = useState(false);

  const clickVisibileHandle = () => {
    setIsVisible(!isVisible);
  };

  return (
    <>
      <div className="title">캠핑장 예약하기</div>
      <BookInfo />
      <div className="book-date">
        <h3>캠핑기간 선택하기</h3>
        <DateRangePicker />
      </div>

      {/* 결제창 띄우기 */}
      <button className="confirm-button" onClick={clickVisibileHandle}>
        {isVisible ? "캠핑기간 다시 선택하기" : "결제하러 가기"}
      </button>
      <div
        className="hidden-component"
        style={{ display: isVisible ? "block" : "none" }}
      >
        <BookingPayment />
      </div>
    </>
  );
};

export default BookPage;
