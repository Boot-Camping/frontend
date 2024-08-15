import React from "react";
import { Link } from "react-router-dom";
import { ReactSVG } from "react-svg";
import "../detail-page/DetailPage.css";

const bookButton = ({ to }) => {
  return (
    <Link to={to}>
      <div className="book-button">
        <ReactSVG
          className="book-emoji"
          src="../src/assets/svg/heart.svg"
          alt=""
        />
        <div className="book-text">예약하기</div>
      </div>
    </Link>
  );
};

export default bookButton;
