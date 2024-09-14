import React from "react";
import "./ChargeInfo.css";

const ChargeInfo = ({ selectPrice, latestToTalCash }) => {
  const getTotalCash = () => {
    return (selectPrice + latestToTalCash).toLocaleString();
  };

  return (
    <div className="charge-confirm">
      <div
        className={`confirm-price ${!selectPrice > 0 && "confirm-price-hide"}`}
      >
        <div>잔액</div>
        <div>{latestToTalCash.toLocaleString()}원</div>
      </div>
      <div className="confirm-total-cash">
        <div>{selectPrice > 0 ? "충전 후 잔액" : "잔액"}</div>
        <div>{getTotalCash()}원</div>
      </div>
    </div>
  );
};

export default ChargeInfo;
