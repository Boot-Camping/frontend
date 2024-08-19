import React from "react";
import "./SaveMoreBtn.css";

const SaveMoreBtn = ({ onClick, hasMoreItems }) => {
  return (
    <button
      className={`save-more-btn ${!hasMoreItems ? "no-more-items" : ""}`}
      onClick={onClick}
    >
      더보기
    </button>
  );
};

export default SaveMoreBtn;
