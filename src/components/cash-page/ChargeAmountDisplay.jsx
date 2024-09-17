import React from "react";
import "./ChargeAmountDisplay.css";
import { ReactSVG } from "react-svg";
import { svgCollection } from "../../constants/svgCollection";

const ChargeAmountDisplay = ({ selectPrice }) => {
  return (
    <div className="charge-price-title-wrap">
      <div className="charge-price-title">
        <div>충전 캐시</div>
        <div>
          {selectPrice > 0
            ? `${selectPrice.toLocaleString()}원`
            : "충전 금액을 선택하세요"}
        </div>
      </div>
      <ReactSVG src={svgCollection.money} className="charge-modal-img" />
    </div>
  );
};

export default ChargeAmountDisplay;
