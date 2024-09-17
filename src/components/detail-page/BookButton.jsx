import React from "react";
import { Link } from "react-router-dom";
import "../detail-page/DetailPage.css";

const bookButton = ({ to }) => {
  return (
    <Link to={to}>
      <div className="book-button underline">
        <div className="book-text">예약하기</div>
      </div>
    </Link>
  );
};

export default bookButton;
