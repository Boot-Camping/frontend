import React from "react";
import "./PaidFilter.css";

const PaidFilter = ({ filterChangeHandle }) => {
  return (
    <div className="paid-filter">
      <button
        className="usage-filter"
        onClick={() => filterChangeHandle("all")}
      >
        전체 보기
      </button>
      <button
        className="book-filter"
        onClick={() => filterChangeHandle("예약 완료")}
      >
        예약 완료
      </button>
      <button
        className="usage-filter"
        onClick={() => filterChangeHandle("이용 완료")}
      >
        이용 완료
      </button>
    </div>
  );
};

export default PaidFilter;
