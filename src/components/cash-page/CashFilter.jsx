import React from "react";
import "./CashFilter.css";
import { ReactSVG } from "react-svg";
import { cashIcon } from "../../constants/cash";

const CashFilter = ({ filterChangeHandle }) => {
  return (
    <div className="cash-filter">
      <button
        className="cash-all-filter"
        onClick={() => filterChangeHandle("all")}
      >
        전체 보기
      </button>
      <button
        className="charge-filter"
        onClick={() => filterChangeHandle("충전")}
      >
        <ReactSVG src={cashIcon.money} className="cash-filter-img" />
        충전
      </button>
      <button className="use-filter" onClick={() => filterChangeHandle("사용")}>
        <ReactSVG src={cashIcon.money} className="cash-filter-img" />
        사용
      </button>
    </div>
  );
};

export default CashFilter;
