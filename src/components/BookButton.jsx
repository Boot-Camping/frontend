import React from "react";
import { Link } from "react-router-dom";
import "../css/DetailPage.css";

const bookButton = ({ to }) => {
  return (
    <Link to={to}>
      <div className="book-button">
        <img className="book-emoji" src="./assets/heart.svg" alt="" />
        <div className="book-text">예약하기</div>
      </div>
    </Link>
  );
};

export default bookButton;
