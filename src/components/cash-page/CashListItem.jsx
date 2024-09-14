import React from "react";
import "./CashListItem.css";
import { ReactSVG } from "react-svg";
import { svgCollection } from "../../constants/svgCollection";

const CashListItem = ({ data }) => {
  const transactionTypeMap = {
    DEPOSIT: "충전",
    PAYMENT: "사용",
    REWARD: "적립",
    REFUND: "환불",
  };

  const transctionDescMap = {
    DEPOSIT: "캐시 충전",
    PAYMENT: data.campName,
    REWARD: "리뷰 포인트 적립",
    REFUND: "예약 취소 환불",
  };

  return (
    <div
      className={`cash-list underline ${
        data.transactionType === "DEPOSIT" || data.transactionType === "REWARD"
          ? "charge-list"
          : "use-list"
      } `}
    >
      <div className="cash-list-status">
        <div className="cash-status">
          <ReactSVG src={svgCollection.money} className="cash-filter-img" />
          {transactionTypeMap[data.transactionType] || "알 수 없음"}
        </div>
        <div className="cash-date">
          {data.transactionDate.replace("T", " ")}
        </div>
      </div>
      <div className="cash-list-cash">
        <div>{transctionDescMap[data.transactionType] || "알 수 없음"}</div>
        <div>{data.beforeTransactionCash.toLocaleString()}원</div>
      </div>
      <div className="cash-list-total-cash">
        <div>잔액</div>
        <div>{data.afterTransactionCash.toLocaleString()}원</div>
      </div>
    </div>
  );
};

export default CashListItem;
