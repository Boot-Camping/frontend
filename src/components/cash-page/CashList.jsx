import React, { useEffect } from "react";
import "./CashList.css";
import { svgCollection } from "../../constants/svgCollection";
import { ReactSVG } from "react-svg";
import { filterData } from "../../utils/filterData";
import EmptyContent from "../common/EmptyContent";

const CashList = ({ filter, onTotalCashUpdate, cashData, errorMessage }) => {
  const filteredData = filterData(cashData, filter, "transactionType");

  const sortedData = [...filteredData].sort((a, b) => {
    return new Date(b.transactionDate) - new Date(a.transactionDate);
  });

  useEffect(() => {
    if (sortedData.length > 0) {
      const latestData = sortedData[0];
      onTotalCashUpdate(latestData.afterTransactionCash);
    } else {
      onTotalCashUpdate(0);
    }
  }, [sortedData, onTotalCashUpdate]);

  return (
    <div className="cash-list-wrap">
      {cashData.length > 0 && sortedData.length > 0 ? (
        sortedData.map((data, index) => (
          <div
            className={`cash-list underline ${
              data.transactionType === "DEPOSIT"
                ? "charge-list"
                : data.transactionType === "PAYMENT"
                ? "use-list"
                : "charge-list"
            } `}
            key={`cash-list-${index}`}
          >
            <div className="cash-list-status">
              <div className="cash-status">
                <ReactSVG
                  src={svgCollection.money}
                  className="cash-filter-img"
                />
                {data.transactionType === "DEPOSIT"
                  ? "충전"
                  : data.transactionType === "PAYMENT"
                  ? "사용"
                  : "환불"}
              </div>
              <div className="cash-date">
                {data.transactionDate.replace("T", " ")}
              </div>
            </div>
            <div className="cash-list-cash">
              <div>
                {data.transactionType === "DEPOSIT"
                  ? "캐시 충전"
                  : data.transactionType === "PAYMENT"
                  ? "사용처"
                  : "예약 취소 환불"}
              </div>
              <div>{data.beforeTransactionCash.toLocaleString()}원</div>
            </div>
            <div className="cash-list-total-cash">
              <div>잔액</div>
              <div>{data.afterTransactionCash.toLocaleString()}원</div>
            </div>
          </div>
        ))
      ) : (
        <EmptyContent errorMessage={errorMessage} />
      )}
    </div>
  );
};

export default CashList;
