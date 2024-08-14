import React from "react";
import "../css/DetailPage.css";

const bookButton = () => {
  return (
    <div>
      <div className="book-button">
        <img className="book-emoji" src="./assets/heart.svg" alt="" />
        <div className="book-text">예약하기</div>
      </div>
    </div>
  );
};

export default bookButton;
