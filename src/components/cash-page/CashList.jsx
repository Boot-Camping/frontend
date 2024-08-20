import React, { useEffect } from "react";
import "./CashList.css";
import { cashData, cashIcon } from "../../constants/cash";
import { ReactSVG } from "react-svg";
import { filterData } from "../../utils/filterData";

const CashList = ({ filter, onTotalCashUpdate }) => {
  const filteredData = filterData(cashData, filter, "cashStatus");

  useEffect(() => {
    if (filteredData.length > 0) {
      const latestData = filteredData.reduce((latest, data) => {
        return new Date(data.createdAt) > new Date(latest.createdAt)
          ? data
          : latest;
      });
      onTotalCashUpdate(latestData.totalCash);
    } else {
      onTotalCashUpdate(0);
    }
  }, [filteredData, onTotalCashUpdate]);

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
            <div>{data.cash.toLocaleString()}원</div>
          </div>
          <div className="cash-list-total-cash">
            <div>잔액</div>
            <div>{data.totalCash.toLocaleString()}원</div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CashList;
