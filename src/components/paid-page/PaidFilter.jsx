import React from "react";
import "./PaidFilter.css";

const PaidFilter = () => {
  return (
    <div className="paid-filter">
      <button className="book-filter">예약 완료</button>
      <button className="usage-filter">이용 완료</button>
    </div>
  );
};

export default PaidFilter;
