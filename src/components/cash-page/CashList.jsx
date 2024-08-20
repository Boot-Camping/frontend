import React from "react";
import "./CashList.css";
import { cashData, cashIcon } from "../../constants/cash";
import { ReactSVG } from "react-svg";
import { formatPrice } from "../../utils/formatPrice";

const CashList = ({ filter }) => {
  const filteredData = cashData.filter((data) => {
    if (filter === "all") return data;
    return data.cashStatus === filter;
  });

  return (
    <div className="cash-list-wrap">
      {filteredData.map((data, index) => (
        <div
          className={`cash-list underline ${
            data.cashStatus === "충전" ? "charge-list" : "use-list"
          } `}
          key={`cash-list-${index}`}
        >
          <div className="cash-list-status">
            <div className="cash-status">
              <ReactSVG src={cashIcon.money} className="cash-filter-img" />
              {data.cashStatus}
            </div>
            <div className="cash-date">{data.createdAt}</div>
          </div>
          <div className="cash-list-cash">
            <div>{data.transactionLog}</div>
            <div>{formatPrice(data.cash)}원</div>
          </div>
          <div className="cash-list-total-cash">
            <div>잔액</div>
            <div>{formatPrice(data.totalCash)}원</div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CashList;
