import React, { useState } from "react";
import { useParams } from "react-router-dom";
import PaymentPage from "./PaymentPage";
import BookInfo from "../components/book-page/BookInfo";
import useCampInfo from "../hooks/useCampInfo";

import DateRangePicker from "../components/book-page/DateRangePicker";
import "../components/book-page/BookPage.css";

const BookPage = () => {
  const { campId } = useParams();
  const [isVisible, setIsVisible] = useState(false);
  const { campInfo, loading, error } = useCampInfo(campId, "campInfo");

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>캠핑장 정보 가져오기 실패: {error.message}</div>;
  }

  const clickVisibileHandle = () => {
    setIsVisible(!isVisible);
  };

  return (
    <>
      <div className="book-page underline">
        <div className="book-page-title">캠핑장 예약하기</div>
        <BookInfo campInfo={campInfo} />
        <div className="book-date">
          <div className="book-date-title">캠핑기간 선택하기</div>
          <DateRangePicker />
        </div>

        {/* 결제창 띄우기 */}
        <button className="date-confirm-button" onClick={clickVisibileHandle}>
          {isVisible ? "기간 다시 선택하기" : "결제하러 가기"}
        </button>
        <div
          className="hidden-component"
          style={{ display: isVisible ? "block" : "none" }}
        >
          <PaymentPage campInfo={campInfo} />
        </div>
      </div>
    </>
  );
};

export default BookPage;
